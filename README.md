
# Gjillo App

This repository contains only the App's code. For the api repository, see [Gjillo/gjillo-api](https://github.com/gjillo/gjillo-api)

## Tech Stack

<img src="https://img.shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=white&style=for-the-badge"/>
<img src="https://img.shields.io/badge/React-61DAFB?logo=React&logoColor=white&style=for-the-badge"/>
<img src="https://img.shields.io/badge/Next-000000?logo=Next.JS&logoColor=white&style=for-the-badge"/>
<img src="https://img.shields.io/badge/Sass-CC6699?logo=Sass&logoColor=white&style=for-the-badge"/>
<img src="https://img.shields.io/badge/MUI-007FFF?logo=MUI&logoColor=white&style=for-the-badge"/>

## Installation

### Prerequisities

- Node.js
- GitHub OAuth App that can be created at [github.com/settings/apps](https://github.com/settings/apps)

### App

Clone this repo on your local machine
```
git clone https://github.com/gjillo/gjillo-app.git
cd gjillo-app
```

Install node modules
```
npm install
```

Create `.env.local` file and fill in the database credentials, as described in the [.env](.env) file, for example:

```dotenv
#Credentials for GitHub OAuth App
GITHUB_ID=your-github-id
GITHUB_SECRET=your-github-secret

NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://127.0.0.1:3000

DB_HOST=your-database-server.com
DB_PORT=5432
DB_USER=postgres
DB_DATABASE=gjillo
DB_PASSWORD=your-password

NEXT_PUBLIC_GQL_SERVER=http://localhost:4000/graphql
NEXT_PUBLIC_GQL_WS_SERVER=ws://localhost:4000/graphql
```

Start live server
```
npm run dev
```

App will be available at [localhost:3000](http://localhost:3000).

## GraphQL types

To generate types for GraphQL after API schema changes, start API and run

```
npm run gql:generate
```

or to watch changes live:

```
npm run gql:watch
```

## Authors

- [Filip Kowalski](https://github.com/Spookyless)
- [Krzysztof Wrona](https://github.com/rubikon02)
- [Michał Karpierz](https://github.com/ShatterPlayer)

## License

This project is licensed under [MIT](./LICENSE) license.