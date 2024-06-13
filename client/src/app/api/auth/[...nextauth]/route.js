import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

const endPoint = process.env.NEXT_PUBLIC_ENDPOINTS_URL;
const authenticate = async (username, password) => {
  let response;
  try {
    response = await axios.post(`${endPoint}/login`, {
      username,
      password,
    });
  } catch (e) {
    throw new Error(
      JSON.stringify({
        status: e.response?.status,
        code: e?.code,
        data: e.response?.data,
      }),
    );
  }
  return response.data;
};

const getMe = async (token) => {
  const { data } = await axios.get(`${endPoint}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

const refreshAccessToken = async (token) => {
  try {
    const { data } = await axios.post(
      `${endPoint}/refresh_token`,
      {
        refreshToken: token?.refreshToken,
      },
      {
        headers: {
          Authorization: ` ${token?.accessToken}`,
        },
      }
    );
    return {
      ...token,
      accessToken: data.accessToken,
    };
  } catch (e) {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
};

export const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const { username, password } = credentials;
          const user = await authenticate(username, password);
          return Promise.resolve(user);
        } catch (e) {
          return Promise.reject(new Error(e.message));
        }
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60,
    updateAge: 24 * 60 * 60,
  },

  pages: {
    signIn: '/',
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      return true;
    },  

    async jwt({ token, user, account, trigger }) {
      if (trigger === 'update') {
        if (Date.now() < new Date(token.accessToken?.expiresAt)?.getTime()) {
          token = await refreshAccessToken(token);
          console.log(token)
        }
        try {
          const data = await getMe(token?.accessToken);
          token.email = data?.email.address;
        } catch (e) {}
      }
      if (user && account) {
        token.accessToken = user.accessToken.token;
        token.refreshToken = user.refreshToken.token;
        token.profile = {
          ...user.profile,
        };
        token.status = user.status;
      }
      
      if (Date.now() < new Date(token.exp)?.getTime()) {
        return token;
      }

      return await refreshAccessToken(token);
    },

    async session({ session, token }) {

      session.accessToken = token.accessToken;
      session.error = token.error;
      session.profile = {
        ...token.profile,
      };
      session.status = token.status;
      return session;
    },
  },

  debug: true,
};

const handler = (req, res) => NextAuth(req, res, authOptions);
export { handler as GET, handler as POST };
