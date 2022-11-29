<template>
  <div>
    <b-navbar toggleable="sm" type="light" class="navbar-fixed-top bg-white navbar-default pt-2 pb-3" fixed="top">
      <div class="container">

        <router-link to="/"><b-navbar-brand><span class="color-primary medium-bold navbar-title">Setarbak</span></b-navbar-brand></router-link>

        <b-collapse id="nav-text-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <router-link to="/"><b-nav-text class="nav-link">Home</b-nav-text></router-link>
            <router-link to="/beverages"><b-nav-text class="nav-link">Beverages</b-nav-text></router-link>
            <router-link to="/foods"><b-nav-text class="nav-link">Foods</b-nav-text></router-link>
            <router-link to="/cart"><b-nav-text class="nav-link"><b-icon icon="cart"></b-icon></b-nav-text></router-link>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
  </div>
</template>

E:/projects/vue/vue-2/setarbak/node_modules/bootstrap/dist/css/bootstrap.css

<style scoped>
.router-link-exact-active .nav-link {
    color: #87B76A;
}
</style>