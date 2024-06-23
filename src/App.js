import React from 'react'
import './App.css'
import EventRegisterationForm from './components/EventRegisterationForm'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
   <>
   <Toaster position='bottom-right' toastOptions={{duration :3000}} />
   <EventRegisterationForm />
   </>
  )
}

export default App
