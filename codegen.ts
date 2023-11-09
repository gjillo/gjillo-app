import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: 'http://localhost:4000/graphql',
    documents: ['graphql/**/*.graphql'],
    ignoreNoDocuments: true, // for better experience with the watcher
    generates: {
        'generated/graphql-operations.ts': {
            plugins: [
                "typescript",
                "typescript-operations",
                "typed-document-node",
            ]
        }
    }
}

export default config