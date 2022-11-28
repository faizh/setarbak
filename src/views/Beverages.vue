<template>
  <div class="container">
    <Navigations :menu="currMenu" />

    <div class="row">
      <div
        class="col-md-4 mt-4 d-flex justify-content-center"
        v-for="product in products"
        :key="product.id"
      >
        <CardProduct :product="product" />
      </div>
    </div>
  </div>
</template>

<script setup>
import CardProduct from "../components/CardProduct.vue";
import Navigations from "../components/Navigations.vue";
</script>

<script>

export default {
  data() {
    return {
      currMenu: "Beverages",
      products: [],
    };
  },

  mounted() {
    this.$http
      .get("https://faizhermawan.com/backend-setarbak/public/api/menu/beverages")
      .then((response) => {
        this.products = response.data
      });
  },
};
</script>