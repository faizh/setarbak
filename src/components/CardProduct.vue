<template>
  <div class="card shadow" style="width: 18rem">
    <img
      class="card-img-top"
      :src="product.img_src"
      alt="Card image cap" 
    />
    <div class="card-body">
      <h5 class="card-title">{{ product.name }}</h5>
      <p class="card-text text-grey">
        Rp {{ product.price }}<br />
      </p>
      <router-link :to="'/productDetails/' + product.id " class="btn btn-primary">See detail <b-icon icon="arrow-right"></b-icon></router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ["product"],
  methods: {
    addCart(){
        console.log(this.product.id)
    }
  }
};
</script>