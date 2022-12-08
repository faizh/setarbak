<template>
  <div class="container">
    <Navigations :menu="currMenu" />

    <div class="row">
      <div class="col-md-8 col-sm-12 d-flex align-items-center justify-content-center">
        <div class="search-box float-left mb-3 mr-2">
          <b-button
            class="ml-1 mb-1 btn-filter-sub-category"
            :variant="menuVariant.all"
            @click="menuAll('all')"
            >All</b-button
          >
          <b-button
            class="ml-1 mb-1 btn-filter-sub-category"
            :variant="menuVariant.espresso"
            @click="menuAll('espresso')"
            >Espresso Beverages</b-button
          >
          <b-button
            class="ml-1 mb-1 btn-filter-sub-category"
            :variant="menuVariant.brewed"
            @click="menuAll('brewed')"
            >Brewed Coffee</b-button
          >
          <b-button
            class="ml-1 mb-1 btn-filter-sub-category"
            :variant="menuVariant.blended"
            @click="menuAll('blended')"
            >Blended Beverages</b-button
          >
        </div>
      </div>

      <div class="col-md-4 col-sm-12 d-flex ">
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
        class="col-md-4 mt-4 col-6 d-flex justify-content-center"
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
      searchInput: "",
      menuVariant: {
        all: "primary",
        espresso: "outline-primary",
        brewed: "outline-primary",
        blended: "outline-primary",
      },
      filterMenu: {
        all: true,
        espresso: false,
        brewed: false,
        blended: false,
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
            "api/menu/beverages/paginated?page=" +
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
        this.filterMenu.blended = false;
        this.filterMenu.espresso = false;
        this.filterMenu.brewed = false;
      } else if (menu == "espresso") {
        this.filterMenu.espresso = !this.filterMenu.espresso;
      } else if (menu == "brewed") {
        this.filterMenu.brewed = !this.filterMenu.brewed;
      } else if (menu == "blended") {
        this.filterMenu.blended = !this.filterMenu.blended;
      }

      if (
        this.filterMenu.espresso ||
        this.filterMenu.brewed ||
        this.filterMenu.blended
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

      if (this.filterMenu.espresso) {
        this.setCategory("Espresso Beverages");
        this.menuVariant.espresso = "primary";
      } else {
        this.removeCategory("Espresso Beverages");
        this.menuVariant.espresso = "outline-primary";
      }

      if (this.filterMenu.brewed) {
        this.setCategory("Brewed Coffee");
        this.menuVariant.brewed = "primary";
      } else {
        this.removeCategory("Brewed Coffee");
        this.menuVariant.brewed = "outline-primary";
      }

      if (this.filterMenu.blended) {
        this.setCategory("Blended Beverages");
        this.menuVariant.blended = "primary";
      } else {
        this.removeCategory("Blended Beverages");
        this.menuVariant.blended = "outline-primary";
      }
    },

    filterData() {
      const category = "beverages";
      var search_keyword;
      var sub_category;

      if (this.searchInput == "") {
        search_keyword = "empty_keywords";
      } else {
        search_keyword = this.searchInput;
      }

      if (this.filterSubCategory == "") {
        sub_category = "&sub_category[]=all"
      } else {
        sub_category = this.filterSubCategory
      }
      sub_category = sub_category.replace(/,/g, '')

      const headers = {
        'Access-Control-Allow-Origin': '*'
    }

      this.$http
        .get(
          import.meta.env.VITE_BASE_URL_API +
            "api/menu/filter?category=" +
            category +
            sub_category +
            "&search_keywords=" + 
            search_keyword +
            "&page=" +
            this.currentPage, {
              headers: headers
            }
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