import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routes.tsx'
import { Toaster } from 'sonner';
import { Provider } from 'react-redux'
import { persistor, store } from './redux/features/store.ts'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div>
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <RouterProvider router={router}/> 
          </PersistGate>
          <Toaster position="top-center" /> 
      </Provider>
    </div>
  </StrictMode>,
)
