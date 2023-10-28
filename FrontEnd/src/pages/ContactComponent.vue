<template>
  <div id="contact" class="contact container">
    <div class="row">
      <div class="col-lg-6 col-md-12">
        <form class="row g-3 contact_form">
          <h1>Contact Us</h1>
          <p>You will get the news about our products</p>
          <div class="col-12">
            <router-link to="/register">
              <button type="submit" class="btn btn-dark btn-md">Register</button></router-link
            >
          </div>
        </form>
      </div>
      <div class="col-lg-6 col-md-12">
        <div class="contact_img col-lg-6 col-md-12">
          <img class="" src="../../../img/contact.webp" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style>
.contact {
  display: flex;
  justify-content: center;
  align-items: center;
}
.contact > .row {
  justify-content: space-between;
}
.contact_img > img {
  width: 700px;
}
.contact_form {
  text-align: center;
  margin: 5% 0;
}
.contact_img {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (min-width: 992px) {
  .contact_form {
    margin-top: 18%;
    text-align: left;
  }
  .contact_form {
    margin: 40px 0 0px 10%;
  }
}
</style>
