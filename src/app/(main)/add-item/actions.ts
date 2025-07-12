'use server';

import { z } from 'zod';
import { autoTagItem, AutoTagItemInput, AutoTagItemOutput } from '@/ai/flows/auto-tag-item';

const ActionInputSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.string(),
});

type ActionResponse = {
  success: boolean;
  data?: AutoTagItemOutput;
  error?: string;
};

export async function suggestTagsAction(input: AutoTagItemInput): Promise<ActionResponse> {
  const parsedInput = ActionInputSchema.safeParse(input);
  if (!parsedInput.success) {
    return { success: false, error: 'Invalid input.' };
  }

  try {
    const result = await autoTagItem(parsedInput.data);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error in suggestTagsAction:', error);
    return { success: false, error: 'Failed to suggest tags due to a server error.' };
  }
}
