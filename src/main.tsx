import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import ThemeProvider from './provider/ThemeProvider.tsx'
import { Provider } from "react-redux"
import store from './store/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <Provider store={store}>
          <App />
        </Provider>

      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
