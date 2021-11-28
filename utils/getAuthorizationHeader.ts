import jsSHA from "jssha";

const appID = process.env.NEXT_TDX_APPID;
const appKey = process.env.NEXT_TDX_APPKEY;

const getAuthorizationHeader = () => {
  const date = new Date().toUTCString();
  const shaObject = new jsSHA("SHA-1", "TEXT");
  shaObject.setHMACKey(appKey as string, "TEXT");
  shaObject.update("x-date: " + date);

  const authorization = `hmac username="${appID}", algorithm="hmac-sha1", headers="x-date", signature="${shaObject.getHMAC("B64")}"`;

  return {
    authorization: authorization,
    "x-date": date,
  };
};

export default getAuthorizationHeader;
