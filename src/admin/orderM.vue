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
          <div class="admin">
            <table class="goodslist-table">
              <caption>
                <div class="list-title">
                  <h2>배송 관리</h2>
                  <div class="list-title2">
                    <div class="search_bar">
                      <input v-model="keyword" class="form-control" type="text" placeholder="주문자 검색"
                        @keyup.enter="getOrderList(sortCase)">
                      <button class="search-btn" type="submit" @click="getOrderList(sortCase)">
                        <font-awesome-icon :icon="['fas', 'magnifying-glass']" size="lg" style="color: #fff;" /></button>

                    </div>

                    <div class="btn-area">
                      <button class="orderbtn" @click="updateOrders">배송중 처리</button>
                      <button class="orderbtn" @click="updateCompleteOrders">배송완료 처리</button>
                    </div>
                  </div>
                  <div class="list-title2">
                    <div class="mo_sorting">
                      <button type="button" style="border: none;"> {{ sortCase }}
                      </button>
                      <ul id="sort_btn">
                        <li><a class="dropdown-item" href="#" @click="sortList()">전체</a></li>
                        <li><a class="dropdown-item" href="#" @click="sortList(0)">결제완료</a></li>
                        <li><a class="dropdown-item" href="#" @click="sortList(1)">배송중</a></li>
                        <li><a class="dropdown-item" href="#" @click="sortList(2)">배송완료</a></li>
                        <li><a class="dropdown-item" href="#" @click="sortList(3)">구매확정</a></li>
                        <li><a class="dropdown-item" href="#" @click="sortList(9)">취소</a></li>

                      </ul>
                    </div>
                  </div>
                </div>
              </caption>
              <thead class="table-light">
                <tr>
                  <th scope="col">결제일</th>
                  <th scope="col">주문번호</th>
                  <th scope="col">주문자</th>
                  <th scope="col">상품명</th>
                  <!-- <th scope="col">총 상품 금액</th> -->
                  <th scope="col">총 결제 금액</th>
                  <th scope="col">결제 상태</th>
                  <th scope="col">전체선택<input type="checkbox" v-model="allSelected" style="margin-left: 5px;" /></th>
                  <th scope="col">취소여부</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(order, i) in orderList" :key="i">
                  <th scope="row">{{ formatDateTime(order.ORDERS_DATE) }}</th>
                  <td>{{ order.ORDERS_NO }} </td>
                  <td>{{ order.USER_NAME }} </td>
                  <td>{{ order.ORDERS_GOODS_NAME }} </td>
                  <!-- <td>{{ formatPrice(order.ORDERS_GOODS_PRICE * order.ORDERS_GOODS_CNT) }} </td> -->
                  <td>{{ formatPrice(order.ORDERS_TOTAL) }} </td>
                  <td>{{ statusType(order.ORDERS_STATUS) }} </td>
                  <td style="text-align: center">
                    <input type="checkbox" :value="order.ORDERS_NO" v-model="selectedOrders" />
                  </td>
                  <td v-if="order.ORDERS_STATUS == 27">O</td>
                  <td v-else>x</td>
                </tr>
                <tr v-if="orderList.length === 0">
                  <td colspan="8" style=" padding: 150px 0px;">주문 내역이 없습니다.</td>
                </tr>
              </tbody>

            </table>

            <div v-if="orderList.length !== 0" class="btn-cover" style="margin-top: 5%; text-align: center; width:200%">
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

export default {
  data() {
    return {
      loginUser: {},
      selectAll: false,
      checkboxes: [false, false, false, false, false],
      items: [],
      orderList: [],
      pageSize: 10,
      cnt: 0,
      selectedOrders: [],
      sortCase: "전체",
      keyword: '',
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
    },
    allSelected: {
      get() {
        return this.selectedOrders.length === this.orderList.length;
      },
      set(value) {
        if (value) {
          this.selectedOrders = this.orderList.map(order => order.ORDERS_NO);
        } else {
          this.selectedOrders = [];
        }
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
    axios({
      url: "http://localhost:3000/goods/admin/orderM_list",
      method: "POST",
      data: {
        page: this.$route.query.page,
        pagesize: this.pageSize
      },
    }).then(res => {
      this.orderList = res.data;
      // 역순정리 sort 매소드
      this.orderList.sort(function (a, b) {
        return b.ORDERS_NO - a.ORDERS_NO;
      });
      // 현재 페이지 업데이트
      this.currentPage = this.$route.query.page || 1;
    }).catch(err => {
      alert(err);
    });


    axios({
      url: "http://localhost:3000/goods/boardlistcnt",
      method: "POST",
      data: {},
    }).then(res => {
      const totalPosts = res.data;  // 총 게시물 수
      const postsPerPage = 10;  // 페이지당 게시물 수
      const totalPages = Math.ceil(totalPosts/postsPerPage);  // 총 페이지 수

      // 페이지 수를 출력: 1/2, 2/2 등
      for (let i = 1; i <= totalPages; i++) {
        console.log(`${i}/${totalPages}`);
      }
    }).catch(err => {
      alert(err);
    });


  },
  created() {
    this.getUser();
    this.getOrderList();
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
    checkAll() {
      if (this.selectAll) {
        this.checkboxes = this.checkboxes.map(() => true);
      } else {
        this.checkboxes = this.checkboxes.map(() => false);
      }
    },

    sortList(sortNum) {
      if (sortNum == 0) {
        this.sortCase = "결제 완료"
      } else if (sortNum == 1) {
        this.sortCase = "배송 중"
      }
      else if (sortNum == 2) {
        this.sortCase = "배송 완료"
      }
      else if (sortNum == 3) {
        this.sortCase = "구매 확정"
      }
      else if (sortNum == 9) {
        this.sortCase = "취소"
      }
      else {
        this.sortCase = "전체"
      }

      // 선택된 주문들을 서버 요청에 포함시키지 않음
      this.getOrderList(sortNum)
        .then(() => {
          this.$router.push({ path: '/admin/orderM' });
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
    async getOrderList(sortCaseNum) {
      let keyword = this.keyword;
      try {
        if (this.keyword == '') {
          keyword = "none"
        }
        const page = this.$route.query.page
        const pagesize = this.pageSize
        const response = await axios.get(`http://localhost:3000/goods/admin/orderM/${sortCaseNum}/${keyword}/${page}/${pagesize}`);
        this.orderList = response.data;
        this.pageCnt = Math.ceil(this.orderList.length / this.onePageCnt)
        // this.setPage(1)
      } catch (error) {
        console.error(error);
      }
    },

    statusType(socialType) {
      if (socialType === 0) {
        return '결제 완료';
      } else if (socialType === 1) {
        return '배송 중';
      } else if (socialType === 2) {
        return '배송 완료';
      } else if (socialType === 3) {
        return '구매 확정';
      } else if (socialType === 9) {
        return '취소';
      } else {
        return 'null';
      }
    },

    formatPrice(price) {
      const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return `${formattedPrice} 원`;
    },

    formatDateTime(dateTime) {
      const date = new Date(dateTime);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const formattedDateTime = date.toLocaleDateString("ko-KR", options);
      return formattedDateTime;
    },

    async updateOrders() {
      if (this.selectedOrders.length === 0) {
        this.$swal("변경할 내용을 선택해주세요");
        return;
      }

      // order.ORDER_STATUS가 0인 경우에만 실행
      const selectedOrdersWithStatus0 = this.selectedOrders.filter(orderNos => {
        const order = this.orderList.find(order => order.ORDERS_NO === orderNos);
        return order && order.ORDERS_STATUS === 0;
      });
      // const selectedOrdersWithStatus0 = this.selectedOrders.filter(orderTradeNo => {
      //           const order = this.orderList.find(order => order.ORDER_TRADE_NO === orderTradeNo);
      //           return order && order.ORDER_STATUS === 0;
      //       });

      if (selectedOrdersWithStatus0.length !== this.selectedOrders.length) {
        this.$swal("결제완료 상태에만 변경 가능합니다");
        return;
      }

      try {
        this.$swal({
          title: `배송중으로 등록 하시겠습니까?`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: '등록',
          cancelButtonText: '취소',
          reverseButtons: true,
          timer: 5000,
          timerProgressBar: true
        }).then(result => {
          if (result.value) {
            axios({
              url: `http://localhost:3000/goods/admin/updateStatus`,
              method: "POST",
              data: {
                status: 1,
                orderNos: selectedOrdersWithStatus0
              },
            }).then(res => {
              if (res.data.message == 'complete') {
                this.$swal("변경되었습니다.");
                window.location.href = `http://localhost:8080/admin/orderM`;
              }
            }).catch(() => {
              this.$swal("에러");
            });
          }
        });
      } catch (error) {
        console.error(error);
        // 오류 처리
      }
    },
    async updateCompleteOrders() {
      if (this.selectedOrders.length === 0) {
        this.$swal("변경할 내용을 선택해주세요");
        return;
      }

      // order.ORDER_STATUS가 1인 경우에만 실행
      const selectedOrdersWithStatus1 = this.selectedOrders.filter(orderTradeNo => {
        const order = this.orderList.find(order => order.ORDERS_NO === orderTradeNo);
        console.log(order.ORDER_STATUS);
        return order && order.ORDERS_STATUS === 1;
      });

      if (selectedOrdersWithStatus1.length !== this.selectedOrders.length) {
        this.$swal("배송 중 상태에만 변경 가능합니다");
        return;
      }

      try {
        this.$swal({
          title: `배송완료로 등록 하시겠습니까?`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: '등록',
          cancelButtonText: '취소',
          reverseButtons: true,
          timer: 5000,
          timerProgressBar: true
        }).then(result => {
          if (result.value) {
            axios({
              url: `http://localhost:3000/goods/admin/updateStatus`,
              method: "POST",
              data: {
                status: 2,
                orderNos: selectedOrdersWithStatus1
              },
            }).then(res => {
              if (res.data.message == 'complete') {
                this.$swal("변경되었습니다.");
                window.location.href = `http://localhost:8080/admin/orderM`;
              }
            }).catch(() => {
              this.$swal("에러");
            });
          }
        });
      } catch (error) {
        console.error(error);
      }
    },
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
  height: 1200px;
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
  margin-right: 30px;
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


/*배송 목록*/

section {
  float: left;
  margin-top: 50px;
  margin-left: 30px;
}

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

.goodslist-table {
  width: 1143px;
  max-width: 1200px;
  text-align: center;
  background-color: #ffffff;
  border-radius: 10px;
  border-spacing: 10px 10px;
  border-collapse: collapse;
}

.goodslist-table thead {
  position: sticky;
  top: 0px;
  border-bottom: 2px solid black
}


.goodslist-table th {
  text-align: center;
  padding: 25px;
}

.goodslist-table tbody tr {
  height: 15px;
}

/* .goodslist-table button {
  padding: 4px;
  border-radius: 6px;
  color: #ffffff;
  background-color: #9c0410;
  cursor: pointer;
} */

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

/* .search_bar {
  display: flex;
  margin: 15px 130px;
} */

.search_bar {
  display: flex;
  margin: auto;
  margin-left: 150px;
}

.search-btn {
  color: #fff;
  background-color: #9c0410;
  border-radius: 5px;
  border: none;
  width: 50px;
  height: 40px;
}


.btn-area button {
  margin: 15px 5px;
  color: #fff;
  border: none;
  background-color: #9c0410;
}

.orderbtn {
  width: 110px;
  padding: 10px;
  font-size: 14px;
  border-radius: 10px;
}

.btn-area {
  margin-left: 260px;
}

.btn-area button {
  height: 40px;
  margin: 15px 5px;
  color: #fff;
  border: none;
  background-color: #9c0410;
  font-family: 'SejonghospitalBold';
}


/*드롭박스*/


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