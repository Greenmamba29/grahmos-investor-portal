import { Client } from '@notionhq/client';

// Initialize Notion client for server-side use
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const DATABASE_ID = process.env.NOTION_DATABASE_ID || '';

export interface NotionUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  role?: string;
  userType?: string;
  createdAt?: string;
}

/**
 * Query user by email from Notion database
 */
export async function getUserByEmail(email: string): Promise<NotionUser | null> {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        property: 'Email',
        email: {
          equals: email,
        },
      },
    });

    if (response.results.length === 0) {
      return null;
    }

    const page = response.results[0];
    if (!('properties' in page)) return null;

    return extractUserFromPage(page);
  } catch (error) {
    console.error('Error querying Notion database:', error);
    throw error;
  }
}

/**
 * Create a new user in Notion database
 */
export async function createUser(userData: {
  email: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  userType?: string;
  role?: string;
}): Promise<NotionUser> {
  try {
    const response = await notion.pages.create({
      parent: { database_id: DATABASE_ID },
      properties: {
        Email: {
          email: userData.email,
        },
        'First Name': {
          rich_text: [
            {
              text: {
                content: userData.firstName || '',
              },
            },
          ],
        },
        'Last Name': {
          rich_text: [
            {
              text: {
                content: userData.lastName || '',
              },
            },
          ],
        },
        Password: {
          rich_text: [
            {
              text: {
                content: userData.password || '',
              },
            },
          ],
        },
        Role: {
          select: {
            name: userData.role || 'pending',
          },
        },
        'User Type': {
          select: {
            name: userData.userType || 'user',
          },
        },
        'Created At': {
          date: {
            start: new Date().toISOString(),
          },
        },
      },
    });

    if (!('properties' in response)) {
      throw new Error('Invalid response from Notion');
    }

    return extractUserFromPage(response);
  } catch (error) {
    console.error('Error creating user in Notion:', error);
    throw error;
  }
}

/**
 * Extract user data from Notion page
 */
function extractUserFromPage(page: any): NotionUser {
  const props = page.properties;

  return {
    id: page.id,
    email: props.Email?.email || '',
    firstName: props['First Name']?.rich_text?.[0]?.text?.content || '',
    lastName: props['Last Name']?.rich_text?.[0]?.text?.content || '',
    password: props.Password?.rich_text?.[0]?.text?.content || '',
    role: props.Role?.select?.name || 'pending',
    userType: props['User Type']?.select?.name || 'user',
    createdAt: props['Created At']?.date?.start || '',
  };
}

/**
 * Helper function for JSON responses
 */
export function json(statusCode: number, data: any) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
    },
    body: JSON.stringify(data),
  };
}

export const notionOperations = {
  getUserByEmail,
  createUser,
};
