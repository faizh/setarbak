import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue"
import Beverages from "../views/Beverages.vue";
import Foods from "../views/Foods.vue";
import ProductDetails from "../views/ProductDetails.vue";
import Cart from "../views/Cart.vue";

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
      name: "foods",
      component: ProductDetails
    },{
      path: "/cart",
      name: "carts",
      component: Cart
    },
  ],
});

export default router;
