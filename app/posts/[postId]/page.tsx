import React from 'react'

type PostProps = {
  params: {
    postId: number
  }
}

const Post: React.FC<PostProps> = ({ params }) => {
  const { postId } = params

  return <div>This is post {postId}</div>
}

export default Post
