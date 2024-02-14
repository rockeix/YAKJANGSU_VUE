<template>
   <div class="container" id="container">
      <div class="form-container sign-up-container" @submit.prevent="onSubmitForm">
         <form>
            <h1>회원가입</h1>
            <div class="social-container">
               <img src="../assets/social_kakao_icon.svg" @click="kakaoLogin" style="margin-right: 5px;">
               <img src="../assets/social_naver_icon.svg" @click="naverBtnClick()" id="naverIdLogin">
            </div>
            <span>또는 이메일을 통해 가입</span>
            <input type="text" placeholder="이름" v-model="user_name" />
            <div class="zip">
               <input type="text" placeholder="아이디" v-model="user_id" />
               <button class="search-zip-btn" @click="id_check" type="button">ID 중복확인</button>
            </div>
            <input type="password" placeholder="비밀번호" v-model="user_pw" />
            <input type="password" placeholder="비밀번호 확인" v-model="user_pw_ck" />
            <input type="email" placeholder="이메일" v-model="user_email" />
            <input type="text" placeholder="생년월일(예:990913)" v-model="user_birth" />
            <input type="text" @keyup="getPhoneMask(user_phone)" placeholder="휴대폰번호" v-model="user_phone" />
            <div class="zip">
               <input type="text" class="addinput" v-model="user_zipcode" placeholder="우편번호" />
               <button class="search-zip-btn" type="button" v-on:click="zipload">우편번호 찾기</button>
            </div>
            <input type="text" class="addinput" v-model="user_adr1" placeholder="기본주소" />
            <input type="text" class="addinput" v-model="user_adr2" placeholder="상세주소 입력" /><br>

            <button type="submit">회원가입</button>
         </form>
      </div>
      <div class="form-container sign-in-container" @submit.prevent="login">
         <form>
            <h1>로그인</h1>
            <div class="social-container" >
               <img src="../assets/social_kakao_icon.svg" @click="kakaoLogin" style="margin-right: 5px;">
               <img src="../assets/social_naver_icon.svg" @click="naverBtnClick()" id="naverIdLogin">
            </div>
            <span>또는 계정을 사용합니다</span>
            <input type="text" placeholder="아이디" @keyup.enter="login()" v-model="user_id" />
            <input type="password" placeholder="비밀번호" @keyup.enter="login()" v-model="user_pw" />
            <a href="#" onclick="location.href='/find'">ID/PW 찾기</a>
            <button type="submit">로그인</button>
         </form>
      </div>
      <div class="overlay-container" :class="{ 'right-panel-active': activePanel === 'signup' }">
         <div class="overlay">
            <div class="overlay-panel overlay-left">
               <h1>돌아온 걸 환영해요!</h1>
               <p>계속 연결하려면 개인 정보로 로그인하십시오.</p>
               <button id="signIn" @click="removeActive" class="ghost">로그인</button>
            </div>
            <div class="overlay-panel overlay-right">
               <h1>안녕하세요!</h1>
               <p>저희와 함께 건강한 생활을 시작해요.</p>
               <button id="signUp" @click="addActive" class="ghost">회원가입</button>
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
         user_id: '',
         user_pw: '',
         user_email: '',
         user_birth: '',
         user_phone: '',
         user_zipcode: '',
         user_adr1: '',
         user_adr2: '',
         user_pw_ck: '',
         zipinput: false,
         naverLogin: [],

      };
   },
   computed: {
      user() {
         return this.$store.state.user; // user 정보가 바뀔 때마다 자동으로 user() 갱신
      },
   },
   methods: {
      //로그인, 회원가입 화면 이동
      addActive() {
         const container = document.getElementById('container');
         container.classList.add("right-panel-active");
      },
      removeActive() {
         const container = document.getElementById('container');
         container.classList.remove("right-panel-active");
      },
      //로그인
      login() {
         axios({
            url: "http://localhost:3000/auth/login_process",
            method: "POST",
            data: {
               user_id: this.user_id,
               user_pw: this.user_pw
            },
         })
            .then(res => {
               if (res.data.message == 'undefined_id') {
                  this.$swal("존재하지 않는 아이디입니다.")
               }
               else if (res.data.message == 'incorrect_pw') {
                  this.$swal("비밀번호가 틀렸습니다.")
               }
               else {
                  this.$store.commit("user", { user_id: this.user_id, user_no: res.data.message })
                  this.$swal({
                     position: 'top',
                     icon: 'success',
                     title: '로그인 성공!',
                     showConfirmButton: false,
                     timer: 1000
                  })
                  this.$router.push({ path: '/' });  // 메인 화면으로 이동
               }
            })
            .catch(err => {
               console.log(err);
            })
      },
      //회원가입
      onSubmitForm() {
         if (!this.validationCheck()) {
            return;
         }
         console.log(this.user_name, this.user_id, this.user_pw, this.user_email, this.user_birth, this.user_phone, this.user_zipcode, this.user_adr1, this.user_adr2);
         axios({
            url: "http://localhost:3000/auth/join_process",
            method: "POST",
            data: {
               user_name: this.user_name,
               user_id: this.user_id,
               user_pw: this.user_pw,
               user_email: this.user_email,
               user_birth: this.user_birth,
               user_phone: this.user_phone,
               user_zipcode: this.user_zipcode,
               user_adr1: this.user_adr1,
               user_adr2: this.user_adr2,
            },
         })
            .then(res => {
               if (res.data.message == 'already_exist_id') {
                  this.$swal("이미 존재하는 아이디입니다.")
               }
               else if (res.data.message == 'DB_error') {
                  this.$swal("DB 에러 발생")
               }
               if (res.data.message == 'already_exist_phone') {
                  this.$swal("이미 존재하는 전화번호입니다.")
               }
               else {
                  this.$swal({
                     position: 'top',
                     icon: 'success',
                     title: '회원가입이 완료되었습니다!',
                     showConfirmButton: false,
                     timer: 1500
                  })
                  //this.$router.push({ path: '/login' }); // 로그인 화면으로 이동
                  this.removeActive();
               }
            })
            .catch(err => {
               console.log(err);
            })
      },
      //우편번호
      zipload() {
         new window.daum.Postcode({
            oncomplete: (data) => {
               var addr = '';
               var extraAddr = '';
               if (data.userSelectedType === 'R') {
                  addr = data.roadAddress;
               } else {
                  addr = data.jibunAddress;
               }
               if (data.userSelectedType === 'R') {
                  if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                     extraAddr += data.bname;
                  }
                  if (data.buildingName !== '' && data.apartment === 'Y') {
                     extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                  }
               }
               this.user_zipcode = data.zonecode;
               this.user_adr1 = addr;
               this.user_adr2 = extraAddr;
               this.zipinput = true;
            }
         }).open();
      },
      //아이디 체크
      id_check() {
         if (this.user_id == "") {
            this.$swal("아이디를 입력하세요.");
            return false;
         }
         axios({
            url: "http://localhost:3000/auth/id_check",
            method: "POST",
            data: {
               user_id: this.user_id,
            },
         })
            .then(res => {
               console.log(res.data.message);
               if (res.data.message == 'already_exist_id') {
                  this.$swal("이미 존재하는 아이디입니다.")
               }
               else if (res.data.message == 'DB_error') {
                  this.$swal("DB 에러 발생")
               }
               else {
                  this.$swal("사용 가능한 아이디입니다.")
               }
            })
            .catch(err => {
               console.log(err);

            })
      },
      //휴대폰번호 확인
      phone_check() {
         if (this.user_phone == "") {
            this.$swal("전화번호를 입력하세요.");
            return false;
         }
         axios({
            url: "http://localhost:3000/auth/phone_check",
            method: "POST",
            data: {
               user_phone: this.user_phone,
            },
         })
            .then(res => {
               console.log(res.data.message);
               if (res.data.message == 'already_exist_phone') {
                  this.$swal("이미 존재하는 전화번호입니다.")
               }
               else if (res.data.message == 'DB_error') {
                  this.$swal("DB 에러 발생")
               }
               else {
                  this.$swal("사용 가능한 전화번호입니다.")
               }
            })
            .catch(err => {
               console.log(err);

            })
      },
      //모든 항목 입력 유무 체크
      validationCheck() {

         if (this.user_name == "") {
            this.$swal("이름을 입력하세요.");
            return false;
         }
         if (this.user_id == "") {
            this.$swal("아이디를 입력하세요.");
            return false;
         }
         if (this.user_email == "") {
            this.$swal("이메일 주소를 입력하세요.");
            return false;
         }

         if (this.user_pw == "") {
            this.$swal("비밀번호를 입력하세요.");
            return false;
         }

         if (this.user_pw_ck !== this.user_pw) {
            this.$swal("비밀번호가 일치하지 않습니다.");
            return false;
         }

         if (this.user_phone == "") {
            this.$swal('전화번호를 정확히 입력해주세요.');
            return false;
         }

         if (!this.zipinput) {
            this.$swal("우편번호를 입력하세요.");
            return false;
         }
         return true;
      },
      //전화번호 입력 시 자동으로 하이픈 넣기
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
      //카카오
      kakaoLogin() {

         window.Kakao.Auth.login({
            scope: "profile_nickname, account_email",
            success: this.getKakaoAccount,
         });
      },
      getKakaoAccount() {
         window.Kakao.API.request({
            url: "/v2/user/me",
            success: (res) => {
               const kakao_account = res.kakao_account;
               const email = kakao_account.email; //카카오 이메일
               const nickname = kakao_account.profile.nickname;
               console.log(kakao_account, email, nickname);
               // this.user_id = email

               axios({
                  url: "http://localhost:3000/auth/kakaoLoginProcess",
                  method: "POST",
                  data: {
                     user_id: email,
                     user_name: nickname,
                     user_email: email,
                  },
               }).then(res => {
                  if (res.data.message == '저장완료') {

                     this.$swal({
                        position: 'top',
                        icon: 'success',
                        title: '회원가입 성공!',
                        showConfirmButton: false,
                        timer: 1000
                     })

                  }
                  else {
                     this.$store.commit("user", { user_id: email, user_no: res.data.message })
                     this.$swal({
                        position: 'top',
                        icon: 'success',
                        title: '로그인 성공!',
                        showConfirmButton: false,
                        timer: 1000


                     }).then(() => {
                        window.location.href = "http://localhost:8080";
                     })

                  }
               })
                  .catch(err => {
                     console.log(err);
                  })


            },
            fail: (error) => {
               // this.$router.push("/errorPage");
               console.log(error);
            },
         });

      },
//네이버
naverlogin() {
            console.log("로그인함수 실행됨")
            axios({
                url: "http://localhost:3000/auth/naverlogin",
                method: "POST",
                data: {
                    // naverlogin: this.naverLogin.accessToken.accessToken,
                    naverlogin: this.naverLogin.user,
                },
            })
                .then(res => {
                    if (res.data.message == '저장완료') {
                        this.$swal({
                            position: 'top',
                            icon: 'success',
                            title: '회원가입 성공!',
                            showConfirmButton: false,
                            timer: 1000
                        });
                    } else {
                        this.$store.commit("user", { user_id: this.naver_id, user_no: res.data.message })
                        this.$swal({
                            position: 'top',
                            icon: 'success',
                            title: '로그인 성공!',
                            showConfirmButton: false,
                            timer: 1000,
                        }).then(() => {
                            window.location.href = "http://localhost:8080/";
                        })
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        },
        gotoMain() {
          this.$router.push('/')
        },
        naverBtnClick(){
          var btnNaverLogin = document.getElementById("naverIdLogin").firstChild;
          btnNaverLogin.click();
        }
    },
    mounted() {
        console.log(this.naverLogin.user);
        this.naverLogin = new window.naver.LoginWithNaverId({
            clientId: "ctXMFO6OgDX1yM8UMMhi",
            callbackUrl: "http://localhost:8080/",
            isPopup: false,
            loginButton: {
              color: "green", type: 1, height: 45
            },
        });
        this.$store.commit("naverLogin", this.naverLogin);

        this.naverLogin.init();

        this.naverLogin.getLoginStatus((status) => {
            if (status) {
                console.log(status);
                console.log(this.naverLogin.user.nickname);

                const email = this.naverLogin.user.email;
                const id = this.naverLogin.user.id;
                const nick = this.naverLogin.user.nickname;

                this.naver_id = id;
                console.log(email)
                console.log(nick)

            } else {
                console.log("callback처리 실패");
            }
        })
      }
   };
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

html,
body {
   width: 100%;
   height: 100vh;
   margin: 0;
}

body {
   font-family: "DM Sans", sans-serif;
   overflow: scroll;
   /* display: flex; */
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
   overflow: auto;
}

.sign-in-container {
   left: 0;
   width: 50%;
   z-index: 2;
}

.container.right-panel-active .sign-in-container {
   transform: translateX(100%);
}

.sign-up-container {
   left: 0;
   width: 50%;
   opacity: 0;
   z-index: 1;
   overflow: auto;
}

.sign-up-container h1 {
   margin-top: 120px;
}

.container.right-panel-active .sign-up-container {
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
   display: flex;
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

.zip {
   display: flex;
   /* margin-right: 30px; */
}

.zip input {
   width: 213px;
}

.zip button {
   width: 140px;
   ;
   height: 40px;
   padding: 0;
   background-color: #fff;
   color: black;
   border-color: black;
   border-radius: 0%;
   margin: 8px 0 0 30px;
}
</style>