<template>
  <div class="logo" @click="goHome">
    <img src="../assets/img/logo.png" alt="" srcset="" />
  </div>
</template>
<script>
export default {
  name: "head_logo",
  methods: {
    goHome() {
      this.$router.push({ path: "/" });
    }
  }
};
</script>
<style scoped lang="scss">
.logo {
  width: 157px;
  height: 44px;
  img {
    display: block;
    width: 100%;
    height: auto;
  }
  cursor:pointer;
}
</style>
