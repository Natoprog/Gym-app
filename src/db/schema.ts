import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  decimal,
  serial,
  date,
  varchar,
} from "drizzle-orm/pg-core";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import type { AdapterAccountType } from "next-auth/adapters";

const connectionString = process.env.DATABASE_URL as string;
const pool = postgres(connectionString, { max: 1 });

export const db = drizzle(pool);

// export const exercise = pgTable("exercise", {
//   id: serial("id").primaryKey(),
//   guid: text("guid").notNull().unique(),
//   name: text("name").notNull(),
//   sets: integer("sets"),
//   setsCompleted: integer("setsCompleted"),
//   reps: integer("reps"),
//   weight: decimal("weight"),
//   date: date("date").defaultNow(),
//   userId: text("userId")
//     .notNull()
//     .references(() => users.id, { onDelete: "cascade" }),
// });

export const workouts = pgTable("workouts", {
  id: serial("id").primaryKey(),
  userId: text("userId")
    .references(() => users.id)
    .notNull(),
  date: date("date").notNull(), // Data treningu
  createdAt: timestamp("created_at").defaultNow(),
});

export const exercises = pgTable("exercises", {
  id: serial("id").primaryKey(),
  userId: text("userId")
    .references(() => users.id)
    .notNull(),
  workoutId: integer("workoutId")
    .references(() => workouts.id)
    .notNull(),
  name: text("name").notNull(), // Nazwa ćwiczenia (np. Przysiad)
});

export const exerciseSets = pgTable("exercise_sets", {
  id: serial("id").primaryKey(),
  exerciseId: integer("exerciseId")
    .references(() => exercises.id)
    .notNull(),
  sets: integer("sets"), // Liczba serii
  reps: integer("reps"), // Liczba powtórzeń
  weight: integer("weight"), // Obciążenie w kg
});

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
);

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  })
);
