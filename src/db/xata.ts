import { buildClient, getDeployPreviewBranch } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type DatabaseSchema = {};

const DatabaseClient = buildClient();

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super(
      {
        apiKey: process.env.XATA_API_KEY,
        databaseURL: process.env.XATA_DATABASE_URL,
        // Use deploy preview branch if available, otherwise use branch from environment
        branch:
          getDeployPreviewBranch(process.env) ??
          process.env.XATA_BRANCH ??
          "main",
        ...options,
      },
      tables
    );
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
