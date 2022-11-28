<template>
  <div class="container">
    <Navigations :menu="currMenu" />

    <div class="row mt-3">
      <div class="col-md-6">
        <img
          class="card-img-top card-img-bottom"
          src="https://theculturetrip.com/wp-content/uploads/2018/03/coffee-983955_1280.jpg"
          alt="Card image cap"
        />
      </div>
      <div class="col-md-6">
        <h3 class="mb-3">Caramel Praline Macchiato</h3>
        <span class="bg-price">Rp 30.000</span>
        <p class="mt-3">
          Latte dengan saus Praline dan karamel dengan rasa dan aroma manis
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

          <b-form-group id="input-group-2" label="Keterangan" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="formProduct.notes"
              type="text"
              placeholder="Less Ice? Less Sugar? Lessehan?"
              class="col-md-12"
              required
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
    },
  },

  mounted() {
    console.log(this.$route.params.id);
  },
};
</script>