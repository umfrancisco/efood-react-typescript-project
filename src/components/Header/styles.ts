import styled from "styled-components";
import backgroundImg from "../../assets/images/Hero.png";
import { breakpoints, cores } from "../../styles";

export const HeaderBar = styled.header`
  background-image: url(${backgroundImg});
`;

export const Container = styled.div`
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  padding: 40px 0;

  @media (max-width: ${breakpoints.desktop}) {
    width: 80%;
  }
`;

export const Title = styled.h2`
  padding-top: 138px;
  font-size: 36px;
`;

export const RestaurantContainer = styled.div`
  margin: 0 auto;
  max-width: 1024px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding-bottom: 64px;
  padding-top: 40px;

  h2 {
    font-size: 18px;
  }

  button {
    border: none;
    background-color: transparent;
    font-size: 18px;
    font-weight: bold;
    color: ${cores.rosa};
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: ${cores.rosa};
  }

  @media (max-width: ${breakpoints.desktop}) {
    width: 80%;
  }

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;

    img {
      margin: 32px 0;
    }
  }
`;
