import {createContext, useState} from "react";

export const CartContext = createContext({
    quantity: 0,
    addToCart: (q) => {},
});

export function CartProvider({children}) {
    const [quantity, setQuantity] = useState(0);

    const addToCart = (q) => {
        setQuantity(prevQuantity => prevQuantity + q);
    };

    return (
        <CartContext.Provider value={{ quantity, addToCart }}>
            {children}
        </CartContext.Provider>
    );
}