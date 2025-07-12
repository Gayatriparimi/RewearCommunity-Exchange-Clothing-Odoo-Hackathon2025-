'use server';

/**
 * @fileOverview A flow to automatically suggest relevant tags for a clothing item.
 *
 * - autoTagItem - A function that suggests tags for a clothing item.
 * - AutoTagItemInput - The input type for the autoTagItem function.
 * - AutoTagItemOutput - The return type for the autoTagItem function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutoTagItemInputSchema = z.object({
  title: z.string().describe('The title of the clothing item.'),
  description: z.string().describe('The description of the clothing item.'),
  category: z.string().describe('The category of the clothing item.'),
});
export type AutoTagItemInput = z.infer<typeof AutoTagItemInputSchema>;

const AutoTagItemOutputSchema = z.object({
  tags: z.array(z.string()).describe('An array of suggested tags for the clothing item.'),
});
export type AutoTagItemOutput = z.infer<typeof AutoTagItemOutputSchema>;

export async function autoTagItem(input: AutoTagItemInput): Promise<AutoTagItemOutput> {
  return autoTagItemFlow(input);
}

const prompt = ai.definePrompt({
  name: 'autoTagItemPrompt',
  input: {schema: AutoTagItemInputSchema},
  output: {schema: AutoTagItemOutputSchema},
  prompt: `You are a helpful assistant that suggests tags for clothing items based on their title, description, and category.

Given the following information about a clothing item, suggest 5 relevant tags that would help users find this item when swapping clothes:

Title: {{{title}}}
Description: {{{description}}}
Category: {{{category}}}

Return the tags as a JSON array of strings.
`,
});

const autoTagItemFlow = ai.defineFlow(
  {
    name: 'autoTagItemFlow',
    inputSchema: AutoTagItemInputSchema,
    outputSchema: AutoTagItemOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
