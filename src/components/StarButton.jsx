import { StarFilled, StarOutlined } from "@ant-design/icons";
import { Button } from "antd";

export const StarButton = ({ pokemon, onClick }) => {


    if (pokemon) {
        const Icon = pokemon.isFavorite ? <StarFilled /> : <StarOutlined />;
        return <Button icon={Icon} onClick={onClick} ></Button>
    }
    return <Button icon={<StarOutlined />} onClick={onClick} ></Button>
}

