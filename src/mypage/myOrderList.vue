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


      <div class="myinfo" style="margin-left: 30px;">
        <div class="titlebox">
          <h2>주문/배송</h2>
          <div>
            <button class="rebtn" @click="sortList(0)">최신순</button>
            <button class="rebtn" @click="sortList(1)">가격순</button>
            <button class="rebtn" @click="sortList(2)">배송중</button>
            <button class="rebtn" @click="sortList(3)">구매확정</button>
          </div>
        </div>
        <div class="mypage">
          <div class="table-responsive">
            <table class="table" style="width: 100%;">
              <thead>
                <tr>
                  <th>주문번호</th>
                  <th style="width: 150px;">상품이미지</th>
                  <th style="width: 150px;">상품명</th>
                  <th style="width: 150px;">금액</th>
                  <th style="width: 150px;">주문일자</th>
                  <th style="width: 150px;">주문상태</th>
                  <th style="width: 150px;">교환/환불</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(order, i) in uniqueOrderList" :key="i">
                  <td>{{ order.ORDERS_NO }}</td>
                  <td>
                    <img width="100" style="border-radius: 10px;"
                      :src="order.items[0].ORDERS_GOODS_IMG ? require(`../../../node-back/uploads/uploadGoods/${order.items[0].ORDERS_GOODS_IMG}`) : '/goodsempty.jpg'"
                      alt="상품 이미지" />
                  </td>
                  <td>
                    <a :href="'http://localhost:8080/goods/goodsDetail/' + order.items[0].GOODS_NO" class="imgSpace">
                      {{ order.items[0].ORDERS_GOODS_NAME }}
                    </a>
                    <span v-if="order.items.length > 1">
                      외 {{ order.items.length - 1 }}건
                    </span>
                  </td>
                  <!-- <td>{{ formatPrice((order.items[0].ORDERS_GOODS_PRICE)*(order.items[0].ORDERS_GOODS_CNT) + order.items[0].ORDERS_DELIVERY - (order.items[0].ORDERS_DISCOUNT)) }}</td> -->
                  <td>{{ formatPrice(order.items[0].ORDERS_TOTAL) }}</td>
                  <td>{{ formatDateTime(order.items[0].ORDERS_DATE) }}</td>
                  <td>
                    {{ getOrderStatusText(order.items[0].ORDERS_STATUS) }} <br />
                    <a :href="'http://localhost:8080/order/orderDetail/' + order.items[0].ORDERS_NO" class="imgSpace"
                      style="font-size: small; color: #9c0410">
                      주문상세보기 &gt;
                    </a>
                  </td>
                  <td>
                    <button class="rebtn" @click="orderCancle(order.items[0].ORDERS_NO)">취소 요청</button>
                    <hr style="margin-bottom: 3px">
                    <button class="rebtn" @click="orderConfirm(order.items[0].ORDERS_NO)">구매 확정</button>
                    <hr style="margin-bottom: 3px">
                    <!-- <button class="rebtn" @click="goToWrite(order.items[0].ORDERS_NO)">리뷰 작성</button> -->
                    <button class="rebtn" v-if="order.items[0].REVIEW_CHECK === 0"
                      @click="goToWrite(order.items[0].ORDERS_NO)">리뷰 작성</button>
                    <button class="rebtn" v-else style="color: #fff; background-color: #9c0410;">리뷰 완료</button>
                  </td>
                </tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>
                <tr v-if="orderList.length === 0">
                  <td colspan="7" style=" padding: 150px 0px;">주문 내역이 없습니다.</td>
                </tr>
              </tbody>
            </table>
            <div class="btn-cover" style="margin-top: 5%; text-align: center; width:95%">
              <button class="page-btn">이전</button>
              <span class="page-count">1/1 페이지</span>
              <button class="page-btn">다음</button>
            </div>
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
      // num: 0,
      loginUser: {},
      userOrder: {},
      userDeli: {},
      orderList: [],
      pageSize: 8,
      keyword: '',
      sortCase: "최근1년",
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    uniqueOrderList() {
      const uniqueOrders = [];
      const tradeNos = [];

      for (const order of this.orderList) {
        if (!tradeNos.includes(order.ORDERS_NO)) {
          uniqueOrders.push({
            ORDERS_NO: order.ORDERS_NO,
            items: [order],
          });
          tradeNos.push(order.ORDERS_NO);
        } else {
          const index = uniqueOrders.findIndex((o) => o.ORDERS_NO === order.ORDERS_NO);
          uniqueOrders[index].items.push(order);
        }
      }

      return uniqueOrders;
    },
  },
  mounted() {
    if (this.user.user_no == '') {
      alert('로그인해주세요');
      this.$router.push({ path: '/login' });
    }

    axios({
      url: "http://localhost:3000/goods/my/order_list",
      method: "POST",
      data: {
        page: this.$route.query.page,
        pagesize: this.pageSize
      },
    }).then(res => {
      this.orderList = res.data;
      // 역순정리 sort 매소드
      this.orderList.sort(function (a, b) {
        return b.USER_NO - a.USER_NO;
      });
    }).catch(err => {
      alert(err);
    });

    // 
    axios({
      url: "http://localhost:3000/goods/boardlistcnt/:user_no",
      method: "POST",
      data: {
        user_no: this.user.user_no
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
    async getUserOrder() {
      try {
        const response = await axios.get(`http://localhost:3000/mypage/orderbox/${this.user.user_no}`);
        this.userOrder = response.data[0];
      } catch (error) {
        console.error(error);
      }
    },
    async getUserDeli() {
      try {
        const response = await axios.get(`http://localhost:3000/mypage/delibox/${this.user.user_no}`);
        this.userDeli = response.data[0];
      } catch (error) {
        console.error(error);
      }
    },
    async getOrderList() {
      try {
        const response = await axios.get(`http://localhost:3000/goods/orderlist/${this.user.user_no}`);
        this.orderList = response.data;
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
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const formattedDateTime = date.toLocaleDateString("ko-KR", options);
      return formattedDateTime;
    },
    getOrderStatusText(status) {
      if (status === 0) {
        return '결제완료';
      } else if (status === 1) {
        return '배송중';
      } else if (status === 2) {
        return '배송완료';
      } else if (status === 3) {
        return '구매확정';
      } else if (status === 9) {
        return '취소완료';
      }
      return '';
    },

    orderCancle(ORDERS_NO) {
      const order = this.orderList.find(order => order.ORDERS_NO === ORDERS_NO);

      if (order && order.ORDERS_STATUS !== 0) {
        this.$swal("결제완료 상태에서만 주문 취소가 가능합니다");
        return;
      }

      this.$swal({
        title: `주문을 취소하시겠습니까?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '확인',
        cancelButtonText: '취소',
        reverseButtons: true
      }).then(result => {
        if (result.value) {
          axios({
            url: `http://localhost:3000/goods/admin/updateStatus`,
            method: "POST",
            data: {
              status: 9,
              orderNos: ORDERS_NO,
            },
          }).then(() => {
            this.$swal('주문이 취소되었습니다');
            location.reload();
          }).catch(error => {
            console.error(error);
          });
        }
      });
    },

      orderConfirm(ORDERS_NO) {
      const order = this.orderList.find(order => order.ORDERS_NO === ORDERS_NO);

      if (order && order.ORDERS_STATUS !== 2) {
        this.$swal("배송 완료 상태에서만 구매 확정이 가능합니다");
        return;
      }
      this.$swal({
        title: `구매 확정시 주문취소가 불가능합니다`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '확인',
        cancelButtonText: '취소',
        reverseButtons: true
      }).then(result => {
        if (result.value) {
          axios({
            url: `http://localhost:3000/goods/admin/updateStatus`,
            method: "POST",
            data: {
              status: 3,
              orderNos: ORDERS_NO,
            },
          }).then(() => {
            this.$swal('구매확정되었습니다');
            axios.post(`http://localhost:3000/goods/orderPoint/${ORDERS_NO}/${this.user.user_no}`)
              .then(() => {
                location.reload();
              })
              .catch(error => {
                console.error(error);
              });
          })
        }
      });
    },
    goToWrite(ORDERS_NO) {
      const order = this.orderList.find(order => order.ORDERS_NO === ORDERS_NO);

      if (order && order.ORDERS_STATUS !== 3) {
        this.$swal("구매 확정 상태에서만 리뷰 작성이 가능합니다");
        return;
      }

      if (order && order.REVIEW_CHECK === 1) {
        this.$swal("이미 리뷰를 작성하셨습니다");
        return;
      }

      this.$router.push({ path: `/reviewWrite/${ORDERS_NO}` });
    },

    async getQnaList(sortCaseNum) {

      try {
        const userno = this.user.user_no
        const page = this.$route.query.page
        const pagesize = this.pageSize
        const response = await axios.get(`http://localhost:3000/goods/orderlist_sort/${userno}/${sortCaseNum}/${page}/${pagesize}`);
        this.orderList = response.data;
        this.pageCnt = Math.ceil(this.orderList.length / this.onePageCnt)
        //this.setPage(1)

      } catch (error) {
        console.error(error);
      }
    },
    sortList(sortNum) {
      if (sortNum == 0) {
        this.sortCase = "최신순"
      } else if (sortNum == 1) {
        this.sortCase = "가격순"
      }
      else if (sortNum == 2) {
        this.sortCase = "배송중"
      }
      else {
        this.sortCase = "구매확정"
      }
      this.getQnaList(sortNum)
        .then(() => {
          this.$router.push({ path: '/mypage/myOrderList' });
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


/*주문/배송*/

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
  margin: 0 auto;
  max-width: 1200px;
  text-align: center;
  background-color: #ffffff;
  border-radius: 10px;
  border-collapse: separate;
  border-spacing: 10px 10px;
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


hr {
  border: 0px;
  margin: 1px 0;
}

.titlebox {
  display: flex;
}

.titlebox h2 {
  margin-top: 0px;
  margin-right: 30px;
}

a.imgSpace {
  color: inherit;
  text-decoration: none;
}

.imgSpace:hover {
  color: #9c0410;
  cursor: pointer;
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