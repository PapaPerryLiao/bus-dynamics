import BusIcon from "@components/Icon/BusIcon";
import MeIcon from "@components/Icon/MeIcon";
import Context from "@context/BusNearby/context";
import useStationNearBy from "@services/hooks/useStationNearBy";
import useDebounce from "@utils/hooks/useDebounce";
import useGeoLocation from "@utils/hooks/useGeoLocation";
import { Layout, Menu } from "antd";
import dynamic from "next/dynamic";
import { useState } from "react";
import Header from "./Header";

const Map = dynamic(() => import("@components/Map"), { ssr: false });

const Marker = dynamic(() => import("@components/Map/Marker"), { ssr: false });
const Circle = dynamic(() => import("@components/Map/Circle"), { ssr: false });

const MultiMarker = dynamic(() => import("@components/Map/MultiMarker"), {
  ssr: false,
});

const BusNearBy = () => {
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [radius, setRadius] = useState(500);
  const [isGeoLoading, setIsGeoLoading] = useState(true);

  const { Content, Footer, Sider } = Layout;

  const { value: x } = useDebounce(longitude, 800);

  const { value: y } = useDebounce(latitude, 800);

  const { value: debounceRadius } = useDebounce(radius, 800);

  //FIXME userLocation type
  const { data: userLocation }: any = useGeoLocation({
    onSuccess: ({ x, y }: any) => {
      setLongitude(x.toString());
      setLatitude(y.toString());
      setIsGeoLoading(false);
    },
  });

  const { data: StationData, isLoading } = useStationNearBy({
    position: {
      x, y
    }, radius: debounceRadius
  });

  return (
    <Layout>
      <Context.Provider
        value={{
          longitude,
          setLongitude,
          latitude,
          setLatitude,
          radius,
          setRadius,
          isGeoLoading,
          setIsGeoLoading,
        }}
      >
        <Header />
        <Layout style={{ height: `calc(100vh - 100px)` }}>
          <Sider
            collapsible
            collapsedWidth="80"
            theme="light"
            width="375"
            breakpoint="xl"
            style={{
              overflow: "auto",
              paddingBottom: "50px",
              height: "100%",
            }}
            className="sider"
          >
            <Menu theme="light" defaultSelectedKeys={["4"]} mode="inline">
              {StationData?.map((item: any, index: number) => (
                <Menu.SubMenu key={index} title={`${item.StationName.Zh_tw}`}>
                  {item?.Stops?.map(({ RouteName, RouteID }: any) => {
                    return (
                      <Menu.Item key={`${item.StationID}_${RouteID}`} title={`${RouteName.Zh_tw}`}>
                        {`${RouteName.Zh_tw}`}
                      </Menu.Item>
                    );
                  })}
                </Menu.SubMenu>
              ))}
            </Menu>
          </Sider>
          <Content>
            <Map>
              {StationData && (
                <MultiMarker
                  dataList={StationData.map(({ StationPosition, StationName }: any) => ({
                    x: StationPosition.PositionLon,
                    y: StationPosition.PositionLat,
                    content: StationName.Zh_tw,
                  }))}
                  IconComponent={<BusIcon />}
                />
              )}
              {longitude && latitude && <Marker position={{ x: Number(longitude), y: Number(latitude) }} IconComponent={<MeIcon />} />}
              {longitude && latitude && radius && <Circle position={{ x: Number(longitude), y: Number(latitude) }} radius={radius} />}
            </Map>
          </Content>
        </Layout>
      </Context.Provider>
    </Layout>
  );
};

export default BusNearBy;
