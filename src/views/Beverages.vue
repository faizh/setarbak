<template>
  <div class="container">
    <Navigations :menu="currMenu" />

    <div class="row">
      <div class="col-md-12 d-flex align-items-center justify-content-center">
        <div class="search-box float-left mb-3 mr-2">
          <b-button class="ml-1" :variant="menuVariant.all" @click="menuAll('all')">All</b-button>
          <b-button class="ml-1" :variant="menuVariant.espresso" @click="menuAll('espresso')">Espresso Beverages</b-button>
          <b-button class="ml-1" :variant="menuVariant.brewed" @click="menuAll('brewed')">Brewed Coffee</b-button>
          <b-button class="ml-1" :variant="menuVariant.blended" @click="menuAll('blended')">Blended Beverages</b-button>
        </div>

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
      searchInput: '',
      menuVariant: {
        all: 'primary',
        espresso: 'outline-primary',
        brewed: 'outline-primary',
        blended: 'outline-primary'
      },
      filterMenu:{
        all: true,
        espresso: false,
        brewed: false,
        blended: false
      }
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
    },

    menuAll(menu){
      if (menu == 'all') {
        this.filterMenu.all = ! this.filterMenu.all
        this.filterMenu.blended = false
        this.filterMenu.espresso = false
        this.filterMenu.brewed = false
      }else if (menu == 'espresso') {
        this.filterMenu.espresso = ! this.filterMenu.espresso
      }else if(menu == 'brewed') {
        this.filterMenu.brewed = ! this.filterMenu.brewed
      }else if (menu == 'blended') {
        this.filterMenu.blended = ! this.filterMenu.blended
      }

      if (this.filterMenu.espresso || this.filterMenu.brewed || this.filterMenu.blended) {
        this.filterMenu.all = false
      }else{
        this.filterMenu.all = true
      }

      this.setVariant()
    },

    setVariant() {
      if (this.filterMenu.all) {
        this.menuVariant.all = 'primary'
      }else{
        this.menuVariant.all = 'outline-primary'
      }

      if (this.filterMenu.espresso) {
        this.menuVariant.espresso = 'primary'
      }else{
        this.menuVariant.espresso = 'outline-primary'
      }

      if (this.filterMenu.brewed) {
        this.menuVariant.brewed = 'primary'
      }else{
        this.menuVariant.brewed = 'outline-primary'
      }

      if (this.filterMenu.blended) {
        this.menuVariant.blended = 'primary'
      }else{
        this.menuVariant.blended = 'outline-primary'
      }
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

    filterMenu: {
      handler: function (value){
        console.log(value)
      }
    }
  },
};
</script>

<style>
.btn-outline-primary:not(:disabled):not(.disabled):active, .btn-outline-primary:not(:disabled):not(.disabled).active, .show > .btn-outline-primary.dropdown-toggle {
  background-color: red;
}
</style>