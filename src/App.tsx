
import './App.css'
import AppRoutes from './components/AppRoutes'
import FlashMessage from './components/FlashMessage'
import Footer from './components/Footer'
import Navbar from './components/Navbar'

function App() {

  return (
    <main>
      <Navbar />
      <FlashMessage/>
      <section className='body min-h-screen'>
        <AppRoutes />
      </section>
      <Footer />
    </main>
  )
}

export default App
