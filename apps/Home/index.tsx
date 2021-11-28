import Header from "@components/Header";
import { Layout } from "antd";
import HomeFooter from "@components/Footer";

const Home = () => {
  const { Content, Footer, Sider } = Layout;

  return (
    <Layout className="layout">
      <Header></Header>
      <Content className="content">
        <div className="item">
          <div className="item-content">
            <img src="img/cover.png" width="100%" height="100%" />
          </div>
        </div>
        <div className="item">
          <div className="item-content">
            <h2>公車動態查詢系統</h2>
            搭公車的好幫手，不可不用的四大理由：
            <ul>
              <li>支援多個縣市公車路線查詢</li>
              <li>環域查詢功能，輕鬆尋找附近站牌及公車</li>
              <li>資料視覺化，地圖與公車資訊的雙向互動</li>
              <li>簡約風格，沒有多餘的複雜操作</li>
            </ul>
          </div>
        </div>
      </Content>
      <Footer className="footer">
        <HomeFooter />
      </Footer>
      <style jsx>{`
        .content {
          min-height: calc(100vh - 130px);
          height: auto;
          display: flex;
          flex-wrap: wrap;
          font-size: 22px;
        }
        .item {
          width: 50%;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          padding: 0 10px;
        }
        .item-content {
          max-width: 480px;
          max-height: 360px;
          width: auto;
          height: auto;
          margin: auto;
          word-wrap: break-word;
        }
        @media (max-width: 992px) {
          .item {
            width: 100%;
          }
        }
        .footer {
          padding: 0;
        }
      `}</style>
    </Layout>
  );
};

export default Home;
