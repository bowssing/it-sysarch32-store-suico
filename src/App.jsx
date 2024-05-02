import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header';


function App() {
  return (
    <>
    
      <Router>
      <Header/>
          <Routes>
          <Route path="/" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
      </Router>
      </>
  );
}

export default App
