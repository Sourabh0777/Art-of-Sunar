import { Category } from '@prisma/client'

export const INFINITE_SCROLL_LIMIT = 8

export const ORDER_INFINITE_SCROLL_LIMIT = 3

export const categories: Category[] = [
  {
    name: 'Gold jewellery',
    slug: 'gold',
    description: null
  },
  {
    name: 'Silver jewellery',
    slug: 'silver',
    description: null
  },
  {
    name: 'Artificial jewellery',
    slug: 'artificial',
    description: null
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    description: null
  },
]
