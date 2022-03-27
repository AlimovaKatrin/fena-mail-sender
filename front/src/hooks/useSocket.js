import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import { getSocketData } from '../helper';

export const useSocket = () => {
  const [message, setMessage] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io('http://localhost:3100');
    socketRef.current.on('connect', () => {
      const engine = socketRef.current.io.engine;
      engine.on('message', message => {
        const data = getSocketData(message);
        if (data) {
          setMessage(data);
        }
      });
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, []);
  return { message };
};
