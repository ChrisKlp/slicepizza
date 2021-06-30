import { Box, Heading, SimpleGrid, Container } from '@chakra-ui/react';
import React from 'react';
import { AllPizzas } from 'types/AllPizzas';
import PizzaCard from './PizzaCard';

type PizzaListProps = {
  data: AllPizzas;
};

const PizzaList: React.FC<PizzaListProps> = ({ data }) => {
  return (
    <Box>
      <Container>
        <Heading
          letterSpacing={[-1, null, -2]}
          color="red.900"
          my={[8, null, 12]}
          textAlign={['center', null, 'left']}
          fontSize={['2xl', null, '4xl']}
        >
          Discover Our Menu
        </Heading>
      </Container>
      <SimpleGrid
        bg={['white', null, 'unset']}
        pt={[6, null, 0]}
        pb={6}
        maxW="1440px"
        mx="auto"
        px={{ base: '5%', md: 0 }}
        w={{ md: '90%' }}
        minChildWidth={{ md: '300px' }}
        spacing={{ md: '30px' }}
      >
        {data.pizzas?.map(
          pizza => pizza && <PizzaCard key={pizza?.id} data={pizza} />
        )}
      </SimpleGrid>
    </Box>
  );
};

export default PizzaList;
