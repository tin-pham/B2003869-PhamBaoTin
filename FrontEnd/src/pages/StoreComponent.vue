<template>
  <div id="store" class="trendy">
    <h1 class="trendy_titles">Featured</h1>
    <div class="trendy_container container">
      <div class="row">
        <div class="trendy_ctn_nav col-lg-2">
          <h3>Categories</h3>
          <ul class="list-group nav list-group-flush">
            <li
              class="btn btn-secondary list-group-item dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Phones
            </li>
            <ul class="dropdown-menu">
              <li>
                <a class="dropdown-item" @click="handleFilter('iPhones')">iPhones</a>
              </li>
              <li>
                <a class="dropdown-item" @click="handleFilter('Samsung')">Samsung</a>
              </li>
            </ul>
            <li
              class="btn btn-secondary list-group-item dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Laptop
            </li>
            <ul class="dropdown-menu">
              <li>
                <a class="dropdown-item" @click="handleFilter('ASUS')">ASUS</a>
              </li>
              <li>
                <a class="dropdown-item" @click="handleFilter('Dell')">Dell</a>
              </li>
              <li>
                <a class="dropdown-item" @click="handleFilter('HP')">HP</a>
              </li>
            </ul>
          </ul>
        </div>
        <div class="trendy_List container col-lg-10">
          <div class="row">
            <router-link
              v-for="product in products"
              :key="product.product_id"
              :to="`/products/${product.product_id}`"
              class="card col-4"
            >
              <img :src="`${product.images.url}`" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">{{ product.title }}</h5>
              </div>
            </router-link>
          </div>
        </div>
        <div class="row">
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li
                v-for="pageNumber in Array.from({ length: totalPages }, (_, i) => i + 1)"
                :key="pageNumber"
                class="page-link"
                @click="handlePageChange(pageNumber)"
              >
                {{ pageNumber }}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import API from '@/api';
import axios from 'axios';

export default {
  data() {
    return {
      products: [],
      totalPages: 1,
      currentPage: 1,
      type: '',
    };
  },
  mounted() {
    this.fetchItems();
  },
  methods: {
    async getProducts() {
      //get product in mongooseDB
      let getProducts = await API.getProducts({
        pageNumber: this.pageNumber,
        info: this.info,
      });

      this.products = getProducts.products;

      //get number pages
      let getQuantity = await API.getQuantity({ info: this.info });
      let checkPage = getQuantity % 6;
      if (checkPage === 0) {
        let numberPage = getQuantity / 6;
        this.quantity = numberPage;
      } else {
        let numberPage = getQuantity / 6;
        numberPage = Math.floor(numberPage + 1);
        this.quantity = numberPage;
      }
    },
    handlePageChange(pageNumber) {
      this.currentPage = pageNumber;
      this.fetchItems();
    },
    async fetchItems() {
      const response = await axios.get(
        `http://localhost:3000/api/products?page=${this.currentPage}&filter=${this.type}`,
      );
      console.log('wtf');
      this.products = response.data.products;
      this.totalPages = response.data.totalPages;
    },
    async handleFilter(filter) {
      this.type = filter;
      this.currentPage = 1;
      await this.fetchItems();
    },
    async getPage(e) {
      var obj = {};
      if (this.$route.query.info) {
        obj.info = this.$route.query.info;
      }
      this.$router.push({ query: { page: e, info: obj.info } });
    },
  },
};
</script>
<style>
.trendy {
  width: 100%;
}

.trendy > h1 {
  text-align: center;
}

.trendy_ctn_nav {
  margin: 20px 0;
}

.trendy_List > .row {
  justify-content: space-around;
}

.card {
  width: 18rem;
  border: 0;
  background: transparent;
  text-decoration: none;
  color: #000;
}

.card:hover {
  color: rgb(0, 0, 0, 0.8);
}

.card > img {
  clip-path: polygon(30% 2%, 70% 2%, 100% 0, 100% 100%, 70% 98%, 30% 98%, 0 100%, 0 0);
}

.card-body {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.btn {
  clip-path: polygon(0 0, 100% 0, 97% 33%, 97% 68%, 100% 100%, 0 100%, 3% 67%, 3% 33%);
}

.list-group-item.active {
  background-color: #f8f2ed;
  color: #000;
}
.pagination {
  width: 100%;
  justify-content: center;
  margin-top: 30px;
}
.page-item {
  margin: 0 13px;
}
.page-link {
  clip-path: circle(50% at 50% 50%);
  background: rgb(198, 190, 190, 0.2);
  color: #000;
  cursor: pointer;
}
</style>
