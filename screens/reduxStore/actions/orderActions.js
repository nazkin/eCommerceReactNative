export const ADD_ORDER = 'ADD_ORDER';

export const addOrder = (cartItems, totalCost) => {
    return {
        type: ADD_ORDER,
        orderData: {
            items: cartItems,
            cost: totalCost
        }
    }
}