'use client'

import React, { useEffect } from 'react'

type ErrorProps = {
  error: string
}

const Error = ({ error }: ErrorProps) => {
  useEffect(() => {
    console.error(error)
  }, [error])

  return <div>Something went wrong</div>
}

export default Error
