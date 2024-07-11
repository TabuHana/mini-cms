/**
 * These are the functions that are used to authenticate users.
 * They can be used in server components or ser api routes (anything server-side).
 */

import { auth } from '@/auth'

export const currentUser = async () => {
  const session = await auth()

  return session?.user
}