import Header from "../../components/Header";
import Footer from "../../components/Footer";
import RestaurantList from "../../components/RestaurantList";
import { useGetRestaurantsQuery } from "../../services/api";

function Home() {
  const { data: restaurants } = useGetRestaurantsQuery();

  if (restaurants) {
    return (
      <>
        <Header isHome={true} />
        <RestaurantList restaurants={restaurants} />
        <Footer />
      </>
    );
  }

  return (
    <div>
      <p>Carregando...</p>
    </div>
  );
}

export default Home;
