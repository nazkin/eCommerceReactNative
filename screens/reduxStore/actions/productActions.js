import urls from '../../../constants/httpRequests';
import Product from '../../../models/products';

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

export const fetchProducts = ()=> {
    return async dispatch => {
        try {
            //send an async request to database
            const res = await fetch(urls.productsURL);

            if(!res.ok){
                throw new Error('Something went wrong when fetching products from the server');
            }
            const resData = await res.json();
            const storedProducts = [];

            for(const key in resData){
                let product = new Product(
                        key,
                        'u1',
                        resData[key].title,
                        resData[key].image,
                        resData[key].desc,
                        +resData[key].price
                 );
                storedProducts.push(product);
            }

            dispatch({type: FETCH_PRODUCTS, products: storedProducts});

        } catch(err){
            throw err;
        }

    }
}

export const deleteProduct = (id) => {
    return async dispatch=> {
        try{
            await fetch(urls.mainURL+`/products/${id}.json`, {
                method: 'DELETE',
            });
            dispatch({type: DELETE_PRODUCT, productId: id});
        }catch(err){
            throw err;
        }

    }
     
}
export const createProduct = (title, image, price, desc)=> {
    return async dispatch => {
        //send an async request to database
        try{
            const res = await fetch(urls.productsURL, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    image,
                    price,
                    desc
                })
            });
            const resData = await res.json();
            
            dispatch({
                type: CREATE_PRODUCT,
                data: {
                    id: resData.name,
                    title,
                    image,
                    price, 
                    desc
                }
            });
        }catch(err){
            throw err;
        }

    };
};
export const updateProduct = (id, title, image, desc)=> {
    return async dispatch=> {
        try{
            const res = await fetch(urls.mainURL+`/products/${id}.json`, {
                method: 'PATCH',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    image,
                    desc
                })
            });
            const resData = await res.json();
            
            dispatch({
                type: UPDATE_PRODUCT,
                data: {
                    id: resData.name,
                    title,
                    image, 
                    desc
                }
            });
        }catch(err){
            throw err;
        }
    }

}