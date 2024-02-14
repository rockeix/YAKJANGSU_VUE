<template>
  <div class="app-container">
    <div class="con">
      <main class="container">
        <h2>주문결제</h2> <br>
        <div class="container-wrapper">
          <div class="container">
            <h3><strong>주문정보</strong></h3>
            <hr><br>
            <div class="ordergoods" v-for="(row, rowIndex) in cart" :key="rowIndex">
              <div style="margin-right: 30px;">
                <img width="80" :src="row.GOODS_IMG? require(`../../../node-back/uploads/uploadGoods/${row.GOODS_IMG}`) : require(`../uploads/1-0.jpg`)" alt="상품사진" style="width:150px">
              </div>
              <div class="orderinfo">
                <strong>{{ row.GOODS_NAME.split(' ')[0] }}</strong><br>
                <p>{{row.GOODS_NAME}}</p>
                <span class=" price">가격 : {{row.GOODS_PRICE}} / 개당</span><br>
                <span class=" price">수량 : {{row.CART_GOODS_CNT}} 개</span>
              </div>
              <div class="totalprice">
                <strong style="font-size:large">총 {{formatPrice(row.GOODS_PRICE * row.CART_GOODS_CNT)}} 원</strong>
              </div>
            </div>
            <br><br>
            <h3><strong>구매자 정보</strong></h3>
            <hr><br>

            <div class="form1">
              <label for="userNick" class="form-label"><strong>주문자 성명</strong></label>
              <input type="text" id="userNick" class="form-control" v-model="loginUser.user_name" />
            </div>

            <div class="form1">
              <label for="userMemo" class="form-label"><strong>이메일</strong></label>
              <input type="email" class="form-control"  v-model="loginUser.user_email"/>
            </div>

            <div class="form1">
              <label for="userMobile" class="form-label"><strong>핸드폰번호</strong></label>
              <input type="text" id="userMobile" class="form-control" v-model=loginUser.user_phone />
            </div>

            <br><br>

            <h3><strong>배송정보</strong></h3>
            <hr><br>

            <div class="form1">
              <label for="userNick" class="form-label"><strong>수령인 성명</strong></label>
              <input type="text" id="userNick" class="form-control" v-model="orderDeli.deliName" />
            </div>

            <div class="form1">
              <label for="userMobile" class="form-label"><strong>핸드폰번호</strong></label>
              <input type="text" id="userMobile" class="form-control" @keyup="getPhoneMask(orderDeli.deliPhone)" v-model="orderDeli.deliPhone" />
            </div>

            <div class="form1">
              <label class="form-label"><strong>우편번호</strong></label>
              <div class="input-group" style="display:flex;">
                <input type="text" class="form-control" style="width: 250px;" placeholder="우편번호" v-model="orderDeli.deliZipcode"/>
                <button style="margin-left: 30px;" class="zipcode" type="button" v-on:click="zipload">우편번호 찾기</button>
              </div>
            </div>

            <div class="form1">
              <label class="form-label"><strong>상세주소</strong></label>

              <input type="text" class="form-control" placeholder="기본 주소" v-model="orderDeli.deliAdr1"/>
            </div>

            <div class="form1">
              <label class="form-label"><strong></strong></label>
              <input type="text" class="form-control" placeholder="상세 주소" v-model="orderDeli.deliAdr2"/>
            </div>
            <div class="form1">
              <label for="userMemo" class="form-label"><strong>배송요청사항</strong></label>
              <input type="text" id="userMemo" class="form-control" placeholder="10자 이내" v-model="orderDeli.deliMemo"/>
            </div>

            <br><br>

            <h3><strong>포인트 사용</strong></h3>
            <hr><br>
            <div class="form1">
              <label for="userMemo" class="form-label"><strong> 포인트 조회</strong></label>
              <input type="text" class="form-control" placeholder="3천원 이상 사용가능" style="width:250px" v-model="this.inputUsePoint"/>
              <button style="margin-left:30px;" class="zipcode" type="button" @click="pointUse()" >사용하기</button>
            </div>
            <div class="form1">
              <label for="userMemo" class="form-label"><strong></strong></label>
              &nbsp;&nbsp;&nbsp;보유포인트 : {{loginUser.user_point}}원
            </div>

            <br><br><br>

            <h3> <strong>최종 결제금액</strong> </h3>
            <hr><br>
            <table class="table" style="text-align: left;">
              <tbody>
              <tr style="height: 30px;">
                <th style="width: 55%;" scope="row" class="table-active">상품 금액</th>
                <td colspan="2"><strong>총 {{goodsPrice()}} 원</strong></td>
              </tr>
              <tr style="height: 30px;">
                <th scope="row" class="table-active">배송비</th>
                <td colspan="2"><strong>무료</strong></td>
              </tr>
              <tr style="height: 30px;">
                <th scope="row" class="table-active">사용 포인트</th>
                <td colspan="2"><strong>{{this.usePoint}} 원</strong></td>
              </tr>
              <tr style="height: 30px;">
                <th scope="row" class="table-active">총 결제 금액</th>
                <td colspan="2"><strong>&nbsp;총 {{formatPrice(totalPrice())}} 원</strong></td>
              </tr>
              </tbody>
            </table>
            <br>
          </div>
        </div>

        <div style="margin-top: 50px; margin-left: 38%;">
          <button type="submit" class="paybtn" @click="requestPay">결제</button>
          <router-link to="/cart"><button type="reset" class="paycanclebtn">취소</button></router-link>
        </div>

      </main>
    </div>
  </div>
</template>
<script>

import axios from "axios";

export default {
  computed: {
    user() {
      return this.$store.state.user;
    },
  },

  created() {
    this.getUser();
    // axios.get('http://localhost:3000/users/cartInfo/'+this.user.user_no)
    //   .then((response) => {
    //     this.rowList = response.data;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
    this.getCart();
  },
  data() {
    return {
      // num: 0,
      loginUser: {},
      orderDeli: {
        deliName: '',
        deliPhone: '',
        deliZipcode: '',
        deliAdr1: '',
        deliAdr2: '',
        deliMemo: '',

        zipinput: false,
      },
      rowList: [],
      cart : [],
      inputUsePoint: 0,
      usePoint: 0,
      myPoint: 0,
      defaultZero:0,
    };
  },

  methods: {
    async pointUse() {
      if(this.inputUsePoint > this.loginUser.user_point) {
        return this.$swal('보유 포인트보다 많습니다.')
      } else if (this.inputUsePoint < 3000) {
        return this.$swal('3천원 이상 사용가능합니다.')
      }

      this.usePoint = this.inputUsePoint;
      this.myPoint = this.loginUser.user_point - this.usePoint;
      console.log(this.myPoint);
    },
    getDeliveryFee() {
      if (this.goodsPrice() >= 50000) {
        return 0
      } else {
        return 2500
      }
    },
    goodsPrice () {
      let price = 0;
      for (let i = 0; i < this.cart.length; i++) {
        price = price + (this.cart[i].CART_GOODS_CNT * this.cart[i].GOODS_PRICE) //- this.usedPoint() + this.getDeliveryFee()
      }
      return price ;
    },
    totalPrice () {
      let price = 0;
      for (let i = 0; i < this.cart.length; i++) {
        price = price + (this.cart[i].CART_GOODS_CNT * this.cart[i].GOODS_PRICE) //- this.usedPoint() + this.getDeliveryFee()
      }
+ this.getDeliveryFee()
      price = price - this.usePoint ;
      return price ;
    },
    formatPrice(price) {
      return new Intl.NumberFormat().format(price);
    },
    test() {
      console.log(this.loginUser);
    },
    async getCart() {
      try {
        const response = await axios.get(`http://localhost:3000/goods/cartInfo/${this.user.user_no}`);
        console.log(response.data.results);
        this.cart = response.data.results;
      } catch (error) {
        console.error(error);
      }
      console.log(this.cart);
    },
    async getUser() {
      try {
        const response = await axios.get(`http://localhost:3000/mypage/mypage/${this.user.user_no}`);
        this.loginUser = response.data[0];
      } catch (error) {
        console.error(error);
      }
    },
    async requestPay() {
  let cartGoodsCnt = this.cart.map(item => item.CART_GOODS_CNT);
  let cartName = this.cart.map(item => item.GOODS_NAME);
  let cartImg = this.cart.map(item => item.GOODS_IMG);
  let cartNo = this.cart.map(item => item.GOODS_NO);

  // orderPay
  try {
    await axios({
      url: `http://localhost:3000/goods/orderPay`,
      method: "POST",
      data: {
        orders_user_no: this.user.user_no,
        orders_goods_cnt: this.totalPrice(),
        orders_amt: this.goodsPrice(),
        orders_total: this.totalPrice(),
        orders_delivery: this.defaultZero,
        orders_payment: this.defaultZero,
        orders_discount: this.usePoint,
        orders_type: this.defaultZero,
        orders_deli_no: this.defaultZero,
      },
    });
  } catch (error) {
    console.log(error);
    this.$swal('서버오류');
  }
  
  // orderDeliPay
  try {
    await axios({
      url: `http://localhost:3000/goods/orderDeliPay`,
      method: "POST",
      data: {
        ordersNo: this.delino,
        deliName: this.orderDeli.deliName,
        deliPhone: this.orderDeli.deliPhone,
        deliZipcode: this.orderDeli.deliZipcode,
        deliAdr1: this.orderDeli.deliAdr1,
        deliAdr2: this.orderDeli.deliAdr2,
        deliMemo: this.orderDeli.deliMemo,
        user_no: this.user.user_no
      },
    });
  } catch (error) {
    console.log(error);
    this.$swal('서버오류');
  }

  // orderDetailPay
  for (let i = 0; i < cartNo.length; i++) {
    try {
      await axios({
        url: `http://localhost:3000/goods/orderDetailPay`,
        method: "POST",
        data: {
          ordersdetail_orders_no: this.defaultZero,
          ordersdetail_user_no: this.user.user_no,
          ordersdetail_goods_no: cartNo[i],
          ordersdetail_orders_goods_name: cartName[i],
          ordersdetail_orders_goods_price: this.totalPrice(),
          ordersdetail_orders_goods_img: cartImg[i],
          ordersdetail_orders_goods_cnt: cartGoodsCnt[i],
          ordersdetail_deli_no: this.defaultZero,
        },
      });
      if (i === cartNo.length - 1) {
      this.$swal('결제화면으로 이동합니다.');
      this.$router.push('/order/orderCheckout');
    }
    } catch (error) {
      console.log(error);
      this.$swal('서버오류');
    }
  }
},
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
          this.orderDeli.deliZipcode = data.zonecode;
          this.orderDeli.deliAdr1 = addr;
          this.orderDeli.deliAdr2 = extraAddr;
          this.zipinput = true;
        }
      }).open();
    },
    getPhoneMask(val) {  // xxx-xxx-xxx 의 -붙이기
    let res = this.getMask(val)
    this.orderDeli.deliPhone = res
    res = this.orderDeli.deliPhone.replace(/[^0-9]/g, '')
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
    //how to get data from checked items?
    // this.$store.state.cartList.forEach((item) => {
    //   console.log(item);
    //   if (item.checked) {
    //     this.rowList.push(item);
    //   }
    // });
  }
}
</script>
<style scoped>
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


* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
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

.cate-list {
  font-family: 'SejonghospitalBold';
}

.cate-header {
  display: flex;
  justify-content: space-between;
}

hr {
  border: 2px solid #9c0410;
}

.container-wrapper {
  border: 1.5px solid #C52922;
  border-radius: 20px;
  padding: 20px;
  margin-top: 30px;
}

.container {
  max-width: 1000px;
  width: 80%;
  margin: auto;
  padding-top: 30px;
  padding-bottom: 30px;
  font-family: 'SejonghospitalBold';
}

.container h2 {
  text-align: center;
}

.ordergoods {
  display: flex;
}

.orderinfo {
  width: 60%;
}

.form1 .form-label {
  width: 20%;
}

.paycanclebtn {
  width: 80px;
  height: 40px;
  background-color: #fff;
  border: 2px solid black;
  border-radius: 15px;
  margin-right: 20px;
}

.paybtn {
  width: 80px;
  height: 40px;
  background-color: #fff;
  border: 2px solid #C52922;
  border-radius: 15px;
  margin-right: 20px;
}

.zipcode {
  width: 100px;
  height: 40px;
  border-radius: 15px;
  background-color: #fff;
  border: 2px solid black;
}

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
  width: 90%;
}

.form1 input {
  display: flex;
  align-items: center;
  width: 50%;
  height: 40px;
  font-size: 1rem;
  font-family: 'SejonghospitalBold';
  padding-left: 20px;
  color: rgb(137, 137, 137);
  border: 2px solid rgb(221, 221, 221);
  border-radius: 10px;
}

.form-label {
  margin-top: 12px;
}

.form2 {
  display: flex;
  height: 60px;
}

/* 우편번호 */
.form2 .te2 {
  width: 260px;
  padding: 14px 0;
  margin-right: 60px;
}

.form2 .in3 input {
  display: flex;
  align-items: center;
  width: 26%;
  height: 40px;
  font-size: 1rem;
  font-family: 'SejonghospitalBold';
  padding-left: 20px;
  margin: 0 10px 0 20px;
  color: rgb(137, 137, 137);
  border: 2px solid rgb(221, 221, 221);
  border-radius: 10px;
}

.form2 .in3 {
  display: flex;
  width: 330%;
  height: 40px;
}

.form2 .btn {
  height: 42px;
  width: 110px;
  position: relative;
  padding: 8px 10px;
  font-size: 14px;
  font-family: 'SejonghospitalBold';
  color: rgb(123, 123, 123);
  border: 2px solid rgb(221, 221, 221);
  border-radius: 10px;
  cursor: pointer;
  margin-top: 0px;
  margin-left: 10px;
}

.form3 {
  display: grid;
  align-items: center;
  position: relative;
  height: auto;
  margin: 0px 0px 20px 0px;
  padding: 0 0 0px 145px;
}

.form3 .in2 {
  display: block;
  align-items: center;
  width: 50%;
  height: 40px;
  font-size: 1rem;
  padding-left: 20px;
  font-family: 'SejonghospitalBold';
  color: rgb(137, 137, 137);
  border: 2px solid rgb(221, 221, 221);
  border-radius: 10px;
  margin-right: 0px;
}

</style>