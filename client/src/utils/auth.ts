import NextAuth, { User } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import jwt from 'jsonwebtoken'
import { JWTDecodeParams } from 'next-auth/jwt'
import Utils from '.'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  jwt: {
    async encode({ secret, token }: any) {
      return jwt.sign(token, secret, { algorithm: 'HS256' })
    },
    async decode(params: JWTDecodeParams) {
      if (params.token && params.secret)
        return jwt.verify(params.token, params.secret as jwt.Secret, { algorithms: ['HS256'] })

      return params as any
    },
  },
  callbacks: {
    async jwt({ token, user, account }: any) {
      // Initial sign in
      if (account && user) {
        return {
          accessToken: account.accessToken,
          accessTokenExpires: Date.now() + account.expires_in * 1000,
          refreshToken: account.refresh_token,
          user,
        }
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token)
    },
    async session({ session, token }: any) {
      if (token) {
        session.user = token.user
        session.accessToken = token.accessToken
        session.error = token.error
        await Utils.call
          .get<{ admin: boolean; id: string }>('/users/' + session.user.email)
          .then(async (i) => {
            if (i?.success) {
              session.role = i?.data.admin
              session.user.id = i?.data.id
            } else {
              const emailDomain = token.user.email.split('@')[1]
              if (emailDomain !== 'executionlab.asia' && !session.role) {
                await Utils.call.post('/users/create', { ...token.user }).then()
              }
            }
          })
          .catch((error) => {
            console.error('Error fetching users:', error)
          })

        return session
      }
    },
  },
})

async function refreshAccessToken(token: any) {
  try {
    const url =
      'https://oauth2.googleapis.com/token?' +
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken,
      } as any)

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    })

    const refreshedTokens = await response.json()

    if (!response.ok) {
      throw refreshedTokens
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    }
  } catch (error) {
    console.log(error)

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}
