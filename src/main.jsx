import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider,createBrowserRouter,createRoutesFromElements,Route } from 'react-router-dom'
import './index.css'
import App from './pages/App.jsx'
import BaseLayout from './layouts/BaseLayout.jsx'
import QuestionSection from './components/QuestionSection.jsx'
import Home from './pages/Home.jsx'
import Signup from './pages/Signup.jsx'
import Signin from './pages/Signin.jsx'
import ContestLanding from './pages/ContestLanding.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<BaseLayout/>}>
        <Route path='' >
          <Route index element={<Home/>}/>
          <Route path='signup' element={<Signup/>}/>
          <Route path='signin' element={<Signin/>}/>
          <Route path='createQuiz' element={<App/>}/>
          <Route path='quiz' element={<QuestionSection/>}/>
          <Route path='contest' element={<ContestLanding/>}/>
        </Route>
      </Route>
    </Route>

  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />   
  </React.StrictMode>
)
