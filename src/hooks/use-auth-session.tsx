
import { authClient } from '@/lib/auth/better-auth-client'
import { User } from "@prisma/client"

export function useAuthSession() {
    const { useSession } = authClient

    const {
        data: sessionData,
        isPending,
        error,
    } = useSession() || {}

    const user = sessionData?.user as User
    const session = sessionData?.session

    // You can return the necessary values with loading/error states
    return {
        user,
        session,
        isLoading: isPending,
        error,
    }
}
