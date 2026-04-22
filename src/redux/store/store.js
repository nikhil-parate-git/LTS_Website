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
import topRightCatSubReducer from "../slice/rightSidebar/getTopRightCatSubSlice"
import blogsReducer from "../slice/blog/getBlogSlice";
import serviceReducer from "../slice/services/getServicesSlice";
import enquiryReducer from "../slice/services/enquriySlice";
import faqReducer from "../slice/faq/getFaqSlice";
import vendorOtpReducer from "../slice/addvendorform/otpSlice";
import vendorFormReducer from "../slice/addvendorform/allDropdownSlice";
import addVendorReducer from "../slice/addvendorform/addVendorSlice";
import rateReviewReducer from "../slice/ratingandreviews/addReviewSlice"
import vendorReviewsReducer from "../slice/ratingandreviews/getReviewSlice";
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
    topRightCatSub: topRightCatSubReducer,

    // citydropdown
    cityDropdown: cityReducer,
    location: locationReducer,

    // toprated vendor
    topRatedVendors: topRatedVendorsReducer,

    // topcategory
    topCategories: topCategoriesReducer,
    topcategoryById:topcategoryByIdReducer,
    plans: planReducer,

    //blogs
    blogs: blogsReducer,

    //servics
    services: serviceReducer,
    enquiry: enquiryReducer,

    //faq
    faq: faqReducer,

    //vendorform
    vendorOtp: vendorOtpReducer,
    vendorForm: vendorFormReducer,
    addVendor: addVendorReducer,

    //rating&review
     rateReview: rateReviewReducer,
     vendorReviews: vendorReviewsReducer,
 
  },
});
export default store;