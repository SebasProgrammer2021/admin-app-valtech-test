import React, { useEffect, useState } from 'react'

import { getRandomFortune, ICookieFortuneResponse } from '../cookieFortune'
import styles from './CookieFortuneContent.styles.css'

const CookieFortuneContent = () => {
  const [fortunes, setFortunes] = useState<ICookieFortuneResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFortunes = async () => {
      try {
        const response = await getRandomFortune()

        // console.log('Respuesta de getRandomFortune:', response);
        setFortunes(response)
      } catch (err) {
        setError('Error al obtener las frases de la fortuna')
      }
    }

    fetchFortunes()
  }, [])
  // console.log(fortunes);

  if (error) return <p>Error: {error}</p>

  return (
    <div className={styles.CookieFortuneContent__mainContainer}>
      <h2>Frases de la Galleta de la Fortuna</h2>
      {fortunes ? (
        <table>
          <thead>
            <tr>
              <th>Frase</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(fortunes) &&
              fortunes.map(
                (fortune: { CookieFortune: string }, index: number) => (
                  <tr key={index}>
                    <td>{fortune.CookieFortune}</td>
                  </tr>
                )
              )}
          </tbody>
        </table>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  )
}

export default CookieFortuneContent
