import { Center, Text } from '@chakra-ui/react';

const Footer: React.FC = () => {
  return (
    <Center my={8}>
      <Text color="blackAlpha.600" size="sm">
        Copyright © 2021 by Slice pizza
      </Text>
    </Center>
  );
};

export default Footer;
