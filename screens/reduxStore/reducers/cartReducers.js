import {ADD_TO_CART, REMOVE_FROM_CART} from '../actions/cartActions'
import CartItem from '../../../models/cartItem'
import {ADD_ORDER} from '../actions/orderActions'
import {DELETE_PRODUCT} from '../actions/productActions'

const initialState = {
    inCart: {},
    sum: 0
}

const cartReducer = (state = initialState, action)=> {
    switch(action.type){
        case ADD_TO_CART: 
            const addedItem = action.product;
            const price = addedItem.price;
            const title = addedItem.title;
            
            if(state.inCart[addedItem.id]){
                const itemUpdate = new CartItem(
                    state.inCart[addedItem.id].quantity + 1,
                    title,
                    price,
                    state.inCart[addedItem.id].totalPrice + price,

                )
                //item exists
                return {
                    ...state,
                    inCart: {...state.inCart, [addedItem.id]: itemUpdate},
                    sum: state.sum + price

                }
            }else {
                //add new item
                const newItem = new CartItem(1, title, price, price);
                return {
                    ...state,
                    inCart: {...state.inCart, [addedItem.id]: newItem},
                    sum: state.sum + price
                }
            }
        case REMOVE_FROM_CART: 
            const productObject = state.inCart[action.productID];
            const updatedCart = {...state.inCart};
            delete updatedCart[action.productID];
            return {
                ...state,
                inCart: updatedCart,
                sum: state.sum - productObject.totalPrice 
            }
        case ADD_ORDER:
            return initialState

        case DELETE_PRODUCT:
            if(!state.inCart[action.productId]){
                return state;
            }
            const productInfo = state.inCart[action.productId];
            const updatedItems = {...state.inCart};
            delete updatedItems[action.productId];
            return {
                ...state,
                inCart: updatedItems,
                sum: state.sum - productInfo.totalPrice 
            }
        default:
            return state
    }
    
}

export default cartReducer