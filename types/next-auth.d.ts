import { DefaultSession, DefaultUser } from 'next-auth'

// Extend Session interface
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
    id: string
  }

  interface Profile {
    email: string
    name: string
    picture: string
  }
}
