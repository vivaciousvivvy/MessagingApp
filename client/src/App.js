import './App.css';
import {BrowserRouter, Routes, Router, Route} from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';


function App() {
  return (
    <BrowserRouter>
      <Navbar>
        <Routes>
        <Route exact path="/" component={Home} />
        </Routes>
      </Navbar>
      <body>
        <h1>Home page</h1>
      </body>
    </BrowserRouter>
  );
}

export default App;
