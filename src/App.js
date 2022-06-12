import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './pages/home';
import About from 'pages/about';
import Product from 'pages/product';
import { Navigation } from 'components';
import Cart from 'pages/cart';


function App() {
  
  return(
    <>
      <Navigation/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/products" element={<Product/>} />
        <Route path="/products/:id" element={<Product/>} />
        <Route path='/cart' element={<Cart/>}/>
      </Routes>
    </>
  );
}

export default App;
