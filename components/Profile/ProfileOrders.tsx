import { Box, Divider, HStack, Text, Wrap, WrapItem } from '@chakra-ui/react';
import format from 'date-fns/format';
import formatMoney from 'lib/formatMoney';
import { UserInfo_user_orders } from 'types/UserInfo';

type ProfileOrdersProps = {
  data: UserInfo_user_orders;
  index: number;
};

const ProfileOrders: React.FC<ProfileOrdersProps> = ({ data, index }) => {
  return (
    <>
      <HStack spacing={6} w="full" align="flex-start">
        <Box fontSize="sm"> {index}.</Box>
        <Wrap w="full">
          {data.pizzaOrder?.map((pizza) => (
            <WrapItem key={pizza?.id}>
              <HStack>
                <Text fontSize="sm" fontWeight="bold">
                  {pizza?.pizza?.title}
                </Text>
                <Text fontSize="sm">x{pizza?.quantity},</Text>
              </HStack>
            </WrapItem>
          ))}
          <HStack w="full" justify="space-between">
            <Text fontSize="sm">
              {format(new Date(data.createdAt), 'yyyy-MM-dd')}
            </Text>
            <Text fontSize="sm" fontWeight="bold">
              Total: {data.grandTotal && formatMoney(data.grandTotal)}
            </Text>
          </HStack>
        </Wrap>
      </HStack>
      <Divider my={4} />
    </>
  );
};

export default ProfileOrders;
