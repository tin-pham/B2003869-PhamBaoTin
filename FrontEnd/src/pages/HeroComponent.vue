<template>
  <div class="container-fluid hero">
    <div class="row">
      <div class="col-lg-6 col-md-12">
        <h1>Welcome</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <router-link to="/">
          <button type="button" class="btn btn-primary">Shop Now</button>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style>
.hero {
  background: url('../../public/img/hero.webp') no-repeat center;
  background-size: cover;
  height: 500px;
}
</style>
