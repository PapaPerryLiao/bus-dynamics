import BusIcon from "@components/Icon/BusIcon";
import BusOrderIcon from "@components/Icon/BusOrderIcon";
import Context from "@context/BusRoute/context";
import useEstimatedTime from "@services/hooks/useEstimatedTime";
// import useEventSource from "@utils/hooks/useEventSource";
import useRouteGeometry from "@services/hooks/useRouteGeometry";
import useRouteInfo from "@services/hooks/useRouteInfo";
import useStopOfRoute from "@services/hooks/useStopOfRoute";
import useDebounce from "@utils/hooks/useDebounce";
import { Layout, Menu } from "antd";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import Header from "./Header";

const Map = dynamic(() => import("@components/Map"), { ssr: false });

const Marker = dynamic(() => import("@components/Map/Marker"), { ssr: false });

const MultiMarker = dynamic(() => import("@components/Map/MultiMarker"), {
  ssr: false,
});

const Polyline = dynamic(() => import("@components/Map/Polyline"), {
  ssr: false,
});

const BusRoute = () => {
  const [county, setCounty] = useState("Taipei");
  const [searchText, setSearchText] = useState("");
  const [direction, setDirection] = useState(0);
  // const [estimatedTime, setEstimatedTime] = useState<any[]>([]);

  const { value: routeName, isDelay } = useDebounce(searchText, 500);

  const { data: StopData, isLoading } = useStopOfRoute({
    county,
    routeName: routeName,
  });

  const { data: routeInfo } = useRouteInfo({
    county,
    routeName: routeName,
  });

  const { data: routeGeometry } = useRouteGeometry({
    county,
    routeName: routeName,
  });

  const { Content, Footer, Sider } = Layout;

  //// get estimated time by axios
  const { data: estimatedTime } = useEstimatedTime({
    county,
    routeName: routeName,
  });

  //// get estimated time by sse
  // useEventSource({
  //   url: `api/tdx/sse/MOTC/v2/Bus/EstimatedTimeOfArrival/City/${county}/${routeName}?$top=100&$format=JSON`,
  //   onMessage: (event: any) => setEstimatedTime(JSON.parse(event.data)),
  //   onError: () => message.error("公車動態即時推播已停止, 請重新整理頁面"),
  // });

  //TODO test sse performance
  const stopDataList = useMemo(
    () =>
      StopData?.filter(({ Direction }: any) => Direction === direction)[0]?.Stops?.map((item: any) => ({
        ...item,
        ...estimatedTime?.filter(({ Direction, StopID: _StopID }: any) => Direction === direction && item.StopID === _StopID)[0],
      })),
    [StopData, estimatedTime, direction]
  );

  return (
    <Layout>
      <Context.Provider
        value={{
          searchText,
          setSearchText,
          county,
          setCounty,
          direction,
          setDirection,
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
            {routeInfo?.DepartureStopNameZh && (
              <h2>
                {direction === 0
                  ? `${routeInfo.DepartureStopNameZh} - ${routeInfo.DestinationStopNameZh}`
                  : `${routeInfo.DestinationStopNameZh} - ${routeInfo.DepartureStopNameZh}`}
              </h2>
            )}
            <Menu theme="light" defaultSelectedKeys={["4"]} mode="inline">
              {stopDataList?.map((item: any, index: number) => (
                <Menu.Item
                  key={item.StopID}
                  icon={<div>{index + 1}</div>}
                  title={`${item.StopName.Zh_tw} ${
                    item.EstimateTime === 0 ? "即將進站" : item.EstimateTime ? Math.round(item.EstimateTime / 60) + "分" : "未發車"
                  }`}
                >
                  {`${item.StopName.Zh_tw}`}
                  <span style={{ position: "absolute", right: "30px" }}>
                    {item.EstimateTime === 0 ? "即將進站" : item.EstimateTime ? Math.round(item.EstimateTime / 60) + "分" : "未發車"}
                  </span>
                </Menu.Item>
              ))}
            </Menu>
          </Sider>
          <Content>
            <Map>
              {StopData && (
                <MultiMarker
                  dataList={stopDataList?.map(({ StopPosition, StopName, EstimateTime }: any, index: number) => ({
                    x: StopPosition.PositionLon,
                    y: StopPosition.PositionLat,
                    content: `${StopName.Zh_tw} ${StopName.En} ${EstimateTime ? EstimateTime + "秒後到站" : "未發車"}`,
                    IconComponent: <BusOrderIcon children={(index + 1).toString()} />,
                  }))}
                  IconComponent={<BusIcon />}
                />
              )}
              {routeGeometry?.type && <Polyline dataList={routeGeometry?.pointList} />}
            </Map>
          </Content>
        </Layout>
        <style jsx>
          {`
            h2 {
              padding: 15px;
            }
            .trigger {
              cursor: pointer;
              width: 100%;
              height: 50px;
              line-height: 50px;
              text-align: center;
              position: fixed;
              bottom: 30px;
              transition: all 0.2s;
              z-index: 1;
              width: 80px;
            }
          `}
        </style>
      </Context.Provider>
    </Layout>
  );
};

export default BusRoute;
