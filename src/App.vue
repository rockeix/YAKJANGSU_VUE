<template>
  <div id="App">
    <Header />

    <div id="nav">
      <router-link to="/logo"></router-link>
    </div>
    <router-view />

    <Footer />
  </div>
</template>
  
<script>
import Header from './layout/Header.vue';
import Footer from './layout/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  // methods: {
  //   kakaoLogin() {
  //     const params = {
  //       redirectUri:'http://localhost:8080/login',
  //     }
  //     window.Kakao.Auth.authorize(params)
      
  //   }
  // },
}

</script>
  
<style>
</style>