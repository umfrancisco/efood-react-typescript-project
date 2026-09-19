import styled from "styled-components";
import { cores } from "../../styles";

export const Card = styled.div`
  background-color: ${cores.rosa};
  margin-bottom: 32px;
  position: relative;

  div {
    padding: 8px;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 167px;
  object-fit: cover;
  margin-bottom: 8px;
`;

export const Title = styled.h2`
  color: ${cores.branco};
  font-size: 16px;
  margin-bottom: 8px;
`;

export const Text = styled.p`
  margin-bottom: 8px;
  padding-bottom: 48px;
  font-size: 14px;
  line-height: 22px;
  color: ${cores.branco};
`;

export const ButtonContainer = styled.div`
  background-color: ${cores.rosaClaro};
  width: 95%;
  bottom: 8px;
  text-align: center;
  cursor: pointer;
  position: absolute;
`;

export const Button = styled.a`
  color: ${cores.rosa};
  font-weight: bold;
  font-size: 14px;
`;
