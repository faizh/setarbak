<template>
  <div class="container">
    <Navigations :menu="currMenu" />

    <div class="row">
      <div class="col-md-12">
        <div class="search-box float-right mb-3">
          <button class="btn-search"><b-icon icon="search"></b-icon></button>
          <input type="text" v-model="searchInput" class="input-search" placeholder="Type to Search..." @keyup="searchMenu()">
        </div>
      </div>
    </div>

    <div class="row">
      <div
        class="col-md-4 mt-4 d-flex justify-content-center"
        v-for="product in products"
        :key="product.id"
      >
        <CardProduct :product="product" />
      </div>
    </div>

    <div class="row">
        <div class="col-md-12 mt-5">
            <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          align="center"
        ></b-pagination>
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
      rows: 0,
      currentPage: 1,
      perPage: 0,
      searchInput: ''
    };
  },

  methods: {
    dataPagination() {
      this.$http
        .get(import.meta.env.VITE_BASE_URL_API + "api/menu/beverages/paginated?page=" + this.currentPage)
        .then((response) => {
          this.rows = response.data.total
          this.perPage = response.data.per_page
          this.products = response.data.data
        });
    },

    searchMenu() {
      if (this.searchInput == '') {
        this.dataPagination()
        return false
      }
      
      this.$http
        .get(import.meta.env.VITE_BASE_URL_API + "api/menu/beverages/search/" + this.searchInput + "?page=" + this.currentPage)
        .then((response) => {
          this.rows = response.data.total
          this.perPage = response.data.per_page
          this.products = response.data.data
        });
    }
  },

  mounted() {
    this.dataPagination();
  },

  watch: {
    currentPage: {
      handler: function (value) {
        this.currentPage = value
        if (this.searchInput != '') {
          this.searchMenu()
        }else{
          this.dataPagination()
        }
      },
    },
  },
};
</script>