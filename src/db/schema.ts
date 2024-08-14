import {
  pgTable,
  unique,
  text,
  integer,
  timestamp,
  foreignKey,
  primaryKey,
  boolean,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const session = pgTable(
  "session",
  {
    sessionToken: text("sessionToken").primaryKey().notNull(),
    userId: text("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "string" }).notNull(),
    xata_updatedat: timestamp("xata_updatedat", {
      withTimezone: true,
      mode: "string",
    })
      .defaultNow()
      .notNull(),
    xata_id: text("xata_id")
      .default(sql`'rec_'::text || (xata_private.xid())::text`)
      .notNull(),
    xata_version: integer("xata_version").default(0).notNull(),
    xata_createdat: timestamp("xata_createdat", {
      withTimezone: true,
      mode: "string",
    })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      session__pgroll_new_xata_id_key: unique(
        "session__pgroll_new_xata_id_key"
      ).on(table.xata_id),
    };
  }
);

export const user = pgTable(
  "user",
  {
    id: text("id").primaryKey().notNull(),
    name: text("name"),
    email: text("email"),
    emailVerified: timestamp("emailVerified", { mode: "string" }),
    image: text("image"),
    xata_updatedat: timestamp("xata_updatedat", {
      withTimezone: true,
      mode: "string",
    })
      .defaultNow()
      .notNull(),
    xata_id: text("xata_id")
      .default(sql`'rec_'::text || (xata_private.xid())::text`)
      .notNull(),
    xata_version: integer("xata_version").default(0).notNull(),
    xata_createdat: timestamp("xata_createdat", {
      withTimezone: true,
      mode: "string",
    })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      user__pgroll_new_xata_id_key: unique("user__pgroll_new_xata_id_key").on(
        table.xata_id
      ),
      user_email_unique: unique("user_email_unique").on(table.email),
    };
  }
);

export const verificationToken = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "string" }).notNull(),
    xata_updatedat: timestamp("xata_updatedat", {
      withTimezone: true,
      mode: "string",
    })
      .defaultNow()
      .notNull(),
    xata_id: text("xata_id")
      .default(sql`'rec_'::text || (xata_private.xid())::text`)
      .notNull(),
    xata_version: integer("xata_version").default(0).notNull(),
    xata_createdat: timestamp("xata_createdat", {
      withTimezone: true,
      mode: "string",
    })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      verificationToken_identifier_token_pk: primaryKey({
        columns: [table.identifier, table.token],
        name: "verificationToken_identifier_token_pk",
      }),
      verificationToken__pgroll_new_xata_id_key: unique(
        "verificationToken__pgroll_new_xata_id_key"
      ).on(table.xata_id),
    };
  }
);

export const authenticator = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull(),
    userId: text("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
    xata_updatedat: timestamp("xata_updatedat", {
      withTimezone: true,
      mode: "string",
    })
      .defaultNow()
      .notNull(),
    xata_id: text("xata_id")
      .default(sql`'rec_'::text || (xata_private.xid())::text`)
      .notNull(),
    xata_version: integer("xata_version").default(0).notNull(),
    xata_createdat: timestamp("xata_createdat", {
      withTimezone: true,
      mode: "string",
    })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      authenticator_userId_credentialID_pk: primaryKey({
        columns: [table.credentialID, table.userId],
        name: "authenticator_userId_credentialID_pk",
      }),
      authenticator__pgroll_new_xata_id_key: unique(
        "authenticator__pgroll_new_xata_id_key"
      ).on(table.xata_id),
      authenticator_credentialID_unique: unique(
        "authenticator_credentialID_unique"
      ).on(table.credentialID),
    };
  }
);

export const account = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
    xata_updatedat: timestamp("xata_updatedat", {
      withTimezone: true,
      mode: "string",
    })
      .defaultNow()
      .notNull(),
    xata_id: text("xata_id")
      .default(sql`'rec_'::text || (xata_private.xid())::text`)
      .notNull(),
    xata_version: integer("xata_version").default(0).notNull(),
    xata_createdat: timestamp("xata_createdat", {
      withTimezone: true,
      mode: "string",
    })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      account_provider_providerAccountId_pk: primaryKey({
        columns: [table.provider, table.providerAccountId],
        name: "account_provider_providerAccountId_pk",
      }),
      account__pgroll_new_xata_id_key: unique(
        "account__pgroll_new_xata_id_key"
      ).on(table.xata_id),
    };
  }
);
