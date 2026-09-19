import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import Banner from "../../components/Banner";
import ProductList from "../../components/ProductList";
import Footer from "../../components/Footer";
import { useGetRestaurantByIdQuery } from "../../services/api";
import Cart from "../../components/Cart";

function RestaurantComponent() {
  const { id } = useParams();
  const { data: restaurant } = useGetRestaurantByIdQuery(id!);

  if (restaurant) {
    return (
      <>
        <Cart />
        <Header isHome={false} />
        <Banner restaurant={restaurant} />
        <ProductList cardapio={restaurant?.cardapio} />
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

export default RestaurantComponent;
