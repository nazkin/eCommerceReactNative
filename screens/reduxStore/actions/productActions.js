export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";


export const deleteProduct = (id) => {
    return {type: DELETE_PRODUCT, productId: id}
}
export const createProduct = (title, image, price, desc)=> {
    return {
            type: CREATE_PRODUCT,
            data: {
                title,
                image,
                price, 
                desc
            }
    }
}
export const updateProduct = (id, title, image, desc)=> {
    return {
        type: UPDATE_PRODUCT,
        prodID: id,
        data: {
            title,
            image,
            desc
        }
    }
}