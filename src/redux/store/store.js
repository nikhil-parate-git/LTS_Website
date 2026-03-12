import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from "../slice/category/getAllCategorySlice"
import subcategoryReducers from "../slice/category/getAllSubcategorySlice"
import vendorReducer from "../slice/category/getVendorByCatandSubcat"
import vendorDetailReducer from "../slice/category/getVendorById"
const store = configureStore({
  reducer: {
    categories: categoryReducer,
    subcategory: subcategoryReducers,
    vendorStore: vendorReducer,
    vendorDetail: vendorDetailReducer,
  },
});
export default store;