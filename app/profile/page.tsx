'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@components/profile'

const MyProfile = () => {
  const { data: session } = useSession()
  const [posts, setPosts] = useState<Post[]>([])

  const handleEdit = () => {}

  const handleDelete = async () => {}

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`)
      const data: Post[] = await response.json()

      setPosts(data)
    }

    if (session?.user) {
      fetchPosts()
    }
  }, [session])

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
