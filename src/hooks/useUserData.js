import { useAsync } from 'react-use'
import { fetchUserDetailsById } from 'services/user-utils'

export function useUserData(userId) {
	const { loading, value: userdata } = useAsync(() =>
		fetchUserDetailsById(userId)
	)

	return { loading, userdata }
}
