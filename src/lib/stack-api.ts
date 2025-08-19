// Get the Stack Auth access token for API requests
export const getStackAuthToken = async () => {
  try {
    // This will be called from React components that have access to Stack Auth context
    // We'll need to pass the user object from the component
    return null; // Placeholder - will be updated in components
  } catch (error) {
    console.error('Failed to get Stack Auth token:', error);
    return null;
  }
};

// Make authenticated API requests
export const makeAuthenticatedRequest = async (
  url: string, 
  options: RequestInit = {},
  accessToken?: string
) => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return fetch(url, {
    ...options,
    headers,
  });
};

// Convenience methods for common requests
export const apiRequest = {
  get: (url: string, accessToken?: string) => 
    makeAuthenticatedRequest(url, { method: 'GET' }, accessToken),
  
  post: (url: string, data: any, accessToken?: string) => 
    makeAuthenticatedRequest(url, {
      method: 'POST',
      body: JSON.stringify(data),
    }, accessToken),
  
  put: (url: string, data: any, accessToken?: string) => 
    makeAuthenticatedRequest(url, {
      method: 'PUT',
      body: JSON.stringify(data),
    }, accessToken),
  
  delete: (url: string, accessToken?: string) => 
    makeAuthenticatedRequest(url, { method: 'DELETE' }, accessToken),
};
