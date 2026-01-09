import { create } from 'zustand';
import type { FoodItem, CartItem } from '../types';

interface CartState {
  items: CartItem[];
  addItem: (food: FoodItem) => void;
  removeItem: (foodId: string) => void;
  updateQuantity: (foodId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (food: FoodItem) => {
    set(state => {
      const existingItem = state.items.find(item => item.foodItem.id === food.id);
      if (existingItem) {
        return {
          items: state.items.map(item =>
            item.foodItem.id === food.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      }
      return {
        items: [...state.items, { foodItem: food, quantity: 1 }],
      };
    });
  },

  removeItem: (foodId: string) => {
    set(state => ({
      items: state.items.filter(item => item.foodItem.id !== foodId),
    }));
  },

  updateQuantity: (foodId: string, quantity: number) => {
    if (quantity <= 0) {
      get().removeItem(foodId);
      return;
    }
    set(state => ({
      items: state.items.map(item =>
        item.foodItem.id === foodId ? { ...item, quantity } : item
      ),
    }));
  },

  clearCart: () => {
    set({ items: [] });
  },

  getTotalPrice: () => {
    return get().items.reduce((total, item) => total + item.foodItem.price * item.quantity, 0);
  },

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
}));
