import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import Home from './views/Home';
import Login from './views/Login';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* <Route path="/"><Redirect to="/home" /></Route> */}
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
