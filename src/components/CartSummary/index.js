import React, { Fragment } from 'react';
import { MdPayment } from 'react-icons/md';
import { stringToDecimalPrice } from 'utils';

function CartSummary({data, totalVal}) {
    return (
        <Fragment >
            { data && data.length>0 &&
            <div data-testid='summary-container' className='bg-gray-100 p-3'>
                <ul>
                    {
                        data.map((item,index)=>(
                            <li data-testid='summary-item' key={index} >
                                <span data-testid='summary-item-name' className='mb-3 float-left text-ellipsis w-3/4 font-thin'>{`${item.title} (x${item.count})`}</span>
                                <span data-testid={`summary-item-${item.id}-total`} className='mb-3 float-right font-thin'>S$ {stringToDecimalPrice(item.price * item.count)}</span>                            
                            </li>
                        ))
                    }
                </ul>
                <div className='py-6'>
                    <span className='float-left text-ellipsis w-3/4 font-light'>Tax</span>
                    <span className='float-right font-light'>S$ 00</span>                            
                </div>
                <div className='py-6'>
                    <span className='float-left text-ellipsis w-3/5 font-bold'>Total</span>
                    <span data-testid='cart-total' className='float-right font-bold'>S$ {stringToDecimalPrice(totalVal)}</span>                            
                </div>
                <button type='button' className='my-12 p-2 bg-blue-500 hover:bg-blue-700 active:opacity-50 active:after:opacity-100 w-full inline-flex justify-center items-center'>
                    <MdPayment className='mr-2'/> Checkout
                </button>
            </div>
            }
        </Fragment>
    );
}

export default CartSummary;