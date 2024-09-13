import { connectToDB } from '@utils/database'

import Prompt from '@models/prompt'

type Params = {
  id: number
}

export const GET = async (_request: Request, { params }: { params: Params }) => {
  try {
    await connectToDB()

    const prompts = await Prompt.find({ creator: params.id }).populate('creator')

    return new Response(JSON.stringify(prompts), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch all prompts', { status: 500 })
  }
}
