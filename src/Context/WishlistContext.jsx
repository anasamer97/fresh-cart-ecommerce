import axios from "axios";
import { createContext, useEffect, useState } from "react";
export let WishlistContext = createContext();



export default function WishlistContextProvider(props) {

    const [wishlistItems, setWishListitems] = useState(0)

    let headers = {
        token: localStorage.getItem("userToken")
    }


    async function getLoggedUserWishlist() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers }).then((res) => {
            console.log(res)
            setWishListitems(res.data.data.length)
            console.log(res.data.data.length );
            return res;
        }).catch((err) => err);
    }

    async function addProductToWishlist(productId) {
        try {
            const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
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


    async function deleteFromWishlist(productId) {
        try {
            const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers });
            return res;
        } catch (err) {
            return err;
        }
    
        
      }

    return <WishlistContext.Provider value={{addProductToWishlist, getLoggedUserWishlist, wishlistItems, setWishListitems, deleteFromWishlist}}>
        {props.children}
        </WishlistContext.Provider>

}