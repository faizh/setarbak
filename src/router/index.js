import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue"
import Beverages from "../views/Beverages.vue";
import Foods from "../views/Foods.vue";
import ProductDetails from "../views/ProductDetails.vue";
import Cart from "../views/Cart.vue";
import Admin from "../views/admin/Index.vue"
import Users from "../views/admin/Users.vue"
import Products from "../views/admin/Products.vue";
import Orders from "../views/admin/Orders.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/beverages",
      name: "beverages",
      component: Beverages
    },
    {
      path: "/foods",
      name: "foods",
      component: Foods
    },
    {
      path: "/productDetails/:id",
      name: "productDetails",
      component: ProductDetails
    },
    {
      path: "/cart",
      name: "carts",
      component: Cart
    },
    {
        path: "/admin",
        name: "admin",
        component: Admin
    },
    {
        path: "/admin/users",
        name: "adminUsers",
        component: Users
    },
    {
        path: "/admin/products",
        name: "adminProducts",
        component: Products
    },
    {
        path: "/admin/orders",
        name: "adminOrders",
        component: Orders
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
});

export default router;
