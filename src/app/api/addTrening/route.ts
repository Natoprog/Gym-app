import { XataClient } from "../../../utils/xata";

const client = new XataClient();

export async function POST(request: Request) {
  const body = await request.json();
  const res = await client.db.trening.create({
    name: body.name,
    time: body.time,
    user: body.user,
  });
  return Response.json(res);
}
