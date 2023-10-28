<template>
  <div class="login">
    <form @submit.prevent="submitForm">
      <h2 class="login_title">Login</h2>
      <div class="row mb-3">
        <label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
        <div class="col-sm-10">
          <input id="inputEmail" v-model="user.email" name="email" type="email" class="form-control" />
        </div>
        <span class="messages"></span>
      </div>
      <div class="row mb-3">
        <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
        <div class="col-sm-10">
          <input id="inputPassword" v-model="user.password" name="password" type="password" class="form-control" />
        </div>
        <span class="messages"></span>
      </div>
      <button type="submit" class="login_btn btn btn-primary">Login</button>
    </form>
  </div>
</template>
<script>
import API from '../api';

//export components
export default {
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        const login = await API.Login(this.user);
        localStorage.setItem('firsLogin', login.accessToken);
        window.location.href = '/';
      } catch (err) {
        alert(err.response.data.msg);
      }
    },
  },
};
</script>
<style>
.login {
  display: flex;
  align-items: center;
  width: 340px;
  height: 480px;
  justify-content: center;
  margin: 16% auto;
  border: 3px solid #ccc;
  border-radius: 6px;
}
.login > form {
  width: 400px;
  padding: 15px 30px;
  margin-left: 40px;
}
.login_title {
  margin: 40px 0;
  text-align: center;
}
.login_btn {
  margin: 40px 0;
}
.col-form-label {
  margin: 0 10px;
}
@media (min-width: 992px) {
  .login {
    width: 540px;
  }
}
</style>
