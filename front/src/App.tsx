import { Route, Routes } from 'react-router-dom';
import { Auth } from './pages/Auth';
import { LandingPage } from './pages/Landing';
import { Test } from './pages/Test';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  );
}

export default App;
