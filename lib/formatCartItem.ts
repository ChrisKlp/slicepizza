import { TCartItem } from 'context/CartContext';
import { AllPizzas_pizzas } from 'types/AllPizzas';
import { CreateOrder_createOrder_order_pizzaOrder_pizza } from 'types/CreateOrder';
import { Hero_hero_pizza } from 'types/Hero';

const formatCartItem = (
  data:
    | AllPizzas_pizzas
    | Hero_hero_pizza
    | CreateOrder_createOrder_order_pizzaOrder_pizza,
  quantity?: number
): TCartItem => {
  return {
    id: data.id,
    imageUrl: data.image?.formats.thumbnail.url,
    price: data.price,
    quantity: quantity || 1,
    title: data.title,
    toppings: data.toppings,
  };
};

export default formatCartItem;
