import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Home } from './pages'
import NewProfile from './pages/NewProfile'
import SignIn from 'pages/Auth/SignIn'
import SignUp from 'pages/Auth/SignUp'
import * as ROUTES from './constants/routes'
import { IsUserRedirect, ProtectedRoute } from './helpers/routes'
import { useAuthListener } from './hooks'
import VerificationScreen from './pages/Auth/VerificationScreen'
import Showcase from './pages/PublicContent'
import Admin from './pages/Admin'

export default function App() {
	const { user } = useAuthListener()

	return (
		<Router>
			<Switch>
				<Route exact path={ROUTES.SIGN_IN} component={SignIn} />
				<Route exact path={ROUTES.admin} component={Admin} />
				<Route exact path={ROUTES.Showcase} component={Showcase} />
				<Route exact path={ROUTES.SIGN_UP} component={SignUp} />
				<IsUserRedirect
					user={user}
					loggedInPath={ROUTES.HOME}
					path={ROUTES.SIGN_UP}
				>
					<SignUp />
				</IsUserRedirect>
				<ProtectedRoute user={user} exact path={ROUTES.VERIFY}>
					<VerificationScreen />
				</ProtectedRoute>
				<ProtectedRoute user={user} exact path={ROUTES.HOME}>
					<Home user={user} />
				</ProtectedRoute>
				<ProtectedRoute user={user} exact path={ROUTES.PROFILE}>
					<NewProfile />
				</ProtectedRoute>
			</Switch>
		</Router>
	)
}
