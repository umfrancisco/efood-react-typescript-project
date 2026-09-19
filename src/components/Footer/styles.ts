import styled from "styled-components";
import { breakpoints, cores } from "../../styles";

export const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  text-align: center;
  background-color: ${cores.vermelhoClaro};
`;

export const Logo = styled.img`
  padding-top: 40px;
  padding-bottom: 32px;
`;

export const Social = styled.div`
  margin-bottom: 80px;

  img {
    height: 24px;
    margin-right: 8px;
  }
`;

export const Text = styled.p`
  padding-bottom: 80px;

  @media (max-width: ${breakpoints.desktop}) {
    padding-right: 16px;
    padding-left: 16px;
  }
`;
