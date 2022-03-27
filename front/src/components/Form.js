import { TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export const Form = ({ handleChange, handleSubmit, input, isCorrectInput }) => {
  return (
    <form className="amount-form" onSubmit={handleSubmit}>
      <TextField
        error={!isCorrectInput}
        fullWidth
        name="amount"
        label="Amount of letters"
        variant="standard"
        helperText="Please insert numbers"
        value={input}
        onChange={handleChange}
      />
      <IconButton size="large" type="submit">
        <SendIcon fontSize="large" />
      </IconButton>
    </form>
  );
};
