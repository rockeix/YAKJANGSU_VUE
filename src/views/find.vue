<template>
  <div class="app-container">

    <div class="container" id="container">
      <div class="form-container find-pw-container" @submit.prevent="findPW">
        <form>
          <h1>비밀번호 찾기</h1>
          <input type="name" v-model="user_name" placeholder="이름" />
          <input type="id" v-model="user_id" placeholder="아이디" />
          <input type="email" v-model="user_email" placeholder="이메일" />
          <input type="phone" @keyup="getPhoneMask(user_phone)" v-model="user_phone" placeholder="휴대폰번호" />
          <a href="#" onclick="location.href='/login'">로그인하기</a>
          <button type="submit">비밀번호 찾기</button>
          <br>
          <div v-if="response_pw_check" class="response">
            <p>임시 비밀번호는 {{ user_pw }} 입니다.</p><br>
            <p>로그인 후 꼭 변경해주세요.</p>
          </div>
        </form>
      </div>
      <div class="form-container find-id-container" @submit.prevent="findID">
        <form>
          <h1>아이디 찾기</h1>
          <input type="name" v-model="user_name" placeholder="이름" />
          <input type="email" v-model="user_email" placeholder="이메일" />
          <input type="phone" @keyup="getPhoneMask(user_phone)" v-model="user_phone" placeholder="휴대폰번호" />
          <a href="#" onclick="location.href='/login'">로그인하기</a>
          <button type="submit">아이디 찾기</button>
          <div v-if="response_id_check" class="response">
            <p>아이디는 {{ search_user_id }}입니다. </p>
          </div>
        </form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>아이디를 잊어버리셨나요?</h1>
            <p>아래 버튼을 클릭하여 찾아주세요.</p>
            <button id="signIn" @click="removeActive" class="ghost">아이디 찾기</button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>비밀번호를 잊어버리셨나요?</h1>
            <p>아래 버튼을 클릭하여 찾아주세요.</p>
            <button id="signUp" @click="addActive" class="ghost">비밀번호 찾기</button>
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
      user_name: '',
      user_email: '',
      user_phone: '',
      user_id: '',            // password 변경 용 입력한 아이디 -- 아이디가 비밀번호로
      user_pw: '',
      search_user_id: '',     // id 찾기로 받은 아이디
      response_id_check: false,
      response_pw_check: false,
    };
  },
  //전화번호 입력 시 자동으로 하이픈 넣기 좀 가져다썼습니다...
  getPhoneMask(val) {
    let res = this.getMask(val)
    this.user_phone = res
    //서버 전송 값에는 '-' 를 제외하고 숫자만 저장
    res = this.user_phone.replace(/[^0-9]/g, '')
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
  methods: {
    //전화번호 입력 시 자동으로 하이픈 넣기 좀 가져다썼습니다...
    getPhoneMask(val) {
      let res = this.getMask(val)
      this.user_phone = res
      //서버 전송 값에는 '-' 를 제외하고 숫자만 저장
      res = this.user_phone.replace(/[^0-9]/g, '')
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
    addActive() {
      const container = document.getElementById('container');
      container.classList.add("right-panel-active");
    },
    removeActive() {
      const container = document.getElementById('container');
      container.classList.remove("right-panel-active");
    },
    findID() {
      if (this.user_name === '') {
        alert('이름을 입력해주세요');
        return;
      } if (this.user_email === '') {
        alert('이메일을 입력해주세요');
        return;
      } if (this.user_phone === '') {
        alert('전화번호를 입력해주세요');
        return;
      } else if (!this.isValidEmail(this.user_email)) {
        alert('유효한 이메일을 입력해주세요');
      } else {
        axios({
          url: "http://localhost:3000/auth/findId", //이건 후에 백단에서 응답할 주소 입력!
          method: "POST",
          data: {
            user_name: this.user_name,
            user_email: this.user_email,
            user_phone: this.user_phone
          },
        })
          .then((res) => {
            if (res.data.message === 'user_email') {
              this.search_user_id = res.data.user_id;
              this.response_id_check = true;
            } else {
              this.$swal('알 수 없는 오류가 발생했습니다.');
            }
          })
          .catch((error) => {
            console.log(error);
            this.$swal('해당 정보에 대한 아이디가 없습니다.');
            // 이메일 전송 실패 시 처리할 작업 수행
          });
      }
    },
    findPW() {
      if (this.user_name === '') {
        alert('이름을 입력해주세요')
        return;
      } if (this.user_id === '') {
        alert('아이디를 입력해주세요')
        return;
      } if (this.user_email === '') {
        alert('이메일을 입력해주세요');
        return;
      } if (this.user_phone === '') {
        alert('전화번호를 입력해주세요');
        return;
      } else if (!this.isValidEmail(this.user_email)) {
        alert('유효한 이메일을 입력해주세요');
      } else {
        axios({
          url: "http://localhost:3000/auth/findPW", //이건 후에 백단에서 응답할 주소 입력!
          method: "POST",
          data: {  //이건 후에 백단에서 응답할 주소 입력!2
            user_name: this.user_name,
            user_id: this.user_id,
            user_email: this.user_email,
            user_phone: this.user_phone,
          }
        })
          .then((res) => {
            this.user_pw = res.data.message;
            this.response_pw_check = true;
          })
          .catch((error) => {
            console.log(error);
            this.$swal('정보 확인에 실패했습니다.');
          });
      }
    },
    isValidEmail(email) {
      //const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const emailPattern = /^[^\s@]+@[^\s@]/;
      return emailPattern.test(email);
    }
  }
}
</script>

<style scoped>
@charset "UTF-8";
@import url("https://fonts.googleapis.com/css?family=DM+Sans:400,500,700&display=swap");

@font-face {
  font-family: 'ONE-Mobile-Regular';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2105_2@1.0/ONE-Mobile-Regular.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

* {
  box-sizing: border-box;
}

:root {
  --app-container: #f3f6fd;
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

html,
body {
  width: 100%;
  height: 100vh;
  margin: 0;
}

body {
  font-family: "DM Sans", sans-serif;
  overflow: scroll;
  display: flex;
  justify-content: center;
  background-color: var(--app-container);
}

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

.app-name {
  /* color: var(--main-color); */
  color: #9c0410;
  margin: 0;
  font-size: 20px;
  line-height: 24px;
  font-weight: 700;
  margin: 0 32px;
}

.app-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--app-container);
  transition: 0.2s;
  max-width: 1800px;
}

.app-container button,
.app-container input,
.app-container optgroup,
.app-container select,
.app-container textarea {
  font-family: "DM Sans", sans-serif;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px 24px;
  position: relative;
}

.app-header-left,
.app-header-right {
  display: flex;
  align-items: center;
}

.app-header-left {
  flex-grow: 1;
}

.app-header-right button {
  margin-left: 10px;
}


.app-middle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px 300px 24px 300px;
  position: relative;
}

.app-middle button {
  width: 100px;
  height: 35px;
  border: 0;
  border-radius: 5px;
  background-color: #9c0410;
  color: #fff;
  font-family: ONE-Mobile-Regular;
  font-size: 15px;
}

.menu-btn {
  color: var(--main-color);
  background-color: transparent;
  border: 0;
  border-radius: 50%;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-wrapper {
  border-radius: 20px;
  background-color: var(--search-area-bg);
  padding-right: 12px;
  margin: 0 auto;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 480px;
  color: var(--light-font);
  box-shadow: 0 2px 6px 0 rgba(136, 148, 171, 0.2), 0 24px 20px -24px rgba(71, 82, 107, 0.1);
  overflow: hidden;
}

.search-input {
  border: none;
  flex: 1;
  outline: none;
  height: 100%;
  padding: 0 20px;
  font-size: 16px;
  background-color: var(--search-area-bg);
  color: var(--main-color);
}

.search-input:placeholder {
  color: var(--main-color);
  opacity: 0.6;
}

.join-btn {
  color: var(--main-color);
  background-color: transparent;
  border: 0;
  border-radius: 50%;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-btn {
  color: var(--main-color);
  background-color: transparent;
  border: 0;
  border-radius: 50%;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile_btn {
  color: var(--main-color);
  background-color: transparent;
  border: 0;
  border-radius: 50%;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
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

.con-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 32px;
}

.con-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  color: var(--main-color);
}

.con-header p {
  font-size: 24px;
  line-height: 32px;
  font-weight: 700;
  opacity: 0.9;
  margin: 0;
  color: var(--main-color);
}

.con-header .time {
  font-size: 20px;
}

footer {
  width: 100%;
}

.form {
  margin: 0;
  padding: 0;
  left: 0;
  bottom: 0;
  list-style: none;
  text-decoration: none;
  /* border: solid 1px red; */
}

.f_add {
  position: relative;
  height: auto;
  width: 100%;
  left: 0;
  bottom: 0;
  padding: 10px;
  background: #f2f2f2;
}

.f_add p {
  margin-left: 20px;
  line-height: 24px;
  font-size: 12px;
  color: rgb(173, 173, 173);
}



/* body {
    height: 100%;
   background: #f6f5f7;
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   font-family: 'Montserrat', sans-serif;
   height: 100vh;
   margin: -20px 0 50px;
} */

.overlay-container h1 {
  font-weight: bold;
  margin: 0;
}

.overlay-container h2 {
  text-align: center;
}

.overlay-container p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

.container span {
  font-size: 12px;
}

.container a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

.container button {
  border-radius: 20px;
  border: 1px solid #9c0410;
  background-color: #9c0410;
  color: #FFFFFF;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

.container button:active {
  transform: scale(0.95);
}

.container button:focus {
  outline: none;
}

.container button.ghost {
  background-color: transparent;
  border-color: #FFFFFF;
}

.container form {
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

.container input {
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}

.container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 1000px;
  margin: 0 auto;
  max-width: 100%;
  min-height: 750px;
  max-width: 1040px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  /* overflow: scroll; */
}

.find-id-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .find-id-container {
  transform: translateX(100%);
}

.container.left-panel-active .find-id-container {
  transform: translateX(100%);
}

.find-pw-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  /* overflow: scroll; */
}

.container.right-panel-active .find-pw-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {

  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.overlay {
  background: #9c0410;
  background: -webkit-linear-gradient(to right, #9c0410, #9c0410);
  background: linear-gradient(to right, #9c0410, #9c0410);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #FFFFFF;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}

.social-container {
  margin: 20px 0;
}

.social-container a {
  border: 1px solid #DDDDDD;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}

/* 
footer {
    background-color: #222;
    color: #fff;
    font-size: 14px;
    bottom: 0;
    position: fixed;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 999;
} */

.content {
  max-width: 1040px;
  width: 80%;
  margin: auto;
  padding-top: 30px;

}
</style>