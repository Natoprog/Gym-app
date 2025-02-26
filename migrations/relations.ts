import { relations } from "drizzle-orm/relations";
import { user, session, exercises, workouts, exerciseSets, authenticator, account } from "./schema";

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	sessions: many(session),
	exercises: many(exercises),
	workouts: many(workouts),
	authenticators: many(authenticator),
	accounts: many(account),
}));

export const exercisesRelations = relations(exercises, ({one, many}) => ({
	user: one(user, {
		fields: [exercises.userId],
		references: [user.id]
	}),
	workout: one(workouts, {
		fields: [exercises.workoutId],
		references: [workouts.id]
	}),
	exerciseSets: many(exerciseSets),
}));

export const workoutsRelations = relations(workouts, ({one, many}) => ({
	exercises: many(exercises),
	user: one(user, {
		fields: [workouts.userId],
		references: [user.id]
	}),
}));

export const exerciseSetsRelations = relations(exerciseSets, ({one}) => ({
	exercise: one(exercises, {
		fields: [exerciseSets.exerciseId],
		references: [exercises.id]
	}),
}));

export const authenticatorRelations = relations(authenticator, ({one}) => ({
	user: one(user, {
		fields: [authenticator.userId],
		references: [user.id]
	}),
}));

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));