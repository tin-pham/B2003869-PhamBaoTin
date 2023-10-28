<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <router-link to="/"><img class="navbar-brand" src="../../../img/logo.webp" lt="" /></router-link>
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="navbarSupportedContent" class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link active" aria-current="page" href="#">Home</router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link" href="#store" @click="navigationStore"> Shop Now </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#contact" @click="navigationContact()">Contact Us</a>
          </li>
        </ul>

        <ul v-if="!$store.state.token" class="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
          <li class="nav-item">
            <router-link class="nav-link" to="/login"><a class="nav-link login_btn" href="#">Login</a></router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/register"
              ><a class="nav-link register_btn" href="#">Register</a></router-link
            >
          </li>
        </ul>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/info"><a class="nav-link info" href="#">Info</a></router-link>
          </li>
          <li v-if="$store.state.token" class="nav-item">
            <router-link class="nav-link" to="/" @click="logout"
              ><a class="nav-link logout_btn" href="#"><i class="fa-solid fa-right-from-bracket"></i></a
            ></router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    async logout() {
      localStorage.removeItem('firsLogin');
      this.$router.push('/');

      // wait router
      setTimeout(() => {
        location.reload();
      }, 500);
    },
    navigationContact() {
      this.$router.push('/#contact');
    },
  },
};
</script>

<style>
.navbar {
  position: relative;
  height: 80px;
}
.nav_form {
  padding: 8px;
  box-shadow: 1px 1px 8px#ccc;
  border-radius: 6px;
  align-items: center;
}
.navbar-brand {
  width: 50px;
}
.nav-link {
  text-decoration: none;
}
.nav_form > input {
  border: 0;
  margin: 0 16px;
}
.dropdown-menu {
  padding-right: 8px;
}
.dropdown-menu > h6 {
  margin-left: 10px;
}
.dropdown-item {
  margin-left: 10px;
}
.cart_title {
  text-align: center;
  padding: 10px 0;
  display: block;
}

.cart_list {
  overflow: auto;
  height: 300px;
}

.cart {
  display: none;
  position: absolute;
  width: 400px;
  height: 460px;
  left: 48%;
  top: 60%;
  background: #fff;
  z-index: 1;
  border-radius: 8px;
  box-shadow: 1px 1px 8px#ccc;
}

.cart:hover {
  display: block;
}

.btn_cart:hover {
  display: block;
  cursor: pointer;
  background-color: #ccc;
}

.btn_info,
.btn_cart {
  padding: 10px 14px;
}

.btn_cart:hover {
  cursor: pointer;
  background-color: #ccc;
  border-radius: 3px;
}

.btn_cart:hover + div {
  display: block;
}

.user_btn:hover div {
  display: none;
}

.hidden {
  display: none;
}

.cart_list_empty {
  text-align: center;
  font-size: 16px;
  margin-top: 100px;
}

@media (min-width: 992px) {
  .nav_form {
    width: 26%;
  }
  .navbar-nav {
    margin-left: 14%;
  }
  .nav-item {
    margin: 0 10px;
  }
  .nav-item > a {
    font-size: 1rem;
    font-weight: 500;
  }
  .user_btn {
    padding-left: 30px;
  }
}
</style>
