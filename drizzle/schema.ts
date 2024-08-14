import { pgTable, unique, text, timestamp, integer, foreignKey, primaryKey, boolean } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"



export const user = pgTable("user", {
	id: text("id").primaryKey().notNull(),
	name: text("name"),
	email: text("email"),
	emailVerified: timestamp("emailVerified", { mode: 'string' }),
	image: text("image"),
	xataUpdatedat: timestamp("xata_updatedat", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	xataId: text("xata_id").default(('rec_'::text || (xata_private.xid())::text)).notNull(),
	xataVersion: integer("xata_version").default(0).notNull(),
	xataCreatedat: timestamp("xata_createdat", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		userPgrollNewXataIdKey: unique("user__pgroll_new_xata_id_key").on(table.xataId),
		userEmailUnique: unique("user_email_unique").on(table.email),
	}
});

export const session = pgTable("session", {
	sessionToken: text("sessionToken").primaryKey().notNull(),
	userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" } ),
	expires: timestamp("expires", { mode: 'string' }).notNull(),
	xataUpdatedat: timestamp("xata_updatedat", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	xataId: text("xata_id").default(('rec_'::text || (xata_private.xid())::text)).notNull(),
	xataVersion: integer("xata_version").default(0).notNull(),
	xataCreatedat: timestamp("xata_createdat", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		sessionPgrollNewXataIdKey: unique("session__pgroll_new_xata_id_key").on(table.xataId),
	}
});

export const verificationToken = pgTable("verificationToken", {
	identifier: text("identifier").notNull(),
	token: text("token").notNull(),
	expires: timestamp("expires", { mode: 'string' }).notNull(),
	xataUpdatedat: timestamp("xata_updatedat", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	xataId: text("xata_id").default(('rec_'::text || (xata_private.xid())::text)).notNull(),
	xataVersion: integer("xata_version").default(0).notNull(),
	xataCreatedat: timestamp("xata_createdat", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		verificationTokenIdentifierTokenPk: primaryKey({ columns: [table.identifier, table.token], name: "verificationToken_identifier_token_pk"}),
		verificationTokenPgrollNewXataIdKey: unique("verificationToken__pgroll_new_xata_id_key").on(table.xataId),
	}
});

export const authenticator = pgTable("authenticator", {
	credentialId: text("credentialID").notNull(),
	userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" } ),
	providerAccountId: text("providerAccountId").notNull(),
	credentialPublicKey: text("credentialPublicKey").notNull(),
	counter: integer("counter").notNull(),
	credentialDeviceType: text("credentialDeviceType").notNull(),
	credentialBackedUp: boolean("credentialBackedUp").notNull(),
	transports: text("transports"),
	xataUpdatedat: timestamp("xata_updatedat", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	xataId: text("xata_id").default(('rec_'::text || (xata_private.xid())::text)).notNull(),
	xataVersion: integer("xata_version").default(0).notNull(),
	xataCreatedat: timestamp("xata_createdat", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		authenticatorUserIdCredentialIdPk: primaryKey({ columns: [table.credentialId, table.userId], name: "authenticator_userId_credentialID_pk"}),
		authenticatorPgrollNewXataIdKey: unique("authenticator__pgroll_new_xata_id_key").on(table.xataId),
		authenticatorCredentialIdUnique: unique("authenticator_credentialID_unique").on(table.credentialId),
	}
});

export const account = pgTable("account", {
	userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" } ),
	type: text("type").notNull(),
	provider: text("provider").notNull(),
	providerAccountId: text("providerAccountId").notNull(),
	refreshToken: text("refresh_token"),
	accessToken: text("access_token"),
	expiresAt: integer("expires_at"),
	tokenType: text("token_type"),
	scope: text("scope"),
	idToken: text("id_token"),
	sessionState: text("session_state"),
	xataUpdatedat: timestamp("xata_updatedat", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	xataId: text("xata_id").default(('rec_'::text || (xata_private.xid())::text)).notNull(),
	xataVersion: integer("xata_version").default(0).notNull(),
	xataCreatedat: timestamp("xata_createdat", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		accountProviderProviderAccountIdPk: primaryKey({ columns: [table.provider, table.providerAccountId], name: "account_provider_providerAccountId_pk"}),
		accountPgrollNewXataIdKey: unique("account__pgroll_new_xata_id_key").on(table.xataId),
	}
});