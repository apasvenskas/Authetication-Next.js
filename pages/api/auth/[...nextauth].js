import NextAuth from "next-auth";
import { connectToDatabase } from "../../../lib/db,js";
import { verifyPassword } from "../../../lib/auth";
import { providers } from 'next-auth/react'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
    // configuration options for next-auth
    session: {
        jwt: true
    },

    providers: [
        CredentialsProvider({
            async authorize(credentials) {
               const client = await connectToDatabase();

               const usersCollection = client.db().collection('users');
               const user = await usersCollection.findOne({email: credentials.email})

               if(!user){
                client.close();
                throw new Error('No user found!');
               }
               const isValid = await verifyPassword(credentials.password, user.password)

               if(!isValid){
                client.close();
                throw new Error('Could not log you in!'); 
               }
               return { email: user.email }

               client.close();
            }
        })
    ]
});