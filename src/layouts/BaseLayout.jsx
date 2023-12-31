import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {Outlet} from 'react-router-dom'
import { QuizProvider } from '../context/QuizContext'

function BaseLayout(){
  return (
    <QuizProvider>
        <div>
        <Header/>
        <Outlet/>
        <Footer/>
        </div>
    </QuizProvider>
  )
}

export default BaseLayout
