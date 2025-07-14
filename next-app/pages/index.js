import { useState } from 'react'
import dynamic from 'next/dynamic'

const FaAppleAlt = dynamic(() => import('react-icons/fa').then(m => m.FaAppleAlt), { ssr: false })
const FaCarrot = dynamic(() => import('react-icons/fa').then(m => m.FaCarrot), { ssr: false })
const FaBreadSlice = dynamic(() => import('react-icons/fa').then(m => m.FaBreadSlice), { ssr: false })
const FaCow = dynamic(() => import('react-icons/fa6').then(m => m.FaCow), { ssr: false })

const products = [
  {
    name: 'Manzanas',
    category: 'Frutas',
    description: 'Rojas y deliciosas',
    varieties: ['Fuji', 'Granny Smith', 'Gala'],
    icon: FaAppleAlt
  },
  {
    name: 'Bananas',
    category: 'Frutas',
    description: 'Fuente de potasio',
    varieties: ['Cavendish', 'Manzano'],
    icon: FaAppleAlt
  },
  {
    name: 'Zanahorias',
    category: 'Verduras',
    description: 'Buenas para la vista',
    varieties: ['Nantesa', 'Danvers'],
    icon: FaCarrot
  },
  {
    name: 'Leche',
    category: 'Lácteos',
    description: 'Entera y descremada',
    varieties: ['Entera', 'Descremada'],
    icon: FaCow
  },
  {
    name: 'Pan integral',
    category: 'Panadería',
    description: 'Con fibra y sabor',
    varieties: ['Con semillas', 'Sin semillas'],
    icon: FaBreadSlice
  }
]

export default function Home() {
  const [preferences, setPreferences] = useState('')
  const [recommendation, setRecommendation] = useState('')
  const [loading, setLoading] = useState(false)
  const [highlighted, setHighlighted] = useState('')
const handleSubmit = async (e) => {
  e.preventDefault()
  setLoading(true)
  console.log('[UI] Enviando preferencias al backend:', preferences)
  try {
    const res = await fetch('http://localhost:3001/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ preferences, products: products.map(p => p.name) })
    })
    if (!res.ok) {
      const text = await res.text()
      console.error('[UI] Error del backend:', res.status, text)
      setRecommendation('')
      setHighlighted('')
    } else {
      const data = await res.json()
      console.log('[UI] Recomendación recibida:', data.recommendation)
      setRecommendation(data.recommendation)
      const match = products.find(p =>
        data.recommendation.toLowerCase().includes(p.name.toLowerCase())
      )
      setHighlighted(match ? match.name : '')
    }
  } catch (err) {
    console.error('[UI] Error al conectar con el backend:', err)
    setRecommendation('')
    setHighlighted('')
  }
  setLoading(false)
}


  return (
    <div className="p-4 md:p-8 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center">Lista de productos</h1>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {products.map(({ name, description, varieties, icon: Icon }) => (
          <div
            key={name}
            className={`border rounded-lg p-4 flex flex-col items-center space-y-2 bg-white shadow transition-all ${highlighted === name ? 'border-blue-500 bg-blue-50 ring-4 ring-blue-300 recommend-highlight' : ''}`}
          >
            <Icon className="text-3xl text-blue-600" />
            <h2 className="font-semibold">{name}</h2>
            <p className="text-sm text-gray-600 text-center">{description}</p>
            <ul className="text-xs text-gray-500 list-disc list-inside">
              {varieties.map(v => (
                <li key={v}>{v}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="space-y-2">
        <textarea
          className="border p-2 w-full rounded"
          placeholder="Describe tus preferencias (por ejemplo: me gustan las frutas dulces)"
          value={preferences}
          onChange={e => setPreferences(e.target.value)}
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" type="submit">Recomendar</button>
      </form>
      {loading && (
        <div className="flex justify-center">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {recommendation && !loading && (
        <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 text-center font-semibold rounded">
          {highlighted
            ? `Producto recomendado: ${highlighted}`
            : `Respuesta del modelo: ${recommendation}`}
        </div>
      )}
    </div>
  )
}
