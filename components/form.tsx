import Link from 'next/link'
import { FormEvent } from 'react'

type FormProps = {
  type: string
  post: Post
  setPost: (post: Post) => void
  submitting: boolean
  handleSubmit: (e: FormEvent<Element>) => Promise<void>
}

const Form = ({ type, post, setPost, submitting, handleSubmit }: FormProps) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type}</span>
      </h1>

      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world and let your imagination run wild with any
        AI-powered platform.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col mt-10 w-full  max-w-2xl gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">Your AI Prompt</span>

          <textarea
            className="form_textarea"
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            required
            placeholder="Write your prompt here"
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag <span className="font-normal">(#product, #webdevelopment, #idea)</span>
          </span>

          <input
            className="form_input"
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            required
            placeholder="#tag"
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href={'/'} className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
            type="submit"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form
