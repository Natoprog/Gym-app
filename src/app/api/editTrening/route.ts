import { XataClient } from "../../../../utils/xata";

const client = new XataClient();

export async function POST(request: Request) {
  const body = await request.json();

  // const user = await xata.db.Users.createOrReplace('myid', { name: 'Keanu Reeves' });
  const res = await client.db.trening.update(body.id, {
    name: body.name,
    time: body.time,
  });
  return Response.json(res);
}
