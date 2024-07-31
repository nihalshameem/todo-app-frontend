import React, { FC, useState } from 'react';
import { SignInWrapper } from './SignIn.styled';
import { Button, Container, TextField, Typography } from '@mui/material';
import { AuthFormIntserface } from '../../config';

interface SignInProps {
   submit: (req: AuthFormIntserface) => void
}

const SignIn: FC<SignInProps> = ({ submit }) => {

   const [mode, setMode] = useState<'login' | 'signup'>('login');
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Reset fields after submission
      setUsername('');
      setPassword('');
      submit({
         mode: mode,
         username: username,
         password: password
      })
   };

   const toggleMode = () => {
      setMode(mode === 'login' ? 'signup' : 'login');
   };

   return (
      <Container maxWidth="sm">
         <SignInWrapper>
            <Typography variant="h4" gutterBottom>
               {mode === 'login' ? 'Login' : 'Sign Up'}
            </Typography>
            <form onSubmit={handleSubmit}>
               <TextField
                  type="username"
                  label="User name"
                  variant="outlined"
                  fullWidth
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  margin="normal"
                  required
               />
               <TextField
                  type="password"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  margin="normal"
                  required
               />
               <Button type="submit" variant="contained" color="primary" fullWidth>
                  {mode === 'login' ? 'Login' : 'Sign Up'}
               </Button>
            </form>
            <Button onClick={toggleMode} fullWidth>
               {mode === 'login' ? 'Switch to Sign Up' : 'Switch to Login'}
            </Button>
         </SignInWrapper>
      </Container>
   )
};

export default SignIn;
