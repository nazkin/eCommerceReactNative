export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

export const addToCart = (item)=> {
    return {type: ADD_TO_CART, product: item}
}
export const removerFromCart = (id) => {
    return{type: REMOVE_FROM_CART, productID: id }
}