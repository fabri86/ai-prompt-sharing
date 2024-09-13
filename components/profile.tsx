import React from 'react'

import PromptCard from '@components/prompt-card'

type ProfileProps = {
  name: string
  description: string
  data: Post[]
  handleEdit: (post: Post) => void
  handleDelete: (post: Post) => void
}

const Profile = ({ name, description, data, handleDelete, handleEdit }: ProfileProps) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} profile</span>
      </h1>
      <p className="desc text-left">{description}</p>

      <div className="mt-10 prompt_layout">
        {data.map((post: Post, index: number) => (
          <PromptCard
            key={post.id || `post-${index}`}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  )
}

export default Profile
