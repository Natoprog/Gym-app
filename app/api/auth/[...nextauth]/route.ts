
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { XataAdapter } from "@auth/xata-adapter"
import { XataClient } from "../../../../utils/xata" // or wherever you've chosen to create the client

const client = new XataClient()



export const authConfig = {
    adapter: XataAdapter(client),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    secret: process.env.JWT_SECRET
}
const handler = NextAuth(authConfig)

export { handler as GET, handler as POST }