import { useSelector } from 'react-redux'
import { getUserSelector } from '../store/slices/userSlice'

export function useAuth() {
    const { email, id, name } = useSelector(getUserSelector)

    return {
        isAuth: !!email,
        id,
        email,
        name,
    }
}