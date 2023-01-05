import { Route, Routes } from 'react-router-dom';
import { Auth } from './pages/Auth';
import AllCard from './pages/card/AllCard';
import { NewCard } from './pages/card/NewCard';
import AllCardGroup from './pages/card_group/AllCardGroup';
import { NewCardGroup } from './pages/card_group/NewCardGroup';
import { LandingPage } from './pages/Landing';
import { Test } from './pages/Test';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/test" element={<Test />} />
      <Route path="/card-group" element={<AllCardGroup />} />
      <Route path="/card-group/new" element={<NewCardGroup />} />
      <Route path="/card" element={<AllCard />} />
      <Route path="/card/new" element={<NewCard />} />
    </Routes>
  );
}

export default App;
