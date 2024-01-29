// contact hooks -- begin
export { default as useContactHook } from "./contactHooks/contact.hook";
// contact hooks -- end
// address hooks -- begin
export { default as useCreateAddress } from "./addressHooks/useCreateAddress.hook";
export { default as useUpdateAddress } from "./addressHooks/useUpdateAddress.hook";
export { default as useGetAllAddress } from "./addressHooks/useGetAllAddress.hook";
export { default as useDeleteAddress } from "./addressHooks/useDeleteAddress.hook";
export { default as useGetAddress } from "./addressHooks/useGetAddress.hook";
// address hooks -- end
// products hooks -- begin
export { default as useGetHighestRatedProducts } from "./productHooks/useGetHighestRatedProducts.hook";
export { default as useGetAllProductsForAdmin } from "./productHooks/useGetAllProductsForAdmin.hook";
export { default as useSelectDefaultImage } from "./productHooks/useSelectDefaultImage.hook";
export { default as useGetAllProducts } from "./productHooks/useGetAllProducts.hook";
export { default as useCreateProduct } from "./productHooks/useCreateProduct.hook";
export { default as useUpdateProduct } from "./productHooks/useUpdateProduct.hook";
export { default as useDeleteProduct } from "./productHooks/useDeleteProduct.hook";
export { default as useDeleteImage } from "./productHooks/useDeleteImage.hook";
export { default as useGetProduct } from "./productHooks/useGetProduct.hook";
export { default as useAddImage } from "./productHooks/useAddImage.hook";
// products hooks -- end
// auth hooks -- begin
export { default as useForgotPassword } from "./authHooks/useForgotPassword.hook";
export { default as useResetPassword } from "./authHooks/useResetPassword.hook";
export { default as useSignup } from "./authHooks/useSignup.hook";
export { default as useLogin } from "./authHooks/useLogin.hook";
// auth hooks -- end
// user hooks -- begin
export { default as useGetAllUsersForAdmin } from "./userHooks/useGetAllUsersForAdmin.hook";
export { default as useDeleteUserByAdmin } from "./userHooks/useDeleteUserByAdmin.hook";
export { default as useChangePassword } from "./userHooks/useChangePassword.hook";
export { default as useGetMyAccount } from "./userHooks/useGetMyAccount.hook";
export { default as useDeleteUser } from "./userHooks/useDeleteUser.hook";
export { default as useUpdateUser } from "./userHooks/useUpdateUser.hook";
export { default as useUpdateRole } from "./userHooks/useUpdateRole.hook";
export { default as useGetUser } from "./userHooks/useGetUser.hook";
// user hooks -- end
// review hooks -- begin
export { default as useGetAllReviews } from "./reviewHooks/useGetAllReviews.hook";
export { default as useDeleteReview } from "./reviewHooks/useDeleteReview.hook";
export { default as useAddReview } from "./reviewHooks/useAddReview.hook";
export { default as useGetReview } from "./reviewHooks/useGetReview.hook";
// review hooks -- end
// shoppingBag hooks -- begin
export { default as useRemoveFromBag } from "./shoppingBagHooks/useRemoveFromBag.hook";
export { default as useAddToBag } from "./shoppingBagHooks/useAddToBag.hook";
export { default as useGetBag } from "./shoppingBagHooks/useGetBag.hook";
// shoppingBag hooks -- end
// order hooks -- begin
export { default as useGetAllOrdersForAdmin } from "./orderHooks/useGetAllOrdersForAdmin.hook";
export { default as useUpdateDeliveryStatus } from "./orderHooks/useUpdateDeliveryStatus.hook";
export { default as useGetAllTransactions } from "./orderHooks/useGetAllTransactions.hook";
export { default as useGetOrderForAdmin } from "./orderHooks/useGetOrderForAdmin.hook";
export { default as useGetAllOrders } from "./orderHooks/useGetAllOrders.hook";
export { default as useCreateOrder } from "./orderHooks/useCreateOrder.hook";
export { default as useGetOrder } from "./orderHooks/useGetOrder.hook";
export { default as usePayment } from "./orderHooks/usePayment.hook";
// order hooks -- end
// dashboard hooks -- begin
export { default as useTransactionInfo } from "./dashboard/useTransactionInfo.hook";
export { default as useProductInfo } from "./dashboard/useProductInfo.hook";
export { default as useRecentSales } from "./dashboard/useRecentSales.hook";
export { default as useSalesGraph } from "./dashboard/useSalesGraph.hook";
export { default as useOrderInfo } from "./dashboard/useOrderInfo.hook";
export { default as useUserInfo } from "./dashboard/useUserInfo.hook";
// dashboard hooks -- end
