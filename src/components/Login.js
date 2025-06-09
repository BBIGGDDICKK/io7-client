import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import { 
    Box, 
    TextField, 
    Button, 
    Typography, 
    Paper, 
    Card, 
    CardContent,
    CircularProgress,
    Alert,
    InputAdornment,
    IconButton,
    useTheme
  } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import "../style/Login.css";
import { useAuth } from '../context';

const svr = window.location;
let rootURL = window.runtime.API_URL_ROOT || svr.protocol+'//'+svr.hostname+':2009';

const Login = () => {
    const theme = useTheme();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        console.log('login succeeded');
        login("testToken");
        // fetch(rootURL + '/users/login',{
        //     method: 'POST',
        //     headers: { "Content-Type": "application/json", },
        //     body: JSON.stringify({
        //         "email": event.target.email.value,
        //         "password": event.target.password.value
        //     })
        // }).then((result) => result.json())
        // .then((data) => {
        //     if (data.access_token === undefined) {
        //         alert('invalid userid/password')
        //         console.log('login failed');
        //     } else {
        //         console.log('login succeeded');
        //         login(data.access_token);
        //     }
        // }).catch((err) => {
        //     console.log(err);
        // });
    }

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                backgroundColor: theme.palette.background.default,
                padding: theme.spacing(2)
            }}
        >
            <Card
                elevation={3}
                sx={{
                    maxWidth: 450,
                    width: '100%',
                    borderRadius: 2,
                    overflow: 'hidden'
                }}
            >
                <Box
                    sx={{
                        bgcolor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        p: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Box
                        sx={{
                            bgcolor: 'rgba(255,255,255,0.2)',
                            borderRadius: '50%',
                            p: 1,
                            mb: 1
                        }}
                    >
                        <LockOutlinedIcon fontSize="large" />
                    </Box>
                    <Typography variant="h5" component="h1">
                        STAY-SENS
                    </Typography>
                </Box>

                <CardContent sx={{ p: 3 }}>
                    {error && (
                        <Alert
                            severity="error"
                            sx={{ mb: 2 }}
                        >
                            {error}
                        </Alert>
                    )}

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleTogglePasswordVisibility}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, py: 1.5 }}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                'Sign In'
                            )}
                        </Button>
                    </Box>
                </CardContent>
            </Card>

            <Typography
                variant="body2"
                color="text.secondary"
                align="center"
                sx={{ mt: 4 }}
            >
                © {new Date().getFullYear()} STAY-SENS. All rights reserved.
            </Typography>
        </Box>
    );
}

export default Login;