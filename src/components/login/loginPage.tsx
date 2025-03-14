import * as React from 'react';
import Box from '@mui/material/Box';

import io from 'socket.io-client';
import { feathers } from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import authentication from '@feathersjs/authentication-client';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import edumeetConfig from '../../utils/edumeetConfig';

import CssBaseline from '@mui/material/CssBaseline';

import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const socket = io(edumeetConfig.hostname, { path: edumeetConfig.path });
// Initialize our Feathers client application through Socket.io
// with hooks and authentication.
const client = feathers();

client.configure(socketio(socket));
// Use localStorage to store our login token
client.configure(authentication());

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn() {
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		const email = data.get('email'); // typechecks!
		const password = data.get('password'); // typechecks!

		try {
			// Authenticate with the local email/password strategy
			await client.authenticate({
				strategy: 'local',
				email: email,
				password: password
			});
			// Show e.g. logged in dashboard page
			window.location.reload();
		} catch (error) {
			// Show login page (potentially with `e.message`)
		}
		
	};

	return (
		<ThemeProvider theme={defaultTheme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<img src='https://raw.githubusercontent.com/edumeet/edumeet/master/app/public/images/logo.edumeet.svg' />

					<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
						/>
						{/* <FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Remember me"
						/> */}
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
						Sign In
						</Button>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
