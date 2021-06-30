import { initializeApollo } from 'lib/apolloClient';
import { ALL_PIZZAS, FOOTER_BANNER, HERO, LOGO } from 'lib/queries';
import { AllPizzas } from 'types/AllPizzas';
import { Logo } from 'types/Logo';
import { Hero, FooterBanner } from 'components';
import { Hero as THero } from 'types/Hero';
import { FooterBanner as TFooterBanner } from 'types/FooterBanner';

type HomePageProps = {
  pizzas: AllPizzas;
  logo: Logo;
  hero: THero;
  footerBanner: TFooterBanner;
};

const HomePage: React.FC<HomePageProps> = props => {
  return (
    <>
      <Hero data={props.hero} />
      <FooterBanner data={props.footerBanner} />
    </>
  );
};

export default HomePage;

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: ALL_PIZZAS,
  });

  await apolloClient.query({
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
      pizzas: data,
      hero,
      footerBanner,
    },
  };
}
