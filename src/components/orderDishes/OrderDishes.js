import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { orderDishesChanged } from '../mainFoodList/foodsSlice';

import './orderDishes.scss'

const OrderDishes = () => {

    const { orderDishes } = useSelector(state => state.foods);
    const dispatch = useDispatch();

    const allOrders = {
        all: []
    }

    useEffect(() => {
        const allOrders = localStorage.getItem('allOrders')
        const allOrd = JSON.parse(allOrders)
        if (allOrd !== null) {
            dispatch(orderDishesChanged(allOrd.all));
        }
        // eslint-disable-next-line  
    }, [])


    const minusPlus = (newId, fun) => {

        let newOrders = []

        orderDishes.map(item => {

            const { id, count, ...props } = item

            if (id === newId) {

                if (fun === "minus") {

                    if (count !== 1) {
                        newOrders.push({
                            id,
                            ...props,
                            count: count - 1
                        })
                    } else {
                        let order = document.querySelector(`[ data-id=${id}]`)
                        order.classList = 'order'
                    }

                } else if (fun === "plus") {
                    newOrders.push({
                        id,
                        ...props,
                        count: count + 1
                    })
                }
            } else {
                newOrders.push(item)
            }
        })

        if (newOrders.length !== orderDishes.length) {
            setTimeout(() => {
                allOrders.all = newOrders
                localStorage.setItem('allOrders', JSON.stringify(allOrders))

                dispatch(orderDishesChanged(newOrders))

            }, 400)
        } else {
            allOrders.all = newOrders
            localStorage.setItem('allOrders', JSON.stringify(allOrders))

            dispatch(orderDishesChanged(newOrders))
        }
    }


    const showOrderDishes = (arr) => {

        setTimeout(() => {
            let orders = document.querySelectorAll('.order')

            orders.forEach(order => {
                order.classList = 'order order__left'
            })
        }, 300)

        if (arr.length === 0) {
            return <h5 className='notYet'>Not dishes yet</h5>
        } else if (arr.length > 0) {

            return arr.map((item) => {
                const { id, name, price, img, count } = item
                return (
                    <div key={id} className='order' data-id={id}>
                        <div className='order__img'>
                            <img src={img} alt="" />
                        </div>
                        <div className='order__p '>
                            <p>{name.length > 20 ? name.slice(0, 20) + `...` : name}</p>
                            <p>${(price * count).toFixed(2)}</p>
                            <div className='order__p__but'>
                                <button type="button" onClick={e => minusPlus(id, `minus`)}>-</button>
                                <p>{count}</p>
                                <button type="button" onClick={e => minusPlus(id, `plus`)}>+</button>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    }

    return (
        <>
            {showOrderDishes(orderDishes)}
        </>
    )
}

export default OrderDishes;