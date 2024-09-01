<template>
    <div class="container mb-5">
      <Navigations :menu="currMenu"/>

      <div class="row" v-if="orders.length > 0 && actions == ''">
        <div class="col">
          <div class="row">
              <button class="btn btn-primary" @click="processData('create')">
                Add Orders
              </button>
            <table class="table">
              <thead>
                <th>No</th>
                <th>Customer</th>
                <th>Table No</th>
                <th>Total Payment</th>
                <th>Order Status</th>
                <th>Order Time</th>
                <th>Action</th>
              </thead>
              <tbody>
                <tr v-for="(order, index) in orders" :key="order.id">
                  <td class="text-center">{{ index + 1 }}</td>
                  <td class="text-center">{{ order.customer }}</td>
                  <td class="text-center">{{ order.table_no }}</td>
                  <td class="text-center">{{ order.payment_total }}</td>
                  <td class="text-center">{{ order.order_status }}</td>
                  <td class="text-center">{{ order.created_at }}</td>
                  <td class="text-center">
                    <button class="btn btn-primary m-1" @click="viewData(order.id)">Details</button>
                    <button class="btn btn-warning m-1" @click="editData(order.id)">Edit</button>
                    <button class="btn btn-danger m-1" @click="deleteData(order.id)">Delete</button>
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
                  <td>Customer</td>
                  <td>{{ order.customer }}</td>
                </tr>
                <tr>
                  <td>Table No</td>
                  <td>{{ order.table_no }}</td>
                </tr>
                <tr>
                  <td>Total Payment</td>
                  <td>{{ order.total_payment }}</td>
                </tr>
                <tr>
                  <td>Order Status</td>
                  <td>{{ order.order_status }}</td>
                </tr>
                <tr>
                  <td>Order Time</td>
                  <td>{{ order.created_at }}</td>
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
        currMenu: "Admin - Orders",
        actions: '',
        orders: [],
        categories: null,
        subCategories: null,
        order: {
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
          .get(import.meta.env.VITE_BASE_URL_API + "api/admin/orders")
          .then((response) => {
            this.orders = response.data;
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
            this.displayToastSuccess('Order Added Successfully!');
            this.asyncData();
          });
      },

      async viewData(orderId) {
        this.$http
          .get(import.meta.env.VITE_BASE_URL_API + "api/admin/orders/" + orderId)
          .then((response) => {
            this.order.id = response.data.id;
            this.order.customer = response.data.customer;
            this.order.table_no = response.data.table_no;
            this.order.total_payment = response.data.payment_total;
            this.order.order_status = response.data.order_status;
            this.order.created_at = response.data.created_at;

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
            this.displayToastSuccess('Order Updated Successfully!');
            this.asyncData();
          });
      },

      async deleteData(orderId) {
        this.$http
          .delete(import.meta.env.VITE_BASE_URL_API + "api/admin/orders/" + orderId)
          .then((response) => {
            this.actions = '';
            this.displayToastSuccess('Order Deleted Successfully!');
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