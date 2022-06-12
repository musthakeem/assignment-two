import { Cart, CartSummary, Layout } from 'components';
import React from 'react';
import { connect } from 'react-redux';

function cart({cartInfo}) {
    const {cartItems, totalPrice} = cartInfo
    return (
        <Layout>
            <div className='h-screen pt-16 sm:pt-20'>
                <div className='md:mt-24 px-4'>
                    <h1 className='mb-4 '>Cart</h1>
                <div className="float-left w-full lg:w-3/5 bg-slate-50">                                        
                    <div className=' px-3'>
                    <h2 className=' p-3'>Products</h2>
                    { cartItems && cartItems.length > 0 ?
                    <Cart/> 
                    :
                    <div data-testid='cart-empty-container' className='w-full text-center items-center p-5'>
                        <span className='items-center text-xl font-semibold'>
                            Empty Cart
                        </span>
                    </div>
                    }
                    </div>
                </div>
                <div className="float-left w-full lg:w-2/5 px-3">
                    <h2 className='bg-gray-200 p-3'>Cart Summary</h2>
                    <CartSummary data={cartItems} totalVal={totalPrice}/>
                </div>
                </div>
            </div>
        </Layout>
    );
}

const mapStateToProps = state => ({
    cartInfo: state.cart
  })
    
export default connect(mapStateToProps) (cart);
