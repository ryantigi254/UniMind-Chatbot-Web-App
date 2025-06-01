import { Message } from '../types';

const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL || 'http://localhost:8000';

export interface ChatResource {
  id: string;
  title: string;
  level: 'critical' | 'high' | 'medium' | 'low' | 'easy';
  category?: string;
  content: string;
  url?: string;
  snippet?: string;
  contacts?: string[];
}

export const fetchChatResources = async (sessionId: string): Promise<ChatResource[]> => {
  try {
    if (!sessionId) {
      console.warn('No session ID provided for resources');
      return [];
    }

    const response = await fetch(`${CHAT_API_URL}/get_resources/${sessionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Sort resources by level priority (high/critical first)
    const levelOrder = { 
      critical: 0, 
      high: 1, 
      medium: 2, 
      low: 3, 
      easy: 4 
    };
    
    const resources = (data.resources || []).map((resource: any, index: number) => {
      // Extract first URL from contacts if available
      const url = resource.contact?.find((contact: string) => 
        contact.startsWith('http://') || contact.startsWith('https://')
      );

      // Create a meaningful title from the description
      const title = resource.desc.split(' - ')[0] || `Resource ${index + 1}`;
      
      return {
        id: `resource-${index}-${Date.now()}`,
        title: title,
        level: resource.level || 'medium',
        category: extractCategory(resource.desc),
        content: resource.desc,
        url: url,
        snippet: resource.desc.split(' - ')[1] || resource.desc,
        contacts: resource.contact || []
      };
    });

    return resources.sort((a: ChatResource, b: ChatResource) => {
      return (levelOrder[a.level] || 5) - (levelOrder[b.level] || 5);
    });
    
  } catch (error) {
    console.error('Failed to fetch chat resources:', error);
    return [];
  }
};

// Helper function to extract category from description
function extractCategory(description: string): string {
  if (description.toLowerCase().includes('crisis') || description.toLowerCase().includes('abuse')) {
    return 'Crisis Support';
  }
  if (description.toLowerCase().includes('wellbeing') || description.toLowerCase().includes('emotional')) {
    return 'Mental Health & Wellbeing';
  }
  if (description.toLowerCase().includes('academic') || description.toLowerCase().includes('study')) {
    return 'Academic Support';
  }
  if (description.toLowerCase().includes('international')) {
    return 'International Student Support';
  }
  if (description.toLowerCase().includes('student union') || description.toLowerCase().includes('social')) {
    return 'Social & Community';
  }
  return 'General Support';
}

// Alternative function for when you have a session ID
export const fetchResourcesBySessionId = async (sessionId: string): Promise<ChatResource[]> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_CHAT_API_URL}/resources/${sessionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.resources || [];
    
  } catch (error) {
    console.error('Failed to fetch resources by session ID:', error);
    return [];
  }
}; 