<template>
  <div class="app-container">
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
            <link rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
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

        <section>
          <div class="myinfo">
            <div>
              <h2 style="text-align: center;">주문 상세내역</h2>
            </div>
            <div class="my">
              <div class="container-wrapper">
                <div class="datetime">주문일자 : {{ formatDateTime(order.ORDERS_DATE) }} &nbsp; &nbsp; | &nbsp; &nbsp; 주문번호 :
                  {{
                    order.ORDERS_NO }}</div>
                <div class="orderinfo">
                  <hr><br>
                  <div class="detail">
                    <p>주문번호</p>
                    <div>
                      <h4>{{ order.ORDERS_NO }}</h4>
                    </div>
                  </div>
                  <div class="detail">
                    <p>주문일자</p>
                    <div>
                      <h4>{{ formatDateTime(order.ORDERS_DATE) }}</h4>
                    </div>
                  </div>
                  <div class="detail">
                    <p>구매자</p>
                    <div>
                      <h4>{{ order.USER_NAME }}</h4>
                    </div>
                  </div>

                  <div class="detail">
                    <p>구매자 전화번호</p>
                    <div>
                      <h4>{{ order.USER_PHONE }}</h4>
                    </div>
                  </div>


                  <hr><br>
                  <div class="detail">
                    <p>수령인 </p>
                    <div>
                      <h4>{{ deli.DELI_NAME }}</h4>
                    </div>
                  </div>

                  <div class="detail">
                    <p>수령인 전화번호</p>
                    <div>
                      <h4>{{ deli.DELI_PHONE }}</h4>
                    </div>
                  </div>
                  <div class="detail">
                    <p>우편번호</p>
                    <div class="de">
                      <h4>{{ deli.DELI_ZIPCODE }}</h4>
                    </div>
                  </div>
                  <div class="detail">
                    <p>주소</p>
                    <div class="de">
                      <h4>{{ deli.DELI_ADR1 }}</h4>
                    </div>
                  </div>
                  <div class="detail">
                    <p>상세주소</p>
                    <div class="de">
                      <h4>{{ deli.DELI_ADR2 }}</h4>
                    </div>
                  </div>
                  <div class="detail">
                    <p>배송요청사항</p>
                    <div>
                      <h4>{{ deli.DELI_MEMO }}</h4>
                    </div>
                  </div>
                  <!--선-->
                  <hr><br>
                  <div class="detail">
                    <p>상품 정보</p>
                    <div>
                      <table class="goodsimg">
                        <tbody v-for="(orderD, i) in orderDList" :key="i">
                          <tr>
                            <td>
                              <img :width=200
                                :src="orderD.ORDERS_GOODS_IMG ? require(`../../../node-back/uploads/uploadGoods/${orderD.ORDERS_GOODS_IMG}`) : '/goodsempty.jpg'"
                                alt="상품 이미지" />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <h4>{{ orderD.ORDERS_GOODS_NAME }}</h4>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <h4>수량 : {{ orderD.ORDERS_GOODS_CNT }} </h4>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <!--선-->
                  <hr><br>
                  <div class="detail">
                    <p>총 상품 금액</p>
                    <div>
                      <h4>{{ formatPrice(order.ORDERS_AMT) }}</h4>
                    </div>
                  </div>
                  <div class="detail">
                    <p>배송비</p>
                    <div>
                      <h4>무료</h4>
                    </div>
                  </div>
                  <div class="detail">
                    <p>사용 적립금</p>
                    <div>
                      <h4>{{ formatPrice(order.ORDERS_DISCOUNT) }}</h4>
                    </div>
                  </div>
                  <div class="detail" style="color: #9c0410">
                    <p style="color: #9c0410">총 결제금액</p>
                    <div>
                      <h4>{{ formatPrice(order.ORDERS_TOTAL) }}</h4>
                    </div>
                  </div>
                  <div class="detail">
                    <p>적립 포인트</p>
                    <div>
                      <h4>{{ formatPrice(order.ORDERS_TOTAL * 0.03) }}</h4>
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </div>
          <div class="btn">
            <router-link to="/mypage/myOrderList">
              <button type="button" class="listbtn">목록</button>
            </router-link>
            <!-- <button v-if="[0, 1, 2].includes(order.ORDERS_STATUS)" type="button" @click="cancel()" class="canclebtn">주문
              취소</button> -->
            <h2 v-if="order.ORDERS_STATUS === 3" style="color: #9c0410;">구매 확정 완료</h2>
            <h2 v-if="order.ORDERS_STATUS === 9" style="color: #9c0410;">주문 취소 완료</h2>
          </div>
        </section>
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
      order: {},
      deli: {},
      orderDList: [],
      orderinfo: {},
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  created() {
    this.getUser();
    this.getUserOrder();
    this.getUserDeli();
    this.getOrder();
    this.getDeli();
    this.getOrderDetail();
  },
  mounted() {
    if (this.user.user_no == '') {
      alert('로그인해주세요');
      this.$router.push({ path: '/login' });
    }
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
    async getOrder() {
      try {
        const orderno = this.$route.params.orderno;
        const response = await axios.get(`http://localhost:3000/goods/orderODetail/${orderno}`);
        this.order = response.data[0];
      } catch (error) {
        console.error(error);
      }
    },
    async getDeli() {
      try {
        const orderno = this.$route.params.orderno;
        const response = await axios.get(`http://localhost:3000/goods/delivery/${orderno}`);
        this.deli = response.data[0];
      } catch (error) {
        console.error(error);
      }
    },
    async getOrderDetail() {
      try {
        const orderno = this.$route.params.orderno;
        const response = await axios.get(`http://localhost:3000/goods/orderDDetail/${orderno}`);
        this.orderDList = response.data;
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
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
      };
      const formattedDateTime = date.toLocaleString('ko-KR', options);
      return formattedDateTime;
    },
    cancel() {
      const ORDER_DC = this.order.ORDERS_DISCOUNT || 0;
      const goods = this.orderDList.map((orderD) => ({
        goods_cnt: orderD.ORDER_GOODS_CNT,
        goods_no: orderD.GOODS_NO,
      }));
      this.$swal({
        title: '구매취소하시겠습니까?',
        showDenyButton: true,
        confirmButtonText: '확인',
        denyButtonText: `취소`,
      }).then(result => {
        if (result.value) {
          axios({
            url: "http://localhost:3000/goods/admin/updateStatus",
            method: "POST",
            data: {
              status: 9,
              orderTradeNos: this.$route.params.orderno
            },
          }).then(() => {
            this.$swal('취소되었습니다')
              .then(() => {
                axios.post(`http://localhost:3000/goods/orderPointRollback/${this.user.user_no}/${ORDER_DC}`)
                  .then(() => {
                    axios.post("http://localhost:3000/goods/goodsRollback", goods)
                      .then(() => {
                        location.href = "http://localhost:8080/mypage/MyOrderList";
                      })
                      .catch(error => {
                        console.error(error);
                      });
                  })
                  .catch(error => {
                    console.error(error);
                  });
              })
              .catch(error => {
                console.error(error);
              });
          });
        }
      });
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

/*주문 상세내역 부분*/

section {
  float: left;
  margin-left: 150px;
}

.myinfo {
  /* margin: 0 auto; */
  margin-top: 30px;
  position: relative;
  /* background-color: #fff2c9; */
}

.container-wrapper {
  border: 1.5px solid #9c0410;
  border-radius: 20px;
  padding: 15px;
  margin-top: 20px;
}

.datetime {
  width: 80%;
  text-align: center;
  margin: 0 auto;
  padding: 30px 0 20px 0;
  /* border: 1px solid red; */
}

.orderinfo {
  border-radius: 4px;
  margin-bottom: 60px;
  padding: 10px 8vw;
}

.my p {
  width: 150px;
  font-size: 1rem;
  display: inline-block;
  vertical-align: middle;
  padding: 2px;
  margin: 0px 60px 16px 0px;
  /* border: 1px solid red; */
}


.my .detail {
  display: flex;
  margin-bottom: 10px;
}

.my .detail h4 {
  max-width: 300px;
  font-size: 20px;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.detail .de h4 {
  margin-bottom: 10px;
}

/*주문 상품 정보*/

.goodsimg img,
h4 {
  margin-bottom: 10px;
}

.goodsimg img {
  border-radius: 15px;
}

/*주문 취소 및 목록 버튼*/

.btn {
  text-align: center;
  margin: 60px 0;
}

.listbtn {
  width: 100px;
  height: 40px;
  background-color: #fff;
  border: 2px solid #000;
  border-radius: 15px;
  margin-right: 20px;
  font-size: large
}

.canclebtn {
  width: 100px;
  height: 40px;
  background-color: #fff;
  border: 2px solid #C52922;
  border-radius: 15px;
  margin-right: 20px;
  font-size: large
}
</style>