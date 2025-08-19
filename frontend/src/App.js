import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import Home from './pages/home/Home';
import { SelectedBrandProvider } from './context/SelectedBrandContext';
import Login from './pages/login/Login';
import './App.css';
import DndKitProvider from './context/DndProvider';

function App() {
  return (
    <div className="App">
      <SelectedBrandProvider>
        <DndKitProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
            </Routes>
          </BrowserRouter>
        </DndKitProvider>
      </SelectedBrandProvider>
    </div>
  );
}

export default App;
