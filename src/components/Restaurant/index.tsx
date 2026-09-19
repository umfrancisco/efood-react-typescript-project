import Tag from "../Tag";
import {
  BackgroundImg,
  Card,
  Container,
  TitleContainer,
  Title,
  Text,
  Infos,
} from "./styles";
import star from "../../assets/images/star.svg";

type Props = {
  id: number;
  imgUrl: string;
  title: string;
  description: string;
  infos: string[];
  review: number;
};

function Restaurant({ id, imgUrl, title, description, infos, review }: Props) {
  return (
    <Container>
      <BackgroundImg style={{ backgroundImage: `url(${imgUrl})` }} />
      <Infos>
        {infos.map((info) => (
          <Tag key={info} children={info} />
        ))}
      </Infos>
      <Card>
        <TitleContainer>
          <Title>{title}</Title>
          <div>
            <Title>{review}</Title>
            <img src={star} />
          </div>
        </TitleContainer>
        <Text>{description}</Text>
        <Tag path={`/restaurant/${id}`} />
      </Card>
    </Container>
  );
}

export default Restaurant;
