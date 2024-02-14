import axios from "axios";

export const getSubCategories = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/sub-categories`);
};

export const getOneSubCategory = async (slug) => {
  return await axios.get(`${process.env.REACT_APP_API}/sub-category/${slug}`);
};

//send token in header
export const removeSubCategory = async (slug, authtoken) => {
  return await axios.delete(
    `${process.env.REACT_APP_API}/sub-category/${slug}`,
    {
      headers: { authtoken },
    }
  );
};

export const updateSubCategory = async (slug, authtoken, name, parent) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/sub-category/${slug}`,
    { name: name, parent: parent },
    { headers: { authtoken } }
  );
};

export const createSubCategory = async (
  authToken,
  createCategory,
  parentId
) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/sub-category`,
    { name: createCategory, parent: parentId },
    { headers: { authToken: authToken } }
  );
};
