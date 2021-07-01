import { TCartItem } from 'context/CartContext';
import { AllPizzas_pizzas } from 'types/AllPizzas';
import { Hero_hero_pizza } from 'types/Hero';

const formatCartItem = (
  data: AllPizzas_pizzas | Hero_hero_pizza
): TCartItem => {
  return {
    id: data.id,
    imageUrl: data.image?.formats.thumbnail.url,
    price: data.price,
    quantity: 1,
    title: data.title,
  };
};

export default formatCartItem;
