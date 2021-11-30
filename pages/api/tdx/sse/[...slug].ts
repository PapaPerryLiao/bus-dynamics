import { NextApiRequest, NextApiResponse } from "next";
import getAuthorizationHeader from "@utils/getAuthorizationHeader";

//FIXME axios no overload matches this call
// import axios from "axios";
const axios = require("axios");

const tdx_url = process.env.NEXT_TDX_URL;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query;
  const queryString = req.url?.includes("?") ? "?" + req?.url?.split("?")[1] : "";

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Content-Type", "text/event-stream;charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("X-Accel-Buffering", "no");

  while (true) {
    const response = await axios({
      method: req.method,
      url: tdx_url + "/" + (slug as string[])?.join("/") + queryString,
      data: req.body,
      headers: {
        cookie: req?.headers?.cookie || "",
        ...(await getAuthorizationHeader()),
      },
    });
    res.write(`data: ${JSON.stringify(response.data)}\n\n`);
    await sleep(1000000000);
  }
};

export default handler;
