import { Header, Home, Generator } from "./components"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"
import { AnalyticsPage, GeneratorPage } from "./pages"

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<AnalyticsPage />} />
            <Route path="/generator" element={<GeneratorPage />} />
            <Route path="/history" element={<div>История (в разработке)</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
