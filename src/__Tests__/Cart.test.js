import { fireEvent, getAllByTestId, getByDisplayValue, getByTestId, render }from "@testing-library/react";
import Cart from "pages/cart";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/lib/integration/react";
import Store from 'store';
import {addItem} from '../reducers'

const {store, persistor} = Store();

let productOne ={
    "id":5,
    "title":"John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    "price":695,
    "description":"From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    "category":"jewelery",
    "image":"https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    "rating":{"rate":4.6,"count":400}
}
let productTwo ={"id":8,"title":"Pierced Owl Rose Gold Plated Stainless Steel Double","price":10.99,"description":"Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel","category":"jewelery","image":"https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg","rating":{"rate":1.9,"count":100}}

describe("UI render tests for cart", ()=>{

    let container;
    
    beforeEach(()=>{
        container = render(  
            <Provider store={store}>
            <PersistGate store={store} persistor={persistor}>
                <BrowserRouter>
                    <Cart/>
                </BrowserRouter>
            </PersistGate>
        </Provider>).container
    });

    test("cart empty rendered initialy as there are no items in cart.", ()=>{
        const products = getByTestId(container, 'cart-empty-container');        
        expect(products).toBeTruthy();
    });
    
    test("cart's product list container has been rendered.", ()=>{
        act(()=>{        
            // Mock product one added twice to cart by adding products 
            store.dispatch(addItem(productOne));
            store.dispatch(addItem(productOne));
        })
        const products = getAllByTestId(container, 'cart-container');        
        expect(products).toBeTruthy();
    });
    test("cart's product list has been rendered with at least one product.", ()=>{
        const products = getAllByTestId(container, 'product-item');        
        expect(products.length).toBeGreaterThan(0);
    });

    test("cart's summary container has been rendered.", ()=>{
        const products = getAllByTestId(container, 'summary-container');        
        expect(products).toBeTruthy();
    });
    test("cart summary list renders at least one product.", ()=>{
        const products = getAllByTestId(container, 'summary-item');        
        expect(products.length).toBeGreaterThan(0);
    });
    test("cart summary list renders product name.", ()=>{
        const products = getAllByTestId(container, 'summary-item-name');        
        expect(products).toBeTruthy();
    });
    test("cart summary list renders total price for product count.", ()=>{
        const products = getAllByTestId(container, 'summary-item-5-total');        
        expect(products).toBeTruthy();
    });
    test("cart summary renders computed total for individual product count.", ()=>{
        const element = getByTestId(container, 'summary-item-5-total'); 
        expect(element.textContent).toEqual("S$ 1390.00");
    });

    test("renders list of all products added to cart summary.", ()=>{
        act(()=>{
            store.dispatch(addItem(productTwo));
        })
        const products = getAllByTestId(container, 'product-item'); 
        expect(products.length).toEqual(2);
    });

    test('Total cart amount has been computed and rendered.', () => {
        const element = getByTestId(container, 'cart-total'); 
        expect(element.textContent).toEqual("S$ 1400.99");
        // 2*695 + 2*10.99 = 1411.98
    })

    test('Item count incremented upon + button click.', () => {
        const clickIndicator = getByTestId(container, 'increment-item-8')
        expect(clickIndicator).toBeTruthy();
        fireEvent.click(clickIndicator)
        const element = getByTestId(container, 'summary-item-8-total'); 
        expect(element.textContent).toEqual("S$ 21.98");

    })
    test('Item count decrement upon - button click.', () => {
        const clickIndicator = getByTestId(container, 'decrement-item-8')
        expect(clickIndicator).toBeTruthy();
        fireEvent.click(clickIndicator)
        const element = getByTestId(container, 'summary-item-8-total'); 
        expect(element.textContent).toEqual("S$ 10.99");

    })
    test('Item removed from renders list upon delete button click.', () => {
        const clickIndicator = getByTestId(container, 'delete-item-8')
        expect(clickIndicator).toBeTruthy();
        fireEvent.click(clickIndicator)
        const products = getAllByTestId(container, 'product-item'); 
        expect(products.length).toEqual(1);
    })
    
});
    // afterEach(cleanup)