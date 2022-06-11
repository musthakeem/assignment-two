
// Get Products

const url = 'https://fakestoreapi.com'

export const getProducts = async () => {
    const response = await fetch(`${url}/products`);
    if (response.ok){
        return await response.json();
    }else{
        return Error("Network Error")
    }
}

export const getProductDetails = async (id) => {
    const response = await fetch(`${url}/products/${id}`);
    if (response.ok){
        return await response.json();
    }else{
        return Error("Network Error")
    }
}

export const getCategoryProducts = async (category) => {
    const response = await fetch(`${url}/products/category/${category}`);
    if (response.ok){
        return await response.json();
    }else{
        return Error("Network Error")
    }
}