<template>
  <div class="container">
    <Navigations :menu="currMenu" />

    <div class="row">
        <div class="col-md-4 mt-4 d-flex justify-content-center" v-for="product in products" :key="product.id">
            <CardProduct :product="product"/>
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
            currMenu: "Beverages",
            products: [
                {id: 1, name:"Caffè Latte", desc:"Latte dengan saus Praline dan karamel dengan rasa dan aroma manis", price:35000, img:"https://www.starbucks.co.id/storage/image/temporary/summernote_image_1648177502.jpg"},
                {id: 2, name:"Cappuccino", desc:"Espresso with steamed milk, topped with a deep layer of foam.", price:30000, img:"https://www.starbucks.co.id/storage/image/temporary/summernote_image_1648177603.jpg"},
                {id: 3, name:"Caffè Mocha", desc:"Espresso with bittersweet mocha sauce and steamed milk, topped with sweetened whipped cream. Delightful.", price:40000, img:"https://www.starbucks.co.id/storage/image/temporary/summernote_image_1648177734.jpg"},
                {id: 4, name:"Caramel Frappuccino", desc:"Buttery caramel syrup meets coffee, milk and ice for a rendezvous in the blender. Then whipped cream and caramel sauce layer the love on top.", price:35000, img:"https://www.starbucks.co.id/storage/image/temporary/summernote_image_1648475750.jpg"},
                {id: 5, name:"Caramel Java Chip Frappuccino", desc:"Java Chip Frappuccino® with a swirl of caramel sauce on top.", price:48000, img:"https://www.starbucks.co.id/storage/image/temporary/summernote_image_1648477662.jpg"},
                {id: 6, name:"Mocha Jelly Frappuccino", desc:"Mocha sauce, Frappuccino® roast coffee, coffee jelly, milk and ice all come together for a delecious mocha flavor.", price:48000, img:"https://www.starbucks.co.id/storage/image/temporary/summernote_image_1648478321.jpg"},
            ]
        }
    }
}
</script>