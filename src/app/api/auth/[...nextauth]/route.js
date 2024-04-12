import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials"
import { adminUser } from "@/lib/constants";
import { connect } from "@/db/dbConfig";
import User from "@/modals/userModel";
import bcryptjs from 'bcryptjs'
import { NextResponse } from 'next/server'

await connect();

const authOptions = {

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials, req) {
          const { email, password } = credentials;
          const user = await User.findOne({ email });
          if (!user) {
              return {
                  status: 400,
                  body: {
                      message: "User does not exist",
                      success: false
                  }
              };
          }
          const hashPassword = await bcryptjs.compare(password, user.password);
          if (!hashPassword) {
              return {
                  status: 400,
                  body: {
                      message: "Incorrect password",
                      success: false
                  }
              };
          } else {
              console.log(user);
              return {
                  status: 200,
                  body: {
                      message: "Successfully logged in",
                      success: true,
                      user
                  }
              };
          }
      }
    })
  
  ],
  secret: process.env.TOKEN_SECRET,
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async signIn({ profile, user }) {
      try {
        const userObj = {
          name: user.name,
          email: user.email,
          image: user.image,
          providerId: user.id
        }
        userObj.role = (adminUser.includes(user.email)) ? 0 : 10;
        const existUser = await User.findOne({ email: user.email })
        if (!existUser) {
          const user = await User.create(userObj)
          return user
        }
        return adminUser
      } catch (e) {
        return false
      }
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken
      session.user.id = token.id
      return session
    },
    async redirect({ url, baseUrl }) {
      if (new URL(url).origin != baseUrl) return url
      return baseUrl
    }
  }
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };