import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';

export type TCartItem = {
  id: string;
  title: string;
  toppings: string;
  price: number;
  imageUrl: string;
  quantity: number;
};

export type TState = {
  items: TCartItem[];
  shipping: number;
  total: number;
};

const initialState: TState = {
  items: [],
  shipping: 10,
  total: 0,
};

type TAction =
  | { type: 'ADD_ITEM'; payload: TCartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'INCREMENT'; payload: string }
  | { type: 'DECREMENT'; payload: string }
  | { type: 'CALC_TOTAL' }
  | { type: 'CLEAN_CART' };

type TContext = {
  state: TState;
  addToCart: (item: TCartItem) => void;
  removeFromCart: (id: string) => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  cleanCart: () => void;
};

const CartContext = createContext({});

export const useCart = () => {
  return useContext(CartContext) as TContext;
};

const reducer: React.Reducer<TState, TAction> = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case 'INCREMENT':
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === action.payload) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        }),
      };
    case 'DECREMENT':
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === action.payload) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        }),
      };
    case 'CALC_TOTAL':
      return {
        ...state,
        total: state.items.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        ),
      };
    case 'CLEAN_CART':
      return { ...initialState };
    default:
      return state;
  }
};

export const CartProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const calculateTotal = useCallback(() => {
    dispatch({ type: 'CALC_TOTAL' });
  }, [dispatch]);

  useEffect(() => {
    calculateTotal();
  }, [calculateTotal, state.items]);

  const addToCart = useCallback(
    (item: TCartItem) => {
      dispatch({ type: 'ADD_ITEM', payload: item });
    },
    [dispatch]
  );

  const removeFromCart = useCallback(
    (id: string) => {
      dispatch({ type: 'REMOVE_ITEM', payload: id });
    },
    [dispatch]
  );

  const incrementQuantity = useCallback(
    (id: string) => {
      dispatch({ type: 'INCREMENT', payload: id });
    },
    [dispatch]
  );

  const decrementQuantity = useCallback(
    (id: string) => {
      dispatch({ type: 'DECREMENT', payload: id });
    },
    [dispatch]
  );

  const cleanCart = useCallback(() => {
    dispatch({ type: 'CLEAN_CART' });
  }, [dispatch]);

  return (
    <CartContext.Provider
      value={{
        state,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        cleanCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
