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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const res = await fetch('http://localhost:3001/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ preferences, products: products.map(p => p.name) })
    })
    const data = await res.json()
    setRecommendation(data.recommendation)
    setLoading(false)
  }

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center">Lista de productos</h1>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {products.map(({ name, description, varieties, icon: Icon }) => (
          <div key={name} className="border rounded-lg p-4 flex flex-col items-center space-y-2 bg-white shadow">
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
          placeholder="Ingresa tus preferencias"
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
        <p className="mt-4 text-center">Recomendación: {recommendation}</p>
      )}
    </div>
  )
}
