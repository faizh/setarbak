<template>
  <div class="container mb-5">
    <Navigations :menu="currMenu" v-if="! isProcess" />
    <div class="row" v-if="! isProcess">
      <div class="col">
        <div class="row">
          <b-table class="text-center" :items="items" :fields="fields">
            <template #cell(total_price)>
              {{ items[0].qty * items[0].price }}
            </template>

            <template #cell(action)>
              <b-icon
                icon="trash"
                class="text-danger"
                @click="removeCart(items[0].id)"
              />
            </template>
          </b-table>
        </div>

        <div class="row">
          <div class="col-md-8"></div>
          <div class="col-md-4">
            <b-form @submit="onSubmit">
              <b-form-group
                id="input-group-2"
              >
                <b-form-input
                  id="input-2"
                  v-model="formMeja"
                  type="number"
                  placeholder="Nomor mejanya berapa?"
                  class="col-md-8 float-right"
                  required
                ></b-form-input>
              </b-form-group>

              <b-button type="submit" variant="primary" class="float-right">Fix pesen</b-button>
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
        formMeja: null,
        isProcess: false,
      currMenu: "Cart",
      fields: ["id", "name", "qty", "notes", "price", "total_price", "action"],
      items: [
        {
          id: 1,
          name: "Caffè Latte",
          qty: 1,
          notes: "less sugar",
          price: 10000,
        },
        {
          id: 2,
          name: "Mocha Jelly Frappuccino",
          qty: 2,
          notes: "less ice",
          price: 10000,
        },
      ],
    };
  },

  methods: {
    removeCart(cartID) {
      console.log(cartID);
    },

    onSubmit() {
        this.isProcess = true
    }
  },
};
</script>