import { NextApiRequest, NextApiResponse } from "next";
import getAuthorizationHeader from "@utils/getAuthorizationHeader";
//FIXME axios no overload matches this call
// import axios from "axios";
const axios = require("axios");

const tdx_url = process.env.NEXT_TDX_URL;

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;
  const queryString = req.url?.includes("?") ? "?" + req?.url?.split("?")[1] : "";

  const response = await axios({
    method: req.method,
    url: tdx_url + "/" + (slug as string[])?.join("/") + queryString,
    data: req.body,
    headers: {
      cookie: req.headers.cookie,
      ...(await getAuthorizationHeader()),
    },
  });

  for (const name in response.headers) {
    res.setHeader(name, response.headers[name]);
  }

  res.status(response.status).send(response.data);
}

export default handler;
