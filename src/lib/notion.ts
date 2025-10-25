import { Client } from '@notionhq/client';

// Initialize Notion client
const notion = new Client({
  auth: import.meta.env.VITE_NOTION_API_KEY,
});

const DATABASE_ID = import.meta.env.VITE_NOTION_DATABASE_ID;

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
 * Update user in Notion database
 */
export async function updateUser(
  pageId: string,
  updates: Partial<NotionUser>
): Promise<NotionUser> {
  try {
    const properties: any = {};

    if (updates.firstName !== undefined) {
      properties['First Name'] = {
        rich_text: [{ text: { content: updates.firstName } }],
      };
    }

    if (updates.lastName !== undefined) {
      properties['Last Name'] = {
        rich_text: [{ text: { content: updates.lastName } }],
      };
    }

    if (updates.role !== undefined) {
      properties.Role = {
        select: { name: updates.role },
      };
    }

    if (updates.userType !== undefined) {
      properties['User Type'] = {
        select: { name: updates.userType },
      };
    }

    const response = await notion.pages.update({
      page_id: pageId,
      properties,
    });

    if (!('properties' in response)) {
      throw new Error('Invalid response from Notion');
    }

    return extractUserFromPage(response);
  } catch (error) {
    console.error('Error updating user in Notion:', error);
    throw error;
  }
}

/**
 * Add user to newsletter/waitlist
 */
export async function addToNewsletter(data: {
  email: string;
  firstName?: string;
  lastName?: string;
  signupSource?: string;
}): Promise<any> {
  try {
    // Check if user already exists
    const existingUser = await getUserByEmail(data.email);
    if (existingUser) {
      return existingUser;
    }

    // Create new entry
    return await createUser({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      userType: 'waitlist',
      role: 'pending',
    });
  } catch (error) {
    console.error('Error adding to newsletter:', error);
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

export const notionOperations = {
  getUserByEmail,
  createUser,
  updateUser,
  addToNewsletter,
};
