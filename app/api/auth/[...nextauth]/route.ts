import NextAuth, { Session } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import { connectToDB } from '@utils/database'
import User from '@models/user'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session }: { session: Session }) {
      if (!session.user) {
        return session
      }

      const sessionUser = await User.findOne({
        email: session.user.email,
      })

      session.user.id = sessionUser._id.toString()
      return session
    },
    async signIn({ profile }) {
      try {
        await connectToDB()

        if (!profile) {
          throw new Error('Profile is undefined')
        }

        const userExists = await User.findOne({
          email: profile?.email,
        })

        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name?.replaceAll(' ', ''),
            image: profile?.picture,
          })
        }

        return true
      } catch (error) {
        console.log(error)
        return false
      }
    },
  },
})

export { handler as GET, handler as POST }
