import React from 'react'
import { render } from 'react-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import App from './App'
import './index.css'
import { config } from './lib/firebase.prod'
import { FirebaseAppProvider } from 'reactfire'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'

const theme = createTheme({
	palette: {
		primary: {
			light: '#4a7cff',
			main: '#4a7cff',
			dark: '#1b57f3',
			contrastText: '#fff'
		},
		text: {
			primary: 'white',
			secondary: 'white',
			disabled: 'white',
			hint: 'white'
		}
	}
})

render(
	<React.StrictMode>
		<FirebaseAppProvider firebaseConfig={config.dev}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<App />
			</ThemeProvider>
		</FirebaseAppProvider>
	</React.StrictMode>,
	document.getElementById('root')
)
