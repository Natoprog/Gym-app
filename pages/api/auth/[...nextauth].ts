import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"

import { XataAdapter } from "@auth/xata-adapter"
import { XataClient } from "../../../utils/xata" // or wherever you've chosen to create the client

const client = new XataClient()

export default NextAuth({
 adapter: XataAdapter(client),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
})