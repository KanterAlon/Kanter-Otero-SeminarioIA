import { Controller, Post, Body } from '@nestjs/common'
import fetch from 'node-fetch'

@Controller()
export class RecommendController {
  @Post('recommend')
  async recommend(@Body() body: { preferences: string; products: string[] }) {
    const prompt = `Tengo los siguientes productos: ${body.products.join(', ')}.\n` +
      `El usuario prefiere: ${body.preferences}.\n` +
      'Recomienda un solo producto de la lista.'
    const res = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'llama2', prompt })
    })

    const reader = res.body?.getReader()
    let text = ''
    if (reader) {
      const decoder = new TextDecoder()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        text += decoder.decode(value, { stream: true })
      }
    }

    const lines = text.trim().split('\n')
    let recommendation = ''
    for (const line of lines) {
      try {
        const data = JSON.parse(line)
        if (data.response) recommendation += data.response
      } catch {}
    }

    return { recommendation: recommendation.trim() }
  }
}
