<template>
  <div>
    <div id="mainslider">
      <splide :options="options">
        <splide-slide>
          <img class="slider-image" src="../assets/banner1.png" alt="main1" />
        </splide-slide>
        <splide-slide>
          <router-link to="/goods/goodsDetail/68">
            <img class="slider-image" src="../assets/banner2.png" alt="main2" />
          </router-link>
        </splide-slide>
        <splide-slide>
          <img class="slider-image" src="../assets/banner3.png" alt="main2" @click="goToEvent()" />
        </splide-slide>
      </splide>
    </div>


    <div class="con">
      <div class="content cate-list">
        <h2 class="home_title">유산균 BEST</h2>
        <div class="s1">
          <div class="s2" v-for="(goods, index) in filteredGoodsList(1).slice(0, 5)" :key="index">
            <div class="box">
              <a class="imgSpace" :href="'http://localhost:8080/goods/goodsDetail/' + goods.goods_no">
                <img
                  :src="goods.goods_img ? require(`../../../node-back/uploads/uploadGoods/${goods.goods_img}`) : '/goodsempty.jpg'"
                  alt="상품 이미지" @click="goToDetail(goods.goods_no)"
                  style="width: 100%; height: 230px; padding-right: 30px;">
                <p class="card-text align-left goods-name">{{ goods.goods_name }}</p>
                <p class="card-text align-left goods-price" style="color: black"> {{ formatPrice(goods.goods_price) }}
                </p>
              </a>
            </div>
          </div>
        </div>
        <div v-if="goodsList.length == 0" class="s1">
          <h1><img src="../../public/goodsempty.jpg" alt="..." style="text-align: center"></h1>
        </div>
      </div>
      <div class="content cate-list">
        <h2 class="home_title">비타민 BEST</h2>
        <div class="s1">
          <div class="s2" v-for="(goods, index) in filteredGoodsList(2).slice(0, 5)" :key="index">
            <div class="box">
              <a class="imgSpace" :href="'http://localhost:8080/goods/goodsDetail/' + goods.goods_no">
                <img
                  :src="goods.goods_img ? require(`../../../node-back/uploads/uploadGoods/${goods.goods_img}`) : '/goodsempty.jpg'"
                  alt="상품 이미지" @click="goToDetail(goods.goods_no)"
                  style="width: 100%; height: 230px; padding-right: 30px;">
                <p class="card-text align-left goods-name">{{ goods.goods_name }}</p>
                <p class="card-text align-left goods-price" style="color: black"> {{ formatPrice(goods.goods_price) }}
                </p>
              </a>
            </div>
          </div>
        </div>
        <div v-if="goodsList.length == 0" class="s1">
          <h1><img src="../../public/goodsempty.jpg" alt="..." style="text-align: center"></h1>
        </div>
      </div>

      <div class="content cate-list">
        <h2 class="home_title">오메가 BEST</h2>
        <div class="s1">
          <div class="s2" v-for="(goods, index) in filteredGoodsList(3).slice(0, 5)" :key="index">
            <div class="box">
              <a class="imgSpace" :href="'http://localhost:8080/goods/goodsDetail/' + goods.goods_no">
                <img
                  :src="goods.goods_img ? require(`../../../node-back/uploads/uploadGoods/${goods.goods_img}`) : '/goodsempty.jpg'"
                  alt="상품 이미지" @click="goToDetail(goods.goods_no)"
                  style="width: 100%; height: 230px; padding-right: 30px;">
                <p class="card-text align-left goods-name">{{ goods.goods_name }}</p>
                <p class="card-text align-left goods-price" style="color: black"> {{ formatPrice(goods.goods_price) }}
                </p>
              </a>
            </div>
          </div>
        </div>
        <div v-if="goodsList.length == 0" class="s1">
          <h1><img src="../../public/goodsempty.jpg" alt="..." style="text-align: center"></h1>
        </div>
      </div>

      <div class="content cate-list">
        <h2 class="home_title">홍삼 BEST</h2>
        <div class="s1">
          <div class="s2" v-for="(goods, index) in filteredGoodsList(4).slice(0, 5)" :key="index">
            <div class="box">
              <a class="imgSpace" :href="'http://localhost:8080/goods/goodsDetail/' + goods.goods_no">
                <img
                  :src="goods.goods_img ? require(`../../../node-back/uploads/uploadGoods/${goods.goods_img}`) : '/goodsempty.jpg'"
                  alt="상품 이미지" @click="goToDetail(goods.goods_no)"
                  style="width: 100%; height: 230px; padding-right: 30px;">
                <p class="card-text align-left goods-name">{{ goods.goods_name }}</p>
                <p class="card-text align-left goods-price" style="color: black"> {{ formatPrice(goods.goods_price) }}
                </p>
              </a>
            </div>
          </div>
        </div>
        <div v-if="goodsList.length == 0" class="s1">
          <h1><img src="../../public/goodsempty.jpg" alt="..." style="text-align: center"></h1>
        </div>
      </div>
      <div class="content cate-list">
        <h2 class="home_title">기타 BEST</h2>
        <div class="s1">
          <div class="s2" v-for="(goods, index) in filteredGoodsList(5).slice(0, 5)" :key="index">
            <div class="box">
              <a class="imgSpace" :href="'http://localhost:8080/goods/goodsDetail/' + goods.goods_no">
                <img
                  :src="goods.goods_img ? require(`../../../node-back/uploads/uploadGoods/${goods.goods_img}`) : '/goodsempty.jpg'"
                  alt="상품 이미지" @click="goToDetail(goods.goods_no)"
                  style="width: 100%; height: 230px; padding-right: 30px;">
                <p class="card-text align-left goods-name">{{ goods.goods_name }}</p>
                <p class="card-text align-left goods-price" style="color: black"> {{ formatPrice(goods.goods_price) }}
                </p>
              </a>
            </div>
          </div>
        </div>
        <div v-if="goodsList.length == 0" class="s1">
          <h1><img src="../../public/goodsempty.jpg" alt="..." style="text-align: center"></h1>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';

import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';


export default {
  name: 'MainSlider',
  components: {
    Splide,
    SplideSlide,
  },
  data() {
    return {
      loginUser: {},
      goodsList: [],
      options: {
        type: 'fade',
        rewind: true,
        perPage: 1,
        autoplay: true,
        interval: 3000,
        pauseOnHover: false,
        arrows: false,
        dots: true,
        animatedDots: true,
        transition: 'fade',
        speed: 800,
      },
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  created() {
    this.getUser();
  },
  mounted() {
    this.getGoodsList();
  },
  methods: {
    async getUser() {
      try {
        const response = await axios.get(`http://localhost:3000/mypage/mypage/${this.user.user_no}`);
        this.loginUser = response.data[0];
      } catch (error) {
        console.error(error);
      }
    },
    async getGoodsList() {
      try {
        const response = await axios.get('http://localhost:3000/goods/maingoods');
        this.goodsList = response.data;
        console.log(this.goodsList);
      } catch (error) {
        console.error(error);
      }
    },
    goToDetail(goodsno) {
      window.location.href = `http://localhost:8080/goods/goodsDetail/${goodsno}`;
    },
    formatPrice(price) {
      if (price !== undefined) {
        const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return `${formattedPrice} 원`;
      }
      return '';
    },
    filteredGoodsList(category) {
      return this.goodsList.filter((goods) => goods.goods_category === category);
    },
    goToEvent() {
      if (this.loginUser.user_doevent == 1) {
        this.$swal("이미 이벤트에 참여하셨습니다.")
        this.$router.push({ path: '/' });
      } else {
        this.$router.push({ path: '/event' });
      }
      if(this.user.user_no === ''){
        this.$swal("로그인이 필요한 페이지입니다.")
        this.$router.push({path: '/login'});
      }
    },
  }
}
</script>

<style scoped>
@charset "UTF-8";

@font-face {
  font-family: 'ChosunCentennial';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2206-02@1.0/ChosunCentennial.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'seolleimcool-SemiBold';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2312-1@1.1/seolleimcool-SemiBold.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'SejonghospitalBold';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2312-1@1.1/SejonghospitalBold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}


:root {
  --app-container: #f7f8fa;
  /* --app-container: #f3f6fd; */
  --main-color: #1f1c2e;
  --secondary-color: #4A4A4A;
  --link-color: #1f1c2e;
  --link-color-hover: #c3cff4;
  --link-color-active: #fff;
  --link-color-active-bg: #1f1c2e;
  --projects-section: #fff;
  --message-box-hover: #fafcff;
  --message-box-border: #e9ebf0;
  --more-list-bg: #fff;
  --more-list-bg-hover: #f6fbff;
  --more-list-shadow: rgba(209, 209, 209, 0.4);
  --button-bg: #1f1c24;
  --search-area-bg: #fff;
  --star: #1ff1c2e;
  --message-btn: #fff;
}

/* 
html, body {
  width: 100%;
  height: 100vh;
  margin: 0;
} */

body {
  font-family: "DM Sans", sans-serif;
  overflow: scroll;
  display: flex;
  justify-content: center;
  background-color: var(--app-container);
}

/*body 스크롤바*/
body::-webkit-scrollbar {
  width: 12px;
  height: 8px;
}

body::-webkit-scrollbar-track {
  background-color: rgb(218, 218, 218);
  border-radius: 10px;
}

body::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #9c0410;
}

body::-webkit-scrollbar-button {
  width: 0;
  height: 0;
}

button,
a {
  cursor: pointer;
}

p {
  margin-left: 20px;
  line-height: 24px;
  font-size: 12px;
  color: rgb(173, 173, 173);
}

.slider-image {
  width: 100%;
  height: 345px;
  object-fit: cover;
}

.con {
  justify-content: space-between;
  align-items: center;
  flex: 2;
  background-color: var(--projects-section);
  border-radius: 32px;
  padding: 50px;
  margin: 50px;
  display: flex;
  flex-direction: column;
}

.content {
  max-width: 1200px;
  width: 100%;
  align-items: center;
  margin: 0 auto;
  overflow: auto;
}

.content::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

.content::-webkit-scrollbar-track {
  background-color: rgb(218, 218, 218);
  border-radius: 10px;
}

.content::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #9c0410;
}

.content::-webkit-scrollbar-button {
  width: 0;
  height: 0;
}

.s1 {
  display: flex;
  margin-left: 14px;
  margin-bottom: 80px;

}

.box{
  padding: 15px;
}

.home_title {
  margin: 40px 0px 20px 0px;
  text-align: center;
}

img {
  width: auto;
  height: 200px;
  object-fit: contain;
}

a img {
  margin: auto;
  width: 100%;
  height: 100%;
}

.s2:hover .box {
  transform: scale(1.12);
  transition: all 0.1s linear;
}

.s2:hover .box p {
  color: #9c0410;
}

.s2:not(:hover) .box {
  transform: scale(1.0);
  transition: all 0.1s linear;
}

.card-text {
  margin: 3px;
  margin-top: 5px;
}

.card-text.align-center {
  text-align: center;
  margin-right: 40px;
  font-size: 15px;
}

.goods-name {
  font-size: 14px;
  color: black;
  font-weight: bold;
}
</style>