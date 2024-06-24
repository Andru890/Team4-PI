import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { addReservation } from '@/services/reservationAPI'

describe('Reservation API', () => {
  const API_URL = import.meta.env.VITE_API_URL
  const mock = new MockAdapter(axios)

  test('addReservation', async () => {
    const productId = 1
    const userId = 2
    const reservation = {
      dateIn: '2024-10-06',
      dateOut: '2024-10-30',
    }

    // Configurar el mock para la solicitud POST
    mock
      .onPost(`${API_URL}/reservation/product/${productId}/user/${userId}`)
      .reply(200, {
        success: true,
        data: reservation,
      })

    const data = await addReservation(productId, userId, reservation)

    // Verificar que los datos de la respuesta son correctos
    expect(data).toEqual({
      success: true,
      data: reservation,
    })
  })
})
