import DefaultHeader from "@components/Header";
import Context from "@context/BusNearby/context";
import { Input, Spin } from "antd";
import { useContext } from "react";

const Header = () => {
  const { longitude, setLongitude, latitude, setLatitude, radius, setRadius, isGeoLoading } = useContext(Context);

  return (
    <DefaultHeader>
      <Input style={{ width: 100 }} value={longitude} placeholder="請輸入經度" onChange={(e) => setLongitude(e.target.value)} />
      <Input style={{ width: 100 }} value={latitude} placeholder="請輸入緯度" onChange={(e) => setLatitude(e.target.value)} />
      <Input style={{ width: 100 }} value={radius} placeholder="請輸入半徑" onChange={(e) => setRadius(Number(e.target.value))} />
      <Spin spinning={isGeoLoading} />
    </DefaultHeader>
  );
};

export default Header;
