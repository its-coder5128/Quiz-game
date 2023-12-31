import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider,createBrowserRouter,createRoutesFromElements,Route } from 'react-router-dom'
import './index.css'
import App from './pages/App.jsx'
import BaseLayout from './layouts/baseLayout.jsx'
import QuestionSection from './components/QuestionSection.jsx'
import Home from './pages/Home.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<BaseLayout/>}>
        <Route path='' >
          <Route index element={<Home/>}/>
          <Route path='createQuiz' element={<App/>}/>
          <Route path='quiz' element={<QuestionSection/>}/>
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
