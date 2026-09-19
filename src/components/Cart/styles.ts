import styled from "styled-components";
import { breakpoints, cores } from "../../styles";
import trashCan from "../../assets/icons/trash-can.svg";

type Props = {
  displayMode?: string;
  maxWidth?: string;
};

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.7;
`;

export const CartContainer = styled.form`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
  justify-content: flex-end;
  z-index: 1;

  &.is-open {
    display: flex;
  }

  ul {
    padding-top: 16px;
  }
`;

export const CartItem = styled.li`
  display: flex;
  padding: 8px;
  margin: 16px 0;
  background-color: ${cores.rosaClaro};
  position: relative;

  img {
    height: 80px;
    width: 80px;
    object-fit: cover;
  }
`;

export const Infos = styled.div`
  margin-left: 8px;

  p {
    font-weight: bold;
    padding-bottom: 16px;
  }
`;

export const TotalPrice = styled.div`
  color: ${cores.rosaClaro};
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  margin: 16px 0;
`;

export const Checkout = styled.div`
  > p {
    color: ${cores.branco};
    font-size: 14px;
    line-height: 22px;
    margin-left: 8px;
    margin-right: 8px;
    margin-bottom: 24px;
  }

  &.is-hidden {
    display: none;
  }
`;

export const Sidebar = styled.aside`
  background-color: ${cores.rosa};
  max-width: 360px;
  width: 100%;
  padding-left: 8px;
  padding-right: 8px;
  z-index: 1;

  @media (max-width: ${breakpoints.desktop}) {
    max-width: 80%;
  }
`;

export const Button = styled.button`
  border: none;
  background-color: ${cores.rosaClaro};
  color: ${cores.rosa};
  font-weight: bold;
  max-width: 100%;
  width: 100%;
  padding: 4px 0;
  margin-bottom: 8px;
  cursor: pointer;
`;

export const TrashCan = styled.button`
  background-image: url(${trashCan});
  width: 16px;
  height: 16px;
  border: none;
  background-color: transparent;
  position: absolute;
  right: 8px;
  bottom: 8px;
  cursor: pointer;
`;

export const Title = styled.h4`
  margin-top: 32px;
  margin-bottom: 16px;
  margin-left: 8px;
  color: ${cores.branco};
`;

export const Form = styled.div`
  column-gap: 24px;
  color: white;
  margin-bottom: 24px;
`;

export const Row = styled.div<Props>`
  display: ${(props) => props.displayMode};
  column-gap: 24px;

  label {
    display: block;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  input {
    width: 100%;
    background-color: ${cores.branco};
    border: 1px solid ${cores.branco};
    padding: 8px;
    margin-bottom: 8px;
  }
`;

export const InputGroup = styled.div<Props>`
  max-width: ${(props) => props.maxWidth || "auto"};
  flex: auto;

  p {
    margin-bottom: 8px;
    font-size: 14px;
  }
`;

export const Warning = styled.p`
  color: ${cores.branco};
  margin: 32px 8px;
`;
