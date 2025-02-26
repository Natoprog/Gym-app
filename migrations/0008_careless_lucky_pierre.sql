ALTER TABLE "workouts" DROP CONSTRAINT "workouts_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "workouts" ADD COLUMN "userId" text NOT NULL;--> statement-breakpoint
ALTER TABLE "workouts" ADD CONSTRAINT "workouts_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workouts" DROP COLUMN "user_id";