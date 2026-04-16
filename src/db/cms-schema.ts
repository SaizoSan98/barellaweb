import { pgTable, serial, text, timestamp, boolean, jsonb, integer, varchar } from 'drizzle-orm/pg-core';

// CMS oldalak - pl. Kezdőlap, Kapcsolat, stb.
export const cmsPages = pgTable('cms_pages', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 100 }).notNull().unique(), // pl: 'home', 'contact'
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  order: integer('order').default(0), // oldalak sorrendje
  published: boolean('published').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// CMS szekciók - pl. Hero, Services, FAQ
export const cmsSections = pgTable('cms_sections', {
  id: serial('id').primaryKey(),
  pageId: integer('page_id').references(() => cmsPages.id), // melyik oldalhoz tartozik
  slug: varchar('slug', { length: 100 }).notNull(), // pl: 'hero', 'services'
  title: varchar('title', { length: 255 }).notNull(),
  order: integer('order').default(0), // sorrend
  published: boolean('published').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// CMS tartalmak - szövegek, képek, linkek
export const cmsContents = pgTable('cms_contents', {
  id: serial('id').primaryKey(),
  sectionId: integer('section_id').references(() => cmsSections.id), // melyik szekcióhoz
  key: varchar('key', { length: 100 }).notNull(), // pl: 'hero_title', 'hero_subtitle'
  type: varchar('type', { length: 50 }).notNull(), // 'text', 'image', 'link', 'json'
  value: text('value'), // szöveg vagy URL
  jsonValue: jsonb('json_value'), // komplex adatok (pl. tömb, objektum)
  order: integer('order').default(0), // sorrend
  published: boolean('published').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// CMS képek - külön tárolás a képeknek
export const cmsImages = pgTable('cms_images', {
  id: serial('id').primaryKey(),
  contentId: integer('content_id').references(() => cmsContents.id), // melyik tartalomhoz
  url: varchar('url', { length: 1000 }).notNull(), // Vercel Blob URL
  alt: varchar('alt', { length: 255 }),
  width: integer('width'),
  height: integer('height'),
  order: integer('order').default(0),
  createdAt: timestamp('created_at').defaultNow(),
});

export type CmsPage = typeof cmsPages.$inferSelect;
export type CmsSection = typeof cmsSections.$inferSelect;
export type CmsContent = typeof cmsContents.$inferSelect;
export type CmsImage = typeof cmsImages.$inferSelect;

export type NewCmsPage = typeof cmsPages.$inferInsert;
export type NewCmsSection = typeof cmsSections.$inferInsert;
export type NewCmsContent = typeof cmsContents.$inferInsert;
export type NewCmsImage = typeof cmsImages.$inferInsert;
