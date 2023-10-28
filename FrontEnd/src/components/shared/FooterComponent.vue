<template>
  <div class="footer container">
    <div class="row">
      <div class="brand col-12">
        <a href=""><img src="../../../img/logo.webp" alt="" /></a>
      </div>

      <div class="footer_content col-lg-6 col-md-12">
        <p>Copyright © 2023</p>
      </div>
      <div class="footer_bg"></div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style>
.footer_bg {
  position: absolute;
  height: 20%;
  background-color: #add8e6;
  z-index: -1;
  left: 0;
  right: 0;
}
.brand > a > img {
  width: 50px;
  margin-left: 10px;
}
.brand {
  margin-top: 10%;
  text-align: center;
}
.icon_footer {
  margin: 3% 0;
}
.icon_footer > a {
  color: #000;
  margin: 0 10px;
}
.icon_footer > a:hover {
  color: #988ebe;
}
.icon_footer > a > i {
  font-size: 30px;
}
.footer_content {
  width: 100%;
  text-align: center;
}
@media (min-width: 992px) {
  .brand {
    margin-top: 5%;
    text-align: center;
  }
}
</style>
