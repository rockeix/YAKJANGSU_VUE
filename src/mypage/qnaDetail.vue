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
        <div class="write" v-for="item in content" :key="item.QNA_NO">

          <h1 style="text-align: center; margin-bottom: 30px;">문의 상세</h1>

          <div class="container-wrapper">

            <h3>작성자: {{ content[0].USER_NAME }}</h3> <br>

            <div style="margin-top: 10px;">
              <h3>제목</h3>
              <textarea class="qna_title" rows=1 :disabled="editable === false" v-model="content[0].QNA_TITLE"></textarea>
            </div>

            <div style="margin-top: 10px;">
              <h3>내용</h3>
              <textarea class="qna_content" rows=10 :disabled="editable === false"
                v-model="content[0].QNA_CONTENT"></textarea>
            </div>

            <br>
            <h3>이미지</h3>
            <img v-if="!content[0].QNA_IMG" src="../assets/imgEmptyInput.png" alt="..." width="50%;">
            <img v-else :src="require(`../../../node-back/uploads/uploadQna/${content[0].QNA_IMG}`)" alt="..."
              width="50%;">

            <hr style="margin-top: 20px;">

            <div style="margin-top: 20px">
              <h3>답변</h3>
              <textarea class="qna_answer" rows=3 :disabled="editable === false"
                v-model="content[0].QNA_COMMENT"></textarea>
            </div>
          </div>
        </div>

        <br>
        <br>
        <div class="btnarea">
          <router-link to="/mypage/myQnaList">
            <button>목록</button>
          </router-link>
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
      // num: 0,
      loginUser: {},
      userOrder: {},
      userDeli: {},
      content: [],
      editable: false,
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

    axios({
      url: "http://localhost:3000/qna/qnacontent",
      method: "POST",
      data: {
        QNA_NO: this.$route.query.QNA_NO
      },
    }).then(res => {
      this.content = res.data;
    }).catch(err => {
      alert(err);
    });

  },
  created() {
    this.getUser();
    this.getUserOrder();
    this.getUserDeli();
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
  }
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

/* .container {
    margin: 40px 30px;
    font-family: GmarketSansMedium;
  } */

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

/*내 문의 상세보기*/

section {
  font-family: 'SejonghospitalBold';
  float: left;
  margin-top: 30px;
  margin-left: 130px;
}

.myinfo {
  width: 500px;
  margin: 0 auto;
  margin-top: 30px;
  position: relative;
  font-weight: 700;
  height: 800px;
}

.my p {
  width: 100px;
  font-size: 20px;
  /* font-size: 1rem; */
  display: inline-block;
  vertical-align: middle;
  padding: 2px;
  margin: 0px 30px 16px 0px;
  /* border: 1px solid red; */
}

.my .detail {
  display: flex;
}

.my .detail h4 {
  font-size: 20px;
}



h2 {
  margin: 20px 0;
}


/* 박스 */
.container-wrapper {
  border: 1.5px solid #9c0410;
  border-radius: 20px;
  padding: 20px;
}



.write {
  width: 650px;
  margin: auto;
  /* margin-top: 80px; */
}

.write textarea {
  font-family: 'SejonghospitalBold';
}

.qna_title {
  width: 100%;
  border-color: black;
  border-radius: 15px;
  padding: 10px;
  border: 1;
  overflow: visible;
  text-overflow: ellipsis;
  margin-top: 5px;
}

.qna_content {
  width: 100%;
  border-color: black;
  border-radius: 15px;
  padding: 10px;
  border: 1;
  overflow: visible;
  text-overflow: ellipsis;
  margin-top: 5px;
}

.qna_answer {
  width: 100%;
  border-color: black;
  border-radius: 15px;
  padding: 10px;
  border: 1;
  overflow: visible;
  text-overflow: ellipsis;
  margin-top: 5px;
}


hr {
  border: 1.5px solid #9c0410;
}

/* 목록버튼 */
.btnarea {
  text-align: center;
}

.btnarea button {
  width: 80px;
  height: 40px;
  background-color: #fff;
  border: 2px solid #C52922;
  border-radius: 15px;
  margin-left: 150px;
  font-size: large;
  font-family: 'SejonghospitalBold';
}</style>