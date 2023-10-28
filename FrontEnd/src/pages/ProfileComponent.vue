<template>
  <div class="profile">
    <h1 class="profile_title">Profile</h1>
    <div class="profile_content">
      <div class="name">
        Name:
        <p>{{ user.name }}</p>
      </div>
      <div class="email">
        Email:
        <p>{{ user.email }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import API from '@/api';

export default {
  data() {
    return {
      user: {},
    };
  },
  async created() {
    const token = { token: localStorage.getItem('firsLogin') };
    this.user = await API.info(token);
  },
};
</script>
<style>
.profile {
  height: 300px;
}
.profile_title {
  text-align: center;
  font-size: 40px;
  font-weight: bold;
}
.name > p {
  font-size: 30px;
  margin-left: 60px;
  font-weight: bold;
}
.email > p {
  font-size: 30px;
  font-weight: bold;
  margin-left: 60px;
}
</style>
