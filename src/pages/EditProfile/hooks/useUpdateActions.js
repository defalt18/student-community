import { useUserData } from 'hooks'
export function useUpdateActions(user) {
	const { loading, userdata } = useUserData(user.uid)

	return {
		disabled: loading,
		userdata
	}
}
