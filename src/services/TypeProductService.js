import axios from "axios";

export const getAllTypeProduct = async () => {
  let res = await axios.get(
    `${process.env.REACT_APP_API_URL}/typeproduct/getall`
  );
  return res.data;
};
