<template>
  <div class="container mb-5">
    <Navigations :menu="currMenu" v-if="!isProcess" />
    <div class="row" v-if="!isProcess">
      <div class="col">
        <div class="row">
          <table class="table">
            <thead>
              <th>No</th>
              <th>Menu</th>
              <th>Qty</th>
              <th>Notes</th>
              <th>Price</th>
              <th>Total Price</th>
              <th>Action</th>
            </thead>
            <tbody>
              <tr v-for="(item, index) in items" :key="item.cart_id">
                <td>{{ index + 1 }}</td>
                <td>{{ item.name }}</td>
                <td class="text-center">{{ item.qty }}</td>
                <td>{{ item.notes }}</td>
                <td class="price">{{ item.price }}</td>
                <td class="price">{{ item.price * item.qty }}</td>
                <td class="text-center">
                  <b-icon-trash
                    class="text-danger"
                    @click="removeCart(item.cart_id)"
                  ></b-icon-trash>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="row">
          <div class="col-md-8"></div>
          <div class="col-md-4">
            <b-form @submit="onSubmit">
              <b-form-group id="input-group-2">
                <b-form-input
                  id="input-2"
                  v-model="formMeja"
                  type="number"
                  placeholder="Nomor mejanya berapa?"
                  class="col-md-8 float-right"
                  required
                ></b-form-input>
              </b-form-group>

              <b-button type="submit" variant="primary" class="float-right"
                >Fix pesen</b-button
              >
            </b-form>
          </div>
        </div>
      </div>
    </div>

    <div class="processing" v-if="isProcess">
      <div class="row">
        <div class="col-md-4"></div>
        <div class="col-md-4 text-center">
          <img src="/src/assets/images/cooking.svg" width="100%" class="p-5" />
          <br />
          <h5>Bentar ya, pesanannya lagi dibuat nih.</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navigations from "../components/Navigations.vue";
</script>

<script>
export default {
  data() {
    return {
      orderID: null,
      tableIndex: 0,
      formMeja: null,
      isProcess: false,
      currMenu: "Cart",
      fields: ["name", "qty", "notes", "price", "total_price", "action"],
      items: [],
    };
  },

  methods: {
    removeCart(cartID) {
      this.$http
        .delete("http://127.0.0.1:8000/api/cart/" + cartID)
        .then((response) => {
          this.asyncData();
        });
    },

    onSubmit() {
      this.isProcess = true;

      //   get total payment
      var total_payment = 0;
      this.items.map((item) => {
        total_payment += item.price * item.qty;
      });

      const userID = 10;
      const order = {
        user_id: userID,
        payment_total: total_payment,
        order_status: 1,
      };

      // create order
      this.$http
        .post("http://127.0.0.1:8000/api/order", order)
        .then((response) => {
          this.orderID = response.data.order_id;

          // create order detail
          this.items.map((item) => {
            const orderDetail = {
              order_id: response.data.order_id,
              menu_id: item.menu_id,
              qty: item.qty,
              price: item.price,
              notes: item.notes,
            };

            this.$http
            .post("http://127.0.0.1:8000/api/order_detail", orderDetail)
            .then((response) => {
				this.$http
				.delete("http://127.0.0.1:8000/api/cart/" + item.cart_id)
				.then((response) => {
					
				});
            });
          });
        });
    },

    async asyncData() {
      const userID = 10;
      await this.$http
        .get("http://127.0.0.1:8000/api/cart/" + userID)
        .then((response) => {
          this.items = response.data;
        });
    },
  },

  mounted() {
    this.asyncData();
  },
};
</script>