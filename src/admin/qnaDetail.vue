<template>
  <div class="con">
    <div class="info">
      <div style="margin-left: 30px;">
        <h2 style="color: #fff;">{{ loginUser.user_name }} 관리자님</h2>
        <h2 style="color: #fff;">환영합니다.</h2>
      </div>

    </div>
    <div style="width: 100px;">
    </div>
    <div class="container">
      <nav>
        <div class="sidebar">
          <div class="icon-bar adminpage-bar">
            <div>
              <router-link to="/admin/userInfo" class="m">
                <button style="background-color: #fff; border-color: #fff; border-style: none;">
                  <font-awesome-icon icon="fa-solid fa-address-card" size="xl" style="color: #9c0410;" />
                  <p>회원 관리</p>
                </button>
              </router-link>
            </div>
            <div>
              <router-link to="/admin/goodsList" class="m">
                <button style="background-color: #fff; border-color: #fff; border-style: none;">
                  <font-awesome-icon icon="fa-solid fa-list" size="xl" style="color: #9c0410;" />
                  <p>상품 목록</p>
                </button>
              </router-link>

            </div>
            <div>
              <router-link to="/admin/goodsAdd" class="m">
                <button style="background-color: #fff; border-color: #fff; border-style: none;">
                  <font-awesome-icon icon="fa-solid fa-pen-to-square" size="xl" style="color: #9c0410;" />
                  <p>상품 등록</p>
                </button>


              </router-link>
            </div>

            <div>
              <router-link to="/admin/orderM" class="m">
                <button style="background-color: #fff; border-color: #fff; border-style: none;">
                  <font-awesome-icon :icon="['fas', 'paper-plane']" size="xl" style="color: #9c0410;" />
                  <p>배송 관리</p>
                </button>


              </router-link>
            </div>

            <div>
              <router-link to="/admin/qnaList" class="m">
                <button style="background-color: #fff; border-color: #fff; border-style: none;">
                  <font-awesome-icon icon="fa-solid fa-circle-question" size="xl" style="color: #9c0410;" />
                  <p>문의 내역</p>
                </button>

              </router-link>
            </div>

          </div>

        </div>
      </nav>

      <section>
        <div class="admininfo">
          <div class="write" v-for="item in content" :key="item.QNA_NO">
            <h1 style="text-align: center; margin: 30px 0 30px 0;">문의 상세</h1>
            
            <div class="container-wrapper">

              <h4>작성자: {{ content[0].USER_NAME }}</h4> <br>

              <h3>제목</h3> <br>

              <textarea class="qnatext1" :disabled="editable === false" v-model="content[0].QNA_TITLE"></textarea>

              <div>
                <br>
                <h3>내용</h3>
                <br>
                <textarea class="qnatext2" :disabled="editable === false" v-model="content[0].QNA_CONTENT"></textarea>
              </div>

              <br>
              <h3>이미지</h3>
              <img v-if="!content[0].QNA_IMG" src="../assets/imgEmptyInput.png" alt="..." width="50%;">
              <img v-else :src="require(`../../../node-back/uploads/uploadQna/${content[0].QNA_IMG}`)" alt="..." width="50%;">
              <hr style="margin-top: 20px;"> <br>

              <h3>답변</h3>
              <br>
              <textarea class="qnatext3" :disabled="editable === false" v-model="content[0].QNA_COMMENT"></textarea>
            </div>

            <br>
            <br>
            <div class="btnarea">
              <!-- <router-link to="/admin/qnaList"><button type="button">목록</button></router-link> -->
              <button @click="QnaMain">목록</button>
            </div>
          
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      loginUser: {},
      content: [],
      editable: false,
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  mounted() {
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

    if (this.user.user_no == '') {
      // 일단은 로그인 상태 체크 
      this.$swal("관리자 외 접근제한 페이지입니다.");
      this.$router.push({ path: '/login' });
    }
    else {
      axios({
        url: "http://localhost:3000/auth/admin_check",
        method: "POST",
        data: {
          user_no: this.user.user_no,
        },
      })
        .then(res => {
          if (res.data.message == 'admin') {
            console.log(res.data.message);
          }
          else if (res.data.message == 'user') {
            this.$swal("관리자 외 접근제한 페이지입니다.");
            this.$router.push({ path: '/' });
          }
        })
        .catch(() => {
          this.$swal("접속 오류");
        })
    }
  },

  // created() {
  //       this.getUser();
  //   },

  methods: {

    QnaMain() {
            console.log("실행 확인")
            this.$router.push('/admin/qnaList');
        },

    onSubmitWrite() {
      axios.post("http://localhost:3000/qna/write_answer", {
        qna_comment: this.qna_comment,
        qna_no: this.$route.query.QNA_NO
      })
        .then(response => {
          console.log(response.data);

        })
        .catch(error => {
          console.log(error);
          // 오류 처리
        });
    }



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
  height: 1250px;
}

.info {
  background-color: #9c0410;
  width: 100%;
  height: 200px;
  justify-content: space-between;
  flex: 2;
  border-radius: 32px 32px 0px 0px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  font-family: 'GmarketSansMedium';
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
  margin-right: 200px;
}

nav p {
  font-family: 'seolleimcool-SemiBold';
}

.adminpage-bar {
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.adminpage-bar::-webkit-scrollbar {
  display: none;
}

.adminpage-bar {

  width: 100px;
  top: 150px;
  margin-top: 20px;
  left: 0;
  overflow-x: hidden;
}

.adminpage-bar .m,
.icon-bar p {
  color: #9c0410;
}

.adminpage-bar p {
  margin: auto;
  font-size: 20px;
  padding-top: 4px;
  margin-bottom: 80px;
}

.adminpage-bar a {
  margin: auto;
  font-size: 20px;
  padding-top: 4px;
  margin-bottom: 80px;
}

.container {
  margin: 40px 30px;
}


/*회원목록*/


.admininfo {
  width: 500px;
  margin: 0 auto;
  /* margin-top: 30px; */
  position: relative;
  font-weight: 700;
  height: 800px;
}

.admin {
  margin-top: 50px;
}

.userlist-table {
  width: 900px;
  max-width: 1200px;
  text-align: center;
  background-color: #ffffff;
  border-radius: 10px;
  border-spacing: 10px 10px;
  border-collapse: collapse;
}

.userlist-table thead {
  position: sticky;
  top: 0px;
  border-bottom: 2px solid black
}


.userlist-table th {
  text-align: center;
  padding: 25px;
}

.userlist-table tbody tr {
  height: 30px;
}

.userlist-table button {
  width: 70px;
  padding: 4px;
  border-radius: 6px;
  color: #ffffff;
  background-color: #9c0410;
  cursor: pointer;
  border: none;
}

.form-control {
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  font-size: 1rem;
  padding-left: 20px;
  color: rgb(137, 137, 137);
  border: 2px solid rgb(221, 221, 221);
  border-radius: 10px;
  margin-right: 10px;
  font-family: 'SejonghospitalBold';
}

.list-title {
  margin: 13px 0px;
  display: flex;
  justify-content: space-between;
  /* color: #9c0410; */
}

.list-title2 {
  vertical-align: middle;
  display: inline-flex;
  margin: auto 0px;
}

.table-title {
  text-align: center;
  background-color: #ffffff;
}

.search_bar {
  display: flex;
  margin: 0px 170px;
}

.search-btn {
  color: #fff;
  background-color: #9c0410;
  border-radius: 5px;
  border: none;
  width: 50px;
  height: 40px;
}


/*드롭박스*/

.dropdown {
  display: inline-block;
}

.dropdown:hover {
  display: block;

}

.pl {
  border: 1px solid #C4C4C4;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 12px 13px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  font-family: 'SejonghospitalBold';
}

.pl:focus {
  border: 2px solid #000;
  box-sizing: border-box;
  border-radius: 10px;
  border-radius: 10px;
}

/*페이지*/

.page {
  margin-top: 40px;
  margin-left: 400px;
}

.page-item {
  color: #9c0410;
}
</style>
<style>
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
  --more-list-shadow: rgba(255, 255, 255, 0.4);
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

/* 스크롤바 */
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

.con {
  justify-content: space-between;
  align-items: center;
  flex: 2;
  background-color: var(--projects-section);
  border-radius: 32px;
  margin: 50px;
  flex-direction: column;
}

.container {
  margin: 40px 30px;
}

/* 상단아이콘버튼 */
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

/* 네비게이션 바 */
nav {
  float: left;
  margin-left: 40px;
  margin-right: 100px;
}

nav p {
  font-family: 'seolleimcool-SemiBold';
}

.sidebar {
  width: 100px;
}

.adminpage-bar {
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.adminpage-bar::-webkit-scrollbar {
  display: none;
}

.adminpage-bar {
  width: 100px;
  top: 150px;
  margin-top: 20px;
  left: 0;
  overflow-x: hidden;
}

.adminpage-bar .m,
.icon-bar p {
  color: #9c0410;
}

.adminpage-bar a {
  display: block;
  text-align: center;
  height: 60px;
  padding-top: 18px;
  padding-bottom: 18px;
  transition: all 0.3s ease;
  text-decoration: none;
}

.adminpage-bar p {
  margin: auto;
  font-size: 20px;
  padding-top: 4px;
  margin-bottom: 80px;
}



/*section 내용*/
section {
  float: left;
  margin-top: 50px;
  margin-left: 130px;
}

.info {
  background-color: #9c0410;
  width: 100%;
  height: 200px;
  justify-content: space-between;
  flex: 2;
  border-radius: 32px 32px 0px 0px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  font-family: 'GmarketSansMedium';
}

.admininfo {
  margin-top: 30px;
  position: relative;
  top: -60px;
}

.form-control {
  display: flex;
  align-items: center;
  width: 300px;
  height: 40px;
  font-size: 1rem;
  font-family: GmarketSansMedium;
  padding-left: 20px;
  color: rgb(137, 137, 137);
  border: 2px solid rgb(221, 221, 221);
  border-radius: 10px;
  margin-right: 10px;
}

/* 검색창 */
.search_bar {
  display: flex;
  margin: 0px 150px;
}

.search-btn {
  color: #fff;
  background-color: #9c0410;
  border-radius: 5px;
  border: none;
  width: 50px;
  height: 40px;
}

.btn-btn-outline-danger {
  text-align: center;
  background-color: #9c0410;
  color: #fff;
}

/*드롭박스*/
.dropdown {
  display: inline-block;
}

.dropdown:hover {
  display: block;
}

.pl {
  border: 1px solid #C4C4C4;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 12px 13px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
}

.pl:focus {
  border: 2px solid #000;
  box-sizing: border-box;
  border-radius: 10px;
  border-radius: 10px;
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
  margin-top: 80px;
}

.write textarea {
  font-family: 'SejonghospitalBold';
}

.qnatext1 {
  width: 100%;
  border-color: black;
  border-radius: 15px;
  padding: 10px;
  border: 1;
  overflow: visible;
  text-overflow: ellipsis;
}

.qnatext2 {
  width: 100%;
  border-color: black;
  border-radius: 15px;
  padding: 10px;
  border: 1;
  overflow: visible;
  text-overflow: ellipsis;
}

.qnatext3 {
  width: 100%;
  border-color: black;
  border-radius: 15px;
  padding: 10px;
  border: 1;
  overflow: visible;
  text-overflow: ellipsis;
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
  margin-right: 20px;
  font-size: large;
  font-family: 'SejonghospitalBold';
}
</style>  