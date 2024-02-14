<template>
  <div class="wrapper">
    <div class="box_section" style="
            padding: 40px 30px 50px 30px;
            margin-top: 30px;
            margin-bottom: 50px;
          ">
      <!-- 결제 UI -->
      <div id="payment-method">{{ loadPaymentUI() }}</div>
      <!-- 이용약관 UI -->
      <div id="agreement"></div>
      <!-- 쿠폰 체크박스 -->
      <div style="padding-left: 25px">
        <div class="checkable typography--p">
          <!-- <label for="coupon-box" class="checkable__label typography--regular"><input id="coupon-box"//결제전용쿠폰
              class="checkable__input" type="checkbox" aria-checked="true" @change="updateAmount" /><span
              class="checkable__label-text">5,000원 쿠폰 적용</span></label> -->
        </div>
      </div>
      <!-- 결제하기 버튼 -->
      <div class="result wrapper">
        <button class="button" id="payment-button" style="margin-top: 30px" @click="payNow(updatePoint())">
          {{ this.orders.orders_total }}원 결제하기
        </button>
          <button class="button" @click="getOrders()" id="cancle-button" style="margin-top: 30px; margin-left: 10px;">
            취소하기
          </button>
      </div>
    </div>
  </div>
</template>

<script>
import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import axios from 'axios';

export default {

  name: 'orderChecout',
  data() {
    return {
      loginUser: {},
      orders:{},
      amount: null,
      paymentWidget: null,
      paymentMethodWidget: null,
    }
  },
  computed: {
  user() {
    return this.$store.state.user;
  },
},

created() {
  this.getUser();
  this.getOrders();
},

  methods: {
    async getUser() {  //유저정보 들고오기
    try {
      const response = await axios.get(`http://localhost:3000/mypage/mypage/${this.user.user_no}`);
      this.loginUser = response.data[0];
    } catch (error) {
      console.error(error);
      console.log(this.loginUser);
    }
  },
  async getOrders() { //상품정보 들고오기
          try {
              const response = await axios.get(`http://localhost:3000/goods/orderPayGet`);
              this.orders = response.data;
              this.amount = this.orders.orders_total.toString();
          } catch (error) {
              console.error(error);
          }
          console.log(this.orders);
          console.log(this.orders.orders_total);
          console.log(this.amount);
      },
    generateRandomString() {
      return window.btoa(Math.random()).slice(0, 20);
    },
    async loadPaymentUI() {
      // ------  결제위젯 초기화 ------
      // TODO: clientKey는 개발자센터의 결제위젯 연동 키 > 클라이언트 키로 바꾸세요.
      // TODO: 구매자의 고유 아이디를 불러와서 customerKey로 설정하세요. 이메일・전화번호와 같이 유추가 가능한 값은 안전하지 않습니다.
      // @docs https://docs.tosspayments.com/reference/widget-sdk#sdk-설치-및-초기화
      const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
      const customerKey = this.generateRandomString();
      this.paymentWidget = await loadPaymentWidget(clientKey, customerKey)

      // ------  결제 UI 렌더링 ------
      // @docs https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods선택자-결제-금액-옵션
      this.paymentMethodWidget = this.paymentWidget.renderPaymentMethods(
        "#payment-method",
        { value: this.amount },
        // 렌더링하고 싶은 결제 UI의 variantKey
        // 결제 수단 및 스타일이 다른 멀티 UI를 직접 만들고 싶다면 계약이 필요해요.
        // @docs https://docs.tosspayments.com/guides/payment-widget/admin#멀티-결제-ui
        { variantKey: "DEFAULT" }
      );

      // ------  이용약관 UI 렌더링 ------
      // @docs https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자-옵션
      this.paymentWidget.renderAgreement("#agreement", { variantKey: "AGREEMENT" });
    },
    goToMain(){//뒷페이지로 보내드립니다
    this.$router.push('/order/orderCheckout');
  },
    // updateAmount(event) {
    //   if (event.target.checked) {
    //     this.paymentMethodWidget.updateAmount(this.amount - 5000);
    //   } else {
    //     this.paymentMethodWidget.updateAmount(this.amount);
    //   }
    // },
    payNow() {
      // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
      // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
      this.paymentWidget.requestPayment({
        orderId: this.generateRandomString(),
        orderName: '약품',
        successUrl: window.location.origin + "/order/orderSuccess",
        failUrl: window.location.origin + "/order/orderFail",
        customerEmail: this.loginUser.user_email,
        customerName: this.loginUser.user_name,
        customerMobilePhone: this.loginUser.phone,
      });
    },
    async updatePoint() {
      try {
        const response = await axios.post(`http://localhost:3000/mypage/calPoint/${this.user.user_no}`, {
          
        });
        this.loginUser = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  }
}

</script>
<style scoped>
body {
  background-image: url('https://static.toss.im/ml-illust/img-back_005.jpg');
}

.p {
  padding: 0;
  margin: 0;
  font-family: Toss Product Sans, -apple-system, BlinkMacSystemFont,
    Bazier Square, Noto Sans KR, Segoe UI, Apple SD Gothic Neo, Roboto,
    Helvetica Neue, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji,
    Segoe UI Symbol, Noto Color Emoji;
  color: #4e5968;
  word-break: keep-all;
  word-wrap: break-word;
}

.h4 {
  font-size: 20px;
  font-weight: 700;
  color: #333D4B;
}

.wrapper {
  max-width: 800px;
  margin: 0 auto;
}

.button {
  color: #f9fafb;
  background-color: #3182f6;
  margin: 0;
  font-size: 15px;
  font-weight: 400;
  line-height: 18px;
  white-space: nowrap;
  text-align: center;
  /* vertical-align: middle; */
  cursor: pointer;
  border: 0 solid transparent;
  user-select: none;
  transition: background 0.2s ease, color 0.1s ease;
  text-decoration: none;
  border-radius: 7px;
  padding: 11px 16px;
}

.button:hover {
  color: #fff;
  background-color: #1b64da;
}

.title {
  margin: 0 0 4px;
  font-size: 24px;
  font-weight: 600;
  color: #4e5968;
}

.result {
  flex-direction: column;
  align-items: center;
  text-align: center;
  text-wrap: balance;
}

.box_section {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgb(0 0 0 / 1%), 0 6px 6px rgb(0 0 0 / 6%);
  padding: 40px 30px 50px 30px;
  margin-top: 30px;
  margin-bottom: 50px;
  color: #333D4B
}

:root {
  --checkable-size: 20px;
  --checkable-input-top: 3px;
  --checkable-input-left: 5px;
  --checkable-input-width: 14px;
  --checkable-input-height: 10px;
  --checkable-input-svg: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.343 4.574l4.243 4.243 7.07-7.071' fill='transparent' stroke-width='2' stroke='%23FFF' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  --checkable-label-text-padding: 8px;
  --indeterminate-checkable-input-top: 7px;
  --indeterminate-checkable-input-left: 5px;
  --indeterminate-checkable-input-width: 14px
}

:root .checkable--small {
  --checkable-size: 20px;
  --checkable-input-top: 2px;
  --checkable-input-left: 4px;
  --checkable-input-width: 12px;
  --checkable-input-height: 9px;
  --checkable-input-svg: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.286 3.645l3.536 3.536 5.892-5.893' fill='transparent' stroke-width='2' stroke='%23FFF' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  --indeterminate-checkable-input-top: 5px;
  --indeterminate-checkable-input-left: 4px;
  --indeterminate-checkable-input-width: 12px
}

.checkable {
  position: relative;
  display: flex
}

.checkable+.checkable {
  margin-top: 12px
}

.checkable--inline {
  display: inline-block
}

.checkable--inline+.checkable--inline {
  margin-top: 0;
  margin-left: 18px
}

.checkable__label {
  display: inline-block;
  max-width: 100%;
  min-height: 20px;
  min-height: var(--checkable-size);
  line-height: 1.6;
  padding-left: 20px;
  padding-left: var(--checkable-size);
  margin-bottom: 0;
  padding-top: 0;
  padding-bottom: 0;
  color: #4e5968;
  color: var(--grey700);
  cursor: pointer
}

.checkable__input {
  position: absolute;
  margin: 0 0 0 -20px;
  margin: 0 0 0 calc(var(--checkable-size)*-1);
  top: 4px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  cursor: pointer
}

.checkable__input:after,
.checkable__input:before {
  content: "";
  position: absolute
}

.checkable__input:before {
  top: -4px;
  left: 0;
  width: 20px;
  width: var(--checkable-size);
  height: 20px;
  height: var(--checkable-size);
  border: 2px solid #d1d6db;
  border: 2px solid #d1d6db;
  background-color: #fff;
  background-color: white;
  transition: border-color .1s ease, background-color .1s ease
}

.checkable__input:after {
  opacity: 0;
  transition: opacity .1s ease;
  top: 3px;
  top: var(--checkable-input-top);
  left: 5px;
  left: var(--checkable-input-left);
  width: 14px;
  width: var(--checkable-input-width);
  height: 10px;
  height: var(--checkable-input-height);
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.343 4.574l4.243 4.243 7.07-7.071' fill='transparent' stroke-width='2' stroke='%23FFF' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-image: var(--checkable-input-svg);
  background-repeat: no-repeat
}

.checkable__input[type=checkbox]:indeterminate:after {
  top: 7px;
  top: var(--indeterminate-checkable-input-top);
  left: 5px;
  left: var(--indeterminate-checkable-input-left);
  width: 14px;
  width: var(--indeterminate-checkable-input-width);
  height: 0;
  border: 1px solid #fff;
  border: 1px solid var(--white);
  border-radius: 1px;
  transform: rotate(0)
}

.checkable__input:focus {
  outline: 0
}

.checkable__input:focus:before,
.checkable__input:hover:before {
  background-color: #e8f3ff;
  background-color: #e8f3ff;
  border-color: #3182f6;
  border-color: #3182f6
}

.checkable__input:checked:before,
.checkable__input[type=checkbox]:indeterminate:before {
  border-color: #3182f6;
  border-color: #3182f6;
  background-color: #3182f6;
  background-color: #3182f6
}

.checkable__input:checked:after,
.checkable__input[type=checkbox]:indeterminate:after {
  opacity: 1
}

.checkable__input:disabled:before {
  background-color: #f2f4f6;
  background-color: var(--grey100);
  border-color: rgba(0, 23, 51, .02);
  border-color: var(--greyOpacity50)
}

.checkable__input:disabled:checked:before,
.checkable__input:disabled[type=checkbox]:indeterminate:before {
  background-color: #e5e8eb;
  background-color: var(--grey200);
  border-color: #e5e8eb;
  border-color: var(--grey200)
}

.checkable__input[type=checkbox]:before {
  border-radius: 6px
}

.checkable__input[type=radio]:before {
  border-radius: 12px
}

.checkable__label-text {
  display: inline-block;
  padding-left: 13px;
  color: #4e5968;

  /* padding-left: var(--checkable-label-text-padding) */
}

.checkable--disabled>.checkable__input {
  cursor: not-allowed
}

.checkable--disabled>.checkable__label {
  color: #b0b8c1;
  color: var(--grey400);
  cursor: not-allowed
}

.checkable--read-only {
  pointer-events: none
}
</style>