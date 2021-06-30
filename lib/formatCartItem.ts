import { TCartItem } from 'components/Cart/CartContext';
import { AllPizzas_pizzas } from 'types/AllPizzas';

const formatCartItem = (data: AllPizzas_pizzas): TCartItem => {
  return {
    id: data.id,
    imageUrl: data.image?.formats.thumbnail.url,
    price: data.price,
    quantity: 1,
    title: data.title,
  };
};

export default formatCartItem;
