import { useState, useMemo, useEffect } from 'react';
import moment from 'moment';

import { makeRequest } from './helper';
import { useSocket } from './hooks/useSocket';
import { Form } from './components/Form';
import { List } from './components/List';

import './App.css';
import Container from '@mui/material/Container';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { blue } from '@mui/material/colors';
import { Grid } from '@mui/material';

const fenaTheme = createTheme({
  palette: {
    primary: {
      main: blue[700],
      neat: blue[50],
    },
  },
});

function App() {
  const smallScreen = useMediaQuery('(min-width:850px)');

  const { message: socketMessage } = useSocket();
  const [input, setInput] = useState('');
  const [jobsDictionary, setJobsDictionary] = useState({});
  const isCorrectInput = useMemo(() => !isNaN(Number(input)), [input]);
  const jobIds = useMemo(
    () =>
      Object.keys(jobsDictionary).sort(
        (x, y) => jobsDictionary[y].timestamp - jobsDictionary[x].timestamp
      ),
    [jobsDictionary]
  );

  const sendEmail = () => {
    makeRequest(input).then(res => {
      setInput('');
      setJobsDictionary(prevState => ({
        ...prevState,
        [res]: {
          timestamp: Date.now(),
          emails: [
            {
              jobId: res,
              amount: input,
            },
          ],
        },
      }));
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (isCorrectInput) {
      sendEmail();
    }
  };

  const handleChange = ({ target: { value } }) => {
    setInput(value);
  };

  useEffect(() => {
    if (socketMessage) {
      const email = {
        ...socketMessage,
        timePassed: moment(socketMessage?.timestamp).calendar(),
      };
      setJobsDictionary(prevState => {
        if (prevState[socketMessage.jobId]) {
          return {
            ...prevState,
            [socketMessage.jobId]: {
              ...prevState[socketMessage.jobId],
              emails: [
                email,
              ],
            },
          };
        } else {
          return {
            ...prevState,
            [socketMessage.jobId]: {
              timestamp: Date.now(),
              emails: [email],
            },
          };
        }
      });
    }
  }, [socketMessage]);

  return (
    <Container maxWidth="xl">
      <ThemeProvider theme={fenaTheme}>
        <Grid container direction={smallScreen ? 'row' : 'column'} spacing={10}>
          <Grid item xs={6} alignSelf="center">
            <Form
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              isCorrectInput={isCorrectInput}
              input={input}
            />
          </Grid>
          <Grid item xs={6}>
            <Paper className="column" elevation={5}>
              <Grid container rowSpacing={4} alignItems="center">
                {jobIds?.map(jobId => (
                  <List
                    key={`job-${jobId}`}
                    jobId={jobId}
                    dictionary={jobsDictionary}
                  />
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Container>
  );
}

export default App;
