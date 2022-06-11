import React from 'react';
import { MdShoppingCart } from "react-icons/md";
import { connect } from 'react-redux';
import { stringToDecimalPrice } from 'utils';

function Cart({cartInfo}) {

    return (
        <ul className='inline-flex'>
              <li >
                <span className='inline-flex items-center'><MdShoppingCart/>{`${cartInfo.cartItems.length}`}</span>
              </li>
              <li className='ml-2'>
              <span className='inline-flex items-center'>{`(SGD ${stringToDecimalPrice(cartInfo.totalPrice)})`}</span>
              </li>
        </ul>
    );
}

const mapStateToProps = state => ({
  cartInfo: state.cart
})


export default connect(mapStateToProps, null) (Cart);