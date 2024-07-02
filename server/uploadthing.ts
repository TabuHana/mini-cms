'use server';

import { UTApi } from 'uploadthing/server';

const utapi = new UTApi();

export const removeFile = async (fileId: string) => {
  const key = fileId.split('/').pop();

  if (!key) {
    return { error: 'INVALID KEY' };
  }

  await utapi.deleteFiles(key);
};
