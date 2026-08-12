import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/business'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
    { path: '/', priority: 1, changeFrequency: 'monthly' },
    { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/galerie', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/tarifs', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/faq', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.7, changeFrequency: 'yearly' },
    { path: '/confidentialite', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/mentions-legales', priority: 0.3, changeFrequency: 'yearly' },
  ]

  return routes.map((r) => ({
    url: `${SITE_URL}${r.path === '/' ? '' : r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }))
}
