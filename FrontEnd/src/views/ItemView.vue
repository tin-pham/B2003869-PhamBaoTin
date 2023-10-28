<template>
  <div class="products container">
    <div class="row">
      <div class="img_pro col-lg-8 col-12">
        <span>
          <img :src="`${url}`" alt="" />
        </span>
      </div>
      <div class="content_pro col-lg-4 col-12">
        <h1 class="titel_pro">{{ product.title }}</h1>
        <p>{{ product.description }}</p>
        <p>Price: {{ product.price }} đ</p>
        <p>{{ product.content }}</p>
        <div class="container">
          <div class="number_item row">
            <h4 class="col">Số lượng:</h4>
            <input v-model="number" class="col" type="number" />
          </div>
        </div>
        <div class="buy_item">
          <button type="button" class="btn btn-dark" @click="addCart">
            Buy<i class="fa-solid fa-cart-shopping"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import API from '../api';
import { useRoute } from 'vue-router';

//export components
export default {
  data() {
    return {
      number: 1,
      product: {},
      url: '',
    };
  },
  watch: {
    'product.images.url': function () {
      if (this.product.images.url) {
        console.log(this.product);
        this.url = this.product.images.url;
      }
    },
  },
  async created() {
    const route = useRoute();
    this.product = await API.getProduct(route.params.id);
  },
  methods: {
    async addCart() {
      try {
        const token = { token: this.$store.state.token };
        const user = await API.info(token);
        console.log(user);
        const ProductInCart = {
          userId: user._id,
          quantity: this.number,
          product: this.product,
        };
        const addProduct = await API.addProduct(ProductInCart);

        alert('Add product success');
      } catch (err) {
        alert(err.response.data.msg);
      }
    },
  },
};
</script>
<style>
.products {
  margin: 10% 0;
}
.img_pro {
  display: flex;
  align-items: center;
  justify-content: center;
}

.img_pro > span {
  box-shadow: 1px 3px 3px 2px #ccc;
  border-radius: 4px;
}

.img_pro > span > img {
  width: 400px;
  margin: 4px;
  border-radius: 4px;

  box-shadow: 1px 3px 2px solid #ccc;
}
.number_item {
  margin-bottom: 40px;
}

.number_item > h4 {
  width: 70px;
}

.number_item > input {
  display: block;
  width: 100px;
}
@media (min-width: 992px) {
  .login {
    width: 540px;
  }
}
</style>
