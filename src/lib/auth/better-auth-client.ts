import { CONFIG } from "@/utils/config";
import {
    createAuthClient
} from "better-auth/react";
import { usernameClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    baseURL: CONFIG.URL,
    plugins: [
        usernameClient()
    ]

})

export const {
    signIn,
    signOut,
    signUp,
    useSession
} = authClient;
