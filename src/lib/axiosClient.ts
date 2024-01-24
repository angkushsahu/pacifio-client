"use client";

import { default as axios } from "axios";

const axiosClient = axios.create({ baseURL: `${process.env.NEXT_PUBLIC_SERVER_URI}/api` });
export default axiosClient;
