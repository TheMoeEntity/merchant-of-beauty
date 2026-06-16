import { pgTable, pgEnum, varchar, text, integer, real, timestamp } from 'drizzle-orm/pg-core'

// ----------------------------------------------------------------
// Enums
// ----------------------------------------------------------------

export const roleEnum = pgEnum('role', ['owner', 'staff'])

export const orderStatusEnum = pgEnum('order_status', [
    'pending',
    'confirmed',
    'processing',
    'shipped',
    'delivered',
    'cancelled',
])

// ----------------------------------------------------------------
// Users — staff and owner accounts (not customers)
// ----------------------------------------------------------------

export const users = pgTable('users', {
    id: varchar('id', { length: 30 }).primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    password: text('password').notNull(),
    role: roleEnum('role').notNull().default('staff'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
})

// ----------------------------------------------------------------
// Orders — placed by customers (no auth required on storefront)
// ----------------------------------------------------------------

export const orders = pgTable('orders', {
    id: varchar('id', { length: 20 }).primaryKey(),
    customerName: varchar('customer_name', { length: 100 }).notNull(),
    customerEmail: varchar('customer_email', { length: 255 }).notNull(),
    customerPhone: varchar('customer_phone', { length: 20 }),
    customerAddress: text('customer_address'),
    status: orderStatusEnum('status').notNull().default('pending'),
    totalAmount: real('total_amount').notNull(),
    notes: text('notes'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// ----------------------------------------------------------------
// Order Items — snapshot of product at time of order
// Why snapshot? If the owner renames a product in Sanity later,
// old orders still show the correct product name/price
// ----------------------------------------------------------------

export const orderItems = pgTable('order_items', {
    id: varchar('id', { length: 30 }).primaryKey(),
    orderId: varchar('order_id', { length: 20 }).notNull().references(() => orders.id),
    productId: varchar('product_id', { length: 100 }).notNull(),
    productTitle: varchar('product_title', { length: 255 }).notNull(),
    productImage: text('product_image'),
    quantity: integer('quantity').notNull(),
    unitPrice: real('unit_price').notNull(),
})

// ----------------------------------------------------------------
// Invoices
// ----------------------------------------------------------------

export const invoices = pgTable('invoices', {
    id: varchar('id', { length: 30 }).primaryKey(),
    orderId: varchar('order_id', { length: 20 }).notNull().references(() => orders.id),
    issuedAt: timestamp('issued_at').defaultNow().notNull(),
    pdfUrl: text('pdf_url'),
    notes: text('notes'),
})

import { relations } from 'drizzle-orm'

export const ordersRelations = relations(orders, ({ many }) => ({
    items: many(orderItems),
}))

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
    order: one(orders, {
        fields: [orderItems.orderId],
        references: [orders.id],
    }),
}))

export const invoicesRelations = relations(invoices, ({ one }) => ({
    order: one(orders, {
        fields: [invoices.orderId],
        references: [orders.id],
    }),
}))