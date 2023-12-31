import React from 'react'
import { Link } from 'react-router-dom'

function Home(){
  return (
        <div>
            <Link to={"/createQuiz"}> Create Quiz </Link>
        </div>
  )
}

export default Home
