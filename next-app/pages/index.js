import { useState } from 'react'

const products = [
  'Manzanas',
  'Bananas',
  'Zanahorias',
  'Leche',
  'Pan integral'
]

export default function Home() {
  const [preferences, setPreferences] = useState('')
  const [recommendation, setRecommendation] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('http://localhost:3001/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ preferences, products })
    })
    const data = await res.json()
    setRecommendation(data.recommendation)
  }

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Lista de productos</h1>
      <ul className="list-disc list-inside">
        {products.map(p => (<li key={p}>{p}</li>))}
      </ul>
      <form onSubmit={handleSubmit} className="space-y-2">
        <textarea
          className="border p-2 w-full"
          placeholder="Ingresa tus preferencias"
          value={preferences}
          onChange={e => setPreferences(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2" type="submit">Recomendar</button>
      </form>
      {recommendation && (
        <p className="mt-4">Recomendación: {recommendation}</p>
      )}
    </div>
  )
}
