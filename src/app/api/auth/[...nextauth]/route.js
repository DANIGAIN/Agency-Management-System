import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { adminUser } from "@/lib/constants";
import { connect } from "@/db/dbConfig";
import User from "@/modals/userModel";

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
  ],
  secret: process.env.TOKEN_SECRET,
  callbacks:{
    async session({session}){
      return session
    },
    async signIn({profile , user}){
      try{
        const userObj = {
          name:user.name,
          email:user.email,
          image:user.image,
          providerId:user.id
        }
        userObj.role = (adminUser.includes(user.email)) ? 0 : 10 ;
        const existUser = await User.findOne({email:user.email})
        if(!existUser){
          const user = await User.create(userObj)
        }
        return true 

      }catch(e){
        console.log(e)
        return false
      }

    }

  }

}; 

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };