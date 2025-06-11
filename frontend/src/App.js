import { Container } from '@mui/system';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import Home from './pages/home/Home';
import { SelectedBrandProvider } from './context/SelectedBrandContext';
import './App.css';
import Login from './pages/login/Login';

function App() {
  return (
    <div className="App">
      <SelectedBrandProvider>
        <BrowserRouter>
          <Navbar />
          <Container>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
            </Routes>
          </Container>
        </BrowserRouter>
      </SelectedBrandProvider>


    </div>
  );
}

export default App;
