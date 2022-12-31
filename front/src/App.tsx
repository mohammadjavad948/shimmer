import { Route, Routes } from 'react-router-dom';
import { Auth } from './pages/Auth';
import { LandingPage } from './pages/Landing';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}

export default App;
