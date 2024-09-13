'use client'

import { useState, useEffect } from 'react'
import PromptCard from '@components/prompt-card'

type PromptCardListProps = {
  data: Post[]
  handleTagClick: () => void
}

const PromptCardList = ({ data, handleTagClick }: PromptCardListProps) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post: Post) => (
        <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState<string>('')
  const [posts, setPosts] = useState<Post[]>([])

  const handleSearchChange = (value: string) => {}

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt')
      const data: Post[] = await response.json()

      setPosts(data)
    }

    fetchPosts()
  }, [])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          onChange={(e) => handleSearchChange(e.target.value)}
          required
          value={searchText}
          className="search_input peer"
        ></input>
      </form>

      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  )
}

export default Feed
