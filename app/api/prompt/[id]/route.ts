import { connectToDB } from '@utils/database'
import Prompt from '@models/prompt'
import { HydratedDocument } from 'mongoose'

type Params = {
  id: number
}

export const GET = async (_request: Request, { params }: { params: Params }) => {
  try {
    await connectToDB()
    const prompt = await Prompt.findById(params.id).populate('creator')

    if (!prompt) {
      return new Response(JSON.stringify(prompt), { status: 404 })
    }

    return new Response(JSON.stringify(prompt), { status: 200 })
  } catch (error) {
    return new Response('Failed', { status: 500 })
  }
}

export const PATCH = async (request: Request, { params }: { params: Params }) => {
  const { prompt, tag } = await request.json()

  try {
    await connectToDB()

    const existingPrompt: HydratedDocument<Post> | null = await Prompt.findById(params.id)

    if (!existingPrompt) {
      return new Response('Prompt not found', { status: 404 })
    }

    existingPrompt.prompt = prompt
    existingPrompt.tag = tag

    await existingPrompt.save()

    return new Response(JSON.stringify(existingPrompt), { status: 200 })
  } catch (error) {
    return new Response('Failed editing the prompt', { status: 500 })
  }
}

export const DELETE = async (_request: Request, { params }: { params: Params }) => {
  try {
    await connectToDB()

    await Prompt.findByIdAndDelete(params.id)

    return new Response('Prompt removed successfully', { status: 200 })
  } catch (error) {
    return new Response('Failed deleting the prompt', { status: 500 })
  }
}
