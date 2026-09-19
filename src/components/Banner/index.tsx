import { Container, MainTitle, Overlay, SecondaryTitle } from "./styles";

type Props = {
  restaurant?: Restaurant;
};

function Banner({ restaurant }: Props) {
  return (
    <>
      <Container style={{ backgroundImage: `url(${restaurant?.capa})` }}>
        <Overlay />
        <div className="container">
          <SecondaryTitle>{restaurant?.tipo}</SecondaryTitle>
          <MainTitle>{restaurant?.titulo}</MainTitle>
        </div>
      </Container>
    </>
  );
}

export default Banner;
