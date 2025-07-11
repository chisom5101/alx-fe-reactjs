import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import WelcomeMessage from './WelcomeMessage'
import Header from './Header'
import MainContent from './MainContent'
import Footer from './Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* ✅ Render the imported components */}
      <Header />
      <MainContent />
      <Footer />

      {/* Optional: Keep existing demo content */}
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <WelcomeMessage />

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App