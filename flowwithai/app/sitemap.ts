import type { MetadataRoute } from 'next';
import toolsData from '../data/tools.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.APP_URL || 'https://flowwithai.com';
  
  const toolUrls = toolsData.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date(tool.dateAdded),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const categoryUrls = [
    'Writing', 'Image-Generation', 'Video', 'Audio', 'Code', 'Marketing', 'Productivity', 'Design', 'Research'
  ].map((cat) => ({
    url: `${baseUrl}/category/${cat.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/submit`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...categoryUrls,
    ...toolUrls,
  ];
}
