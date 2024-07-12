import { eq } from 'drizzle-orm';

import db from '@/server/db';
import { users } from '@/server/db/schema';

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
  } catch {
    return null;
  }
};
