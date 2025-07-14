import { Controller, Post, Body } from '@nestjs/common'
import fetch from 'node-fetch'

@Controller()
export class RecommendController {
  @Post('recommend')
  async recommend(@Body() body: { preferences: string; products: string[] }) {
    console.log('[/recommend] Request body:', body)
    const prompt =
      `Tengo los siguientes productos: ${body.products.join(', ')}.\n` +
      `El usuario prefiere: ${body.preferences}.\n` +
      'Recomienda un solo producto de la lista y responde únicamente en español.'
    console.log('[/recommend] Prompt enviado a Ollama:', prompt)

    let res
    try {
      res = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'llama2', prompt })
      })
    } catch (err) {
      console.error('[/recommend] Error conectando con Ollama:', err)
      throw err
    }

    console.log('[/recommend] Estado de la respuesta de Ollama:', res.status)
    if (!res.ok) {
      const errText = await res.text()
      console.error('[/recommend] Ollama respondió con error:', errText)
      throw new Error(`Error de Ollama: ${errText}`)
    }

    let text = ''
    const bodyStream: any = res.body
    if (bodyStream) {
      console.log('[/recommend] Leyendo respuesta en streaming de Ollama...')
      if (typeof bodyStream.getReader === 'function') {
        const reader = bodyStream.getReader()
        const decoder = new TextDecoder()
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const chunk = decoder.decode(value, { stream: true })
          text += chunk
        }
      } else {
        for await (const chunk of bodyStream as any) {
          text += chunk.toString()
        }
      }
      console.log('[/recommend] Respuesta completa recibida de Ollama')
    }

    const lines = text.trim().split('\n')
    let recommendation = ''
    for (const line of lines) {
      try {
        const data = JSON.parse(line)
        if (data.response) recommendation += data.response
      } catch {}
    }
    const finalRecommendation = recommendation.trim()
    console.log('[/recommend] Recomendación final:', finalRecommendation)
    return { recommendation: finalRecommendation }
  }
}
