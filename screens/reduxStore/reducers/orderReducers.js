import {ADD_ORDER} from '../actions/orderActions';
import Order from '../../../models/order';

const initialState = {
 orders: []
}

const orderReducer = (state=initialState, action)=> {
    switch(action.type){
        case ADD_ORDER:
            const anOrder = new Order(new Date().toString(), action.orderData.items, action.orderData.cost, new Date())
            return {
                ...state,
                orders: state.orders.concat(anOrder)
            }
        default:
            return state;
    }
    return state

}
export default orderReducer