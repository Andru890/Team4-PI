import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'

import { getProduct } from '@/services/productsAPI'

describe('Product API', () => {
  test('getProduct', async () => {
    const data = await getProduct()
    expect(data)
  })
})
