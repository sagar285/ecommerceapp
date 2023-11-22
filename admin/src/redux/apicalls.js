import { publicRequest, userRequest } from "../requestMethod";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  AddProductFailure,
  AddProductStart,
  AddProductSuccess
} from "./productRedux";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    // console.log(res);
  } catch (error) {
    dispatch(loginFailure());
  }
};
export const getproducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
    // console.log(res);
  } catch (error) {
    dispatch(getProductFailure());
  }
};
export const deleteproducts = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    // const res= await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
    // console.log(res);
  } catch (error) {
    dispatch(deleteProductFailure());
  }
};
export const updateproducts = async (id,product, dispatch) => {
  dispatch(updateProductStart());
  try {
    //update
    dispatch(updateProductSuccess({id,product}));
    // console.log(res);
  } catch (error) {
    dispatch(updateProductFailure());
  }
};
export const addproducts = async (product, dispatch) => {
  dispatch(AddProductStart());
  try {
    const res= await userRequest.post(`/products`,product)
    dispatch(AddProductSuccess(res.data));
    // console.log(res);
  } catch (error) {
    dispatch(AddProductFailure());
  }
};
