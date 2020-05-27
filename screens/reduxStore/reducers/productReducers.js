import PRODUCTS from '../../../data/dummy'
import {DELETE_PRODUCT, UPDATE_PRODUCT, CREATE_PRODUCT} from '../actions/productActions'
import Product from '../../../models/products'

const initialState = {
    allProducts: PRODUCTS,
    usersProducts: PRODUCTS.filter(product => product.ownerId === 'u1')
}

const productReducer = (state = initialState, action) => {
    switch(action.type){
        case DELETE_PRODUCT:
            return{
                ...state,
                usersProducts: state.usersProducts.filter(product => product.id !== action.productId),
                allProducts: state.allProducts.filter(product => product.id !== action.productId)
            }
        case CREATE_PRODUCT:
            const createdProduct = new Product(new Date().toString(), 'u1', action.data.title, action.data.image, action.data.desc, action.data.price)
            return {
                ...state,
                allProducts: state.allProducts.concat(createdProduct),
                usersProducts: state.usersProducts.concat(createdProduct)
            }
        case UPDATE_PRODUCT:
            const pIndexUsers = state.usersProducts.findIndex(prod => prod.id === action.prodID);
            const pIndexAll = state.allProducts.findIndex(prod => prod.id === action.prodID)
            const updatedProduct = new Product(action.prodID,state.usersProducts[pIndexUsers].ownerId, action.data.title, action.data.image, action.data.desc, state.usersProducts[pIndexUsers].price)
            
            const updateUserProducts = [...state.usersProducts];
            updateUserProducts[pIndexUsers] = updatedProduct;

            const updateAllProducts = [...state.allProducts];
            updateAllProducts[pIndexAll] = updatedProduct;

            return {
                ...state,
                allProducts: updateAllProducts,
                usersProducts: updateUserProducts
            }

        default: 
            return state;
    }
}

export default productReducer;