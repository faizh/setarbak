<template>
    <div class="container mb-5">
      <Navigations :menu="currMenu"/>

      <div class="row" v-if="products.length > 0 && actions == ''">
        <div class="col">
          <div class="row">
              <button class="btn btn-primary" @click="processData('create')">
                Add Product
              </button>
            <table class="table">
              <thead>
                <th>No</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Image</th>
                <th>Category</th>
                <th>Sub Category</th>
                <th>Action</th>
              </thead>
              <tbody>
                <tr v-for="(product, index) in products" :key="product.id">
                  <td class="text-center">{{ index + 1 }}</td>
                  <td class="text-center">{{ product.name }}</td>
                  <td class="text-center">{{ product.description }}</td>
                  <td class="text-center">{{ product.price }}</td>
                  <td class="text-center">
                    <img class="card-img-top card-img-bottom" :src="product.img_src" alt="Card image cap" />
                  </td>
                  <td class="text-center">{{ product.category_name }}</td>
                  <td class="text-center">{{ product.sub_category_name }}</td>
                  <td class="text-center">
                    <button class="btn btn-primary m-1" @click="viewData(product.id)">View</button>
                    <button class="btn btn-warning m-1" @click="editData(product.id)">Edit</button>
                    <button class="btn btn-danger m-1" @click="deleteUser(product.id)">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>


      <div class="row" v-if="actions == 'view'">
        <div class="col">
          <div class="row">
            <table class="table">
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{{ product.name }}</td>
                </tr>
                <tr>
                  <td>Description</td>
                  <td>{{ product.desc }}</td>
                </tr>
                <tr>
                  <td>Price</td>
                  <td>{{ product.price }}</td>
                </tr>
                <tr>
                  <td>Category</td>
                  <td>{{ product.categoryName }}</td>
                </tr>
                <tr>
                  <td>Sub Category</td>
                  <td>{{ product.subCategoryName }}</td>
                </tr>
                <tr>
                  <td>Image</td>
                  <td><img class="card-img-top card-img-bottom w-50" :src="product.img" alt="Card image cap" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>


      <div class="row" v-if="actions == 'create'">
        <div class="col">
          <div class="row">
            <table class="table">
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>
                    <input type="text" class="form-control" v-model="product.name">
                  </td>
                </tr>
                <tr>
                  <td>Description</td>
                  <td>
                    <textarea class="form-control" v-model="product.desc"></textarea>
                  </td>
                </tr>
                <tr>
                  <td>Price</td>
                  <td>
                    <input type="number" class="form-control" v-model="product.price">
                  </td>
                </tr>
                <tr>
                  <td>Category</td>
                  <td>
                    <select class="form-control" v-model="product.categoryId" @change="getSubCategories()">
                      <option selected disabled>Choose Category</option>
                      <option v-for="(category, index) in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Sub Category</td>
                  <td>
                    <select class="form-control" v-model="product.subCategoryId">
                      <option selected disabled>Choose Sub Category</option>
                      <option v-for="(sub_category, index) in subCategories" :key="sub_category.id" :value="sub_category.id">{{ sub_category.name }}</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Image Link</td>
                  <td>
                    <input type="text" class="form-control" v-model="product.img">
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <button class="btn btn-primary right" @click="storeData()">Add</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="row" v-if="actions == 'edit'">
        <div class="col">
          <div class="row">
            <table class="table">
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>
                    <input type="text" class="form-control" v-model="product.name">
                  </td>
                </tr>
                <tr>
                  <td>Description</td>
                  <td>
                    <textarea class="form-control" v-model="product.desc"></textarea>
                  </td>
                </tr>
                <tr>
                  <td>Price</td>
                  <td>
                    <input type="number" class="form-control" v-model="product.price">
                  </td>
                </tr>
                <tr>
                  <td>Category</td>
                  <td>
                    <select class="form-control" v-model="product.categoryId" @change="getSubCategories()">
                      <option selected disabled>Choose Category</option>
                      <option v-for="(category, index) in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Sub Category</td>
                  <td>
                    <select class="form-control" v-model="product.subCategoryId">
                      <option selected disabled>Choose Sub Category</option>
                      <option v-for="(sub_category, index) in subCategories" :key="sub_category.id" :value="sub_category.id">{{ sub_category.name }}</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Image Link</td>
                  <td>
                    <input type="text" class="form-control" v-model="product.img">
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <button class="btn btn-warning right" @click="updateData()">Update</button>
                  </td>
                </tr>
              </tbody>
            </table>
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
        currMenu: "Admin - Products",
        actions: '',
        products: [],
        categories: null,
        subCategories: null,
        product: {
          id: null,
          name: null,
          desc: null,
          price: null,
          img: null,
          categoryId: null,
          categoryName: null,
          subCategoryId: null,
          subCategoryName: null
        }
      };
    },
  
    methods: {
      async asyncData() {
        await this.$http
          .get(import.meta.env.VITE_BASE_URL_API + "api/admin/products")
          .then((response) => {
            this.products = response.data;
          });

        await this.$http
          .get(import.meta.env.VITE_BASE_URL_API + "api/admin/categories")
          .then((response) => {
            this.categories = response.data;
          });
      },

      async processData(action) {
        this.actions = action
      },

      async storeData() {
        if (this.product.name == null || this.product.name == '') {
          this.displayToastError('Field Name is Required!')
          return false;
        } 

        if (this.product.desc == null || this.product.desc == '') {
          this.displayToastError('Field Description is Required!')
          return false;
        }

        if (this.product.price == null || this.product.price == '') {
          this.displayToastError('Field Price is Required!')
          return false;
        }

        if (this.product.categoryId == null || this.product.categoryId == '') {
          this.displayToastError('Field Category is Required!')
          return false;
        }

        if (this.product.subCategoryId == null || this.product.subCategoryId == '') {
          this.displayToastError('Field Sub Category is Required!')
          return false;
        }

        if (this.product.img == null || this.product.img == '') {
          this.displayToastError('Field Image Link is Required!')
          return false;
        }

        this.$http
          .post(import.meta.env.VITE_BASE_URL_API + "api/admin/products", this.product)
          .then((response) => {
            this.actions = '';
            this.displayToastSuccess('Product Added Successfully!');
            this.asyncData();
          });
      },

      async viewData(productId) {
        this.$http
          .get(import.meta.env.VITE_BASE_URL_API + "api/admin/products/" + productId)
          .then((response) => {
            this.product.id = response.data.id;
            this.product.name = response.data.name;
            this.product.price = response.data.price;
            this.product.desc = response.data.description;
            this.product.img = response.data.img_src;
            this.product.categoryName = response.data.category_name;
            this.product.subCategoryName = response.data.sub_category_name;

            this.actions = 'view';
          });
      },

      async editData(productId) {
        this.$http
          .get(import.meta.env.VITE_BASE_URL_API + "api/admin/products/" + productId)
          .then((response) => {
            this.product.id = response.data.id;
            this.product.name = response.data.name;
            this.product.price = response.data.price;
            this.product.desc = response.data.description;
            this.product.img = response.data.img_src;
            this.product.categoryId = response.data.category_id;
            this.product.categoryName = response.data.category_name;
            this.product.subCategoryId = response.data.sub_category_id;
            this.product.subCategoryName = response.data.sub_category_name;

            this.getSubCategories();
            this.actions = 'edit';
          });
      },

      async updateData() {
        if (this.product.name == null || this.product.name == '') {
          this.displayToastError('Field Name is Required!')
          return false;
        } 

        if (this.product.desc == null || this.product.desc == '') {
          this.displayToastError('Field Description is Required!')
          return false;
        }

        if (this.product.price == null || this.product.price == '') {
          this.displayToastError('Field Price is Required!')
          return false;
        }

        if (this.product.categoryId == null || this.product.categoryId == '') {
          this.displayToastError('Field Category is Required!')
          return false;
        }

        if (this.product.subCategoryId == null || this.product.subCategoryId == '') {
          this.displayToastError('Field Sub Category is Required!')
          return false;
        }

        if (this.product.img == null || this.product.img == '') {
          this.displayToastError('Field Image Link is Required!')
          return false;
        }

        this.$http
          .put(import.meta.env.VITE_BASE_URL_API + "api/admin/products/" + this.product.id, this.product)
          .then((response) => {
            this.actions = '';
            this.displayToastSuccess('Product Updated Successfully!');
            this.asyncData();
          });
      },

      async deleteUser(productId) {
        this.$http
          .delete(import.meta.env.VITE_BASE_URL_API + "api/admin/products/" + productId)
          .then((response) => {
            this.actions = '';
            this.displayToastSuccess('Product Deleted Successfully!');
            this.asyncData();
          });
      },

      displayToastError(msg) {
        this.$toast.error(msg, {
            position: "top-right",
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false,
          });
      },

      displayToastSuccess(msg) {
        this.$toast.success(msg, {
            position: "top-right",
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false,
        });
      },

      async getSubCategories() {
        this.$http
          .get(import.meta.env.VITE_BASE_URL_API + "api/admin/sub_categories/" + this.product.categoryId)
          .then((response) => {
            this.subCategories = response.data;
          });
      }
    },

    mounted() {
      this.asyncData();
    },
  };
  </script>