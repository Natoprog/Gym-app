import { NextResponse } from "next/server";
import { XataClient } from "../../../../utils/xata";

const client = new XataClient();

export async function POST(request: Request) {
  const { id } = await request.json();

  const data = await client.db.trening.filter({ id: id }).getFirst();

  const exercises = await client.db.exercise
    .filter({ "trening_connection.id": id })
    .getAll();

  return NextResponse.json({ trening: data, exercises: exercises });
}
