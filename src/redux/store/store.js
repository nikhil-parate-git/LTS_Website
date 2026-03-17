import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from "../slice/category/getAllCategorySlice"
import subcategoryReducers from "../slice/category/getAllSubcategorySlice"
import vendorReducer from "../slice/category/getVendorByCatandSubcat"
import vendorDetailReducer from "../slice/category/getVendorById"
import cityBannerReducer from "../slice/homecityBanner/getAllCityBanner"
import sendOtpReducer from "../slice/customerAuth/sendOtpSlice"
import verifyOtpReducer from "../slice/customerAuth/verifyOtpSlice"
import enquiryOtpReducer from "../slice/enquiryform/enquirySentOtpSlice"
import verifyEnquiryReducer from "../slice/enquiryform/verifyEnquirySlice"
import getProfileReducer from "../slice/profile/getProfile"
const store = configureStore({
  reducer: {
    categories: categoryReducer,
    subcategory: subcategoryReducers,
    vendorStore: vendorReducer,
    vendorDetail: vendorDetailReducer,
    cityBanners: cityBannerReducer,
    // for customer auth
    otp: sendOtpReducer,
    verifyOtp: verifyOtpReducer,
    // for enquiry
    enquiryOtp: enquiryOtpReducer,
    verifyEnquiry: verifyEnquiryReducer,

    // profile
    profile: getProfileReducer,
  },
});
export default store;