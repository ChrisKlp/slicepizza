import {
  Flex,
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
  Button,
  Divider,
} from '@chakra-ui/react';
import { AllPizzas_pizzas } from 'types/AllPizzas';
import Image from 'next/image';
import formatMoney from 'lib/formatMoney';
import { useCart } from 'components/Cart/CartContext';
import formatCartItem from 'lib/formatCartItem';

type PizzaCardProps = {
  data: AllPizzas_pizzas;
};

const PizzaCard: React.FC<PizzaCardProps> = ({ data }) => {
  const { addToCart, incrementQuantity, state } = useCart();

  const existingItem = state.items.find(item => item.id === data.id);

  const handleAddClick = () => {
    if (existingItem) {
      return incrementQuantity(data.id);
    }

    const item = formatCartItem(data);
    addToCart(item);
  };

  return (
    <Box bg="white" p={{ md: 6 }} rounded={{ md: 8 }}>
      <Flex
        direction={{ md: 'column' }}
        align={{ md: 'center' }}
        h={{ md: 'full' }}
      >
        <Box
          position="relative"
          w={['100px', '120px']}
          h={['100px', '120px']}
          flexShrink={0}
          display={{ md: 'none' }}
        >
          <Image src={data.image?.formats.thumbnail.url} layout="fill" />
        </Box>
        <Box
          position="relative"
          w="182px"
          h="182px"
          flexShrink={0}
          mb={2}
          display={{ base: 'none', md: 'block' }}
        >
          {data.image?.url && <Image src={data.image.url} layout="fill" />}
        </Box>
        <Grid
          ml={[2, null, 0]}
          templateRows={{ base: 'repeat(3, auto)', md: 'auto 1fr auto auto' }}
          templateColumns={{ base: 'auto 65px', md: '1fr' }}
          w="full"
          justifyItems={{ md: 'center' }}
          gap={{ base: 2, md: 3 }}
          h="full"
        >
          <GridItem>
            <Heading
              as="p"
              letterSpacing={-1}
              fontSize={{ base: 'xl', md: '2xl' }}
            >
              {data.title}
            </Heading>
          </GridItem>
          <GridItem
            justifySelf={['end', null, 'unset']}
            rowStart={{ base: 'auto', md: 3 }}
            rowEnd={{ base: 'auto', md: 4 }}
          >
            <Heading
              as="p"
              color="red.500"
              fontSize={{ base: 'xl', md: '2xl' }}
            >
              {formatMoney(data.price)}
            </Heading>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <Text
              fontSize="sm"
              color="gray.600"
              mb={2}
              textAlign={{ md: 'center' }}
            >
              {data.toppings}
            </Text>
          </GridItem>
          <GridItem
            colSpan={{ base: 2, md: 1 }}
            justifySelf={['end', null, 'unset']}
          >
            <Button
              size="sm"
              display={['block', 'none']}
              onClick={handleAddClick}
              disabled={existingItem && existingItem.quantity >= 99}
            >
              Add
            </Button>
            <Button
              display={['none', 'block']}
              onClick={handleAddClick}
              disabled={existingItem && existingItem.quantity >= 99}
            >
              Add to Cart
            </Button>
          </GridItem>
        </Grid>
      </Flex>
      <Divider my={4} display={{ md: 'none' }} />
    </Box>
  );
};

export default PizzaCard;
