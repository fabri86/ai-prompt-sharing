import React from 'react'

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div>
      <p>Navigate back...</p>

      {children}
    </div>
  )
}

export default layout
