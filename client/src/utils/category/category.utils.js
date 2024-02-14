import axios from "axios";

export const getCategories = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/categories`);
};

export const getOneCategory = async (slug) => {
  return await axios.get(`${process.env.REACT_APP_API}/categories/${slug}`);
};

//send token in header
export const removeCategory = async (slug, authtoken) => {
  return await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, {
    headers: { authtoken },
  });
};

export const updateCategory = async (slug, authtoken, name) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/category/${slug}`,
    { name: name },
    { headers: { authtoken } }
  );
};

export const createCategory = async (authToken, name) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/category`,
    { name: name },
    { headers: { authToken: authToken } }
  );
};

export const getSubFromCategory = async (id) => {
  return await axios.get(
    `${process.env.REACT_APP_API}/category/subcategory/${id}`
  );
};
