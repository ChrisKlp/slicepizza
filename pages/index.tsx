import { initializeApollo } from 'lib/apolloClient';
import { ALL_PIZZAS, LOGO } from 'lib/queries';
import { AllPizzas } from 'types/AllPizzas';
import { Logo } from 'types/Logo';

type HomePageProps = {
  pizzas: AllPizzas;
  logo: Logo;
};

const HomePage: React.FC<HomePageProps> = props => {
  console.log(props);

  return (
    <div>
      <p>Hello</p>
    </div>
  );
};

export default HomePage;

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: ALL_PIZZAS,
  });

  const { data: logo } = await apolloClient.query({
    query: LOGO,
  });

  return {
    props: {
      // initialApolloState: apolloClient.cache.extract(),
      pizzas: data,
      logo,
    },
  };
}
