import React from 'react'
import ReactDOM from 'react-dom/client'
import { IPadCursorProvider, useIPadCursor } from "ipad-cursor/react";
import './index.css'
import { Suspense } from 'react'
import {
  BrowserRouter as Router,
  useRoutes,
} from 'react-router-dom'

import routes from '~react-pages'
import Layout from './pages/_layout'

const AppC = () => {
  useIPadCursor();
  return (
    <IPadCursorProvider>
      <Suspense fallback={<p>Loading...</p>}>
        {useRoutes(routes)}
      </Suspense>
    </IPadCursorProvider>
  )
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <React.StrictMode>
      <Layout />
      <AppC />
    </React.StrictMode>
  </Router>,
)
