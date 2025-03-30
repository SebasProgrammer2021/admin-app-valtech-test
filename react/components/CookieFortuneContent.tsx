import React, { useEffect, useState } from 'react'

import { getRandomFortune, ICookieFortuneResponse } from '../cookieFortune'

const CookieFortuneContent = () => {
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFortune = async () => {
      try {
        const response: ICookieFortuneResponse = await getRandomFortune()
      } catch (err) {
        setError('Error al obtener la frase de la fortuna')
      }
    }

    fetchFortune()
  }, [])

  if (error) return <p>Error: {error}</p>

  return <div>CookieFortuneContent</div>
}

export default CookieFortuneContent
