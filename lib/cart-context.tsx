"use client";

import React, { createContext, useContext, useReducer, useEffect, useCallback } from "react";

export interface CartItem {
  id?: string;
  productId: string;
  slug?: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  material?: string;
  finish?: string;
  image?: string;
  product?: any;
  variantId?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { id?: string; productId?: string; size?: string; material?: string; finish?: string; variantId?: string } }
  | { type: "UPDATE_QUANTITY"; payload: { id?: string; productId?: string; size?: string; material?: string; finish?: string; variantId?: string; quantity: number } }
  | { type: "CLEAR" }
  | { type: "TOGGLE_CART" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" }
  | { type: "HYDRATE"; payload: CartItem[] };

function getItemKey(item: CartItem): string {
  if (item.id) return item.id;
  if (item.variantId) return `${item.productId}-${item.variantId}`;
  return `${item.productId}-${item.size || 'std'}-${item.material || 'std'}-${item.finish || 'std'}`;
}

function matchesItem(item: CartItem, payload: { id?: string; productId?: string; size?: string; material?: string; finish?: string; variantId?: string }): boolean {
  if (payload.id && (item.id === payload.id || getItemKey(item) === payload.id)) {
    return true;
  }
  if (payload.productId && item.productId === payload.productId) {
    if (payload.variantId && item.variantId === payload.variantId) return true;
    if (payload.size && item.size !== payload.size) return false;
    if (payload.material && item.material !== payload.material) return false;
    if (payload.finish && item.finish !== payload.finish) return false;
    return true;
  }
  return false;
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const itemWithDefaults = {
        ...action.payload,
        id: action.payload.id || getItemKey(action.payload),
        product: action.payload.product || {
          name: action.payload.name,
          price: action.payload.price,
          color: '#ECEAE4',
        },
      };

      const key = getItemKey(itemWithDefaults);
      const existingIndex = state.items.findIndex((item) => getItemKey(item) === key);

      if (existingIndex > -1) {
        const newItems = [...state.items];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + action.payload.quantity,
        };
        return { ...state, items: newItems, isOpen: true };
      }

      return { ...state, items: [...state.items, itemWithDefaults], isOpen: true };
    }

    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter((item) => !matchesItem(item, action.payload)),
      };
    }

    case "UPDATE_QUANTITY": {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => !matchesItem(item, action.payload)),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          matchesItem(item, action.payload)
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    }

    case "CLEAR":
      return { ...state, items: [] };

    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };

    case "OPEN_CART":
      return { ...state, isOpen: true };

    case "CLOSE_CART":
      return { ...state, isOpen: false };

    case "HYDRATE":
      return {
        ...state,
        items: action.payload.map((item) => ({
          ...item,
          id: item.id || getItemKey(item),
          product: item.product || {
            name: item.name,
            price: item.price,
            color: '#ECEAE4',
          },
        })),
      };

    default:
      return state;
  }
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  isCartOpen: boolean;
  itemCount: number;
  totalItems: number;
  subtotal: number;
  cartTotal: number;
  addItem: (item: CartItem) => void;
  removeItem: (idOrProductId: string, sizeOrVariant?: string, material?: string) => void;
  updateQuantity: (idOrProductId: string, quantityOrVariantOrSize: any, maybeQuantity?: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "layerxyz-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
  });

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const items = JSON.parse(stored);
        if (Array.isArray(items)) {
          dispatch({ type: "HYDRATE", payload: items });
        }
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // Ignore storage errors
    }
  }, [state.items]);

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const addItem = useCallback((item: CartItem) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  }, []);

  const removeItem = useCallback((idOrProductId: string, sizeOrVariant?: string, material?: string) => {
    if (sizeOrVariant === undefined) {
      dispatch({ type: "REMOVE_ITEM", payload: { id: idOrProductId } });
    } else if (material === undefined) {
      dispatch({ type: "REMOVE_ITEM", payload: { productId: idOrProductId, variantId: sizeOrVariant } });
    } else {
      dispatch({ type: "REMOVE_ITEM", payload: { productId: idOrProductId, size: sizeOrVariant, material } });
    }
  }, []);

  const updateQuantity = useCallback((idOrProductId: string, quantityOrVariantOrSize: any, maybeQuantity?: number) => {
    if (typeof quantityOrVariantOrSize === 'number') {
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { id: idOrProductId, quantity: quantityOrVariantOrSize },
      });
    } else if (typeof maybeQuantity === 'number') {
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { productId: idOrProductId, variantId: quantityOrVariantOrSize, quantity: maybeQuantity },
      });
    }
  }, []);

  const clearCart = useCallback(() => dispatch({ type: "CLEAR" }), []);
  const toggleCart = useCallback(() => dispatch({ type: "TOGGLE_CART" }), []);
  const openCart = useCallback(() => dispatch({ type: "OPEN_CART" }), []);
  const closeCart = useCallback(() => dispatch({ type: "CLOSE_CART" }), []);
  const setIsCartOpen = useCallback((open: boolean) => {
    if (open) dispatch({ type: "OPEN_CART" });
    else dispatch({ type: "CLOSE_CART" });
  }, []);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        isCartOpen: state.isOpen,
        itemCount,
        totalItems: itemCount,
        subtotal,
        cartTotal: subtotal,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        openCart,
        closeCart,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
