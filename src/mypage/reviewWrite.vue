<template>
  <div class="con">
    <div class="info">
      <div class="my">
        <div style="margin-left: 30px; margin-right: 200px;">
          <h2 style="color: #fff;">{{ loginUser.user_name }}님의</h2>
          <h2 style="color: #fff;">회원정보입니다.</h2>
        </div>

        <div class="infobox">
          <div class="userinfo">
            <h1 class="count">{{ userOrder.order_cnt }}</h1>
            <h3>주문내역</h3>
          </div>
        </div>

        <div class="infobox">
          <div class="userinfo">
            <h1 class="count">{{ loginUser.user_point }}</h1>
            <h3>적립금</h3>
          </div>
        </div>

        <div class="infobox">
          <div class="userinfo">
            <h1 class="count">{{ userDeli.deli_cnt }}</h1>
            <h3>배송중</h3>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <nav>
        <div class="sidebar">
          <div class="icon-bar mypage-bar">
            <div>
              <router-link class="m" to="/mypage">
                <button style="background-color: #fff; border-style: none;">
                  <font-awesome-icon icon="fa-solid fa-address-card" size="xl" style="color: #9c0410;" />
                  <p>회원 정보</p>
                </button>
              </router-link>
            </div>
            <div>
              <router-link to="/mypage/myOrderList" class="m">
                <button style="background-color: #fff; border-color: #fff; border-style: none;">
                  <font-awesome-icon icon="fa-solid fa-credit-card" size="xl" style="color: #9c0410;" />
                  <p>주문 내역</p>
                </button>
              </router-link>
            </div>
            <div>
              <router-link to="/mypage/myReviewList" class="m">
                <button style="background-color: #fff; border-color: #fff; border-style: none;">
                  <font-awesome-icon icon="fa-solid fa-pen-to-square" size="xl" style="color: #9c0410;" />
                  <p>나의 리뷰</p>
                </button>
              </router-link>
            </div>

            <div>
              <router-link to="/mypage/myQnaList" class="m">
                <button style="background-color: #fff; border-color: #fff; border-style: none;">
                  <font-awesome-icon icon="fa-solid fa-circle-question" size="xl" style="color: #9c0410;" />
                  <p>문의 내역</p>
                </button>
              </router-link>
            </div>

            <div>
              <router-link to="/mypage/wishList" class="m">
                <button style="background-color: #fff; border-color: #fff; border-style: none;">
                  <font-awesome-icon :icon="['fas', 'heart']" size="xl" style="color: #9c0410;" />
                  <p>찜한 상품</p>
                </button>
              </router-link>
            </div>

          </div>

        </div>
      </nav>

      <div class="myinfo">
        <p style="font-size:170%; margin: 0 60px 30px 250px;">리뷰 작성</p>
        <div class="write">
          <div class="container-wrapper">
            <div class="container goods_add">
              <div class="goods_content">
                <div class="goodsbox">
                  <label class="form-label">제품명</label>
                  <div class="input-group">
                    <span class="input-group-text">{{ getReviewData.ORDERS_GOODS_NAME }}</span>
                  </div>
                </div>

                <div class="goodsbox">
                  <label class="form-label">상품 이미지</label>
                  <img
                    :src="getReviewData.ORDERS_GOODS_IMG ? require(`../../../node-back/uploads/uploadGoods/${getReviewData.ORDERS_GOODS_IMG}`) : '/goodsempty.jpg'">
                </div>

                <div class="goodsbox">
                  <label class="form-label">카테고리</label>
                  <div class="input-group">
                    <span class="input-group-text">{{ categoryType(getReviewData.GOODS_CATEGORY) }}</span>
                  </div>
                </div>

                <div class="goodsbox">
                  <label class="form-label">제품 가격</label>
                  <div class="input-group">
                    <span class="input-group-text">{{ formatPrice(getReviewData.ORDERS_GOODS_PRICE) }}</span>
                  </div>
                </div>

                <div class="goodsbox">
                  <label class="form-label">상세 리뷰</label>
                  <textarea v-model="reviews.reviewCon" class="form-control2" rows=10></textarea>
                </div>

                <div class="goodsbox">
                  <label class="form-label">만족도</label>

                  <div id="rating">
                    <div v-for="(star, index) in 5" :key="index"
                      :class="{ 'star-filled': index < starsSet, 'star-hovered': index < starsHover }"
                      @mouseenter="handleStarHover(index)" @click="handleStarClick(index)">
                      <svg class="star" viewBox="0 12.705 512 486.59">
                        <polygon
                          points="256.814,12.705 317.205,198.566 512.631,198.566 354.529,313.435 414.918,499.295 256.814,384.427 98.713,499.295 159.102,313.435 1,198.566 196.426,198.566"
                          :fill="index < starsSet ? '#ffc74f' : '#dddddd'"></polygon>
                      </svg>
                    </div>
                  </div>
                </div>

                <div class="goodsbox" style="display: flex; align-items: center;">
                  <label class="form-label">사진등록</label>

                  <input type="text" class="form-control3" :value="fileName" placeholder="이미지를 업로드 하세요" disabled>
                  <div class="input-img">
                    <label for="upload-file">파일선택</label>
                    <input type="file" name="upload" id="upload-file" @change="handleFileUpload">
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="btnarea" style="margin-top: 5%;">
            <button :onclick="handleWriteSubmit">등록</button>
            <router-link to="/mypage/myReviewList">
              <button style=" border: 2px solid black;">취소</button>
            </router-link>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      loginUser: {},
      userOrder: {},
      userDeli: {},
      fileName: '이미지를 업로드 하세요',
      imgList: [],
      starsHover: 0,
      starsSet: 5,
      reviewText: '',
      name: '',
      city: '',
      email: '',
      reviews: {
        goodsCategory: '',
        // orderStatus: 0, 
        reviewCon: '', //값을 넣어야할것
        reviewScore: 5, //값을 넣어야할것
        reviewImg: '', //값을 넣어야할것
      },
      getReviewData: {},
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  mounted() {
    if (this.user.user_no == '') {
      alert('로그인해주세요');
      this.$router.push({ path: '/login' });
    }
  },
  created() {
    this.getUser();
    this.getUserOrder();
    this.getUserDeli();
    this.getReview();
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
    async getUserOrder() {
      try {
        const response = await axios.get(`http://localhost:3000/mypage/orderbox/${this.user.user_no}`);
        this.userOrder= response.data[0];
      } catch (error) {
        console.error(error);
      }
    },
    async getUserDeli() {
      try {
        const response = await axios.get(`http://localhost:3000/mypage/delibox/${this.user.user_no}`);
        this.userDeli= response.data[0];
      } catch (error) {
        console.error(error);
      }
    },
    formatPrice(price) {
      if (price !== undefined) {
        const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return `${formattedPrice} 원`;
      }
      return "";
    },
    handleStarHover(index) {
      this.starsHover = index + 1;
    },
    handleStarClick(index) {
      this.starsSet = index + 1;
      this.reviews.reviewScore = index + 1;
    },
    handleReviewInput() {
      this.reviewText = this.reviewText.slice(0, 999);
    },
    handleSubmit() {
      const post = {
        stars: this.starsSet,
        review: this.reviewText,
        name: this.name,
        city: this.city,
        email: this.email,
      };
      console.log(post);
    },
    handleFormSubmit() {
      document.getElementById('submitForm').click();
    },
    async handleFileUpload(event) {
      const formData = new FormData();
      const file = event.target.files[0];
      this.reviews.reviewImg = file.name;
      if (!file) return;
      formData.append('upload', file)
      this.fileName = file ? file.name : '이미지를 업로드 하세요';

      await axios({
        method: 'post',
        url: 'http://localhost:3000/mypage/upload',
        headers: { "Content-Type": "multipart/form-data" },
        data: formData
      })

    },
    async handleWriteSubmit() {
      try {
        const orderno = this.$route.params.orderno;
        const response = await axios({
          method: 'post',
          url: 'http://localhost:3000/mypage/reviewWrite',
          data: {
            review_con: this.reviews.reviewCon,
            review_img: this.reviews.reviewImg,
            review_score: this.reviews.reviewScore,
            user_no: this.user.user_no,
            goods_no: this.getReviewData.GOODS_NO,
            orders_no: orderno,
            orders_status: this.getReviewData.ORDERS_STATUS,
          },
          headers: { "Content-Type": "application/json" }
        });
        if (response.status === 200) {
          this.$swal('리뷰가 등록되었습니다.')
          this.$router.push({ path: `/mypage/myReviewList` });
        }
      } catch (error) {
        console.error(error);
      }
    },
    async getReview() {
      try {
        const orderno = this.$route.params.orderno;
        const response = await axios.get(`http://localhost:3000/mypage/getMyReview/${orderno}`)
        this.getReviewData = response.data[0]
        console.log(this.getReviewData, "ddd")
      } catch (error) {
        console.error(error);
      }
    },
    categoryType(socialType) {
      if (socialType === 1) {
        return '유산균';
      } else if (socialType === 2) {
        return '비타민';
      } else if (socialType === 3) {
        return '오메가';
      } else if (socialType === 4) {
        return '홍삼';
      } else if (socialType === 5) {
        return '기타';
      } else {
        return 'null';
      }
    },

  },
};
</script>
<style scoped>
@charset "UTF-8";

/*폰트*/
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

@font-face {
  font-family: 'GmarketSansMedium';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

hr {
  border: 2px solid #9c0410;
  width: 550px;
  margin-top: 10px;
}

h2 {
  margin: 20px 0;
}

ul,
li {
  list-style: none;
}

a {
  text-decoration: none;
}

:root {
  --app-container: #f7f8fa;
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

body {
  font-family: 'SejonghospitalBold';
  overflow: scroll;
  background-color: var(--app-container);
}

/*스크롤*/
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


/* 회원정보 상단 부분 */

.con {
  justify-content: space-between;
  align-items: center;
  flex: 2;
  background-color: var(--projects-section);
  border-radius: 32px;
  /* padding: 50px; */
  margin: 50px;
  /* display: flex; */
  flex-direction: column;
}

.my {
  display: flex;
  width: 100%;
  position: relative;
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
}


.info {
  font-family: 'GmarketSansMedium';
  background-color: #9c0410;
  width: 100%;
  height: 200px;
  justify-content: space-between;
  align-items: center;
  flex: 2;
  border-radius: 32px 32px 0px 0px;
  padding: 40px;
  display: flex;
  flex-direction: column;
}

.infobox {
  background-color: #fff;
  width: 260px;
  height: 130px;
  padding: 30px;
}

.infobox h1 {
  margin-bottom: 10px;
}

.userinfo {
  text-align: center;
}

.userinfo .count {
  padding-bottom: 4px;
}

/* 네비게이션 바 */

.container {
  margin: 40px 30px;
  font-family: 'SejonghospitalBold';
}

.sidebar {
  width: 100px;
}

nav {
  float: left;
  margin-left: 40px;
  margin-right: 100px;
}

nav p {
  font-family: 'seolleimcool-SemiBold';
}

.mypage-bar {
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.mypage-bar::-webkit-scrollbar {
  display: none;
}

.mypage-bar {

  width: 100px;
  top: 150px;
  margin-top: 20px;
  left: 0;
  overflow-x: hidden;
}

.mypage-bar .m,
.icon-bar p {
  color: #9c0410;
}

.mypage-bar p {
  margin: auto;
  font-size: 20px;
  padding-top: 4px;
  margin-bottom: 80px;
}

.container {
  margin: 40px 30px;
}

h2 {
  margin: 20px 0;
}

/*리뷰 작성*/

.container-wrapper {
  border: 1.5px solid #9c0410;
  border-radius: 20px;
  padding: 15px;
  margin-top: 20px;
  /* height: 20px; */
}

.myinfo {
  width: 500px;
  margin-left: 400px;
  /* margin: 0 auto; */
  /* margin-top: 30px; */
  position: relative;
  font-weight: 700;
  /* margin-top: 30px; */
  /* background-color: #fff2c9; */
  height: 1400px;
}

.write {
  width: 650px;
  height: 1200px;
  margin: auto;
  margin-top: 80px;
}

img {
  width: 53%;
  border-radius: 10px;
}


.form-control {
  display: flex;
  align-items: center;
  width: 300px;
  height: 40px;
  font-size: 1rem;
  padding-left: 20px;
  color: rgb(137, 137, 137);
  border: 2px solid rgb(221, 221, 221);
  border-radius: 10px;
  margin-right: 10px;
}

/*수량 버튼 숫자 가운데, 증감 버튼 없애기*/
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.form-control2 {
  display: flex;
  align-items: center;
  width: 300px;
  height: 200px;
  font-size: 1rem;
  padding-left: 20px;
  padding-top: 20px;
  padding-right: 20px;
  color: rgb(137, 137, 137);
  border: 2px solid rgb(221, 221, 221);
  border-radius: 10px;
  margin-right: 10px;
}

.form-control3 {
  display: flex;
  align-items: center;
  width: 300px;
  height: 40px;
  font-size: 1rem;
  padding-left: 20px;
  color: rgb(137, 137, 137);
  border: 2px solid rgb(221, 221, 221);
  border-radius: 10px;
  margin-left: 5px;
}

.inputCheck {
  display: flex;
}

.inputRadio {
  display: flex;

}

.inputRadio label {
  margin-right: 7px;
}

[type="radio"] {
  appearance: none;
  width: 15px;
  height: 15px;
  border: 1px solid #dddddd;
  border-radius: 50%;
}

[type="radio"]:checked {
  border: 2px solid #dddddd;
  background-color: #9c0410;
}

.goods_content {
  color: #1f1c24;
}

.goodsbox {
  display: flex;
  margin-bottom: 30px;
}

.form-label {
  margin-top: 10px;
  width: 150px;
}

.input-group {
  display: flex;
}

.input-group span {
  margin-top: 10px;
}

/* 목록버튼 */
.btnarea {
  text-align: center;
  margin-bottom: 50px;
}

.btnarea button {
  width: 80px;
  height: 40px;
  background-color: #fff;
  border: 2px solid #C52922;
  border-radius: 15px;
  margin-right: 20px;
  font-size: large;
}

/* 별 */
#rating {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.star {
  width: 32px;
  height: 32px;
  transition: .6s all;
}

.star-filled {
  fill: #ffc74f;
}

.star-hovered {
  fill: #ffc74f;
}

.input-img {
  display: flex;
}

.input-img label {
  /* /* display: inline-block; */
  width: 100px;
  height: 40px;
  padding: 10px 20px;
  background-color: #fff;
  border: 2px solid black;
  vertical-align: middle;
  border-radius: 15px;
  margin-left: 10px;
  font-size: 15px;
  cursor: pointer;
}

.input-img [type="file"] {
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
}


/* review */
.review-list {
  margin-left: 147px;
}

.review-list li {
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  border: 2px solid var(--secondary-color);
  border-radius: 10px;
  margin: 5px 0;
  padding: 10px;
  color: #898989;
}
</style>