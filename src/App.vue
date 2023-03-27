<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <h1 class="p-m-0 p-text-uppercase">Yahya Al Hasymi</h1>
  <nav>
      <router-link class="nav-link" active-class="active" to="/chart">Chart</router-link>
      <router-link class="nav-link" active-class="active" to="/table">Table</router-link>
  </nav>
  <router-view />
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  name: 'App',
  components: {
    RouterLink,
  }
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  h1 {
    font-size: 2rem;
    font-weight: 500;
    color: #4b4f56;
    letter-spacing: 0.05em;
  }

  .nav-link {
    display: inline-block;
    margin-right: 20px;
    text-decoration: none;
    color: #0077be;
    font-size: 16px;
    font-weight: bold;
  }

  .nav-link:hover {
    text-decoration: underline;
  }

  .nav-link.active {
    font-weight: bold;
    color: #074f97;
  }
</style>
