import NextAuth, {AuthOptions} from "next-auth";
import GithubProvider from "next-auth/providers/github";
import {Pool} from 'pg'
import {PGAdapter} from "@/utility/PGAdapter";

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT ?? '5432'),
  ssl: true,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

if (!process.env.GITHUB_ID) {
  throw new Error("Missing env var: GITHUB_ID");
}

if (!process.env.GITHUB_SECRET) {
  throw new Error("Missing env var: GITHUB_SECRET");
}

export const authOptions: AuthOptions = {
  session: {
    strategy: "database",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    updateAge: 60 * 60 // 1 day
  },
  adapter: PGAdapter(pool, process.env.DB_SCHEMA ?? ''),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    })
  ],
  callbacks: {
    async signIn({user, account, profile, email, credentials}) {
      // Whether we allow the user to sign in
      // return '/url' to redirect or false to display error
      return true;
    },
    async jwt({token, account}) {
      return token
    },
    async session({session, token, user}) {
      return session
    },
    async redirect({url, baseUrl}) {
      if (url.startsWith("/")) return `${baseUrl}${url}
      `
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  }
}

const auth = NextAuth(authOptions);
export {auth as GET, auth as POST};