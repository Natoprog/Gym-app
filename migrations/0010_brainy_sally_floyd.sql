ALTER TABLE "exercise_sets" DROP CONSTRAINT "exercise_sets_workout_id_workouts_id_fk";
--> statement-breakpoint
ALTER TABLE "exercise_sets" DROP CONSTRAINT "exercise_sets_exercise_id_exercises_id_fk";
--> statement-breakpoint
ALTER TABLE "exercises" DROP CONSTRAINT "exercises_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "workouts" DROP CONSTRAINT "workouts_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "exercise_sets" ADD COLUMN "workoutId" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "exercise_sets" ADD COLUMN "exerciseId" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "exercises" ADD COLUMN "userId" text NOT NULL;--> statement-breakpoint
ALTER TABLE "workouts" ADD COLUMN "userId" text NOT NULL;--> statement-breakpoint
ALTER TABLE "exercise_sets" ADD CONSTRAINT "exercise_sets_workoutId_workouts_id_fk" FOREIGN KEY ("workoutId") REFERENCES "public"."workouts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exercise_sets" ADD CONSTRAINT "exercise_sets_exerciseId_exercises_id_fk" FOREIGN KEY ("exerciseId") REFERENCES "public"."exercises"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workouts" ADD CONSTRAINT "workouts_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exercise_sets" DROP COLUMN "workout_id";--> statement-breakpoint
ALTER TABLE "exercise_sets" DROP COLUMN "exercise_id";--> statement-breakpoint
ALTER TABLE "exercises" DROP COLUMN "user_id";--> statement-breakpoint
ALTER TABLE "workouts" DROP COLUMN "user_id";