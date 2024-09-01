<template>
  <div class="container">
    <Navigations :menu="currMenu" />

    <div class="row">
        <div class="col-md-4 mt-4 col-6 d-flex justify-content-center">
            <div class="card shadow card-product p-3">
            <img
                class="card-img-top w-50 mx-auto"
                alt="Card image cap"
                src="/src/assets/images/users.png"
            />
            <div class="card-body text-center">
                <router-link :to="'/admin/users'" class="btn btn-primary btn-primary-card-product">
                Manage Users <b-icon icon="arrow-right"></b-icon>
                </router-link>
            </div>
            </div>
        </div>

        <div class="col-md-4 mt-4 col-6 d-flex justify-content-center">
            <div class="card shadow card-product p-3">
            <img
                class="card-img-top w-50 mx-auto"
                alt="Card image cap"
                src="/src/assets/images/beverages.png"
            />
            <div class="card-body text-center">
                <router-link :to="'/admin/products'" class="btn btn-primary btn-primary-card-product">
                Manage Products <b-icon icon="arrow-right"></b-icon>
                </router-link>
            </div>
            </div>
        </div>

        <div class="col-md-4 mt-4 col-6 d-flex justify-content-center">
            <div class="card shadow card-product p-3">
            <img
                class="card-img-top w-50 mx-auto"
                alt="Card image cap"
                src="/src/assets/images/orders.png"
            />
            <div class="card-body text-center">
                <router-link :to="'/admin/orders'" class="btn btn-primary btn-primary-card-product">
                Manage Orders <b-icon icon="arrow-right"></b-icon>
                </router-link>
            </div>
            </div>
        </div>
    </div>

  </div>
</template>

<script setup>
import Navigations from "../../components/Navigations.vue";
</script>

<script>
export default {
  data() {
    return {
      currMenu: "Admin",
    };
  },

  methods: {
  },

  mounted() {
    
  },

};
</script>

<style>
.btn-outline-primary:not(:disabled):not(.disabled):active,
.btn-outline-primary:not(:disabled):not(.disabled).active,
.show > .btn-outline-primary.dropdown-toggle {
  background-color: red;
}
</style>
