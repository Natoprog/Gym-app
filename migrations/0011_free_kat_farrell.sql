ALTER TABLE "exercise_sets" DROP CONSTRAINT "exercise_sets_workoutId_workouts_id_fk";
--> statement-breakpoint
ALTER TABLE "exercises" ADD COLUMN "workoutId" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_workoutId_workouts_id_fk" FOREIGN KEY ("workoutId") REFERENCES "public"."workouts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exercise_sets" DROP COLUMN "workoutId";