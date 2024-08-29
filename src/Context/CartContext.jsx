import axios from "axios";
import { createContext, useEffect, useState } from "react";
export let CartContext = createContext();




export default function CartContextProvider(props) {
    
    const [cartId, setcartId] = useState(0)

    const [numberItems, setnumberItems] = useState(0)

    let headers = {
        token: localStorage.getItem("userToken")
    }


    async function addProductToCard(productId) {
        try {
            const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
                productId: productId,
            }, {
                headers: {
                    token: localStorage.getItem("userToken")
                }
            });
            return res;
        } catch (err) {
            return err;
        }
    }

    async function getLoggedUserCart() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers }).then((res) => {
            // console.log(res.data.data);
            setnumberItems(res.data.numOfCartItems)
            // console.log(res.data.numOfCartItems );
            setcartId(res.data.data._id)
            return res;
        }).catch((err) => err);
    }


    async function updateCartProductQuantity(productId, newCount) {
        try {
            const res = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count: newCount }, { headers });
            return res;
        } catch (err) {
            return err;
        }
    }

    async function deleteCartItem(productId) {
        try {
            const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers });
            return res;
        } catch (err) {
            return err;
        }
    }

    function checkout(cartId, url, formData) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`, {
            shippingAddress: formData
        }, {
            headers ,
        }).then((res) => res).catch((err) => err)
    }


    useEffect(()=> {
        getLoggedUserCart()
    }, [])
    return <CartContext.Provider value={{ addProductToCard, getLoggedUserCart,  updateCartProductQuantity, deleteCartItem, checkout, cartId, setnumberItems, numberItems}}>
        {props.children}
    </CartContext.Provider>
} 