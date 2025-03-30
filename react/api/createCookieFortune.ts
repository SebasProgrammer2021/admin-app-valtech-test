import axios from 'axios'

const API_URL = process.env.API_URL ?? '/api/dataentities'
const { VTEX_API_KEY } = process.env
const { VTEX_API_TOKEN } = process.env

export const createCookieFortune = async (cookieFortune: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/CF/documents`,
      {
        CookieFortune: cookieFortune,
      },
      {
        headers: {
          'X-VTEX-API-AppKey': VTEX_API_KEY,
          'X-VTEX-API-AppToken': VTEX_API_TOKEN,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.data || response.data.length === 0) {
      throw new Error('Error al crear la galleta de la fortuna')
    }

    return response
  } catch (error) {
    throw error
  }
}
