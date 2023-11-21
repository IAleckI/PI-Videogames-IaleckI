import React from 'react'

const landingPage = () => {
  return (
    <div>Welcome to the hell
      <button onClick={() => window.location.href = '/home'}>Go to Home</button>
    </div>

  )
}

export default landingPage