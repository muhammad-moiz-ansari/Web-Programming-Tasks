import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Contact from './components/Contact';
import About from './components/About';

function App() {
  return (
    <main>
      <nav style={{ padding: '1rem', borderBottom: '2px solid #ccc' }}>
        <h1 style={{ textAlign: 'center' }}>My React Portfolio</h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </main>
  );
}

export default App;