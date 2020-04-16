import axios from "axios";
import { API_URL } from "@/common/config";

axios.defaults.baseURL = API_URL;

const ApiService = {
  query(resource, params) {
    return axios.get(resource, params).catch(error => {
      throw new Error(`ApiService ${error}`);
    });
  }
};

export default ApiService;

export const CardsService = {
  query(params) {
    return ApiService.query("/cards", { params });
  }
};
