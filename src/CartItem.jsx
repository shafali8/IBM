import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css'

function CartItem({ onContinueShopping }) {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (name) => {
    dispatch(removeItem({ name }));
  };

  const handleQuantityChange = (name, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ name, quantity }));
    }
  };

  const totalCost = items.reduce((total, item) => total + item.quantity * parseFloat(item.cost.slice(1)), 0);

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      <div className="cart-items">
        {items.map((item, index) => (
          <div className="cart-item" key={index}>
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <div className='cart-item-name'>{item.name}</div>
              <div className='cart-item-cost'>{item.cost}</div>
              <div>
                <button onClick={() => handleQuantityChange(item.name, item.quantity - 1)}className='cart-item-button'>-</button>
                <span className='cart-item-quantity-value'>{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item.name, item.quantity + 1)} className='cart-item-button'>+</button>
              </div>
              <button onClick={() => handleRemove(item.name)} className='cart-item-delete'>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <div className='cart-item-quantity'>Total Items: {items.length}</div>
        <div className='cart-item-cost'>Total Cost: ${totalCost.toFixed(2)}</div>
      </div>
      <button onClick={onContinueShopping} className='get-started-button'>Continue Shopping</button>
      <button className='get-started-button'>Checkout</button>
    </div>
  );
}

export default CartItem;
