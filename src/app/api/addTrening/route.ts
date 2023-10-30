import { getServerSession } from 'next-auth'
import {authConfig} from '../auth/[...nextauth]/route'
import { NextResponse } from "next/server";
import { XataClient } from "../../../../utils/xata"

const client = new XataClient()

export async function POST(request: Request) {
    const session = await getServerSession(authConfig)
    // const body = await request.json();
    // const res = await client.db.trening.create({
    //     name: body.name,
    //     time: body.time,
    // })
    // return Response.json(res)
    if(!session?.user){
        return Response.json({error: "Not logged in"})
    }
    console.log(session?.user.email)
    return Response.json({user: session?.user})
}