import axios from "axios"
import NextAuth, {
  NextAuthOptions,
  Session,
  User
} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

interface CustomSessionInterface extends Session {
  user: {
    id: string
    email: string
    name: string
    gender: string
  }
}

interface CustomUserInterface extends User {
  id: string
  gender: string
}

export const authOptions: NextAuthOptions = {
  providers: [

    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        email: {
          label: "Email",
          type: "email"
        },
        password: {
          label: "Password",
          type: "password"
        }
      },

      async authorize(credentials) {
        try {
          const payload = {
            email: credentials?.email,
            password: credentials?.password
          }

          const { data } =
            await axios.post(
              `${process.env.SERVER}/api/user/login`,
              payload
            )

          return data
        } catch {
          return null
        }
      }
    }),

    GoogleProvider({
      clientId:
        process.env.GOOGLE_CLIENT_ID!,
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET!
    })

  ],

  pages: {
    signIn: '/login',
    error: '/auth-failed'
  },

  session: {
    strategy: 'jwt'
  },

  callbacks: {

    async signIn({ user, account }) {
      const customUser =
        user as CustomUserInterface

      if (
        account?.provider === 'google'
      ) {
        try {

          const payload = {
            email: customUser.email,
            provider: 'google'
          }

          const { data } =
            await axios.post(
              `${process.env.SERVER}/api/user/login`,
              payload
            )

          customUser.id = data.id
          customUser.email = data.email
          customUser.name = data.name
          customUser.gender = data.gender

          return true

        } catch {
          return false
        }
      }

      return true
    },

    async jwt({
      token,
      user
    }) {
      const customUser =
        user as CustomUserInterface

      if (user) {
        token.id = customUser.id
        token.gender =
          customUser.gender
      }

      return token
    },

    async session({
      session,
      token
    }) {
      const customSession =
        session as CustomSessionInterface

      if (token) {
        customSession.user.id =
          token.id as string

        customSession.user.gender =
          token.gender as string
      }

      return customSession
    }
  },
  secret:process.env.NEXTAUTH_SECRET
}

const handler =
  NextAuth(authOptions)

export {
  handler as GET,
  handler as POST
}