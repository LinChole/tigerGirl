import axios from "axios";

import config from "Config";
const { cors, devHost, proHost } = config;
export default function ({
  cmd,
  method = "GET",
  type = "json",
  params = {},
  data = {},
  header = {},
  fileList = [],
}) {
  method = method.toUpperCase();
  type = type.toLowerCase();
  let option = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...header,
    },
  };

  if (fileList.length) {
    let formData = new FormData();
    option.headers["Content-Type"] = "multipart/form-data";
    let filelist = [...fileList];
    filelist.forEach((file) => {
      formData.append("files", file);
    });
    data = formData;
  }
  switch (method) {
    case "PATCH":
    case "POST":
    case "PUT":
    case "DELETE":
      option.params = params;
      option.data = data;
      break;
    case "GET":
      option.params = data;
      break;
  }
  return axios({
    method,
    url: cmd,
    baseURL: process.env.NODE_ENV === 'development' ? devHost : proHost,
    ...option,
    withCredentials: !!cors,
  })
    .then((res) => {
      return {
        ok: res.status == "200",
        status: res.status,
        body: res.data,
      };
    })
    .catch((err) => {
      let res = err.response;
      if (res) {
        return {
          ok: res.status == "200",
          status: res.status,
          body: res.data,
        };
      } else {
        return {
          ok: false,
          status: 404,
          body: err.message,
        };
      }
    });
}
