// urls starting from base.... for example baseResetPasswordUrl need to be appended with another slug at the end

export const homeUrl = "/";
export const aboutUrl = "/about";
export const contactUrl = "/contact";

export const loginUrl = "/auth/login";
export const signupUrl = "/auth/signup";
export const forgotPasswordUrl = "/auth/forgot-password";
export const baseResetPasswordUrl = "/auth/reset-password";

export const productsUrl = "/products";
export const baseProductUrl = "/product";

export const userAccountUrl = "/user/account";
export const shoppingBagUrl = "/user/shopping-bag";
export const userAccountUpdateUrl = "/user/account/update";
export const userPasswordUpdateUrl = "/user/change-password";

export const baseAdminViewUserUrl = "/admin/user";
export const baseAdminViewOrderUrl = "/admin/order";
export const adminDashboardUrl = "/admin/dashboard";
export const adminTransactionsUrl = "/admin/transactions";
export const adminCreateProductUrl = "/admin/product/create";
export const adminUserRoleAdminUrl = "/admin/users?role=admin";
export const baseAdminUpdateProductUrl = "/admin/product/update";
export const adminUserRoleRegularUrl = "/admin/users?role=regular";
export const adminShippedOrdersUrl = "/admin/orders?status=shipped";
export const adminDeliveredOrdersUrl = "/admin/orders?status=delivered";
export const adminOutOfStockProductsUrl = "/admin/products?stock=empty";
export const adminInStockProductsUrl = "/admin/products?stock=non-empty";
export const adminProcessingOrdersUrl = "/admin/orders?status=processing";

export const allAddressUrl = "/address/all";
export const createAddressUrl = "/address/create";
export const baseUpdateAddressUrl = "/address/update";
export const shippingUrl = "/shipping/choose-address";

export const viewOrderUrl = "/order";
export const allOrdersUrl = "/order/all";
export const paymentUrl = "/order/payment";
export const orderFailedUrl = "/order/failure";
export const confirmOrderUrl = "/order/confirm";
export const orderSuccessUrl = "/order/success";
