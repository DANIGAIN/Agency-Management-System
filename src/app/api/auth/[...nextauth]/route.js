import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials"
import { adminUser } from "@/lib/constants";
import { connect } from "@/db/dbConfig";
import User from "@/modals/userModel";
import bcryptjs from 'bcryptjs'


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
        try {
          const user = await User.findOne({ email });
          if (!user && !credentials?._id ) {
             throw new Error("User can not exist")
          }
          const hashPassword = await bcryptjs.compare(password, user.password)
          if (!hashPassword) {
            throw new Error("Invalid password")
          }
          return user
        } catch (error) {
          throw new Error(error.message)
        }
      }
    }),
  ],
  secret: process.env.SECRET,
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt(params){
      try{
        const user = await User.findOne({email:params.token.email})
        params.token.role = user.role
        return params.token;
      }catch(e){
        return params.token;
      }
    },
    async signIn({ profile, user }) {
      try {
        const userObj = {
          name: user.name,
          email: user.email,
          image: user.image,
          providerId: user.id
        };
        userObj.role = (adminUser.includes(user.email)) ? 0 : 10;
        const existUser = await User.findOne({ email: user.email });
        if (!existUser) {
          const user = await User.create(userObj);
          return user;
        }
        return existUser
    
      } catch (e) {
        return false;
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
  },
  pages:{
    error: '/auth/error',
  }
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };