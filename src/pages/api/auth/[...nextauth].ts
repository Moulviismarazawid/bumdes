import NextAuth, { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import { loginWithGoogle, signIn } from "@/services/auth";
import bcrypt from 'bcrypt'
import GoogleProvider from "next-auth/providers/google"

const authOptions:NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers : [
        CredentialsProvider({
            type:'credentials',
            name:'credentials',
            credentials: {
                email : {label: 'email', type:'email'},
                password : {label: 'password', type:'password'}
            },
            async authorize(credentials){
                const {email, password} = credentials as {
                    email: string,
                    password: string
                };
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const user:any = await signIn(email)
                if (user) {
                    const passwordConfirm = await bcrypt.compare(password, user.password);
                    if (passwordConfirm){
                        return user;
                    }
                    return null;
                }else{
                    return null;
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || '',
        })
    ],
    callbacks : {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async jwt({token, account, user}:any) {
            if(account?.provider === 'credentials'){
                token.email = user.email;
                token.fullname = user.fullname;
                token.phone = user.phone;
                token.rol = user.rol;
            }
            if(account?.provider === 'google'){
                const data = {
                    fullname : user.name,
                    email : user.email,
                    role: user.role,
                    type : "google",
                }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            await loginWithGoogle(data,(res:any) => {
                token.email = res.email;
                token.fullname = res.fullname;
                token.role = res.role;
            })

            }
            return token;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async session({session,token}:any){
            if('email'in token){
                session.user.email = token.email
            }
            if('fullname'in token){
                session.user.fullname = token.fullname
            }
            if('phone'in token){
                session.user.phone = token.phone
            }
            if('role'in token){
                session.user.role = token.role
            }
            return session
        }
    },
    pages : {
        signIn: '/auth/login',
    },
}

export default NextAuth(authOptions)