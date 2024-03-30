import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { LoginRoute } from "../../routes/routesEndpoints";

const handler = NextAuth({
    providers:[
        CredentialsProvider({
          name: 'Credentials',
    
          credentials: {
            username: { label: "username", type: "username" },
            password: { label: "password", type: "password" }
          },
          async authorize(credentials) {
            console.log(credentials)
            const user = await LoginRoute(credentials);
            console.log(user)
            if(user.ok){
               return user;
            }else{
                
                return null
            }
          }
        })
      ],
    secret:process.env.NEXTAUTH_SECRET,
      session:{
        strategy: "jwt",
        maxAge:30 * 24 * 60 ,
        updateAge:24*60*60,
      },
      callbacks: {
        async jwt({ token, user }) {
          console.log(user)
          if (user) {
            console.log(user)
            if (user.exists) {
              token.AccessToken = user.tokens.token;
              token.refreshToken = user.tokens.refreshToken;
              token.exists = user.exists;
              token.pending = user.pending;

              
              /* 
              Add other user properties to the token if needed
              */ 
            }else {
              token.exists = user.exists;
              token.AccessToken = user.tokens.token;
             
          } 
          }
          return token;
        },
        async session({ session, token }) {
          console.log(token)
          if (token.exists) {
            session.token = token.AccessToken;
            session.refreshToken = token.refreshToken;
            session.user.exists = token.exists;
            session.user.pending = token.pending;
            /* 
            Add other user properties to the session if needed
            */ 
          } else {
            session.token = token.AccessToken;
            session.user.exists = token.exists;


          }
          console.log(session)
          return session;
        },
      },      
      pages:{
        signIn:"/auth/login",
        
      }
});
 export {handler as GET, handler as POST}
 
