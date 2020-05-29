import urls from '../../../constants/httpRequests';
import Order from '../../../models/order'

export const ADD_ORDER = 'ADD_ORDER';
export const FETCH_ORDERS = 'FETCH_ORDERS';


export const fetchOrders = ()=> {
    return async dispatch => {
        try {
            //send an async request to database
            const res = await fetch(urls.mainURL+'/orders.json');

            if(!res.ok){
                throw new Error('Something went wrong went fetching orders from the server');
            }
            const resData = await res.json();
            const storedOrders = [];

            for(const key in resData){
                let order = new Order(
                        key,
                        resData[key].cartItems,
                        resData[key].totalCost,
                       new Date(resData[key].date),
                 );
                storedOrders.push(order);
            }

            dispatch({type: FETCH_ORDERS, orders: storedOrders});

        } catch(err){
            throw err;
        }

    }
}

export const addOrder = (cartItems, totalCost) => {
    const createdAt = new Date();
    return async dispatch=> {
        try{
            const res = await fetch(urls.mainURL+'/orders.json', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  cartItems,
                  totalCost,
                  date: createdAt.toISOString()
                })
            });
            const resData = await res.json();
            dispatch({
                type: ADD_ORDER,
                orderData: {
                    id: resData.name,
                    items: cartItems,
                    cost: totalCost,
                    date: createdAt
                }
            });

        } catch(err){
            throw(err);
        }

    }

}