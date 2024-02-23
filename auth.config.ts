import {NextAuthConfig} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {LoginSchema} from "@/src/schemas";
import {getUserByEmail} from "@/src/actions/user";
import bcrypt from "bcryptjs";

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                const validCredentials = LoginSchema.safeParse(credentials)

                if (validCredentials.success) {
                    const {email, password} = validCredentials.data
                    const user = await getUserByEmail(email)
                    if (!user || !user.password) return null

                    const passwordsMatch = await bcrypt.compare(password, user.password)

                    if (passwordsMatch) return user
                }

                return null
            }
        })
    ]
} satisfies NextAuthConfig