import { Button, Flex, Heading, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { FiUser } from 'react-icons/fi';
import { FooterBanner as TFooterBanner } from 'types/FooterBanner';

type FooterBannerProps = {
  data: TFooterBanner;
};

const FooterBanner: React.FC<FooterBannerProps> = ({ data }) => {
  return (
    <Flex
      align={{ base: 'flex-start', lg: 'center' }}
      h={['300px', null, '330px']}
      w={['full', null, '90%']}
      maxW="1440px"
      mx={[0, null, 'auto']}
      mt={{ md: 8 }}
      position="relative"
      bgImage={[
        `url('${
          data.footerBanner?.image?.formats &&
          data.footerBanner.image.formats.medium.url
        }')`,
        null,
        `url('${
          data.footerBanner?.image?.url && data.footerBanner.image.url
        }')`,
      ]}
      bgSize={['cover', null, null, '1440px']}
      bgRepeat="no-repeat"
      bgPosition={['center', null, 'left']}
      rounded={{ md: 12 }}
      overflow="hidden"
      zIndex={0}
    >
      <VStack
        align="flex-start"
        p={[8, 12, 14]}
        ml={{ base: 0, lg: 8 }}
        maxW={{ base: 80, lg: 96 }}
      >
        <Heading
          color="white"
          fontSize={['4xl', null, '5xl']}
          pb={4}
          lineHeight="110%"
        >
          {data.footerBanner?.title}
        </Heading>
        <Link href="/signup" passHref>
          <Button as="a" rightIcon={<FiUser />} px={8} h={12}>
            Create account
          </Button>
        </Link>
      </VStack>
    </Flex>
  );
};

export default FooterBanner;
