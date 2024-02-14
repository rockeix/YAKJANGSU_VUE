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

        <div style="margin-left: 170px;">
          <h2>비밀번호 수정</h2>
          <br>
        </div>

        <div class="mypage">

          <div class="form1">
            <label class="te">현재 비밀번호</label>
            <div class="in">
              <input type="password" class="form-control" placeholder="현재 비밀번호" v-model="user_pw" />
              <label for="floatingPassword"></label>
              <div class="eyes" @click="oneyes('form1')">
                <a><font-awesome-icon icon="fa-solid fa-key" size="lg" style="color: #9c0410;" /></a>
              </div>
            </div>
          </div>

          <div class="form2">
            <label class="te">새 비밀번호</label>
            <div class="in">
              <input type="password" class="form-control" placeholder="새 비밀번호" v-model="user_npw" />
              <label for="floatingPassword"></label>
              <div class="eyes" @click="oneyes('form2')">
                <a><font-awesome-icon icon="fa-solid fa-key" size="lg" style="color: #9c0410;" /></a>
              </div>
            </div>
          </div>

          <div class="form3">
            <label class="te">비밀번호 확인</label>
            <div class="in">
              <input type="password" class="form-control" placeholder="비밀번호 확인" v-model="user_pw_ck" />
              <label for="floatingPassword"></label>
              <div class="eyes" @click="oneyes('form3')">
                <a><font-awesome-icon icon="fa-solid fa-key" size="lg" style="color: #9c0410;" /></a>
              </div>
            </div>
          </div>
        </div>

        <div class="btn">
          <button type="button" class="modifybtn" @click="onSubmitForm">수정하기</button>
          <div>
            <router-link to="/mypage">
              <button class="canclebtn">취소</button>
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
      user_pw: '',
      user_npw: '',
      user_pw_ck: '',
      user_no: ''
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  mounted() {
    if (this.user.user_no === '') {
      this.$swal('로그인해주세요');
      this.$router.push({ path: '/login' });
    } else {
      this.user_no = this.user.user_no;
      axios
        .get(`http://localhost:3000/mypage/mypage/${this.user.user_no}`)
        .then((res) => {
          if (res.data.length > 0) {
            this.user = res.data[0];
            console.log(this.user)
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
    onSubmitForm() {
      if (this.user_pw === "" || this.user_npw === "" || this.user_pw_ck === "") {
        this.$swal("모든 항목을 입력해주세요");
      } else if (this.user_npw !== this.user_pw_ck) {
        this.$swal("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      } else {
        axios
          .post('http://localhost:3000/mypage/pass_process', {
            user_no: this.user_no,
            user_pw: this.user_pw,
            user_npw: this.user_npw,
            user_pw_ck: this.user_pw_ck
          })
          .then((res) => {
            if (res.data.message === 'pass_update') {
              this.$swal("수정이 완료되었습니다");
              this.$router.push({ path: '/mypage' });
            } else if (res.data.message === 'pw_ck') {
              this.$swal("비밀번호가 틀립니다.");
            } else {
              this.$swal("알 수 없는 오류가 발생했습니다.");
            }
          })
          .catch((error) => {
            console.log(error);
            this.$swal("수정에 실패했습니다.");
          });
      }
    },
    // 키 아이콘
    oneyes(field) {
      const passwordInput = document.querySelector(`.${field} input`);
      const eyeIcon = document.querySelector(`.${field} .eyes a`);
      let isMouseDown = false;

      eyeIcon.addEventListener('mousedown', () => {
        passwordInput.type = 'text';
        isMouseDown = true;
      });

      document.addEventListener('mouseup', () => {
        passwordInput.type = 'password';
        isMouseDown = false;
      });

      passwordInput.addEventListener('blur', () => {
        passwordInput.type = 'password';
        isMouseDown = false;
      });

      passwordInput.addEventListener('focus', () => {
        if (isMouseDown) {
          passwordInput.type = 'text';
        }
      });
    }
  }
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

/*비밀번호 수정*/

section {
  float: left;
  margin-top: 30px;
  margin-left: 200px;
}

.container-wrapper {
  border: 1.5px solid #9c0410;
  border-radius: 20px;
  padding: 15px;
  margin-top: 20px;
  height: 600px;
}

.myinfo {
  width: 500px;
  margin: 0 auto;
  /* margin-top: 30px; */
  position: relative;
  font-weight: 700;
  /* margin-top: 30px; */
  /* background-color: #fff2c9; */
  height: 700px;
}

.mypage {
  width: 700px;
  position: relative;
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
}

.mypage p {
  width: 100px;
  font-size: 20px;
  /* font-size: 1rem; */
  display: inline-block;
  vertical-align: middle;
  padding: 2px;
  margin: 0px 30px 16px 0px;
  /* border: 1px solid red; */
}

/*input css*/

.form1 {
  margin-bottom: 20px;
  display: flex;
}

.form1 .te {
  width: 140px;
  vertical-align: middle;
  padding: 10px 0;
  margin-right: 20px;
}

.form1 .in {
  display: flex;
}

.form1 input {
  display: flex;
  align-items: center;
  /* width: 50%; */
  height: 40px;
  font-size: 1rem;
  font-family: GmarketSansMedium;
  padding-left: 20px;
  color: rgb(137, 137, 137);
  border: 2px solid rgb(221, 221, 221);
  border-radius: 10px;
  margin-right: 15px;
}

.form2 {
  margin-bottom: 20px;
  display: flex;
}

.form2 .te {
  width: 140px;
  vertical-align: middle;
  padding: 10px 0;
  margin-right: 20px;
}

.form2 .in {
  display: flex;
}

.form2 input {
  display: flex;
  align-items: center;
  /* width: 50%; */
  height: 40px;
  font-size: 1rem;
  font-family: GmarketSansMedium;
  padding-left: 20px;
  color: rgb(137, 137, 137);
  border: 2px solid rgb(221, 221, 221);
  border-radius: 10px;
  margin-right: 15px;
}

.form3 {
  margin-bottom: 20px;
  display: flex;
}

.form3 .te {
  width: 140px;
  vertical-align: middle;
  padding: 10px 0;
  margin-right: 20px;
}

.form3 .in {
  display: flex;
}

.form3 input {
  display: flex;
  align-items: center;
  /* width: 50%; */
  height: 40px;
  font-size: 1rem;
  font-family: GmarketSansMedium;
  padding-left: 20px;
  color: rgb(137, 137, 137);
  border: 2px solid rgb(221, 221, 221);
  border-radius: 10px;
  margin-right: 15px;
}

.eyes {
  display: inline-block;
  position: relative;
  width: 30px;
  padding: 10px 8px 0px 8px;
  font-size: 20px;
  cursor: pointer;
  color: #a1a1a1;
  /* border: solid 1px rgb(107, 225, 44); */
}


/*수정 취소 버튼*/

.btn {
  display: flex;
  margin-top: 40px;
  margin-left: 150px;
  text-align: center;
  margin-bottom: 50px;
}

.modifybtn {
  width: 80px;
  height: 40px;
  background-color: #fff;
  border: 2px solid #C52922;
  border-radius: 15px;
  margin-right: 20px;
  font-size: large;
  font-family: 'SejonghospitalBold';
}

.canclebtn {
  width: 80px;
  height: 40px;
  background-color: #fff;
  border: 2px solid #000;
  border-radius: 15px;
  margin-right: 20px;
  font-size: large;
  font-family: 'SejonghospitalBold';
}
</style>