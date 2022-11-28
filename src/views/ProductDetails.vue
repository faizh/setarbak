<template>
  <div class="container">
    <Navigations :menu="currMenu" />

    <div class="row mt-3">
      <div class="col-md-6">
        <img
          class="card-img-top card-img-bottom"
          :src="product.img_src"
          alt="Card image cap"
        />
      </div>
      <div class="col-md-6">
        <h3 class="mb-3">{{ product.name }}</h3>
        <span class="bg-price">Rp {{ product.price }}</span>
        <p class="mt-3">
          {{ product.description }}
        </p>

        <b-form @submit="onSubmit">
          <b-form-group id="input-group-1" label="Qty" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="formProduct.qty"
              type="number"
              placeholder="Mau pesen berapa?"
              class="col-md-6"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Keterangan"
            label-for="input-2"
          >
            <b-form-input
              id="input-2"
              v-model="formProduct.notes"
              type="text"
              placeholder="Less Ice? Less Sugar? Lessehan?"
              class="col-md-12"
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary">Add to Cart</b-button>
        </b-form>
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
      currMenu: "Product Details",
      product: {},
      formProduct: {
        qty: null,
        notes: null,
      },
    };
  },

  methods: {
    onSubmit(event) {
      event.preventDefault();
      const userID = 10;

      const data = {
        user_id: userID,
        menu_id: this.$route.params.id,
        qty: this.formProduct.qty,
        notes: this.formProduct.notes == null ? "-" : this.formProduct.notes,
      };

      this.$http
        .post("https://backendsetarbak.000webhostapp.com/api/cart", data)
        .then((response) => {
          this.$toast.success("Add to Cart Success!", {
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
        });
    },
  },

  mounted() {
    const productID = this.$route.params.id;
    this.$http
      .get("https://backendsetarbak.000webhostapp.com/api/menu/" + productID)
      .then((response) => {
        this.product = response.data;
      });
  },
};
</script>