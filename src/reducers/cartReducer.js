import { createAction, createReducer } from '@reduxjs/toolkit';


const initialState = {
    isLoading : false,
    cartItems : [],
    totalPrice:0
}
const types = {
    ADD_ITEM_INITIATED : 'ADD_ITEM_INITIATED',
    ADD_ITEM_UPDATED : 'ADD_ITEM_UPDATED',
    ADD_ITEM_FAILED : 'ADD_ITEM_FAILED',

    INCREMENT_ITEM_INITIATED : 'INCREMENT_ITEM_INITIATED',
    INCREMENT_ITEM_UPDATED : 'INCREMENT_ITEM_UPDATED',
    INCREMENT_ITEM_FAILED : 'INCREMENT_ITEM_FAILED',

    DECREMENT_ITEM_INITIATED : 'DECREMENT_ITEM_INITIATED',
    DECREMENT_ITEM_UPDATED : 'DECREMENT_ITEM_UPDATED',
    DECREMENT_ITEM_FAILED : 'DECREMENT_ITEM_FAILED',

    REMOVE_ITEM_INITIATED : 'REMOVE_ITEM_INITIATED',
    REMOVE_ITEM_UPDATED : 'REMOVE_ITEM_UPDATED',
    REMOVE_ITEM_FAILED : 'REMOVE_ITEM_FAILED'
}

const addItemInit = createAction(types.ADD_ITEM_INITIATED);
const addItemUpdated = createAction(types.ADD_ITEM_UPDATED);
const addItemFailed = createAction(types.ADD_ITEM_FAILED);

const incrementItemInit = createAction(types.INCREMENT_ITEM_INITIATED);
const incrementItemUpdated = createAction(types.INCREMENT_ITEM_UPDATED);
const incrementItemFailed = createAction(types.INCREMENT_ITEM_FAILED);

const decrementItemInit = createAction(types.DECREMENT_ITEM_INITIATED);
const decrementItemUpdated = createAction(types.DECREMENT_ITEM_UPDATED);
const decrementItemFailed = createAction(types.DECREMENT_ITEM_FAILED);

const removeItemInit = createAction(types.REMOVE_ITEM_INITIATED);
const removeItemUpdated = createAction(types.REMOVE_ITEM_UPDATED);
const removeItemFailed = createAction(types.REMOVE_ITEM_FAILED);

const cartReducer = createReducer(initialState, {
    [addItemInit]: (cartState, action) =>{
        cartState.isLoading = true;
    },
    [addItemFailed]: (cartState, action) =>{
        cartState.isLoading = false;
    },
    [addItemUpdated]: (cartState, action) =>{
        cartState.isLoading = false;
        cartState.cartItems = action.payload.updatedCart;
        cartState.totalPrice = action.payload.total;
    },
    [incrementItemInit]: (cartState, action) =>{
        cartState.isLoading = true;
    },
    [incrementItemUpdated]: (cartState, action) =>{
        cartState.isLoading = false;
        cartState.cartItems = action.payload.updatedCart;
        cartState.totalPrice = action.payload.total;
    },
    [incrementItemFailed]: (cartState, action) =>{
        cartState.isLoading = false;
    },
    [decrementItemInit]: (cartState, action) =>{
        cartState.isLoading = true;
    },
    [decrementItemUpdated]: (cartState, action) =>{
        cartState.isLoading = false;
        cartState.cartItems = action.payload.updatedCart;
        cartState.totalPrice = action.payload.total;
    },
    [decrementItemFailed]: (cartState, action) =>{
        cartState.isLoading = false;
    },
    [removeItemInit]: (cartState, action) =>{
        cartState.isLoading = true;
    },
    [removeItemUpdated]: (cartState, action) =>{
        cartState.isLoading = false;
        cartState.cartItems = action.payload.updatedCart;
        cartState.totalPrice = action.payload.total;
    },
    [removeItemFailed]: (cartState, action) =>{
        cartState.isLoading = false;
    }
})

export default cartReducer;

export const addItem = (newItem)=>{

    return async (dispatch, getState) => {
    /** Assumption
     * Assuming the addItem makes a server request sync users cart 
     * with the server and respond with the updates cart details.
     */
        /**
         * AddItemInit() is dispatched upon the making the server request
         * and failure and success is determined based on the response
         * from server.
         */ 
        dispatch(addItemInit()); //Initiated

        /**
         * + await for the response from the server and upon receiving the 
         * response we proceed with updating the state. 
         * Product addition to cart logic is implemented locally here
         */ 

        try {
            const items = getState().cart.cartItems;

            const {cartItems, totalPrice} = addItemToCart(items, newItem)
            
            dispatch(addItemUpdated({
                updatedCart: cartItems, 
                total:totalPrice 
            })); // Product Added
            
        } catch (error) {
            alert(error)
            dispatch(addItemFailed()); // Failed
        }        
    }
}

export const incrementItem = (newItem)=>{

    return async (dispatch, getState) => {
    /** Assumption
     * Assuming the incrementItem makes a server request to sync user's cart 
     * with the server and respond with the updated cart details.
     */
        /**
         * incrementItemInit() is dispatched upon the making the server request
         * and failure and success is determined based on the response
         * from server.
         */ 
        dispatch(incrementItemInit()); //Initiated

        /**
         * + await for the response from the server and upon receiving the 
         * response we proceed with updating the state. 
         * Product addition to cart logic is implemented locally here
         */ 

        try {
            const items = getState().cart.cartItems;

            const {cartItems, totalPrice} = incrementItemInCart(items, newItem)
            
            dispatch(incrementItemUpdated({
                updatedCart: cartItems, 
                total:totalPrice 
            })); // Product Incremented
            
        } catch (error) {
            dispatch(incrementItemFailed()); // Failed
        }        
    }
}

export const decrementItem = (newItem)=>{

    return async (dispatch, getState) => {
    /** Assumption
     * Assuming the incrementItem makes a server request to sync user's cart 
     * with the server and respond with the updated cart details.
     */
        /**
         * incrementItemInit() is dispatched upon the making the server request
         * and failure and success is determined based on the response
         * from server.
         */ 
        dispatch(decrementItemInit()); //Initiated
        /**
         * + await for the response from the server and upon receiving the 
         * response we proceed with updating the state. 
         * Product addition to cart logic is implemented locally here
         */ 
        try {
            const items = getState().cart.cartItems;
            const {cartItems, totalPrice} = decrementItemInCart(items, newItem )
            dispatch(decrementItemUpdated({
                updatedCart: cartItems, 
                total: totalPrice 
            })); // Product Decremented
            
        } catch (error) {
            dispatch(decrementItemFailed()); // Failed
        }        
    }
}

/**
 * Adding Logic
 * @param {Array} items 
 * @param {Object} item 
 * 
 * accepts and products array and product object and returns the array after 
 * adding the product in to the array provided there is no duplicate product on it.
 * If products alredy exits, then it will increment the product count.
 */
export const removeItem = (item)=>{

    return async (dispatch, getState) => {
    /** Assumption
     * Assuming the remove makes a server request to sync users cart 
     * with the server and respond with the updated cart details after 
     * removing selected product.
     */
        /**
         * removeItemInit() is dispatched upon the making the server request
         * and failure and success is determined based on the response
         * from server.
         */ 
        dispatch(removeItemInit()); //Initiated

        /**
         * + await for the response from the server and upon receiving the 
         * response we proceed with updating the state. 
         * Product addition to cart logic is implemented locally here
         */ 

        try {
            const allItems = getState().cart.cartItems;

            const {cartItems, totalPrice} = removeItemFromCart(allItems, item)
            
            dispatch(removeItemUpdated({
                updatedCart: cartItems, 
                total:totalPrice 
            })); // Product Removed
            
        } catch (error) {
            dispatch(removeItemFailed()); // Failed
        }        
    }
}

/**
 * Incrementing Logic
 * @param {Array} items 
 * @param {Object} item 
 * 
 * accepts and products array and product object and returns the array after 
 * adding the product in to the array provided there is no duplicate product on it.
 * If products alredy exits, then it will increment the product count.
 */
const addItemToCart = (cartItems, item) =>{
    
    const duplicate = cartItems.some(cartItem=> cartItem.id === item.id);
    var totalPrice = 0;

    // New Product
    if (!duplicate){
        const newitem = {...item, count:1}
        const newItems = [...cartItems , newitem]
        newItems.map(item=>{
            return totalPrice += item.price ?? 0 * item.count
        })
        return { cartItems: newItems, totalPrice }
    }

    // Existing Product
    const itemIndex = cartItems.findIndex(cartItem=> cartItem.id === item.id);
    const itemAdded = cartItems[itemIndex]
    const updatedItems = cartItems.map(item=>({
        ...item,
        count: item.id === itemAdded.id ? item.count+1 : item.count
    }))
    updatedItems.map(item=>{
        totalPrice += (item.price ?? 0) * item.count
        return totalPrice
    })
    return {cartItems: updatedItems, totalPrice}
}



/**
 * Increment Logic
 * @param {Array} items 
 * @param {Object} item 
 * 
 * Accepts and products array and product object and returns the array after 
 * inrementing the incremented product.
 */
 export const incrementItemInCart = (cartItems, addItem) =>{
    var totalPrice = 0;

    const itemIndex = cartItems.findIndex(cartItem=> cartItem.id === addItem.id);
    if (itemIndex===-1){
        const newitem = {...addItem, count:1}
        const newItems = [...cartItems , newitem]
        newItems.map(item=>{
            return totalPrice += item.price ?? 0 * item.count
        })
        return { cartItems: newItems, totalPrice }
    }
    const itemAdded = cartItems[itemIndex]
    const updatedItems = cartItems.map(item=>({
        ...item,
        count: item.id === itemAdded.id ? item.count+1 : item.count
    }))
    updatedItems.map(item=>{
        totalPrice += (item.price ?? 0) * item.count
        return totalPrice
    })
    return {cartItems: updatedItems, totalPrice}
 }


 /**
 * Decrement Logic
 * @param {Array} items 
 * @param {Object} item 
 * 
 * accepts and products array and product's object to be decremented
 * and returns the array after reducing the selected product count from 
 * the product array provided.
 */
  export const decrementItemInCart = (cartItems, reduceItem) =>{
    var totalPrice = 0;

    const itemIndex = cartItems.findIndex(cartItem=> cartItem.id === reduceItem.id);
    if (itemIndex===-1){
        alert(itemIndex)
        cartItems.map(item=>{
            return totalPrice += item.price ?? 0 * item.count
        })
        return { cartItems, totalPrice }
    }
    
    const itemRemoved = cartItems[itemIndex]
    if (itemRemoved.count ===1){
        return removeItemFromCart(cartItems, reduceItem);
    }

    const updatedItems = cartItems.map(item=>({
        ...item,
        count: item.id === reduceItem.id ? item.count-1 : item.count
    }))
    updatedItems.map(item=>{
        totalPrice += (item.price ?? 0) * item.count
        return totalPrice
    })
    return {cartItems: updatedItems, totalPrice}
 }

/**
 * Removing Logic
 * @param {Array} items 
 * @param {Object} item 
 * 
 * accepts and products array and product object and returns the array after 
 * removing the deletedProduct from the product array provided.
 */
 export const removeItemFromCart = (cartItems, removedItem) =>{
    var totalPrice = 0;
     
    const newItemList= cartItems.filter(item => item.id !== removedItem.id)

    newItemList.map(item=>{
        totalPrice += (item.price ?? 0) * item.count
        return totalPrice
    })
    return {cartItems: newItemList, totalPrice}
}

