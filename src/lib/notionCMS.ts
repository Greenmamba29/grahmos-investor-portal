/**
 * Notion CMS Integration
 * 
 * This module provides utilities for fetching content from Notion databases
 * to power the investor portal with dynamic content management.
 */

import { Client } from '@notionhq/client';

const notion = new Client({
  auth: import.meta.env.VITE_NOTION_API_KEY,
});

// TypeScript interfaces for content types
export interface InvestorDocument {
  id: string;
  title: string;
  category: 'Financial' | 'Legal' | 'Product' | 'Market' | 'Other';
  fileUrl: string;
  description: string;
  uploadDate: string;
  accessLevel: 'Investor' | 'Admin' | 'All';
  status: 'Active' | 'Archived' | 'Draft';
  tags: string[];
  fileSize?: string;
  fileType?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'Product Update' | 'Financial' | 'Press Release' | 'Milestone';
  publishedDate: string;
  priority: 'High' | 'Normal' | 'Low';
  targetAudience: string[];
  thumbnailUrl?: string;
  status: 'Published' | 'Draft' | 'Scheduled';
}

export interface Metric {
  id: string;
  name: string;
  currentValue: number;
  previousValue: number;
  unit: string;
  category: 'Financial' | 'Users' | 'Product' | 'Market';
  lastUpdated: string;
  trend: 'Up' | 'Down' | 'Stable';
  isPublic: boolean;
}

/**
 * Fetch investor documents from Notion database
 * @param userRole - User's role to filter by access level
 * @returns Array of investor documents
 */
export async function fetchInvestorDocuments(
  userRole: string = 'investor'
): Promise<InvestorDocument[]> {
  try {
    const databaseId = import.meta.env.VITE_INVESTOR_DOCS_DATABASE_ID;
    
    if (!databaseId) {
      console.warn('VITE_INVESTOR_DOCS_DATABASE_ID not configured');
      return [];
    }

    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: 'Status',
            select: {
              equals: 'Active',
            },
          },
          {
            or: [
              {
                property: 'Access Level',
                select: {
                  equals: 'All',
                },
              },
              {
                property: 'Access Level',
                select: {
                  equals: userRole === 'admin' ? 'Admin' : 'Investor',
                },
              },
            ],
          },
        ],
      },
      sorts: [
        {
          property: 'Upload Date',
          direction: 'descending',
        },
      ],
    });

    return response.results.map((page: any) => {
      const properties = page.properties;
      
      return {
        id: page.id,
        title: properties['Document Title']?.title?.[0]?.text?.content || 'Untitled',
        category: properties['Category']?.select?.name || 'Other',
        fileUrl: properties['File URL']?.url || '',
        description: properties['Description']?.rich_text?.[0]?.text?.content || '',
        uploadDate: properties['Upload Date']?.date?.start || new Date().toISOString(),
        accessLevel: properties['Access Level']?.select?.name || 'Investor',
        status: properties['Status']?.select?.name || 'Active',
        tags: properties['Tags']?.multi_select?.map((tag: any) => tag.name) || [],
        fileSize: properties['File Size']?.rich_text?.[0]?.text?.content || '',
        fileType: properties['File Type']?.select?.name || 'PDF',
      };
    });
  } catch (error) {
    console.error('Error fetching investor documents:', error);
    return [];
  }
}

/**
 * Fetch company announcements from Notion database
 * @param limit - Maximum number of announcements to fetch
 * @returns Array of announcements
 */
export async function fetchAnnouncements(limit: number = 10): Promise<Announcement[]> {
  try {
    const databaseId = import.meta.env.VITE_ANNOUNCEMENTS_DATABASE_ID;
    
    if (!databaseId) {
      console.warn('VITE_ANNOUNCEMENTS_DATABASE_ID not configured');
      return [];
    }

    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'Status',
        select: {
          equals: 'Published',
        },
      },
      sorts: [
        {
          property: 'Published Date',
          direction: 'descending',
        },
      ],
      page_size: limit,
    });

    return response.results.map((page: any) => {
      const properties = page.properties;
      
      return {
        id: page.id,
        title: properties['Title']?.title?.[0]?.text?.content || 'Untitled',
        content: properties['Content']?.rich_text?.[0]?.text?.content || '',
        type: properties['Type']?.select?.name || 'Product Update',
        publishedDate: properties['Published Date']?.date?.start || new Date().toISOString(),
        priority: properties['Priority']?.select?.name || 'Normal',
        targetAudience: properties['Target Audience']?.multi_select?.map((t: any) => t.name) || ['All'],
        thumbnailUrl: properties['Thumbnail URL']?.url || undefined,
        status: properties['Status']?.select?.name || 'Published',
      };
    });
  } catch (error) {
    console.error('Error fetching announcements:', error);
    return [];
  }
}

/**
 * Fetch metrics dashboard data from Notion database
 * @param isPublic - Filter by public/private metrics
 * @returns Array of metrics
 */
export async function fetchMetrics(isPublic: boolean = false): Promise<Metric[]> {
  try {
    const databaseId = import.meta.env.VITE_METRICS_DATABASE_ID;
    
    if (!databaseId) {
      console.warn('VITE_METRICS_DATABASE_ID not configured');
      return [];
    }

    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'Is Public',
        checkbox: {
          equals: isPublic,
        },
      },
      sorts: [
        {
          property: 'Category',
          direction: 'ascending',
        },
      ],
    });

    return response.results.map((page: any) => {
      const properties = page.properties;
      
      return {
        id: page.id,
        name: properties['Metric Name']?.title?.[0]?.text?.content || 'Untitled',
        currentValue: properties['Current Value']?.number || 0,
        previousValue: properties['Previous Value']?.number || 0,
        unit: properties['Unit']?.select?.name || '',
        category: properties['Category']?.select?.name || 'Product',
        lastUpdated: properties['Last Updated']?.date?.start || new Date().toISOString(),
        trend: properties['Trend']?.select?.name || 'Stable',
        isPublic: properties['Is Public']?.checkbox || false,
      };
    });
  } catch (error) {
    console.error('Error fetching metrics:', error);
    return [];
  }
}

/**
 * Get file extension from URL
 */
function getFileExtension(url: string): string {
  const match = url.match(/\.([a-zA-Z0-9]+)(\?|$)/);
  return match ? match[1].toUpperCase() : 'FILE';
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

/**
 * Calculate percentage change between two values
 */
export function calculateChange(current: number, previous: number): string {
  if (previous === 0) return '+100%';
  const change = ((current - previous) / previous) * 100;
  const sign = change >= 0 ? '+' : '';
  return `${sign}${change.toFixed(1)}%`;
}
