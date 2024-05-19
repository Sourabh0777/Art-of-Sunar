import { Category } from '@prisma/client'

export const INFINITE_SCROLL_LIMIT = 8

export const ORDER_INFINITE_SCROLL_LIMIT = 3

export const categories: Category[] = [
  {
    name: 'Gold jewellery',
    slug: 'gold',
  },
  {
    name: 'Silver jewellery',
    slug: 'silver',
  },
  {
    name: 'Artificial jewellery',
    slug: 'artificial',
  },
  {
    name: 'Accessories',
    slug: 'accessories',
  },
]
