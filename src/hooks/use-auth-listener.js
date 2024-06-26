import { useState, useEffect } from 'react'
import { useAuth } from 'reactfire'

export default function useAuthListener() {
	const auth = useAuth()
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')))

	useEffect(() => {
		const listener = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				setUser(authUser)
				localStorage.setItem('authUser', JSON.stringify(authUser))
			} else {
				localStorage.removeItem('authUser')
				setUser(null)
			}
		})

		return () => listener()
	}, [auth])

	return { user }
}
