import { pgTable, serial, varchar, text, timestamp, boolean, integer, json } from 'drizzle-orm/pg-core';

// Site-wide text settings (hero, contact, footer etc.)
// Final deployment trigger - Matahari13
export const siteSettings = pgTable('site_settings', {
  id: serial('id').primaryKey(),
  key: varchar('key', { length: 100 }).notNull().unique(),
  value: text('value'),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type SiteSetting = typeof siteSettings.$inferSelect;

// Services
export const services = pgTable('services', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  subtitle: varchar('subtitle', { length: 255 }),
  description: text('description'),
  fullDescription: text('full_description'),
  image: varchar('image', { length: 1000 }),
  details: json('details').$type<string[]>().default([]),
  gallery: json('gallery').$type<string[]>().default([]),
  colSpan: varchar('col_span', { length: 50 }).default('md:col-span-1'),
  order: integer('order').default(0),
  published: boolean('published').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type Service = typeof services.$inferSelect;
export type NewService = typeof services.$inferInsert;

// Process steps (Hogyan dolgozunk)
export const processSteps = pgTable('process_steps', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  order: integer('order').default(0),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type ProcessStep = typeof processSteps.$inferSelect;

// FAQ items
export const faqItems = pgTable('faq_items', {
  id: serial('id').primaryKey(),
  question: text('question').notNull(),
  answer: text('answer').notNull(),
  order: integer('order').default(0),
  published: boolean('published').default(true),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type FaqItem = typeof faqItems.$inferSelect;

// Admin users
export const adminUsers = pgTable('admin_users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type AdminUser = typeof adminUsers.$inferSelect;

export const blogPosts = pgTable('blog_posts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  subtitle: varchar('subtitle', { length: 500 }),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  content: text('content').notNull(),
  excerpt: text('excerpt'),
  imageUrl: varchar('image_url', { length: 1000 }),
  author: varchar('author', { length: 100 }).default('Matahari13'),
  published: boolean('published').default(false),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type NewBlogPost = typeof blogPosts.$inferInsert;

// Products (Termekeink)
export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  brand: varchar('brand', { length: 255 }).notNull(),
  type: varchar('type', { length: 255 }).notNull(),
  description: text('description'),
  features: json('features').$type<string[]>().default([]),
  images: json('images').$type<string[]>().default([]),
  price: integer('price').default(0),
  salePrice: integer('sale_price').default(0),
  sale: boolean('sale').default(false),
  priceIncludes: text('price_includes'),
  priceTitle: varchar('price_title', { length: 255 }),
  vatInfo: varchar('vat_info', { length: 255 }),
  availabilityInfo: varchar('availability_info', { length: 255 }),
  exclusiveLabel: varchar('exclusive_label', { length: 255 }),
  order: integer('order').default(0),
  published: boolean('published').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

// Legal pages (Adatvédelem, Süti, ÁSZF)
export const legalPages = pgTable('legal_pages', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content'),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type LegalPage = typeof legalPages.$inferSelect;
export type NewLegalPage = typeof legalPages.$inferInsert;
