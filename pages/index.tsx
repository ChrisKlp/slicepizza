import { FooterBanner, Hero, PizzaList } from 'components';
import { initializeApollo } from 'lib/apolloClient';
import { ALL_PIZZAS, FOOTER_BANNER, HERO, LOGO } from 'lib/queries';
import { GetStaticProps } from 'next';
import { AllPizzas } from 'types/AllPizzas';
import { FooterBanner as TFooterBanner } from 'types/FooterBanner';
import { Hero as THero } from 'types/Hero';
import { Logo } from 'types/Logo';

type HomePageProps = {
  pizzas: AllPizzas;
  logo: Logo;
  hero: THero;
  footerBanner: TFooterBanner;
};

const HomePage: React.FC<HomePageProps> = ({ hero, pizzas, footerBanner }) => {
  return (
    <>
      <Hero data={hero} />
      <PizzaList data={pizzas} />
      <FooterBanner data={footerBanner} />
    </>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  const { data: pizzas } = await apolloClient.query({
    query: ALL_PIZZAS,
  });

  const {
    data: { logo },
  } = await apolloClient.query({
    query: LOGO,
  });

  const { data: hero } = await apolloClient.query({
    query: HERO,
  });

  const { data: footerBanner } = await apolloClient.query({
    query: FOOTER_BANNER,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      pizzas,
      hero,
      footerBanner,
      logo,
    },
  };
};
