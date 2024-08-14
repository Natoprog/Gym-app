CREATE TABLE IF NOT EXISTS "account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	"xata_updatedat" timestamp with time zone DEFAULT now() NOT NULL,
	"xata_id" text DEFAULT 'rec_'::text || (xata_private.xid())::text NOT NULL,
	"xata_version" integer DEFAULT 0 NOT NULL,
	"xata_createdat" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId"),
	CONSTRAINT "account__pgroll_new_xata_id_key" UNIQUE("xata_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "authenticator" (
	"credentialID" text NOT NULL,
	"userId" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"credentialPublicKey" text NOT NULL,
	"counter" integer NOT NULL,
	"credentialDeviceType" text NOT NULL,
	"credentialBackedUp" boolean NOT NULL,
	"transports" text,
	"xata_updatedat" timestamp with time zone DEFAULT now() NOT NULL,
	"xata_id" text DEFAULT 'rec_'::text || (xata_private.xid())::text NOT NULL,
	"xata_version" integer DEFAULT 0 NOT NULL,
	"xata_createdat" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "authenticator_userId_credentialID_pk" PRIMARY KEY("credentialID","userId"),
	CONSTRAINT "authenticator__pgroll_new_xata_id_key" UNIQUE("xata_id"),
	CONSTRAINT "authenticator_credentialID_unique" UNIQUE("credentialID")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL,
	"xata_updatedat" timestamp with time zone DEFAULT now() NOT NULL,
	"xata_id" text DEFAULT 'rec_'::text || (xata_private.xid())::text NOT NULL,
	"xata_version" integer DEFAULT 0 NOT NULL,
	"xata_createdat" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "session__pgroll_new_xata_id_key" UNIQUE("xata_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "test" (
	"foo" text,
	"bar" integer,
	"xata_updatedat" timestamp with time zone DEFAULT now() NOT NULL,
	"xata_id" text DEFAULT 'rec_'::text || (xata_private.xid())::text NOT NULL,
	"xata_version" integer DEFAULT 0 NOT NULL,
	"xata_createdat" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "test__pgroll_new_xata_id_key" UNIQUE("xata_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"emailVerified" timestamp,
	"image" text,
	"xata_updatedat" timestamp with time zone DEFAULT now() NOT NULL,
	"xata_id" text DEFAULT 'rec_'::text || (xata_private.xid())::text NOT NULL,
	"xata_version" integer DEFAULT 0 NOT NULL,
	"xata_createdat" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user__pgroll_new_xata_id_key" UNIQUE("xata_id"),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	"xata_updatedat" timestamp with time zone DEFAULT now() NOT NULL,
	"xata_id" text DEFAULT 'rec_'::text || (xata_private.xid())::text NOT NULL,
	"xata_version" integer DEFAULT 0 NOT NULL,
	"xata_createdat" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token"),
	CONSTRAINT "verificationToken__pgroll_new_xata_id_key" UNIQUE("xata_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "authenticator" ADD CONSTRAINT "authenticator_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
