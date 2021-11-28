import BusIcon from "@components/Icon/BusIcon";
import MeIcon from "@components/Icon/MeIcon";
import Context from "@context/BusNearby/context";
import Point from "@customTypes/Point";
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
  const [point, setPoint] = useState<Point>({ x: NaN, y: NaN });
  const [radius, setRadius] = useState(100);

  const { Content, Footer, Sider } = Layout;

  const { value: debouncePoint } = useDebounce(point, 2000);

  const { value: debounceRadius } = useDebounce(radius, 800);

  //FIXME userLocation type
  const { data: userLocation }: any = useGeoLocation({
    onSuccess: (userLocation: any) => {
      console.log(userLocation);
      setPoint(userLocation);
    },
  });

  const { data: StationData, isLoading } = useStationNearBy({ position: debouncePoint, radius: debounceRadius });

  return (
    <Layout>
      <Context.Provider
        value={{
          point,
          setPoint,
          radius,
          setRadius,
        }}
      >
        <Header />
        <Layout style={{ height: `calc(100vh - 100px)` }}>
          <Sider
            collapsible
            collapsedWidth="80"
            theme="light"
            width="400"
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
                  {item?.Stops?.map(({ RouteName, RouteID }: any, idx: number) => {
                    return (
                      <Menu.Item key={idx} title={`${RouteName.Zh_tw}`}>
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
              {point.x && point.y && <Marker position={point} IconComponent={<MeIcon />} />}
              {point.x && point.y && radius && <Circle position={point} radius={radius} />}
            </Map>
          </Content>
        </Layout>
      </Context.Provider>
    </Layout>
  );
};

export default BusNearBy;
