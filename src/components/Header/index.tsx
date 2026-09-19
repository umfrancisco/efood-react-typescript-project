import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, HeaderBar, RestaurantContainer, Title } from "./styles";
import logo from "../../assets/icons/logo.svg";
import { open } from "../../store/reducers/cart";
import type { RootReducer } from "../../store";

export type Props = {
  isHome?: boolean;
};

function Header({ isHome }: Props) {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootReducer) => state.cart);

  const openCart = () => {
    dispatch(open());
  };

  if (isHome) {
    return (
      <HeaderBar>
        <Container>
          <img src={logo} alt="logo" />
          <Title>
            Viva experiências gastronômicas <br /> no conforto da sua casa
          </Title>
        </Container>
      </HeaderBar>
    );
  }
  return (
    <HeaderBar>
      <RestaurantContainer>
        <h2>
          <Link to="/">Restaurantes</Link>
        </h2>
        <img src={logo} alt="logo" />
        <button onClick={openCart}>
          {items.length} produto(s) no carrinho
        </button>
      </RestaurantContainer>
    </HeaderBar>
  );
}

export default Header;
