import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { getCartThunk, setCart } from './cart.slice';
import { setIsLoading } from './isLoading.slice';

export const purchasesSlice = createSlice({
    name: 'purchases',
    initialState: [],
    reducers: {
        setPurchases: (state, action) => {
            return action.payload
        }
    }
})

export const getPurchasesThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/purchases', getConfig())
        .then((res) => dispatch(setPurchases(res.data.data.purchases)))
        .catch(error => console.log(error.response)) 
        .finally(() => dispatch(setIsLoading(false)));
}

export const addCartThunk = (purchase) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post(
        'https://ecommerce-api-react.herokuapp.com/api/v1/cart', 
        purchase, 
        getConfig()
    )
    .then(() => dispatch(getCartThunk()))
        .catch(error => console.log(error.response)) 
    .finally(() => dispatch(setIsLoading(false)));
}

export const purchaseCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/purchases', {}, getConfig())
        .then(() => dispatch(setCart([])))
        // .catch(error => console.log(error.response)) 
        .finally(() => dispatch(setIsLoading(false)));
}
// console.log(setPurchase)
export const { setPurchases } = purchasesSlice.actions;
export default purchasesSlice.reducer;

