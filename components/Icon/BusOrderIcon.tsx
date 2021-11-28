import React, { FC } from "react";

type Props = {
  children?: string;
};

const BusOrderIcon: FC<Props> = ({ children }) => {
  return (
    <div className="container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="30px"
        height="30px"
        // preserveAspectRatio="1"
        viewBox="0 0 512 512"
      >
        ∏
        <g>
          <path
            // style="opacity:0.993"
            fill="#fc6067"
            d="M 235.5,15.5 C 314.157,10.7481 375.324,40.7481 419,105.5C 447.774,153.683 455.108,205.017 441,259.5C 432.858,287.445 421.192,313.778 406,338.5C 366.567,398.273 318.4,450.106 261.5,494C 255.488,496.582 250.155,495.582 245.5,491C 186.705,445.552 137.871,391.385 99,328.5C 80.3589,296.91 68.6922,262.91 64,226.5C 59.061,148.216 88.8943,87.3829 153.5,44C 178.931,28.8017 206.264,19.3017 235.5,15.5 Z"
          />
        </g>
        <g>
          <path
            // style="opacity:1"
            fill="#e7e9ee"
            d="M 239.5,63.5 C 301.23,60.2779 348.397,84.6112 381,136.5C 409.18,192.322 405.18,245.656 369,296.5C 328.977,343.059 278.81,359.892 218.5,347C 167.07,331.236 133.236,297.736 117,246.5C 102.653,185.542 119.153,134.709 166.5,94C 188.313,77.6769 212.647,67.5103 239.5,63.5 Z"
          />
        </g>
        <g>
          <text textAnchor="middle" x="256" y="280" font-family="Verdana" font-size="200" fill="grey">
            {children}
          </text>
        </g>
      </svg>
    </div>
  );
};

export default BusOrderIcon;
