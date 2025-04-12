import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000";
    const [token, setToken] = useState("");

    const logoutUser = () => {
        sessionStorage.removeItem("token");
        setToken("");
    };

    // Check for saved token on initial load
    useEffect(() => {
        const savedToken = sessionStorage.getItem("token");
        if (savedToken) {
            setToken(savedToken);
            const savedCart = localStorage.getItem("cartItems");
            if (savedCart) {
                setCartItems(JSON.parse(savedCart));
            }
        }
    }, []);

    // Sync cart items with localStorage when cart changes
    useEffect(() => {
        if (token) {
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
        } else {
            localStorage.removeItem("cartItems");
        }
    }, [cartItems, token]);

    // Sync token to sessionStorage whenever it changes
    useEffect(() => {
        if (token) {
            sessionStorage.setItem("token", token);
        } else {
            sessionStorage.removeItem("token");
        }
    }, [token]);

    const addToCart = async (itemId) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev, [itemId]: (prev[itemId] || 0) + 1 };
            return updatedCart;
        });

        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev, [itemId]: Math.max((prev[itemId] || 0) - 1, 0) };
            return updatedCart;
        });

        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    };

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
