import Card from './components/Card'
import './App.css';
import { useState } from 'react';

function App() {
  const [menu, setMenu]=useState(0)

  return (
    <main className="main">
      <header className="header">
        <button className="character-button" onClick={() => setMenu(0)}>Star Wars</button>
        <button className="character-button" onClick={() => setMenu(1) }>
          Personagens
        </button>
      </header>

      <div className="app-content">
        {menu === 0 && <h1>Lendas da Galáxia de Star Wars</h1>}
        {menu === 1 && <Card/>}
      </div>
    </main>
  );
}

export default App;


