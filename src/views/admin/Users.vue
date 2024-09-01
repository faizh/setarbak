<template>
    <div class="container mb-5">
      <Navigations :menu="currMenu"/>

      <div class="row" v-if="users.length > 0 && actions == ''">
        <div class="col">
          <div class="row">
              <button class="btn btn-primary" @click="processData('create')">
                Add Users
              </button>
            <table class="table">
              <thead>
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </thead>
              <tbody>
                <tr v-for="(user, index) in users" :key="user.id">
                  <td class="text-center">{{ index + 1 }}</td>
                  <td class="text-center">{{ user.name }}</td>
                  <td class="text-center">{{ user.email }}</td>
                  <td class="text-center">{{ user.role_name }}</td>
                  <td class="text-center">
                    <button class="btn btn-primary m-1" @click="viewData(user.id)">View</button>
                    <button class="btn btn-warning m-1" @click="editData(user.id)">Edit</button>
                    <button class="btn btn-danger m-1" @click="deleteUser(user.id)">Delete</button>
                  </td>
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
              <thead>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </thead>
              <tbody>
                <tr>
                  <td class="text-center">
                    <input type="text" class="form-control" v-model="processedData.name">
                  </td>
                  <td class="text-center">
                    <input type="email" class="form-control" v-model="processedData.email">
                  </td>
                  <td class="text-center">
                    <select class="form-control" v-model="processedData.role_id">
                      <option selected disabled>Choose Role</option>
                      <option v-for="(role, index) in roles" :key="role.id" :value="role.id">{{ role.role_name }}</option>
                    </select>
                  </td>
                  <td class="text-center">
                    <button class="btn btn-primary m-1" @click="storeData()">Save</button>
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
              <thead>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </thead>
              <tbody>
                <tr>
                  <td class="text-center">
                    <input type="text" class="form-control" v-model="processedData.name" disabled>
                  </td>
                  <td class="text-center">
                    <input type="text" class="form-control" v-model="processedData.email" disabled>
                  </td>
                  <td class="text-center">
                    <input type="text" class="form-control" v-model="processedData.role_name" disabled>
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
              <thead>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </thead>
              <tbody>
                <tr>
                  <td class="text-center">
                    <input type="text" class="form-control" v-model="processedData.name">
                  </td>
                  <td class="text-center">
                    <input type="text" class="form-control" v-model="processedData.email">
                  </td>
                  <td class="text-center">
                    <select class="form-control" v-model="processedData.role_id">
                      <option selected disabled>Choose Role</option>
                      <option v-for="(role, index) in roles" :key="role.id" :value="role.id">{{ role.role_name }}</option>
                    </select>
                  </td>
                  <td class="text-center">
                    <button class="btn btn-warning m-1" @click="updateData(processedData.userId)">Update</button>
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
        currMenu: "Admin - Users",
        actions: '',
        users: [],
        roles: [],
        processedData: {
          userId : null,
          name: null,
          email: null,
          role_id: null,
          role_name: null
        }
      };
    },
  
    methods: {
      async asyncData() {
        const userID = 10;
        await this.$http
          .get(import.meta.env.VITE_BASE_URL_API + "api/admin/users")
          .then((response) => {
            this.users = response.data;
          });

        await this.$http
          .get(import.meta.env.VITE_BASE_URL_API + "api/admin/roles")
          .then((response) => {
            this.roles = response.data;
          });
      },

      async processData(action) {
        this.actions = action
      },

      async storeData() {
        if (this.processedData.name == null) {
          this.displayToastError('Field Name is Required!')
          return false;
        } 

        if (this.processedData.email == null) {
          this.displayToastError('Field Email is Required!')
          return false;
        }

        if (this.processedData.role_id == null) {
          this.displayToastError('Field Role is Required!')
          return false;
        }

        this.$http
          .post(import.meta.env.VITE_BASE_URL_API + "api/admin/users", this.processedData)
          .then((response) => {
            this.actions = '';
            this.displayToastSuccess('User Created Successfully!');
            this.asyncData();
          });
      },

      async viewData(userId) {
        this.$http
          .get(import.meta.env.VITE_BASE_URL_API + "api/admin/users/" + userId)
          .then((response) => {
            this.processedData.name = response.data.name;
            this.processedData.email = response.data.email;
            this.processedData.role_name = response.data.role_name;

            this.actions = 'view';
          });
      },

      async editData(userId) {
        this.$http
          .get(import.meta.env.VITE_BASE_URL_API + "api/admin/users/" + userId)
          .then((response) => {
            this.processedData.userId = response.data.id;
            this.processedData.name = response.data.name;
            this.processedData.email = response.data.email;
            this.processedData.role_id = response.data.role_id;

            this.actions = 'edit';
          });
      },

      async updateData() {
        if (this.processedData.name == null) {
          this.displayToastError('Field Name is Required!')
          return false;
        } 

        if (this.processedData.email == null) {
          this.displayToastError('Field Email is Required!')
          return false;
        }

        if (this.processedData.role_id == null) {
          this.displayToastError('Field Role is Required!')
          return false;
        }

        this.$http
          .put(import.meta.env.VITE_BASE_URL_API + "api/admin/users/" + this.processedData.userId, this.processedData)
          .then((response) => {
            this.actions = '';
            this.displayToastSuccess('User Updated Successfully!');
            this.asyncData();
          });
      },

      async deleteUser(userId) {
        this.$http
          .delete(import.meta.env.VITE_BASE_URL_API + "api/admin/users/" + userId)
          .then((response) => {
            this.actions = '';
            this.displayToastSuccess('User Deleted Successfully!');
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
      }
    },

    mounted() {
      this.asyncData();
    },
  };
  </script>