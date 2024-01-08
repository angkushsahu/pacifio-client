import { default as axios } from "axios";

import env from "@root/config/client.mjs";

const axiosClient = axios.create({ baseURL: `${env.NEXT_PUBLIC_SERVER_URI}/api` });
export default axiosClient;
