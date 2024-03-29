import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {PrismaAdapter} from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import {getUserById} from "@/src/actions/user";
import {UserRole} from "@prisma/client";



export const {
    handlers: {GET, POST},
    auth,
    signIn, signOut
} = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(prisma),
    session: {strategy: "jwt"},
    callbacks: {
        async jwt({token}) {
            if (!token.sub) return token

            const existingUser  = await getUserById(token.sub)

            if(!existingUser) return token

            token.role = existingUser.role

            return token
        },
        async session({session, token}) {
            if (token.sub && session.user){
                session.user.id = token.sub
            }

            if (token.role && session.user){
                session.user.role = token.role as UserRole

            }

            return session
        }
    }
});