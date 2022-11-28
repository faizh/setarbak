<template>
  <div class="container">
    <Navigations :menu="currMenu" />

    <div class="row">
      <div
        class="col-md-4 mt-3 d-flex justify-content-center"
        v-for="product in products"
        :key="product.id"
      >
        <CardProduct :product="product" />
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import CardProduct from "../components/CardProduct.vue";
import Navigations from "../components/Navigations.vue";
</script>
  
  <script>
export default {
  data() {
    return {
      currMenu: "Foods",
      products: [
        { id: 1, name: "Beef Sausage & Cheese Croissant ", desc: "This classic croissant is made with 100 percent butter to create a golden, crunchy top and soft, flaky layers inside.", price: "10000" , img:"https://www.starbucks.co.id/storage/image/temporary/summernote_image_1648614145.jpg"},
        { id: 2, name: "Almond Croissant", desc: "Rich, almond flan enveloped in a croissant, then topped with sliced almonds. It's the perfect combination of sweet and savory.", price: "20000", img:"https://www.starbucks.co.id/storage/image/temporary/summernote_image_1648614514.jpg" },
        { id: 3, name: "Chocolate Croissant", desc: "Butter croissant dough is wrapped around two chocolate batons to create a perfect balance that will satisfy any sweet tooth.", price: "30000", img:"https://www.starbucks.co.id/storage/image/temporary/summernote_image_1648614596.jpg" },
        { id: 4, name: "Cheese Bagels", desc: "A New York style bagel topped with Asiago cheese, poppy and sesame seeds, onion and garlic.", price: "40000",  img:"https://www.starbucks.co.id/storage/image/temporary/summernote_image_1648614815.jpg" },
        { id: 5, name: "Bagel Bites ", desc: "Bagel in small bites with Cheese Melt filling.", price: "40000", img:"https://www.starbucks.co.id/storage/image/temporary/summernote_image_1648614915.jpg" },
        { id: 6, name: "Srikaya Swirl Danish", desc: "A classic Danish Swirl with Srikaya filling", price: "40000", img:"https://www.starbucks.co.id/storage/image/temporary/summernote_image_1648615140.jpg" },
      ],
    };
  },
};
</script>