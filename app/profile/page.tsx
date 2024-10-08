'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@components/profile'

const MyProfile = () => {
  const { data: session } = useSession()
  const [posts, setPosts] = useState<Post[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`)
      const data: Post[] = await response.json()

      setPosts(data)
    }

    if (session?.user.id) {
      fetchPosts()
    }
  }, [session])

  const handleEdit = (post: Post) => {
    router.push(`/update-prompt?id=${post._id}`)
  }

  const handleDelete = async () => {}

  return (
    <Profile
      name="My"
      description="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile
