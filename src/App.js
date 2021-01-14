import React, {useState, useEffect} from 'react'
import {Navbar, Products, Cart, Checkout} from './components'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import {commerce} from './lib/commerce'

const App = () => {

  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({})
  const [order, setOrder] = useState({})
  const [errorMessage, setErrorMessage] = useState('')

  const fetchProducts = async () => {

    const res = await commerce.products.list();
    console.log(res);
    setProducts(res.data)
  }

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddCart = async (productId, quantity) => {

    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  }

  const handleRemoveCart = async (productId) => {

    const item = await commerce.cart.remove(productId);

    setCart(item.cart)
  }

  const handleEmptyCart = async () => {

    const item = await commerce.cart.empty();

    setCart(item.cart)
  }

  const handleUpdateCartQty = async (productId, quantity) => {

    const item = await commerce.cart.update(productId, {quantity})

    setCart(item.cart)
  }

  const refreshCart = async () => {
    const newCart = await commerce.cart.empty();

    setCart(newCart)
  } 

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder)

      setOrder(incomingOrder);
      refreshCart();

    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  }
  

  useEffect(() => {
    fetchProducts()
    fetchCart()
  }, [])
  
  return (
    <Router>
      <div>
        <Navbar totalItems = {cart.total_items}/>
      <Switch>
        <Route exact path='/'><Products products = {products} onAddToCart = {handleAddCart} /></Route>
        <Route exact path='/cart'>
        <Cart 
          cart = {cart} 
          handleRemoveCart = {handleRemoveCart}
          handleEmptyCart = {handleEmptyCart}
          handleUpdateCartQty = {handleUpdateCartQty}
          />
        </Route>
        <Route exact path='/checkout'>
          <Checkout 
          cart = {cart}
          order={order}
          handleCaptureCheckout={handleCaptureCheckout}
          errorMessage={errorMessage}
          />
        </Route>
      </Switch>
      </div>
    </Router>
 
  );
};

export default App
