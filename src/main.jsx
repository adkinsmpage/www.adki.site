import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css'
import CssBaseline from '@mui/material/CssBaseline';
//import themeObject from './ThemeMUI.json'
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Suspense } from 'react'
import {
  BrowserRouter as Router,
  useRoutes,
} from 'react-router-dom'

import routes from '~react-pages'
import Layout from './pages/_layout'

const AppC = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      })
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
      <Suspense fallback={<p>Loading...</p>}>
        {useRoutes(routes)}
      </Suspense>
    </ThemeProvider>
  )
}

//const theme = createTheme(themeObject);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <React.StrictMode>
      <Layout />
      <AppC />
    </React.StrictMode>
  </Router>,
)
