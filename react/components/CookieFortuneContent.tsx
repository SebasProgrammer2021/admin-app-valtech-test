import React, { useEffect, useState } from 'react'

import {
  getAllCookiesFortune,
  ICookieFortuneResponse,
} from '../api/getAllCookiesFortune'
import styles from './CookieFortuneContent.styles.css'
import { createCookieFortune } from '../api/createCookieFortune'

const CookieFortuneContent = () => {
  const [fortunes, setFortunes] = useState<ICookieFortuneResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [cookieFortune, setCookieFortune] = useState('')
  const [message, setMessage] = useState<string | null>(null)

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

  const handleCreatePhrase = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // console.log("click handle");
    try {
      await createCookieFortune(cookieFortune)
      setMessage('Galleta de la fortuna creada exitosamente')
      setCookieFortune('')
    } catch (err) {
      setMessage('Error al crear la galleta de la fortuna')
    }
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
            onChange={(e) => setCookieFortune(e.target.value)}
            placeholder="frase de la galleta"
            required
          />
          <button>Añadir registro</button>
          {true && <p>{message}</p>}
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
