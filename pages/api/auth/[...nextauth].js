import NextAuth from "next-auth/next";

import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        // CAN ADD OTHERS HERE
    ],
    secret: process.env.JWT_SECRET
})
