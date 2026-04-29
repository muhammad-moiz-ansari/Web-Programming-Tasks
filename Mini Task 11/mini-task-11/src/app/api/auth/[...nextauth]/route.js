// app/api/auth/[...nextauth]/route.js
// Handles ALL auth routes:

import { handlers } from "@/lib/auth"

export const { GET, POST } = handlers