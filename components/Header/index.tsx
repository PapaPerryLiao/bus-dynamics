import { Drawer } from "antd";
import Link from "next/link";
import { FC, useState } from "react";

type Props = {
  children?: React.ReactNode;
};

const Header: FC<Props> = ({ children }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <div className="container">
      <div className="title">
        <span className="image" onClick={() => setDrawerVisible(true)}>
          <img src="img/bus-stop.png" alt="bus title" width="100%" height="100%" />
        </span>
        <span>你要去哪裡？</span>
        <span>Where&apos;s next?</span>
      </div>
      <Drawer title="你要去哪裡？" placement="left" visible={drawerVisible} onClose={() => setDrawerVisible(false)}>
        <p className="pointer">
          <Link href="/">
            <span>首頁</span>
          </Link>
        </p>
        <p className="pointer">
          <Link href="/bus-route">
            <span>路線查詢</span>
          </Link>
        </p>
        <p className="pointer">
          <Link href="/bus-nearby">
            <span>附近公車</span>
          </Link>
        </p>
      </Drawer>
      <div className="search">{children}</div>
      <div className="link">
        <Link href="/">
          <span>首頁</span>
        </Link>
        <Link href="/bus-route">
          <span>路線查詢</span>
        </Link>
        <Link href="/bus-nearby">
          <span>附近公車</span>
        </Link>
      </div>
      <style jsx>{`
        h2 {
          justify-self: flex-start;
          height: 100%;
          text-align: center;
        }
        .container {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          text-align: center;
          padding: 20px;
          height: 100px;
          background: linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(68, 68, 68, 1) 75%, rgba(89, 89, 89, 1) 100%);
        }
        .title {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 28px;
          z-index: 1;
        }
        .title > * + * {
          margin-left: 15px;
          vertical-align: middle;
        }
        .pointer {
          cursor: pointer;
        }

        .image {
          display: inline-block;
          height: 60px;
          width: 60px;
          cursor: pointer;
        }
        .search > * + * {
          margin-left: 10px;
        }
        .link {
          display: flex;
          position: absolute;
          right: 50px;
          top: 50%;
          transform: translateY(-50%);
          max-width: 300px;
          width: auto;
          font-size: 18px;
        }
        .link span {
          color: #f5f5f5;
          cursor: pointer;
          border-bottom: 3px double transparent;
        }
        .link span:hover {
          cursor: pointer;
          border-color: #f5f5f5;
        }
        .link > * + * {
          margin-left: 15px;
        }
        @media (max-width: 1200px) {
          .title > span:nth-child(3) {
            display: none;
          }
        }
        @media (max-width: 834px) {
          .container {
            justify-content: flex-end;
          }
          .link {
            display: none;
          }
        }
        @media (max-width: 576px) {
          .title > span:nth-child(2) {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Header;
