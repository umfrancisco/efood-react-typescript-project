import { Container, Logo, Social, Text } from "./styles";
import logo from "../../assets/icons/logo.svg";
import instagram from "../../assets/icons/instagram.svg";
import facebook from "../../assets/icons/facebook.svg";
import twitter from "../../assets/icons/twitter.svg";

function Footer() {
  return (
    <Container>
      <Logo src={logo} alt="logo" />
      <Social>
        <img src={instagram} alt="instagram" />
        <img src={facebook} alt="facebook" />
        <img src={twitter} alt="twitter" />
      </Social>
      <Text>
        A efood é uma plataforma para divulgação de estabelecimentos, a
        responsabilidade pela entrega, qualidade <br /> dos produtos é toda do
        estabelecimento contratado.
      </Text>
    </Container>
  );
}

export default Footer;
