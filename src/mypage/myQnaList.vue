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
        <div class="titlebox">
          <div style="margin-top: 80px; display: flex;">
            <h2>나의 문의 내역</h2>
            <div class="search_bar">
              <input v-model="keyword" @keyup.enter="getQnaList(sortCase)" class="form-control" type="text"
                placeholder="검색">
              <button class="search-btn" type="submit" @click="getQnaList(sortCase)">
                <font-awesome-icon :icon="['fas', 'magnifying-glass']" size="lg" style="color: #fff;" />
              </button>
              <!-- <button class="btn-btn-secondary" type="submit"  @click="getQnaList(sortCase)">
                <font-awesome-icon :icon="['fas', 'magnifying-glass']" size="lg" style="color: #9c0410;" />
              </button> -->
              <div style="margin-top: 15px;">
                <button class="rebtn" @click="sortList(0)">최근1년</button>
                <button class="rebtn" @click="sortList(1)">일주일</button>
                <button class="rebtn" @click="sortList(2)">답변대기</button>
                <button class="rebtn" @click="sortList(3)">답변완료</button>
              </div>
            </div>
          </div>
        </div>
        <div class="mypage">
          <div class="table-responsive">
            <table class="table" style="width: 105%;">
              <thead style="border-bottom: 2px solid black">
                <tr style="height: 0px; ">
                  <th>문의번호</th>
                  <th style="width: 150px;">제목</th>
                  <th style="width: 150px;">작성자</th>
                  <th style="width: 150px;">작성일</th>
                  <!-- <th style="width: 150px;">비밀글</th> -->
                  <th style="width: 150px;">답변상태</th>
                  <th style="width: 150px;">삭제</th>
                </tr>

              </thead>
              <tbody>

                <tr></tr>
                <tr v-for="(item) in contentlist" :key="item.id">
                  <th scope="row">{{ item.QNA_NO }}</th>
                  <td @click="movetocontent(item.QNA_NO)">{{ item.QNA_TITLE }}</td>
                  <td>{{ item.USER_NAME }}</td>
                  <td>{{ item.QNA_DATE.split('T')[0] }}</td>
                  <td v-if="item.QNA_COMMENT != null" class="answer">답변완료</td>
                  <td v-else class="answer">답변대기</td>
                  <td><a @click="confirmDeleteContent(item.QNA_NO)">
                      <font-awesome-icon icon="fa-solid fa-trash" size="lg" style="color: #9c0410;" />
                    </a></td>
                </tr>
                <tr v-if="contentlist.length === 0">
                  <td colspan="6" style=" padding: 150px 0px;">문의 내역이 없습니다.</td>
                </tr>

              </tbody>
            </table>

            <div v-if="contentlist.length !== 0" class="btn-cover" style="margin-top: 2%; text-align: center; width:90%">
              <button @click="movetopreviouspage" class="page-btn">이전</button>
              <span class="page-count">{{ $route.query.page || 1 }}/{{ totalpage }} 페이지</span>
              <button @click="movetonextpage" class="page-btn">다음</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faHeart)

export default {
  name: 'App',
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      loginUser: {},
      userOrder: {},
      userDeli: {},
      contentlist: [], //현재 게시판과 페이지에 맞는 글 리스트
      pageSize: 10,  //10개 넘을 시에 칸 넘침  
      cnt: 0,
      keyword: '',
      sortCase: "최근1년",
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    totalpage() {
      if (this.cnt == 0) {   // 현재 게시판 글 갯수가 0개일때 총 페이지가 0이 되는거 방지
        return 1;
      } else {
        return Math.ceil(this.cnt / 10);    // (글 갯수/10)한 후 올림 연산을 통해 총 페이지 계산
      }
    }
  },
  mounted() {
    if (this.user.user_no == '') {
      alert('로그인해주세요');
      this.$router.push({ path: '/login' });
    }

    axios({   // 게시글 작성자, 제목, 작성일 가져오기
      url: "http://localhost:3000/qna/myqna_list",
      method: "POST",
      data: {
        userno: this.user.user_no,
        page: this.$route.query.page,
        pagesize: this.pageSize
      },
    }).then(res => {
      this.contentlist = res.data;
    }).catch(err => {
      alert(err);
    });

    //글개수 가져오기
    axios({
      url: "http://localhost:3000/qna/boardlistcnt/:userno",
      method: "POST",
      data: {
        userno: this.user.user_no,
      },
    }).then(res => {
      this.cnt = res.data;
    }).catch(err => {
      alert(err);
    });
  },

  created() {
    this.getUser();
    this.getUserOrder();
    this.getUserDeli();
    this.getQnaList();
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

    write_qna() {
      this.$router.push({ path: '/qnawrite' });
    },

    // movetocontent(QNA_NO) {
    //   window.location.href = "http://localhost:8080/mypage/qnaDetail/?QNA_NO=" + QNA_NO;
    // },

    movetocontent(QNA_NO) {
      this.$router.push({
        path: `/mypage/qnaDetail/`,
        query: { QNA_NO: QNA_NO }
      });
    },

    confirmDeleteContent(QNA_NO) {
      this.$swal({
        title: `${QNA_NO}번 질문을 삭제하시겠습니까?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '삭제',
        cancelButtonText: '취소',
        reverseButtons: true
      }).then(result => {
        if (result.value) {
          this.deleteContent(QNA_NO);
          this.$router.go(0);
        }
      });
    },

    deleteContent(QNA_NO) {
      axios({
        url: "http://localhost:3000/qna/delete",
        method: "POST",
        data: {
          qnano: QNA_NO
        },
      }).then(res => {
        this.content = res.data;
        console.log(res.data)

      }).catch(err => {
        alert(err);
      });
    },

   //페이징
   movetopreviouspage() {
      var currentPage = this.$route.query.page || 1;
      if (currentPage == 1) {
        this.$swal('첫번째 페이지입니다!');
      } else {
        var pp = parseInt(currentPage) - 1;
        window.location.href = window.location.pathname + '?page=' + pp
      }
    },

    movetonextpage() {
      var currentPage = this.$route.query.page || 1;
      if (currentPage == Math.ceil(this.cnt / 10)) {
        this.$swal('마지막 페이지입니다!');
      } else {
        var pp = parseInt(currentPage) + 1;
        window.location.href = window.location.pathname + '?page=' + pp
      }
    },
    async getQnaList(sortCaseNum) {
      let keyword = 'none'

      if (this.keyword != '') {
        keyword = this.keyword;
      }

      try {
        const userno = this.user.user_no
        const page = this.$route.query.page
        const pagesize = this.pageSize
        const response = await axios.get(`http://localhost:3000/qna/myqna_list/${userno}/${sortCaseNum}/${keyword}/${page}/${pagesize}`);
        this.contentlist = response.data;
        this.pageCnt = Math.ceil(this.contentlist.length / this.onePageCnt)
        //this.setPage(1)

      } catch (error) {
        console.error(error);
      }
    },
    sortList(sortNum) {
      if (sortNum == 0) {
        this.sortCase = "최근1년"
      } else if (sortNum == 1) {
        this.sortCase = "일주일"
      }
      else if (sortNum == 2) {
        this.sortCase = "답변대기"
      }
      else {
        this.sortCase = "답변완료"
      }
      this.getQnaList(sortNum)
        .then(() => {
          this.$router.push({ path: '/mypage/myQnaList' });
        })
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
  margin-right: 170px;
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

/*내 문의 내역*/

section {
  font-family: 'SejonghospitalBold';
  float: left;
  margin-top: 30px;
  margin-left: 130px;
}

.myinfo {
  margin-top: 30px;
  /* background-color: #fff2c9; */
}

.mypage {
  margin: 0 auto;
  display: flex;
  /* width: 80%; */
  position: relative;
  justify-content: space-between;
  /* align-items: center; */
  height: 600px;
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


.rebtn {
  width: 70px;
  padding: 4px;
  border-radius: 6px;
  color: #000;
  border: 2px solid #9c0410;
  background-color: #fff;
  cursor: pointer;
  font-family: 'SejonghospitalBold';
  margin-right: 5px;
}

.mypage .table {
  max-width: 1000px;
  text-align: center;
  background-color: #ffffff;
  border-radius: 10px;
  /* border-collapse: separate; */
  border-spacing: 10px 10px;
  border-collapse: collapse;
}

.mypage .table thead {
  position: sticky;
  top: 0px;
  /* border-bottom: 1px solid #444444; */
}

.mypage .table th {
  text-align: center;
  padding: 20px 0;
}

.mypage .table tr {
  height: 30px;
}

.titlebox {
  display: flex;
}

.titlebox h2 {
  margin-right: 30px;
  margin-bottom: 30px;
}

.search_bar {
  display: flex;
  /* margin: 0px 2px; */
  margin-right: 0px;
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
  margin-top: 10px;
  font-family: 'SejonghospitalBold';
}

.search-btn {
  padding: 4px;
  border-radius: 6px;
  border: 2px solid rgb(221, 221, 221);
  background-color: #9c0410;
  border: none;
  cursor: pointer;
  width: 50px;
  height: 40px;
  margin-right: 30px;
  margin-top: 10px;
}

.page-btn {
  height: 25px;
  width: 50px;
  border: 2px solid #9c0410;
  border-radius: 6px;
  background-color: #fff;
  font-family: 'SejonghospitalBold';
  font-size: 14px;
  box-shadow: 0px 1px 10px 0.1px rgb(240, 240, 240);

}

button.page-btn:hover {
  cursor: pointer;
  background-color: pink;

}

.page-count {
  padding: 0 20px 0 20px;
}

.btn-cover {
  top: 20px;
  margin-left: 5%;
}
</style>