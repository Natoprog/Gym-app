import { XataClient } from "../../../../db/xata-client";

const client = new XataClient();

export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);
  body.exercise.forEach(async (exercise: any) => {
    await client.db.exercise.create({
      name: exercise.exercise,
      sets: exercise.series,
      reps: exercise.reps,
      trening_connection: body.treningId,
    });
  });
  return Response.json({ ok: "ok" });
}
