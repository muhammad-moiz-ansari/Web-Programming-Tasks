// src/lib/auth.config.js

export const authConfig = {
	callbacks: {
		// jwt callback runs when token is created or updated
		// `user` is only available on first sign in, so we copy to token
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id
				token.role = user.role
			}
			return token
		},

		// Session callback runs every time session is accessed
		// Token is already set above, we copy it to session to send to client side
		async session({ session, token }) {
			if (token) {
				session.user.id = token.id
				session.user.role = token.role
			}
			return session
		},
	},
	pages: {
		signIn: "/login",   // Redirect here for login
		error: "/login",    // Redirect here for auth errors
	},
  providers: [],
}