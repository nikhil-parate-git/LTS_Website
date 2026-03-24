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
import cityReducer from "../slice/citydropdown/getCityDropdownSlice"
import locationReducer from "../slice/locationSlice"
import topRatedVendorsReducer from "../slice/topRatedVendor/getAllTopRatedVendorSlice"
import topCategoriesReducer from "../slice/topCategory/getTopCategorySlice"
import topcategoryByIdReducer from "../slice/topCategory/getTopCateogoryByIdSlice"
import planReducer from "../slice/plansSlice"
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

    // citydropdown
    cityDropdown: cityReducer,
    location: locationReducer,

    // toprated vendor
    topRatedVendors: topRatedVendorsReducer,

    // topcategory
    topCategories: topCategoriesReducer,
    topcategoryById:topcategoryByIdReducer,
    plans: planReducer
  },
});
export default store;