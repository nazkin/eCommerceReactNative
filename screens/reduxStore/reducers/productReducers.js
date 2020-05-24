import PRODUCTS from '../../../data/dummy'

const initialState = {
    allProducts: PRODUCTS,
    usersProducts: PRODUCTS.filter(product => product.ownerId === 'u1')
}

const productReducer = (state = initialState, action) => {
    return state
}

export default productReducer;