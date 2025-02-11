import OpenAI from 'openai'
import { NextResponse } from 'next/server'

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENAI_API_KEY,
})

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const prompt =
      "Generate a list of three engaging and friendly messages, each no longer than 10 words, formatted as a single string. Each message should be separated by '||'. These messages are for an anonymous social messaging platform, like Qooh.me, and should be positive, uplifting, or thought-provoking without requiring a reply. Avoid personal or sensitive topics, and focus on universal themes that create a welcoming and feel-good atmosphere. For example, your output should be structured like this: 'You make the world a little brighter!||Small wins deserve to be celebrated—proud of you!||Your kindness doesn’t go unnoticed, keep being amazing!'. Ensure the messages are warm, inclusive, and contribute to a positive community experience."

    const response = await openai.chat.completions.create({
      model: 'openchat/openchat-7b:free',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 400,
      stream: true,
    })

    let suggestedMessages = ''
    for await (const chunk of response) {
      const content = chunk.choices[0]?.delta?.content || ''
      suggestedMessages += content
    }

    return new Response(suggestedMessages, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      const { name, status, headers, message } = error
      return NextResponse.json({ name, status, headers, message }, { status })
    } else {
      console.error('An unexpected error occurred:', error)
      throw error
    }
  }
}
