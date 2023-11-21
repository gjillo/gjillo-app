import { CodegenConfig } from '@graphql-codegen/cli'
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const config: CodegenConfig = {
    schema: process.env.NEXT_PUBLIC_GQL_SERVER,
    documents: ['graphql/**/*.graphql'],
    ignoreNoDocuments: true, // for better experience with the watcher
    generates: {
        'graphql/types.ts': {
            config: {
                scalars: {
                    DateTime: {
                        input: 'string',
                        output: 'string'
                    },
                    UUID: {
                        input: 'string',
                        output: 'string'
                    }
                }
            },
            plugins: [
                "typescript",
                "typescript-operations",
                "typed-document-node",
            ]
        }
    }
}

export default config