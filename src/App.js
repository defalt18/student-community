/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import {
	Home,
	SignIn,
	SignUp,
	Polling,
	Settings,
	Resources,
	ChatApp,
	Clubs,
	Parts,
	Clubdesc,
	Events,
	Friends,
	Prof
} from './pages'
import * as ROUTES from './constants/routes'
import { IsUserRedirect, ProtectedRoute } from './helpers/routes'
import { useAuthListener } from './hooks'
import { Header, Sidebar } from './components'
import { db } from './lib/firebase.prod'

import Navbar from './components/Navbar/Navbar'
import "./components/Custom/Custom.import"

export default function App() {
	const { user } = useAuthListener()
	const [userImage, setUserImage] = useState(undefined)

	useEffect(() => {
		user &&
			db
				.collection('users')
				.doc(user.uid)
				.onSnapshot((snapshot) => setUserImage(snapshot.data().image))
	}, [user, setUserImage])

	return (
		<Route exec path="/">
			<Navbar />
		</Route>
	)
}
