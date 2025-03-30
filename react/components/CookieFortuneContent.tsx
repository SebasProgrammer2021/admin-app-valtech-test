import React, { useEffect, useState } from 'react'

import {
  getAllCookiesFortune,
  ICookieFortuneResponse,
} from '../api/getAllCookiesFortune'
import styles from './CookieFortuneContent.styles.css'

const CookieFortuneContent = () => {
  const [fortunes, setFortunes] = useState<ICookieFortuneResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFortunes = async () => {
      try {
        const response = await getAllCookiesFortune()

        // console.log('Respuesta de getRandomFortune:', response);
        setFortunes(response)
      } catch (err) {
        setError('Error al obtener las frases de la fortuna')
      }
    }

    fetchFortunes()
  }, [])
  // console.log(fortunes);

  const handleCreatePhrase = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // console.log("click handle");
  }

  if (error) return <p>Error: {error}</p>

  return (
    <div className={styles.CookieFortuneContent__mainContainer}>
      <h2>Frases de la Galleta de la Fortuna</h2>
      <div className={styles.formContainer}>
        <form onSubmit={handleCreatePhrase}>
          <input
            type="text"
            name="addPhrase"
            placeholder="frase de la galleta"
          />
          <button>Añadir registro</button>
        </form>
      </div>
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
