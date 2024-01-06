import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {Outlet} from 'react-router-dom'
import { QuizProvider } from '../context/QuizContext'
import { AuthProvider } from '../context/AuthContext'

function BaseLayout(){
  return (
    <AuthProvider>
      <QuizProvider>
          <div className=' flex flex-col justify-start bg-orange-100 min-h-screen'>
            <div>
              <Header/>
            </div>
            <div className=' mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8 font-medium text-gray-700'>
              <Outlet/>
            </div>
            <div className=' mt-auto'>
              <Footer/>
            </div>
          </div>
      </QuizProvider>
    </AuthProvider>
  )
}

export default BaseLayout
