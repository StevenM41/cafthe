import { createContext, useContext, useEffect, useState } from "react";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem("cartItems");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCard = (item) => {
        setCartItems((prevCartItems) => {
            const existingItemIndex = prevCartItems.findIndex((cartItem) => cartItem.articleID === item);

            const updatedCartItems = [...prevCartItems];

            if (existingItemIndex !== -1) {
                updatedCartItems[existingItemIndex] = { ...updatedCartItems[existingItemIndex], Quantite: updatedCartItems[existingItemIndex].Quantite + 1 };
            } else {
                updatedCartItems.push({ articleID: item, Quantite: 1 });
            }

            return updatedCartItems;
        });
    };

    const addQuantity = (article) => {
        setCartItems((prevCartItems) => {
            const updatedCartItems = prevCartItems.map(cartItem =>
                cartItem.articleID === article
                    ? { ...cartItem, Quantite: cartItem.Quantite + 1 }
                    : cartItem

            );
            localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
            return updatedCartItems;
        });
    };

    const removeQuantity = (article) => {
        setCartItems((prevCartItems) => {
            const updatedCartItems = prevCartItems.map(cartItem =>
                cartItem.articleID === article && cartItem.Quantite > 0 ? { ...cartItem, Quantite: cartItem.Quantite - 1 } : cartItem
            ).filter(cartItem => cartItem.Quantite >= 0);
            localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
            return updatedCartItems;
        });
    };

    const removeArticle = (id) => {
        setCartItems((prevCartItems) =>
            prevCartItems.filter((cartItem) => cartItem.articleID !== id)
        );

    };

    const clearCard = () => {
        setCartItems([]);
        localStorage.setItem("cartItems", JSON.stringify([]));
    };

    const countArticle = () => {
        return cartItems.length;
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCard, clearCard, countArticle, addQuantity, removeArticle, removeQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
