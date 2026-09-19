import Restautant from "../Restaurant";
import { List } from "./styles";

export type Props = {
  restaurants: Restaurant[];
};

function RestaurantList({ restaurants }: Props) {
  const getTags = (restaurant: Restaurant) => {
    const tags = [];

    if (restaurant.destacado) {
      tags.push("Em destaque");
    }
    if (restaurant.tipo) {
      tags.push(restaurant.tipo);
    }
    return tags;
  };

  return (
    <div className="container">
      <List>
        {restaurants.map((restaurant) => (
          <Restautant
            key={restaurant.id}
            id={restaurant.id}
            imgUrl={restaurant.capa}
            infos={getTags(restaurant)}
            title={restaurant.titulo}
            description={restaurant.descricao}
            review={restaurant.avaliacao}
          />
        ))}
      </List>
    </div>
  );
}

export default RestaurantList;
