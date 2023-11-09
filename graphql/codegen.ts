import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: process.env.NEXT_PUBLIC_GQL_SERVER,
    documents: ['graphql/**/*.graphql'],
    ignoreNoDocuments: true, // for better experience with the watcher
    generates: {
        'graphql/types.ts': {
            plugins: [
                "typescript",
                "typescript-operations",
                "typed-document-node",
            ]
        }
    }
}

export default config