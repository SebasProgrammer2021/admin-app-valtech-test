import axios from 'axios'

export interface ICookieFortuneResponse {
  CookieFortune: string
}

const { VTEX_API_KEY } = process.env
const { VTEX_API_TOKEN } = process.env
const API_URL = process.env.API_URL ?? '/api/dataentities'

// Función para obtener una frase aleatoria de la galleta de la fortuna
export const getAllCookiesFortune = async (): Promise<ICookieFortuneResponse> => {
  try {
    // Utilizamos axios para hacer la petición a Master Data
    // Acrónimo 'CF' para Cookie Fortune
    const response = await axios.get(`${API_URL}/CF/search`, {
      params: {
        _fields: 'CookieFortune',
      },
      headers: {
        'X-VTEX-API-AppKey': VTEX_API_KEY,
        'X-VTEX-API-AppToken': VTEX_API_TOKEN,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })

    // Si no hay datos, retornamos un error
    if (!response.data || response.data.length === 0) {
      throw new Error('No se encontraron frases de la fortuna')
    }

    // Seleccionamos una frase aleatoria de la respuesta
    // const allFortunes = response.data
    // const randomIndex = Math.floor(Math.random() * allFortunes.length)

    // Devolvemos la frase aleatoria seleccionada
    // return allFortunes[randomIndex]
    return response.data
  } catch (error) {
    console.error('Error al obtener la frase de la fortuna:', error)
    throw error
  }
}
