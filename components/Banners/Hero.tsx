import { Box, Button, Flex, Heading, VStack, Text } from '@chakra-ui/react';
import React from 'react';
import { Hero as THero } from 'types/Hero';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from 'components/Cart/CartContext';
import formatCartItem from 'lib/formatCartItem';

type HeroProps = {
  data: THero;
};

const Hero: React.FC<HeroProps> = ({ data }) => {
  const { addToCart, incrementQuantity, state } = useCart();

  const existingItem = state.items.find(
    item => item.id === data.hero?.pizza?.id
  );

  const handleAddClick = () => {
    if (!data?.hero?.pizza) return;

    if (existingItem) {
      return incrementQuantity(data.hero.pizza.id);
    }

    const item = formatCartItem(data.hero.pizza);
    addToCart(item);
  };

  return (
    <Flex
      align={{ base: 'flex-end', lg: 'center' }}
      h={['400px', null, '450px']}
      w={['full', null, '90%']}
      maxW="1440px"
      mx={[0, null, 'auto']}
      position="relative"
      bgImage={[
        `url('${
          data.hero?.image?.formats && data.hero.image.formats.medium.url
        }')`,
        null,
        `url('${data.hero?.image?.url && data.hero.image.url}')`,
      ]}
      bgSize={['cover', null, null, '1440px', '1800px']}
      bgRepeat="no-repeat"
      bgPosition={['center', null, 'left']}
      rounded={{ md: 12 }}
      overflow="hidden"
      zIndex={0}
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        w="full"
        h="full"
        bgGradient={'linear(to-b, rgba(0,0,0,0), rgba(0,0,0,0.6))'}
        zIndex={-1}
        display={{ lg: 'none' }}
      />
      <VStack
        align="flex-start"
        p={[8, 12, 14]}
        ml={{ base: 0, lg: 8 }}
        maxW={96}
      >
        <Heading
          color="white"
          fontSize={['4xl', null, '5xl', '6xl']}
          lineHeight="110%"
        >
          {data.hero?.title}
        </Heading>
        <Text color="white" pb={4}>
          {data.hero?.description}
        </Text>
        <Button
          rightIcon={<FiShoppingCart />}
          px={8}
          h={12}
          onClick={handleAddClick}
          disabled={existingItem && existingItem.quantity >= 99}
        >
          Add to Cart
        </Button>
      </VStack>
    </Flex>
  );
};

export default Hero;
