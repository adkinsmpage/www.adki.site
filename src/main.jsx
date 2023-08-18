import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css'
import themeObject from './ThemeMUI.json'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Suspense } from 'react'
import {
  BrowserRouter as Router,
  useRoutes,
} from 'react-router-dom'

import routes from '~react-pages'
import Layout from './pages/_layout'

const AppC = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      {useRoutes(routes)}
    </Suspense>
  )
}

const theme = createTheme(themeObject);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <Layout />
      <AppC />
    </React.StrictMode>
  </ThemeProvider>
  </Router>,
)
