import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Earn from './pages/Earn'
import VaultDetail from './pages/VaultDetail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Earn />} />
        <Route path="/vault/:vaultId" element={<VaultDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
