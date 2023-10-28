<template>
  <div class="container">
    <div class="row">
      <ul class="list-group list-group-flush col-3">
        <router-link to="profile" class="list-group-item list-group-item-action">Profile</router-link>
      </ul>
      <div class="col-9">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import API from '../api';

export default {
  async created() {
    const token = { token: localStorage.getItem('firsLogin') };
    const user = await API.info(token);
    if (user.role === 1) {
      this.admin = true;
    }
    this.$router.push('profile');
  },
};
</script>
<style></style>
