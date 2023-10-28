<template>
  <div class="register">
    <form @submit.prevent="submitForm">
      <h2 class="register_title">Register</h2>
      <div class="row mb-3">
        <label for="inputName" class="col-sm-2 col-form-label">Name</label>
        <div class="col-sm-10">
          <input id="inputName" v-model="user.name" type="text" class="form-control" />
        </div>
      </div>
      <div class="row mb-3">
        <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
        <div class="col-sm-10">
          <input id="inputEmail3" v-model="user.email" type="email" class="form-control" />
        </div>
        <span class="messages"></span>
      </div>
      <div class="row mb-3">
        <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
        <div class="col-sm-10">
          <input id="inputPassword3" v-model="user.password" type="password" class="form-control" />
        </div>
        <span class="messages"></span>
      </div>

      <button type="submit" class="login_btn btn btn-primary">Register</button>
    </form>
  </div>
</template>
<script>
//export components
import API from '../api';

export default {
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        await API.register(this.user);
        alert('Register successfully');
        this.$router.push({
          name: 'login',
        });
      } catch (err) {
        alert(err.response.data.msg);
      }
    },
  },
};
</script>
<style>
.register {
  display: flex;
  align-items: center;
  width: 640px;
  height: 680px;
  justify-content: center;
  margin: 8% auto;
  border: 3px solid #ccc;
  border-radius: 6px;
}
.register > form {
  width: 500px;
  padding: 15px 30px;
  margin-left: 60px;
}

.register_title {
  margin: 40px 0;
  text-align: center;
}

.register_btn {
  margin: 40px 0;
}
.col-form-label {
  margin: 0 10px;
}
.messages {
  margin-left: 8px;
  font-weight: 500;
}
.messages.success {
  color: rgb(37, 240, 41);
}
.messages.error {
  color: rgb(219, 34, 27);
}
@media (min-width: 992px) {
  .register {
    width: 540px;
  }
}
</style>
