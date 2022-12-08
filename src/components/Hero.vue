<template>
  <div class="container">
    <div class="row mb-5">
      <div class="col-md-6 order-last">
        <div class="d-flex align-items-center h-100">
          <div class="container">
            <h2 class="text-welcome">
              Welcome to
              <span class="color-primary"><strong>Setarbak</strong></span>
            </h2>
            <p class="motto text-align-justify">
              Wake Up. Because you can never have too much coffee in your life.
              Don't you wish every day was a coffee day? Your Coffee, Your Way
            </p>
            <router-link class="btn btn-primary" to="/beverages"
              >Mau Order?</router-link
            >
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <img
          src="/src/assets/images/coffee.svg"
          width="100%"
          class="p-5 img-hero"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn-primary {
  background-color: #87b76a;
  border-color: #87b76a;
}

.btn-primary:hover {
  background-color: white;
  border-color: #87b76a;
  color: #87b76a;
}
</style>