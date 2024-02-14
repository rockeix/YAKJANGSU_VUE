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

        <div style="margin-left: 500px; margin-top: 60px;">
          <h2>내 정보 수정</h2>
          <br>
        </div>

        <div class="mypage">

          <div class="form">
            <label class="te">아이디</label>
            <div class="in">
              <input v-if="loginUser.user_social_type == 0" type="text" class="form-control"
                v-model="loginUser.user_id" />
              <div v-else>
                <input type="text" class="form-control" v-model="loginUser.user_id" readonly
                  style="margin-bottom: 20px;" />
                <span>소셜로 가입한 계정은 아이디 수정이 불가능합니다.</span>
              </div>
            </div>
          </div>

          <div class="form1">
            <label class="te">이메일</label>
            <div class="in">
              <input type="email" class="form-control" v-model="loginUser.user_email" />
            </div>
          </div>

          <div class="form4">
            <label class="te">휴대전화번호</label>
            <div class="in">
              <input type="text" class="form-control" @keyup="getPhoneMask(loginUser.user_phone)"
                v-model="loginUser.user_phone" />
            </div>
          </div>

          <div class="form5">
            <label class="te">생년월일</label>
            <div class="in">
              <input type="text" class="form-control" v-model="loginUser.user_birth" />
            </div>
          </div>

          <div class="form2">
            <label class="te2">우편번호</label>
            <div class="in3">
              <input type="text" class="form-control" v-model="loginUser.user_zipcode" />
              <button class="btn" type="button" v-on:click="zipload">우편번호 찾기</button>
            </div>
          </div>

          <div class="form3">
            <input type="text" class="in2" v-model="loginUser.user_adr1" />
            <input type="text" class="in2" v-model="loginUser.user_adr2" />
          </div>

        </div>
        <div class="btn">
          <button class="modifybtn" @click="onSubmitForm">수정하기</button>
          <div>
            <button class="pwbtn" @click="goToPass">PW 수정</button>
          </div>
          <div>
            <router-link to="/mypage">
              <button class="deletebtn">취소</button>
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
    //user 정보 가져오기
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
    //수정 버튼 클릭 시
    onSubmitForm() {
      if (this.loginUser.user_id === "" || this.loginUser.user_nick === "" || this.loginUser.user_email === "" || this.loginUser.user_mobile === "" || this.loginUser.user_phone === "" || this.loginUser.user_zipcode === "" || this.loginUser.user_adr1 === "" || this.loginUser.user_adr2 === "") {
        this.$swal("모든 항목을 입력해주세요");
      } else {
        axios
          .post('http://localhost:3000/mypage/mypageupdate', {
            user_no: this.user.user_no,

            user_id: this.loginUser.user_id,
            user_email: this.loginUser.user_email,
            user_birth: this.loginUser.user_birth,
            user_phone: this.loginUser.user_phone,
            user_zipcode: this.loginUser.user_zipcode,
            user_adr1: this.loginUser.user_adr1,
            user_adr2: this.loginUser.user_adr2,
          })
          .then((res) => {
            if (res.data.message === 'mypage_update') {
              this.$swal("수정이 완료되었습니다");
              this.$router.push({ path: '/mypage' });
            } else {
              this.$swal("수정에 실패했습니다.");
            }
          })
          .catch((err) => {
            console.log(err);
            this.$swal("수정에 실패했습니다.");
          });
      }
    },
    //우편번호 검색
    zipload() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          // 각 주소의 노출 규칙에 따라 주소를 조합한다.
          // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
          var addr = ''; // 주소 변수
          var extraAddr = '';
          //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
          if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
            addr = data.roadAddress;
          } else { // 사용자가 지번 주소를 선택했을 경우(J)
            addr = data.jibunAddress;
          }
          // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
          if (data.userSelectedType === 'R') {
            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
              // addr += ' ';
              extraAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if (data.buildingName !== '' && data.apartment === 'Y') {
              // addr += ' ';
              extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
          }
          this.loginUser.user_zipcode = data.zonecode;
          this.loginUser.user_adr1 = addr;
          this.loginUser.user_adr2 = extraAddr;
          this.loginUser.zipinput = true;
        }
      }).open();
    },
    //전화번호 입력 시 자동으로 하이픈 넣기
    getPhoneMask(val) {
      let res = this.getMask(val)
      this.loginUser.user_phone = res
      //서버 전송 값에는 '-' 를 제외하고 숫자만 저장
      res = this.loginUser.user_phone.replace(/[^0-9]/g, '')
    },
    getMask(phoneNumber) {
      if (!phoneNumber) return phoneNumber
      phoneNumber = phoneNumber.replace(/[^0-9]/g, '')

      let res = ''
      if (phoneNumber.length < 3) {
        res = phoneNumber
      }
      else {
        if (phoneNumber.substr(0, 2) == '02') {

          if (phoneNumber.length <= 5) {//02-123-5678
            res = phoneNumber.substr(0, 2) + '-' + phoneNumber.substr(2, 3)
          }
          else if (phoneNumber.length > 5 && phoneNumber.length <= 9) {//02-123-5678
            res = phoneNumber.substr(0, 2) + '-' + phoneNumber.substr(2, 3) + '-' + phoneNumber.substr(5)
          }
          else if (phoneNumber.length > 9) {//02-1234-5678
            res = phoneNumber.substr(0, 2) + '-' + phoneNumber.substr(2, 4) + '-' + phoneNumber.substr(6)
          }

        } else {
          if (phoneNumber.length < 8) {
            res = phoneNumber
          }
          else if (phoneNumber.length == 8) {
            res = phoneNumber.substr(0, 4) + '-' + phoneNumber.substr(4)
          }
          else if (phoneNumber.length == 9) {
            res = phoneNumber.substr(0, 3) + '-' + phoneNumber.substr(3, 3) + '-' + phoneNumber.substr(6)
          }
          else if (phoneNumber.length == 10) {
            res = phoneNumber.substr(0, 3) + '-' + phoneNumber.substr(3, 3) + '-' + phoneNumber.substr(6)
          }
          else if (phoneNumber.length > 10) { //010-1234-5678
            res = phoneNumber.substr(0, 3) + '-' + phoneNumber.substr(3, 4) + '-' + phoneNumber.substr(7)
          }
        }
      }
      return res
    },
    goToPass() {
      this.$router.push({ path: '/mypage/pwUpdate' });
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

/*내 정보 수정*/

.section {
  float: left;
  margin-top: 30px;
  margin-left: 200px;
}

.container-wrapper {
  border: 1.5px solid #9c0410;
  border-radius: 20px;
  padding: 15px;
  margin-top: 20px;
  height: 500px;
}

.myinfo {
  margin-top: 30px;
  /* background-color: #fff2c9; */
  height: 800px;
}

.mypage {
  margin: 0 auto;
  width: 50%;
  position: relative;
  justify-content: space-between;
  align-items: center;
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


.form {
  margin-bottom: 20px;
  display: flex;
  font-family: 'SejonghospitalBold';
}

.form .te {
  width: 140px;
  vertical-align: middle;
  padding: 10px 0;
  margin-right: 20px;
  font-family: 'SejonghospitalBold';
}

.form .in {
  width: 90%;
  font-family: 'SejonghospitalBold';
}

.form input {
  display: flex;
  align-items: center;
  width: 50%;
  height: 40px;
  font-size: 1rem;
  padding-left: 20px;
  color: rgb(137, 137, 137);
  border: 2px solid rgb(221, 221, 221);
  border-radius: 10px;
  font-family: 'SejonghospitalBold';
}

.form span {
  margin-top: 10px;
  font-family: 'SejonghospitalBold';
}


.form1 {
  margin-bottom: 20px;
  display: flex;
  font-family: 'SejonghospitalBold';
}

.form1 .te {
  width: 140px;
  vertical-align: middle;
  padding: 10px 0;
  margin-right: 20px;
  font-family: 'SejonghospitalBold';
}

.form1 .in {
  width: 90%;
  font-family: 'SejonghospitalBold';
}

.form1 input {
  display: flex;
  align-items: center;
  width: 50%;
  height: 40px;
  font-size: 1rem;
  padding-left: 20px;
  color: rgb(137, 137, 137);
  border: 2px solid rgb(221, 221, 221);
  border-radius: 10px;
  font-family: 'SejonghospitalBold';
}

.form2 {
  /* margin-bottom: 10px; */
  display: flex;
  height: 60px;
  /* border: 2px solid rgb(21, 29, 255); */
  font-family: 'SejonghospitalBold';
}

.form2 .te2 {
  /* 우편번호 */
  width: 260px;
  padding: 14px 0;
  margin-right: 60px;
  /* background-color:  rgb(206, 165, 165); */
  font-family: 'SejonghospitalBold';
}

.form2 .in3 input {
  display: flex;
  align-items: center;
  /* width: 300px; */
  width: 26%;
  height: 40px;
  font-size: 1rem;
  padding-left: 20px;
  /* margin: 0 80px 0 27px; */
  margin: 0 10px 0 20px;
  color: rgb(137, 137, 137);
  border: 2px solid rgb(221, 221, 221);
  border-radius: 10px;
  font-family: 'SejonghospitalBold';
}

.form2 .in3 {
  display: flex;
  width: 330%;
  height: 40px;
  /* border: 2px solid rgb(86, 222, 140); */
  font-family: 'SejonghospitalBold';
}

.form2 .btn {
  /* display: flex; */
  /* height: 42px; */
  /* width: 110px; */
  position: relative;
  padding: 8px 10px;
  font-size: 14px;
  color: rgb(123, 123, 123);
  border: 2px solid rgb(221, 221, 221);
  border-radius: 10px;
  cursor: pointer;
  margin-top: 0px;
  margin-left: -4px;
  padding: 13px;
  font-family: 'SejonghospitalBold';
}

.form3 {
  display: grid;
  align-items: center;
  position: relative;
  height: auto;
  padding: 0 0 0px 145px;
  /* border: 1px solid red; */
  font-family: 'SejonghospitalBold';
}

.form3 .in2 {
  display: block;
  align-items: center;
  width: 50%;
  height: 40px;
  font-size: 1rem;
  padding-left: 20px;
  color: rgb(137, 137, 137);
  border: 2px solid rgb(221, 221, 221);
  border-radius: 10px;
  margin-right: 0px;
  font-family: 'SejonghospitalBold';
}

.form3 input:nth-last-child(2) {
  margin-bottom: 20px;
  font-family: 'SejonghospitalBold';
}

.form4 {
  margin-bottom: 20px;
  display: flex;
  font-family: 'SejonghospitalBold';
}

.form4 .te {
  width: 140px;
  vertical-align: middle;
  padding: 10px 0;
  margin-right: 20px;
  font-family: 'SejonghospitalBold';
}

.form4 .in {
  width: 90%;
  font-family: 'SejonghospitalBold';
}

.form4 input {
  display: flex;
  align-items: center;
  width: 50%;
  height: 40px;
  font-size: 1rem;
  padding-left: 20px;
  color: rgb(137, 137, 137);
  border: 2px solid rgb(221, 221, 221);
  border-radius: 10px;
  font-family: 'SejonghospitalBold';
}

.form5 {
  margin-bottom: 20px;
  display: flex;
  font-family: 'SejonghospitalBold';
}

.form5 .te {
  width: 140px;
  vertical-align: middle;
  padding: 10px 0;
  margin-right: 20px;
  font-family: 'SejonghospitalBold';
}

.form5 .in {
  width: 90%;
  font-family: 'SejonghospitalBold';
}

.form5 input {
  display: flex;
  align-items: center;
  width: 50%;
  height: 40px;
  font-size: 1rem;
  padding-left: 20px;
  color: rgb(137, 137, 137);
  border: 2px solid rgb(221, 221, 221);
  border-radius: 10px;
  font-family: 'SejonghospitalBold';
}


.form button {
  width: 69vw;
  height: 50px;
  margin: 60px 0;
  font-size: 18px;
  color: #cc8c00;
  border: 2px solid #ffbc2b;
  background-color: #fff2c9;
  border-radius: 10px;
  cursor: pointer;
}

/*버튼 영역*/
.btn {
  display: flex;
  margin-left: 450px;
  margin-top: 50px;
  text-align: center;
}

.modifybtn {
  width: 80px;
  height: 40px;
  background-color: #9c0410;
  color: #ffff;
  border: 1px solid #9c0410;
  border-radius: 15px;
  margin-right: 20px;
  /* font-size: large; */
  font-family: 'SejonghospitalBold';
}

.pwbtn {
  width: 80px;
  height: 40px;
  background-color: #e3e3e3;
  border: 2px solid #e3e3e3;
  border-radius: 15px;
  margin-right: 20px;
  /* font-size: large; */
  font-family: 'SejonghospitalBold';
}

.deletebtn {
  width: 80px;
  height: 40px;
  background-color: #fff;
  border: 2px solid #858585;
  border-radius: 15px;
  margin-right: 20px;
  /* font-size: large; */
  font-family: 'SejonghospitalBold';
}
</style>