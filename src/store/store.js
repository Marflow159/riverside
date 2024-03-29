import { configureStore } from '@reduxjs/toolkit';
import foods from '../components/mainFoodList/foodsSlice'
import orders from '../components/notificationOrders/ordersSlice'

const stringMiddleware = ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action)
};

const store = configureStore({
    reducer: {
        foods,
        orders
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;