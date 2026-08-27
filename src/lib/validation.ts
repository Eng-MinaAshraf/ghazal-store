import { z } from 'zod';

// This is the project's standard validation utility pattern.
export const validateSchema = <T>(schema: z.Schema<T>, data: unknown) => {
  try {
    return { success: true, data: schema.parse(data) };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors: Record<string, string> = {};
      error.errors.forEach((err) => {
        if (err.path.length > 0) {
          formattedErrors[err.path[0].toString()] = err.message;
        }
      });
      return { success: false, errors: formattedErrors };
    }
    return { success: false, errors: { form: 'An unexpected error occurred' } };
  }
};
