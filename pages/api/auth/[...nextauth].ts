import NextAuth, { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import { JWT } from 'next-auth/jwt';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

// async function refreshAccessToken(tokenObject) {
//   try {
//     // Get a new set of tokens with a refreshToken
//     const tokenResponse = await axios.post(`${baseURL}/auth/refreshToken`, {
//       token: tokenObject.refreshToken
//     });

//     return {
//       ...tokenObject,
//       accessToken: tokenResponse.data.accessToken,
//       accessTokenExpiry: tokenResponse.data.accessTokenExpiry,
//       refreshToken: tokenResponse.data.refreshToken
//     };
//   } catch (error) {
//     return {
//       ...tokenObject,
//       error: 'RefreshAccessTokenError'
//     };
//   }
// }

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        const { username, password } = credentials as any;

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: username,
            password: password
          })
        });

        const user = await res.json();
        // const result: Auth = await res.json()
        // console.log('nextauth', { user });

        if (user.token) {
          return user;
        }

        return null;

        // if (res.ok && user) {
        //   return {
        //     accessToken: user.token
        //   } as any;
        // } else return null;
      }
    })
  ],
  callbacks: {
    /* JWT Callback */
    /* 웹 토큰이 실행 혹은 업데이트될때마다 콜백이 실행 */
    /* 반환된 값은 암호화되어 쿠키에 저장됨 */
    async jwt({ token, account, user }) {
      //초기 로그인시 User 정보를 가공해 반환
      if (account && user) {
        // console.log("account", account)
        // console.log("user", user)
        return {
          accessToken: account.access_token,
          accessTokenExpires: account.expires_at,
          refreshToken: account.refresh_token,
          user,
        }
      }

      // console.log("token",token)
      // const nowTime = Math.round(Date.now() / 1000)
      // const shouldRefreshTime =
      //   (token.accessTokenExpires as number) - 10 * 60 - nowTime
      // // 토큰이 만료되지 않았을때는 원래사용하던 토큰을 반환
      // if (shouldRefreshTime > 0) {
      // return token
      // }
      console.log("get token", token.user.token)
      return refreshAccessToken(token)
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.user = token.user as User
      session.accessToken = token.user.token
      session.accessTokenExpires = token.accessTokenExpires
      session.error = token.error
      console.log("get session", token.user.token)
      return session
    },
  },
  pages: {
    signIn: '/auth/login'
  }
};

// AccessToken이 만료되면 refreshToken을 사용해서 다시 받아오는 함수
async function refreshAccessToken(token: any) {
  // console.log("refreshAccessToken ttt");
  try {
    const headers = {
      Authorization: `Bearer ${token.user.token}`
    }

    const res = await axios.put(`${baseURL}/auth/refresh`, null, {
      headers
    })
    // console.log(res.data);

    const refreshedTokens = await res.data

    if (res.status !== 200) {
      throw refreshedTokens
    }
    token.user.token = refreshedTokens.token;

    return {
      ...token,
      accessToken: refreshedTokens.token,
      accessTokenExpires: Math.round(Date.now() / 1000) + refreshedTokens.expires_in,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    }

  } catch (err) {
    return {
      ...token,
      error: err,
    }
  }
}

export default NextAuth(authOptions);
