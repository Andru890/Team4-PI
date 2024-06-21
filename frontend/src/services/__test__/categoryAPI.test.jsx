import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'

import { getCategory } from '@/services/categoryAPI'

describe('Category API', () => {
  test('getCategory', async () => {
    const data = await getCategory()
    expect(data)
  })
})
