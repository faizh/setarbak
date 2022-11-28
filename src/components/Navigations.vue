<template>
  <div class="row mb-5">
    <div class="col background-primary pt-5 pb-4">
      <div class="row">
        <div class="col">
          <span class="text-center color-secondary"
            ><h3>
              <span class="text-white">Our</span> <strong class="color-secondary">{{ menu }}</strong>
            </h3></span
          >
        </div>
      </div>
      <div class="row">
        <div class="col d-flex justify-content-center">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/">Home</router-link>
              </li>
              <li class="breadcrumb-item active text-white" aria-current="page">
                {{ menu }}
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: ["menu"]
}
</script>