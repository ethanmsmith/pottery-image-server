
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "./schema.graphql",
  generates: {
    "./src/_generated/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers"]
    }
  },
  config: {
    useIndexSignature: true,
    contextType: "../index#ServerContext" 
  }
};

export default config;
