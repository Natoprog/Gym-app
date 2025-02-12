ALTER TABLE "exercise" RENAME COLUMN "weights" TO "weight";--> statement-breakpoint
ALTER TABLE "exercise" ADD COLUMN "userId" text NOT NULL;--> statement-breakpoint
ALTER TABLE "exercise" ADD CONSTRAINT "exercise_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;