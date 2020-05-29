import {ADD_ORDER, FETCH_ORDERS} from '../actions/orderActions';
import Order from '../../../models/order';

const initialState = {
 orders: []
}

const orderReducer = (state=initialState, action)=> {
    switch(action.type){
        case FETCH_ORDERS:
            return {
                ...state,
                orders: action.orders
            }
        case ADD_ORDER:
            const anOrder = new Order(action.orderData.id, action.orderData.items, action.orderData.cost, action.orderData.date)
            return {
                ...state,
                orders: state.orders.concat(anOrder)
            }
        default:
            return state;
    }

}
export default orderReducer