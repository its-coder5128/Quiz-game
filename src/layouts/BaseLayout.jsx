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
          <div>
            <Header/>
            <Outlet/>
            <Footer/>
          </div>
      </QuizProvider>
    </AuthProvider>
  )
}

export default BaseLayout
