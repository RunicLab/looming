import { CONFIG } from "@/utils/config";
import {
    createAuthClient
} from "better-auth/react";


export const authClient = createAuthClient({
    baseURL: CONFIG.URL

})

export const {
    signIn,
    signOut,
    signUp,
    useSession
} = authClient;
