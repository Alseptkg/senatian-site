import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://senatian.ru/',
      lastModified: '2026-04-25',
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
