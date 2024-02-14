<template>
  <div class="con">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
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
          <div class="admin">
            <table class="userlist-table">
              <caption>
                <div class="list-title">
                  <h2>문의 목록</h2><br>
                  <div class="list-title2">
                    <div class="search_bar">
                      <input v-model="keyword" class="form-control" type="text" placeholder="작성자 및 제목"
                      @keyup.enter="getQnaList(sortCase)">
                      <button class="search-btn" type="submit" @click="getQnaList(sortCase)">
                        <font-awesome-icon :icon="['fas', 'magnifying-glass']" size="lg" style="color: #fff;" />
                      </button>
                    </div>
                  </div>
                  <div class="list-title2">
                    <div class="mo_sorting">
                      <button type="button" style="border: none;"> {{ sortCase }}
                      </button>
                      <ul id="sort_btn">
                        <li><a class="dropdown-item" href="#" @click="sortList(0)">최근 순</a></li>
                        <li><a class="dropdown-item" href="#" @click="sortList(1)">오래된 순</a></li>
                        <li><a class="dropdown-item" href="#" @click="sortList(2)">답변 완료</a></li>
                        <li><a class="dropdown-item" href="#" @click="sortList(3)">답변 대기</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </caption>
              <thead class="table-title">
                <tr>
                  <th scope="col">문의번호</th>
                  <th scope="col">제목</th>
                  <th scope="col">상품</th>
                  <th scope="col">작성자</th>
                  <th scope="col">작성일</th>
                  <th scope="col">답변상태</th>
                  <th scope="col">삭제</th>
                </tr>

                <tr style="text-align: center;">
                </tr>
              </thead>
              <tbody>
                <tr></tr>
                <tr v-for="(item) in contentlist" :key="item.id">
                  <td>{{ item.QNA_NO }}</td>
                  <td @click="movetocontent(item.QNA_NO)">{{ item.QNA_TITLE }}</td>
                  <td><img
                      :src="item.GOODS_IMG ? require(`../../../node-back/uploads/uploadGoods/${item.GOODS_IMG}`) : '/goodsempty.jpg'"
                      alt="상품 이미지" style="width: 70px;" @click="goToDetail(item.GOODS_IMG)"></td>
                  <td>{{ item.USER_NAME }}</td>
                  <td>{{ item.QNA_DATE.split('T')[0] }}</td>
                  <td v-if="item.QNA_COMMENT != null" class="answer">답변완료</td>
                  <td v-else class="answer"><button @click="moveToAnswerPage(item.QNA_NO)">답변하기</button></td>
                  <td><a @click="confirmDeleteContent(item.QNA_NO)">
                      <font-awesome-icon icon="fa-solid fa-trash" size="lg" style="color: #9c0410;" />
                    </a></td>
                </tr>
                <tr v-if="contentlist.length === 0">
                  <td colspan="7" style=" padding: 150px 0px;">문의 내역이 없습니다.</td>
                </tr>
              </tbody>
            </table>
            <div v-if="contentlist.length !== 0" class="btn-cover" style="margin-top: 5%; text-align: center; width:161%">
              <button @click="movetopreviouspage" class="page-btn">이전</button>
              <span class="page-count">{{ $route.query.page || 1 }}/{{ totalpage }} 페이지</span>
              <button @click="movetonextpage" class="page-btn">다음</button>
            </div>

          </div>
        </div>
      </section>
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
      contentlist: [], //현재 게시판과 페이지에 맞는 글 리스트
      cnt: 0,
      pageSize: 10, //한페이지에 보여지는 정보 갯수
      keyword: '',
      sortCase: "최근 순",
    }
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
    this.setOpt();

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

    axios({   // 게시글 작성자, 제목, 작성일 가져오기
      url: "http://localhost:3000/qna/qna_list",
      method: "POST",
      data: {
        page: this.$route.query.page,
        pagesize: this.pageSize
      },
    }).then(res => {
      this.contentlist = res.data;
      //역순정리 sort 매소드
      this.contentlist.sort(function (a, b) {
        return b.QNA_NO - a.QNA_NO;
      });
    }).catch(err => {
      alert(err);
    });
    //글개수 가져오기
    axios({
      url: "http://localhost:3000/qna/boardlistcnt",
      method: "POST",
      data: {

      },
    }).then(res => {
      this.cnt = res.data;
    }).catch(err => {
      alert(err);
    });
  },
  created() {
    this.getUser();
    this.getQnaList();
  },
  methods: {
    async getQnaList(sortCaseNum) {
      let keyword = 'none'

      if (this.keyword != '') {
        keyword = this.keyword;
      }
      try {
        const page = this.$route.query.page
        const pagesize = this.pageSize
        const response = await axios.get(`http://localhost:3000/qna/admin/qnalist/${sortCaseNum}/${keyword}/${page}/${pagesize}`);
        this.contentlist = response.data;
        this.pageCnt = Math.ceil(this.contentlist.length / this.onePageCnt)
        //this.setPage(1)

      } catch (error) {
        console.error(error);
      }
    },
    sortList(sortNum) {
      if (sortNum == 0) {
        this.sortCase = "최근 순"
      } else if (sortNum == 1) {
        this.sortCase = "오래된 순"
      }
      else if (sortNum == 2) {
        this.sortCase = "답변 완료"
      }
      else {
        this.sortCase = "답변 대기"
      }
      this.getQnaList(sortNum)
        .then(() => {
          this.$router.push({ path: '/admin/qnalist' });
        })
    },
    setOpt() {
      const optBtn = document.querySelector('.mo_sorting > button');
      const optList = document.querySelectorAll('#sort_btn > li');
      const sortBtn = document.querySelector('#sort_btn');

      // optBtn 텍스트를 선택항목으로 변경
      const pickOpt = function (item) {
        optBtn.innerText = item.innerText;
        optBtn.parentNode.classList.remove('active');
        sortBtn.style.display = 'none';
      }

      // 선택한 항목을 pickOpt함수에 파라미터로 전달 
      optList.forEach(ele => ele.addEventListener('click', function () {
        pickOpt(ele)
      }));

      // optBtn 클릭 상태에 따라 옵션박스 보임/숨김처리
      optBtn.addEventListener('click', function () {
        if (optBtn.parentNode.classList.contains('active')) {
          optBtn.parentNode.classList.remove('active');
          sortBtn.style.display = 'none';
        } else {
          optBtn.parentNode.classList.add('active');
          sortBtn.style.display = 'block';
        }
      });
    },
    goToDetail(goodsno) {
      window.location.href = `http://localhost:8080/goods/goodsDetail/${goodsno}`;
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
    async getUser() {
      try {
        const response = await axios.get(`http://localhost:3000/mypage/mypage/${this.user.user_no}`);
        this.loginUser = response.data[0];
      } catch (error) {
        console.error(error);
      }
    },

    movetocontent(QNA_NO) {
      this.$router.push({
        path: `/admin/qnaDetail/`,
        query: { QNA_NO: QNA_NO }
      });
    },

    //   } else {
    //     this.$swal("비밀글입니다")
    //     this.$router.push({path:'/goods/goodsQna'})
    //   }

    movetoSecret(item) {
      if (this.user.user_type == 1 || item.USER_NO == this.user.user_no) {
        window.location.href = window.location.pathname + '/?QNA_NO=' + item.QNA_NO
      } else {
        this.$swal("비밀글입니다")
        this.$router.push({ path: '/admin/qnaList' })
      }
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

    moveToAnswerPage(QNA_NO) {
      this.$router.push({ path: '/admin/qnaAnswer', query: { QNA_NO: QNA_NO } });
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
  height: 1400px;
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
  font-family: 'SejonghospitalBold';
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
  margin-bottom: 20px;
}

.dropdown:hover {
  display: block;
}

.mo_sorting {
  position: relative;
  width: 110px;
  height: 35px;
  border-radius: 5px;
  border: 1px solid #000;
  cursor: pointer;
  background-position: 86px 15px;
}

.mo_sorting button {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  text-align: center;
  justify-content: center;
  border-radius: 5px;
  background-color: #fff;
  color: #000;
  border: 1px solid #000;
  font-family: 'SejonghospitalBold';
}

#sort_btn {
  position: absolute;
  top: 40px;
  width: 100%;
  z-index: 1;
  background-color: #fff;
  border: 1px solid #000;
  display: none;
}

#sort_btn li {
  padding: 5px 15px;
  font-size: 13px;
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
  text-align: center;
  width: 170%;
  margin-top: 20px;
  margin-left: 5%;
}
</style>  