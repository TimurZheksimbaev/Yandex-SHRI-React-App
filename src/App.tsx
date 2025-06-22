import { Header, Home } from "./components"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Здесь будут добавлены другие маршруты для CSV Генератора и Истории */}
            <Route path="/generator" element={<div>CSV Генератор (в разработке)</div>} />
            <Route path="/history" element={<div>История (в разработке)</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
