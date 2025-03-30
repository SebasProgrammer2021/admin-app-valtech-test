import React, { useEffect, useState } from 'react'

import {
  getAllCookiesFortune,
  ICookieFortuneResponse,
} from '../api/getAllCookiesFortune'
import styles from './CookieFortuneContent.styles.css'
import { createCookieFortune } from '../api/createCookieFortune'
import { deleteCookieFortune } from '../api/deleteCookieFortune'

const CookieFortuneContent = () => {
  const [fortunes, setFortunes] = useState<ICookieFortuneResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [cookieFortune, setCookieFortune] = useState('')
  const [message, setMessage] = useState<string | null>(null)

  const updateTable = async () => {
    try {
      const response = await getAllCookiesFortune()

      setFortunes(response)
    } catch (err) {
      setError('Error al obtener las frases de la fortuna')
    }
  }

  useEffect(() => {
    updateTable()
  }, [])

  const handleCreatePhrase = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await createCookieFortune(cookieFortune)
      setMessage('Galleta de la fortuna creada exitosamente')
      setCookieFortune('')
      updateTable()
    } catch (err) {
      setMessage('Error al crear la galleta de la fortuna')
    }
  }

  const handleDeletePhrase = async (cookieFortuneId: string) => {
    try {
      await deleteCookieFortune(cookieFortuneId)
      setMessage('Galleta de la fortuna eliminada exitosamente')
      updateTable()
    } catch (err) {
      setMessage('Error al eliminar la galleta de la fortuna')
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
        </form>
      </div>
      <div>{message && <p>{message}</p>}</div>
      {fortunes ? (
        <table>
          <thead>
            <tr>
              <th>Frase</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(fortunes) &&
              fortunes.map((fortune: ICookieFortuneResponse) => (
                <tr key={fortune.id}>
                  <td>{fortune.CookieFortune}</td>
                  <td>
                    <button onClick={() => handleDeletePhrase(fortune.id)}>
                      <img
                        width="30"
                        height="30"
                        src="https://img.icons8.com/ios-glyphs/30/delete.png"
                        alt="delete"
                      />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  )
}

export default CookieFortuneContent
