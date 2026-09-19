import { useState } from "react";
import { useDispatch } from "react-redux";
import Product from "../Product";
import {
  Button,
  CloseButton,
  Container,
  Image,
  List,
  Modal,
  ModalContent,
  Overlay,
  Text,
  Title,
} from "./styles";
import closeBtn from "../../assets/icons/close.svg";
import { add, open } from "../../store/reducers/cart";

type Props = {
  cardapio?: Prato[];
};

function ProductsList({ cardapio }: Props) {
  const dispatch = useDispatch();
  const addToCart = (prato: Prato) => {
    dispatch(add(prato));
    handleCloseModal();
    dispatch(open());
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Prato | null>(null);

  function handleOpenModal(prato: Prato) {
    setSelectedProduct(prato);
    setModalIsOpen(true);
  }

  function handleCloseModal() {
    setModalIsOpen(false);
    setSelectedProduct(null);
  }

  const priceFormat = (price = 0) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  return (
    <>
      <Container>
        <Modal>
          <ModalContent className={modalIsOpen ? "visible" : ""}>
            <CloseButton>
              <img src={closeBtn} onClick={() => setModalIsOpen(false)} />
            </CloseButton>
            <Image src={selectedProduct?.foto} alt={selectedProduct?.nome} />
            <div>
              <Title>{selectedProduct?.nome}</Title>
              <Text>{selectedProduct?.descricao}</Text>
              <Text>{selectedProduct?.porcao}</Text>
              {selectedProduct && (
                <Button onClick={() => addToCart(selectedProduct)}>
                  Adicionar ao carrinho - {priceFormat(selectedProduct?.preco)}
                </Button>
              )}
            </div>
          </ModalContent>
        </Modal>
        <List>
          {cardapio?.map((prato) => (
            <Product
              key={prato.id}
              prato={prato}
              onClick={() => handleOpenModal(prato)}
            />
          ))}
        </List>
      </Container>
      <Overlay
        className={modalIsOpen ? "visible" : ""}
        onClick={() => handleCloseModal()}
      />
    </>
  );
}

export default ProductsList;
