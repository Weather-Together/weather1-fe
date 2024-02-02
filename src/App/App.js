import './App.css';
import Map from '../Map/Map'
import { Routes, Route, Link, useNavigate} from 'react-router-dom';

function App() {
  return (
    <main>
    <div className="App">
      <header>
      <h1>Header</h1>
      </header>
      <div className="App">
      <Map />
      </div>
    </div>
    <Routes>

    </Routes>
    </main>
  );
}

export default App;
