import DefaultHeader from "@components/Header";
import Context from "@context/BusNearby/context";
import { Input } from "antd";
import { useContext } from "react";

const Header = () => {
  const { point, setPoint, radius, setRadius } = useContext(Context);
  return (
    <DefaultHeader>
      <Input
        style={{ width: 200 }}
        value={`${point.y}, ${point.x}`}
        placeholder="請輸入 緯度, 經度"
        onChange={(e) => {
          const value = e.target.value;
          if (value.indexOf(",") === -1) {
            return null;
          }
          const [y, x] = value.split(",");
          setPoint({
            x: Number(x),
            y: Number(y),
          });
        }}
      />
      <Input style={{ width: 125 }} value={radius} placeholder="請輸入半徑" onChange={(e) => setRadius(Number(e.target.value))} />
    </DefaultHeader>
  );
};

export default Header;
