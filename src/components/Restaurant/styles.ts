import styled from "styled-components";
import { breakpoints, cores } from "../../styles";
import { TagButton, TagInfo } from "../Tag/styles";

const borders = `solid 2px ${cores.rosa}`;

export const Container = styled.div`
  margin-bottom: 48px;
  position: relative;

  ${TagButton} {
    position: absolute;
    left: 8px;
    bottom: 8px;
  }
`;

export const Infos = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;

  ${TagInfo} {
    margin-left: 8px;
  }
`;

export const Card = styled.section`
  background-color: ${cores.branco};
  height: 220px;
  border-bottom: ${borders};
  border-left: ${borders};
  border-right: ${borders};

  @media (max-width: ${breakpoints.desktop}) {
    height: 300px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    height: 280px;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;

  div {
    display: flex;
    align-items: center;
  }
`;

export const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-right: 8px;
`;

export const Text = styled.p`
  font-size: 14px;
  line-height: 22px;
  padding-top: 16px;
  padding-bottom: 48px;
  padding-left: 8px;
  padding-right: 8px;
`;

export const BackgroundImg = styled.div`
  width: 100%;
  height: 217px;
  background-repeat: no-repeat;
  background-size: cover;
`;
