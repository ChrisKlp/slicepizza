import { initializeApollo } from 'lib/apolloClient';
import { ALL_PIZZAS, HERO, LOGO } from 'lib/queries';
import { AllPizzas } from 'types/AllPizzas';
import { Logo } from 'types/Logo';
import { Hero } from 'components';
import { Hero as THero } from 'types/Hero';

type HomePageProps = {
  pizzas: AllPizzas;
  logo: Logo;
  hero: THero;
};

const HomePage: React.FC<HomePageProps> = props => {
  console.log(props);

  return (
    <>
      <Hero data={props.hero} />
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

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      pizzas: data,
      hero: hero,
    },
  };
}
