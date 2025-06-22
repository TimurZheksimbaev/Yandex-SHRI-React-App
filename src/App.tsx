import { Header, Home, Generator } from "./components"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { HistoryPage } from "./pages/history"
import "./App.css"

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/generator" element={<Generator />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
