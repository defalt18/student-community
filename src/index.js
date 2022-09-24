import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { config } from './lib/firebase.prod'
import { FirebaseAppProvider } from 'reactfire'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<FirebaseAppProvider firebaseConfig={config.dev}>
			<App />
		</FirebaseAppProvider>
	</React.StrictMode>
)
