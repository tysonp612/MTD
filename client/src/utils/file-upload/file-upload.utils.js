import axios from "axios";

export const uploadFiles = async (uri, authToken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/uploadimages`,
    { images: uri },
    { headers: { authToken } }
  );
};

export const removeFiles = async (id, authToken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/removeimages`,
    {
      public_id: id,
    },
    { headers: { authToken } }
  );
};
