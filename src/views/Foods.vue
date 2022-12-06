<template>
  <div class="container">
    <Navigations :menu="currMenu" />

    <div class="row">
      <div class="col-md-12 d-flex align-items-center justify-content-center">
        <div class="search-box float-left mb-3 mr-2">
          <b-button
            class="ml-1"
            :variant="menuVariant.all"
            @click="menuAll('all')"
            >All</b-button
          >
          <b-button
            class="ml-1"
            :variant="menuVariant.bakery"
            @click="menuAll('bakery')"
            >Bakery</b-button
          >
          <b-button
            class="ml-1"
            :variant="menuVariant.sandwiches"
            @click="menuAll('sandwiches')"
            >Sandwiches</b-button
          >
          <b-button
            class="ml-1"
            :variant="menuVariant.cakes"
            @click="menuAll('cakes')"
            >Cakes & Sweets</b-button
          >
        </div>

        <div class="search-box float-right mb-3">
          <button class="btn-search"><b-icon icon="search"></b-icon></button>
          <input
            type="text"
            v-model="searchInput"
            class="input-search"
            placeholder="Type to Search..."
            @keyup="filterData()"
          />
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
      currMenu: "Foods",
      products: [],
      rows: 0,
      currentPage: 1,
      perPage: 0,
      searchInput: "",
      menuVariant: {
        all: "primary",
        bakery: "outline-primary",
        sandwiches: "outline-primary",
        cakes: "outline-primary",
      },
      filterMenu: {
        all: true,
        bakery: false,
        sandwiches: false,
        cakes: false,
      },
      filterMenuValue: ["all"],
      filterSubCategory: "",
    };
  },

  methods: {
    dataPagination() {
      this.$http
        .get(
          import.meta.env.VITE_BASE_URL_API +
            "api/menu/foods/paginated?page=" +
            this.currentPage
        )
        .then((response) => {
          this.rows = response.data.total;
          this.perPage = response.data.per_page;
          this.products = response.data.data;
        });
    },

    menuAll(menu) {
      if (menu == "all") {
        this.filterMenu.all = !this.filterMenu.all;
        this.filterMenu.bakery = false;
        this.filterMenu.cakes = false;
        this.filterMenu.sandwiches = false;
      } else if (menu == "cakes") {
        this.filterMenu.cakes = !this.filterMenu.cakes;
      } else if (menu == "bakery") {
        this.filterMenu.bakery = !this.filterMenu.bakery;
      } else if (menu == "sandwiches") {
        this.filterMenu.sandwiches = !this.filterMenu.sandwiches;
      }

      if (
        this.filterMenu.cakes ||
        this.filterMenu.bakery ||
        this.filterMenu.sandwiches
      ) {
        this.filterMenu.all = false;
      } else {
        this.filterMenu.all = true;
      }

      this.setVariant();
      this.setFilterCategory();
    },

    setFilterCategory() {
      this.filterSubCategory = "";
      this.filterSubCategory += this.filterMenuValue.map((menuValue) => {
        return "&sub_category[]=" + menuValue;
      });

      this.filterData()
    },

    setCategory(category) {
      if (!this.filterMenuValue.includes(category)) {
        this.filterMenuValue.push(category);
      }
    },

    removeCategory(category) {
      if (this.filterMenuValue.includes(category)) {
        var index = this.filterMenuValue.indexOf(category);
        this.filterMenuValue.splice(index, 1);
      }
    },

    setVariant() {
      if (this.filterMenu.all) {
        this.setCategory("all");
        this.menuVariant.all = "primary";
      } else {
        this.removeCategory("all");
        this.menuVariant.all = "outline-primary";
      }

      if (this.filterMenu.bakery) {
        this.setCategory("Bakery");
        this.menuVariant.bakery = "primary";
      } else {
        this.removeCategory("Bakery");
        this.menuVariant.bakery = "outline-primary";
      }

      if (this.filterMenu.sandwiches) {
        this.setCategory("Sandwiches");
        this.menuVariant.sandwiches = "primary";
      } else {
        this.removeCategory("Sandwiches");
        this.menuVariant.sandwiches = "outline-primary";
      }

      if (this.filterMenu.cakes) {
        this.setCategory("Cakes & Sweets");
        this.menuVariant.cakes = "primary";
      } else {
        this.removeCategory("Cakes & Sweets");
        this.menuVariant.cakes = "outline-primary";
      }
    },

    filterData() {
      const category = "foods";
      var search_keyword;
      var sub_category;

      if (this.searchInput == "") {
        search_keyword = "empty_keywords";
      } else {
        search_keyword = this.searchInput;
      }

      if (this.filterSubCategory == "") {
        sub_category = "&sub_category[]=get_all"
      } else {
        sub_category = this.filterSubCategory
      }
      sub_category = sub_category.replace(/,/g, '')

      this.$http
        .get(
          import.meta.env.VITE_BASE_URL_API +
            "api/menu/filter?category=" +
            category +
            sub_category +
            "&search_keywords=" + 
            search_keyword +
            "&page=" +
            this.currentPage
        )
        .then((response) => {
          this.rows = response.data.total;
          this.perPage = response.data.per_page;
          this.products = response.data.data;
        });
    },
  },

  mounted() {
    this.dataPagination();
  },

  watch: {
    currentPage: {
      handler: function (value) {
        this.currentPage = value;
        this.filterData()
      },
    },
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