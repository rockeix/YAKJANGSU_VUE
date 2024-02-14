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
            <h1 class="count">5</h1>
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
            <h1 class="count">3</h1>
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
        <p style="text-align: center; font-size:170%; margin: 0 100px 60px 0;">찜 목록</p>
        <div class="cardList">
          <div v-for="(like, i) in pageLikeList" :key="i">
            <div class="card">
              <div class="card-body">
                <div class="card-header">
                  <img :width="300" style="border-radius: 10px;"
                    :src="like.goods_img ? require(`../../../node-back/uploads/uploadGoods/${like.goods_img}`) : '/goodsempty.jpg'"
                    alt="상품 이미지" @click="goToDetail(like.GOODS_NO)">
                </div>
                <div class="card-body-header">
                  <h1>{{ like.goods_name }}</h1>
                  <h1>{{ formatPrice(like.goods_price) }}</h1>
                </div>
                <div class="card-body-footer">
                  <!-- <p>{{ formatDateTime(like.LIKES_DATE) }}</p> -->
                  <h3><a href="#" style="color: red;" @click.prevent="goToCart(like)">장바구니</a></h3>

                  <a href="#" @click.prevent="likeDelete(like.GOODS_NO)" style="text-decoration: none; color: gray;">
                    <h3 style="margin-left: 10px;">취소하기</h3>
                  </a>

                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
      <nav class="page">
        <ul>
          <li v-for="i in pageCnt" :key="i" class="page-item">
            <a @click.prevent="setPage(i)" style="text-decoration: none;">
              {{ i }}
            </a>
          </li>
        </ul>
      </nav>

    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      // num: 0,
      loginUser: {},
      likeList: [],
      pageLikeList: [],
      pageNum: 0,
      pageCnt: 0,
      onePageCnt: 6,
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
    this.getLikeList();
  },
  methods: {
    async goToCart(like) {
      axios({
        url: `http://localhost:3000/auth/like_addCart?userNo=${this.user.user_no}`,
        method: "POST",
        data: {
          goodsNo: like.GOODS_NO,
          cartGoodsCnt: this.quantity
        },
      })
        .then(res => {
          if (res.data.message === 'check_error') {
            this.$swal("이미 장바구니에 담긴 상품입니다")
          } else {
            this.$swal({
              title: '상품이 장바구니에 담겼습니다.',
              icon: 'info',
              showDenyButton: true,
              confirmButtonText: '장바구니로 이동',
              denyButtonText: `계속 쇼핑하기`,
            }).then((result) => {
              if (result.isConfirmed) {
                location.href = "/cart"
              }
              else if (result.isDenied) {
                location.reload();
              }
            })
          }
        }).catch(err => {
          console.log(err);
          this.$swal("이미 장바구니에 담긴 상품입니다")
        })
    },
    async getUser() {
      try {
        const response = await axios.get(`http://localhost:3000/mypage/mypage/${this.user.user_no}`);
        this.loginUser = response.data[0];
      } catch (error) {
        console.error(error);
      }
    },
    setPage(page) {
      this.pageLikeList = []
      this.pageNum = page - 1;
      this.sliceList()
    },
    sliceList() {
      const start = 0 + this.pageNum * this.onePageCnt
      this.pageLikeList = this.likeList.slice(start, start + this.onePageCnt);
      console.log('페이지링크', this.pageLikeList)
    },
    async getLikeList() {
      try {
        const response = await axios.post(`http://localhost:3000/mypage/likeList/${this.user.user_no}`);
        this.likeList = response.data;
        // 페이지 수 계산 시 this.onePageCnt 사용
        this.pageCnt = Math.ceil(this.likeList.length / this.onePageCnt);
        this.setPage(1); // 첫 페이지로 설정
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
    formatDateTime(dateTime) {
      const date = new Date(dateTime);
      const year = date.getFullYear().toString().slice(2); // 뒤의 두 자리만 가져오기
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 0으로 채워진 두 자리로 만들기
      const day = date.getDate().toString().padStart(2, '0'); // 0으로 채워진 두 자리로 만들기
      return `${year}년${month}월${day}일`;
    },
    likeDelete(goodsno) {
      axios({
        url: `http://localhost:3000/goods/likeDelete/${goodsno}/${this.user.user_no}`,
        method: 'POST'
      })
        .then(res => {
          if (res.data.message === 'complete') {
            this.$swal('상품이 삭제되었습니다.');
            this.getLikeList(); // 삭제 후 목록 다시 불러오기
          }
        })
        .catch(() => {
          this.$swal('오류 발생');
        });
    },
    goToDetail(goodsno) {
      window.location.href = `http://localhost:8080/goods/goodsDetail/${goodsno}`;
    },
  },
}
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
  height: 1300px;
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

/* 찜 카드 */
.cardList {
  margin: -40px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 50px;
  margin-left: 330px;
}

.card {
  height: 435px;
  width: 300px;
  border-radius: 15px;
  display: inline-block;
  position: relative;
  border: 4px solid #C52922;
  overflow: hidden;
  scale: 0.8;

}

.card:hover {
  transform: scale(1.04);
  transition: all 0.06s linear;
}

.card-header {
  transition: 0.5s;
  width: 100%;
  height: 300px;
  border-radius: 15px 15px 0 0;
  background-size: 100% 280px;
  background-repeat: no-repeat;
}

.card-header img {
  /* padding: 20px; */
  margin: 10px 10px 10px 10px;
  width: 275px;
  border-radius: 10px;
}


.card-body-header {
  line-height: 25px;
  margin: 10px 20px 0px 20px;

}

.card-body-header h1 {
  font-size: 19px;
  /* text-align: center; */
}

.card-body-footer {
  position: absolute;
  display: flex;
  margin-top: 10px;
  margin-bottom: 6px;
  bottom: 0;
  left: 5px;
  width: 400px;
  font-size: 14px;
  color: #9FA5A8;
  padding: 0 15px;
}

.card-body-footer p {
  margin-top: 3px;
}

.card-body-footer h3 {
  margin-left: 30px;
  text-align: center;
}

/*페이지*/

.page {
  margin-top: 40px;
  text-align: center;
  width: 107%;
}

.page-item {
  display: inline-block;
  margin-right: 30px;
}
</style>