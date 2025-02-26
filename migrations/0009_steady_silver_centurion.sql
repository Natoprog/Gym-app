CREATE TABLE "exercise_sets" (
	"id" serial PRIMARY KEY NOT NULL,
	"workout_id" integer NOT NULL,
	"exercise_id" integer NOT NULL,
	"sets" integer NOT NULL,
	"reps" integer NOT NULL,
	"weight" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "sets" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "workout_exercises" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "sets" CASCADE;--> statement-breakpoint
DROP TABLE "workout_exercises" CASCADE;--> statement-breakpoint
ALTER TABLE "exercises" DROP CONSTRAINT "exercises_name_unique";--> statement-breakpoint
ALTER TABLE "workouts" DROP CONSTRAINT "workouts_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "exercises" ADD COLUMN "user_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "workouts" ADD COLUMN "user_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "workouts" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "exercise_sets" ADD CONSTRAINT "exercise_sets_workout_id_workouts_id_fk" FOREIGN KEY ("workout_id") REFERENCES "public"."workouts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exercise_sets" ADD CONSTRAINT "exercise_sets_exercise_id_exercises_id_fk" FOREIGN KEY ("exercise_id") REFERENCES "public"."exercises"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workouts" ADD CONSTRAINT "workouts_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workouts" DROP COLUMN "completed_at";--> statement-breakpoint
ALTER TABLE "workouts" DROP COLUMN "userId";