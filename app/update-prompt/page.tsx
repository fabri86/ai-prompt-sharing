'use client'

import { FormEvent, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import Form from '@components/form'

const EditPrompt = () => {
  const router = useRouter()

  const searchParams = useSearchParams()
  const promptId = searchParams.get('id')

  const [submitting, setSubmitting] = useState<boolean>(false)
  const [post, setPost] = useState<Post>({
    tag: '',
    prompt: '',
    _id: -1,
  })

  const editPrompt = async (e: FormEvent<Element>) => {
    e.preventDefault()
    setSubmitting(true)

    if (!promptId) {
      return alert('Prompt ID not found')
    }

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      })

      if (response.ok) {
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  useEffect(() => {
    const fetchPrompt = async () => {
      const response = await fetch(`/api/prompt/${promptId}`)
      const data: Post = await response.json()

      setPost(data)
    }

    if (promptId) {
      fetchPrompt()
    }
  }, [promptId])

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={editPrompt}
    />
  )
}

export default EditPrompt
