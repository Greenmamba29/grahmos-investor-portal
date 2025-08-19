import type { Handler } from '@netlify/functions';
import { json } from './_db';

// This endpoint is no longer used since Stack Auth handles user login
// It's kept for compatibility but returns a deprecation notice
export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return json(200, {});
  }

  return json(410, { 
    error: 'This endpoint is deprecated', 
    message: 'User login is now handled by Stack Auth. Please use the Stack Auth login flow.' 
  });
};
