<template>
  <h1>Total: {{ price }}đ</h1>
  <button type="button" class="btn btn-dark" @click="buyProduct">Checkout</button>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Product ID</th>
        <th scope="col"></th>
        <th scope="col">Amount</th>
        <th scope="col">Price</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody v-if="cart.length !== 0">
      <tr v-for="(product, index) in cart" :key="index">
        <th class="index">{{ index + 1 }}</th>
        <td class="id_product">{{ product.item.product_id }}</td>
        <td class="image_product">
          <img :src="`${product.item.images.url}`" alt="" />
        </td>
        <td class="number_product">{{ product.number }}</td>
        <td class="prices_product">{{ product.item.price }}đ</td>
        <td class="edit_product">
          <button type="button" class="btn btn-dark" @click="deleteProduct(product)">Remove</button>
        </td>
      </tr>
      <tr v-if="cart.length === 0">
        <td colspan="6" class="empty_cart">Empty cart</td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import API from '@/api';

export default {
  data() {
    return {
      cart: [],
      price: 0,
    };
  },
  async created() {
    const token = { token: localStorage.getItem('firsLogin') };
    const user = await API.info(token);
    this.cart = [...user.cart];
    this.cart.forEach((item) => {
      this.price += item.number * item.item.price;
    });
  },
  methods: {
    async deleteProduct(e) {
      //get product data
      const product = e;
      // get Information user
      const token = { token: localStorage.getItem('firsLogin') };
      const user = await API.info(token);
      // send req.body
      const info = {
        product: product,
        user: user._id,
      };
      // delete child item in mongoose db
      const deleteProduct = await API.deleteProduct(info);

      // delete product in client
      if (deleteProduct) {
        this.cart.forEach((item, index) => {
          if (item.product.product_id === product.product.product_id) {
            this.cart.splice(index, 1);
            this.cart.forEach((item) => {
              this.price += item.number * item.product.price;
            });
            alert('Delete successfully');
            return;
          }
        });
      }
    },
    async buyProduct() {
      // get Information user
      const token = { token: localStorage.getItem('firsLogin') };
      const user = await API.info(token);

      this.cart = [];
      this.price = 0;
      user.cart = this.cart;

      // buy product
      await API.buyProduct(user);
      alert('Buy successfully');
    },
  },
};
</script>
<style>
.image_product {
  text-align: center;
}

.image_product > img {
  width: 26%;
  border-radius: 8px;
}

.index,
.edit_product,
.number_product,
.prices_product,
.id_product {
  vertical-align: middle;
}

.empty_cart {
  margin-top: 10px;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
}
</style>
