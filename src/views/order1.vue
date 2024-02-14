<template>
    <div class="app-container">
        <div class="con">
            <main class="container">
                <h2>주문결제</h2> <br>
                <div class="container-wrapper">
                    <div class="container">
                        <h3><strong>주문정보</strong></h3>
                        <hr><br>
                        <div>
                            <div class="ordergoods">
                                <div  style="margin-right: 30px;">
                                    <img :src="goods.goods_img ? require(`../../../node-back/uploads/uploadGoods/${goods.goods_img}`) : '/goodsempty.jpg'"
                        alt="상품 이미지" width="200" height="200">
                                </div>
                                <div class="orderinfo">
                                    <strong>{{ goods.goods_name }}</strong><br>
                                    수량: {{ this.$route.params.quantity }}개
                                </div>
                                <div class="totalprice">
                                    <strong style="font-size:large">총 {{ formatPrice(totalPrice) }}</strong>
                                </div>
                            </div>
                        </div>
  
                        <br><br>
                        <h3><strong>구매자 정보</strong></h3>
                        <hr><br>
  
                        <div class="form1">
                            <label for="userNick" class="form-label"><strong>주문자 성명</strong></label>
                            <input type="name" v-model="loginUser.user_name" class="form-control"/>
                        </div>
  
                        <div class="form1">
                            <label for="userMemo" class="form-label"><strong>이메일</strong></label>
                            <input type="email" v-model="loginUser.user_email" class="form-control"/>
                        </div>
  
                        <div class="form1">
                            <label for="userMobile" class="form-label"><strong>핸드폰번호</strong></label>
                            <input type="phone" @keyup="getPhoneMask(this.loginUser.user_phone)" v-model="this.loginUser.user_phone" class="form-control"/>
                        </div>
  
                        <br><br>
  
                        <h3><strong>배송정보</strong></h3>
                        <hr><br>
  
                        <div class="form1">
                            <label for="userNick" class="form-label"><strong>수령인 성명</strong></label>
                            <input type="text" v-model="orderDeli.deliName" class="form-control" />
                        </div>
  
                        <div class="form1">
                            <label for="userMobile" class="form-label"><strong>핸드폰번호</strong></label>
                            <input type="phone" @keyup="getPhoneMask2(orderDeli.deliPhone)" v-model="orderDeli.deliPhone" class="form-control" />
                        </div>
  
                        <div class="form1">
                            <label class="form-label"><strong>우편번호</strong></label>
                            <div class="input-group" style="display:flex;">
                                <input type="text" v-model="orderDeli.deliZipcode" class="form-control" style="width: 250px;" placeholder="우편번호" />
                                <button style="margin-left: 30px;" class="zipcode"  v-on:click="zipload" type="button">우편번호 찾기</button>
                            </div>
                        </div>
  
                        <div class="form1">
                            <label class="form-label"><strong>상세주소</strong></label>
  
                            <input type="text" v-model="orderDeli.deliAdr1" class="form-control" placeholder="기본 주소" />
                        </div>
  
                        <div class="form1">
                            <label class="form-label"><strong></strong></label>
                            <input type="text" v-model="orderDeli.deliAdr2" class="form-control" placeholder="상세 주소" />
                        </div>
                        <div class="form1">
                            <label for="userMemo" class="form-label"><strong>배송요청사항</strong></label>
                            <input type="text" v-model="orderDeli.deliMemo" class="form-control" placeholder="10자 이내" />
                        </div>
  
                        <br><br>
  
                        <h3><strong>포인트 사용</strong></h3>
                        <hr><br>
                        <div class="form1">
                            <label for="userMemo" class="form-label"><strong> 포인트 조회</strong></label>
                            <input type="text" v-model="pointInput" class="form-control" placeholder="3천원 이상 사용가능" @input="handlePointInput" style="width:250px" />
                            <button style="margin-left:30px;" class="zipcode" @click="pointUse">사용하기</button>
                        </div>
                        <div class="form1">
                            <label for="userMemo" class="form-label"><strong></strong></label>
                            &nbsp;&nbsp;&nbsp;보유포인트 : {{loginUser.user_point}}
                        </div>
  
                        <br><br><br>
  
                        <h3> <strong>최종 결제금액</strong> </h3>
                        <hr><br>
                        <table class="table" style="text-align: left;">
                            <tbody>
                                <tr style="height: 30px;">
                                    <th style="width: 55%;" scope="row" class="table-active">상품 금액</th>
                                    <td colspan="2"><strong>{{ formatPrice(totalPrice) }}</strong></td>
                                </tr>
                                <tr style="height: 30px;">
                                    <th scope="row" class="table-active">배송비</th>
                                    <td colspan="2"><strong>{{ formatPrice(getDeliveryFee()) }}</strong></td>
                                </tr>
                                <tr style="height: 30px;">
                                    <th scope="row" class="table-active">사용 포인트</th>
                                    <td colspan="2"><strong>{{ formatPrice(pointUsed) }}</strong></td>
                                </tr>
                                <tr style="height: 30px;">
                                    <th scope="row" class="table-active">적립금</th>
                                    <td colspan="2"><strong>{{ formatPrice(totalPrice * 0.03) }}</strong></td>
                                </tr>
                                <tr style="height: 30px;">
                                    <th scope="row" class="table-active">구매시 예상 재고</th>
                                    <td colspan="2"><strong>{{ goodsCnt }}</strong></td>
                                </tr>
                                <tr style="height: 30px;">
                                    <th scope="row" class="table-active">총 결제 금액</th>
                                    <td colspan="2"><strong>{{ formatPrice(getOrderTotalPrice) }}</strong></td>
                                </tr>
                            </tbody>
                        </table>
                        <br>
                    </div>
                </div>
  
                <div style="margin-top: 50px; margin-left: 38%;">
                    <button type="submit" @click=goToPay() class="paybtn">결제</button>
                    <button type="reset" @click=goToBack() class="paycanclebtn">취소</button>
                </div>
  
            </main>
        </div>
    </div>
  </template>
  <script>
  //수량감소 및 포인트차감+적립을 이 컴포넌트에서 지정후 저장, orderSuccess에서 node.js의 임시저장소에 저장된 값들을 테이블로
  import axios from 'axios';
  
  export default {
    data() {
    return {
        loginUser: {},
        goods: {},
        order: {},
        orderDeli: {
        deliName: '',
        deliPhone: '',
        deliZipcode: '',
        deliAdr1: '',
        deliAdr2: '',
        deliMemo: '',
  
        zipinput: false,
      },
        deliveryFee: 0,
        pointInput: '',
        pointUsed: 0,
        orderspay:1,
        delino:0,
        cart:{},
        defaultZero:0,
    };
  },
  computed: {
    getOrderTotalPrice() {
            if (this.$route.params.orderstype === '0') //얘들어케받음요..?
            {
                return this.$route.params.quantity * this.goods.goods_price + this.deliveryFee - this.pointUsed
            // } else if (this.$route.params.orderstype === '1') {
            //     return this.cartList.reduce((total, cart) => total + cart.totalPrice, 0);
            } else {
                return 0;
            }
        },
    totalPrice() {
      return this.$route.params.quantity * this.goods.goods_price;
    },
    goodsCnt() {
       return this.goods.goods_cnt - this.$route.params.quantity
    },
    userPoint() {
      return this.loginUser.user_point - this.pointUsed
    },
    user() {
      return this.$store.state.user;
    },
  },
  mounted() {
        if (this.user.user_no == '') {
            this.$swal("로그인 후 이용해주세요.");
            this.$router.push({ path: '/login' });
        }
    },
  created() {
    this.getUser();
    this.getGoods();
    // this.getCart();
  },
  methods: {
    async getUser() {  //유저정보 들고오기
      try {
        const response = await axios.get(`http://localhost:3000/mypage/mypage/${this.user.user_no}`);
        this.loginUser = response.data[0];
      } catch (error) {
        console.error(error);
      }
    },
    async getGoods() { //상품정보 들고오기
            try {
                const goodsno = this.$route.params.goodsno;
                const response = await axios.get(`http://localhost:3000/goods/goodsDetail/${goodsno}`);
                this.goods = response.data[0];
            } catch (error) {
                console.error(error);
            }
            console.log(this.goods);
        },
        getDeliveryFee() {
            if (this.$route.params.orderstype === '0') {  //직접결제를 사용할때 사용
                const totalPrice = this.$route.params.quantity * this.goods.goods_price;
                if (totalPrice >= 50000) {
                    this.deliveryFee = 0;
                } else {
                    this.deliveryFee = 0;
                }
            } 
            // else if (this.$route.params.orderstype === '1') {  //후에 카트주문시 사용
            //     const totalPrice = this.cartList.reduce((total, cart) => total + (cart.BASKET_GOODS_COUNT * cart.BASKET_GOODS_PRICE), 0);
            //     if (totalPrice >= 30000) {
            //         this.deliveryFee = 0;
            //     } else {
            //         this.deliveryFee = 3000;
            //     }
            // }
            return this.deliveryFee;
        },
        // totalPrice() {  computed로 넘겨서 변수값을 쉽게 받게함
        //   if (this.$route.params.orderstype === '0')
        //   {  
        //   return this.$route.params.quantity * this.goods.goods_price;
        // } else {return this.cart}
        // }
        // },
        // getOrderTotalPrice() {   computed로 넘겨서 변수값을 쉽게 받게함
        //     if (this.$route.params.orderstype === '0') //얘들어케받음요..?
        //     {
        //         return this.$route.params.quantity * this.goods.goods_price + this.deliveryFee - this.pointUsed
        //     // } else if (this.$route.params.orderstype === '1') {
        //     //     return this.cartList.reduce((total, cart) => total + cart.totalPrice, 0);
        //     } else {
        //         return this.
        //     }
        // },
        handlePointInput() {
            this.pointInput = this.pointInput.replace(/[^0-9]/g, ''); // 숫자 이외의 값 제거
        },
        pointUse() { //포인트 사용
            const inputPoint = parseInt(this.pointInput);
            let maxPoint;
  
            if (this.$route.params.orderstype === '0') {
            {
                maxPoint = this.$route.params.quantity * this.goods.goods_price + this.deliveryFee;
            }
        }
            // else if (this.$route.params.orderstype === '1') {
            //     maxPoint = this.cartList.reduce((total, cart) => total + (cart.BASKET_GOODS_COUNT * cart.BASKET_GOODS_PRICE), 0) + this.deliveryFee;
            // }
  
            if (this.loginUser.user_point >= 3000 && inputPoint <= this.loginUser.user_point && inputPoint <= maxPoint) {
                this.pointUsed = inputPoint;
                this.$swal("사용완료");
            } else if (this.loginUser.user_point < 3000) {
                this.$swal("사용할 수 있는 포인트가 부족합니다.");
            } else if (inputPoint > this.loginUser.user_point) {
                this.$swal("금액이 부족합니다.");
            } else if (inputPoint > maxPoint) {
                this.$swal("적립금 사용 가능한 금액을 초과합니다.");
            } else {
                this.$swal("금액을 정확히 입력해주세요");
            }
  
            this.pointInput = '';
            this.errorMessage = '';
        },
        zipload() {  //우편번호
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
    formatPrice(price) {  //원의 단위나누기와 원 붙이기
      if (price !== undefined) {
        const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return `${formattedPrice} 원`;
      }
      return '';
    },
    getPhoneMask(val) {  // xxx-xxx-xxx 의 -붙이기
    let res = this.getMask(val)
    this.loginUser.user_phone = res
    res = this.loginUser.user_phone.replace(/[^0-9]/g, '')
  },
  getPhoneMask2(val) {  // xxx-xxx-xxx 의 -붙이기
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
  goToBack(){//뒷페이지로 보내드립니다
    window.history.back();
    },
        //  tests() {
        //   console.log(this.$route.params.quantity);
        //   console.log(this.totalPrice);
        //   console.log(this.getOrderTotalPrice);
        //   console.log(this.deliveryFee);
        //   console.log(this.orderspay);
        //   console.log(this.pointUsed);
        //   console.log(this.$route.params.orderstype);
        //   console.log(this.delino);
        //  },
  
         async goToPay() {
          if (this.orderDeli.deliName == "" || this.orderDeli.deliName == null) {
                this.$swal("이름을 입력하세요.");
                return
            }
            if (this.orderDeli.deliPhone == "" || this.orderDeli.deliPhone == null) {
                this.$swal("전화번호를 입력하세요.");
                return
            }
            if (this.orderDeli.deliZipcode == "" || this.orderDeli.deliZipcode == null) {
                this.$swal("우편번호를 입력하세요.");
                return
            }
            if (this.orderDeli.deliAdr1 == "" || this.orderDeli.deliAdr1 == null) {
                this.$swal("집주소를 입력하세요.");
                return
            }
            if (this.orderDeli.deliAdr2 == "" || this.orderDeli.deliAdr2 == null) {
                this.$swal("상세주소를 입력하세요.");
                return
            }
            else {
          await axios({
            url: `http://localhost:3000/goods/orderPay`, //order값 임시저장
            method: "POST",
            data: {     //앞은매칭 뒤는 뷰에서 넣는 값임당
              orders_user_no: this.user.user_no,
              orders_goods_cnt: this.$route.params.quantity,
              orders_amt: this.totalPrice,
              orders_total: this.getOrderTotalPrice,
              orders_delivery: this.deliveryFee,
              orders_payment: this.orderspay,
              orders_discount: this.pointUsed,
              orders_type: this.$route.params.orderstype,
              orders_deli_no: this.delino,
            },
          })
            .then((res) => {
              console.log(res);
            })
            .catch((error) => {
              console.log(error);
              this.$swal('서버오류');
            });
            await axios({
            url: `http://localhost:3000/goods/orderDeliPay`, //deli값 임시저장
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
          })
            .then((res) => {
              console.log(res);
            })
            .catch((error) => {
              console.log(error);
              this.$swal('서버오류');
            });
            await axios({
            url: `http://localhost:3000/goods/orderGoodsPay`, //goods값 임시저장
            method: "POST",
            data: {
              goods_no: this.goods.goods_no,
              goods_cnt: this.goodsCnt,
            },
          })
            .then((res) => {
              console.log(res);
            })
            .catch((error) => {
              console.log(error);
              this.$swal('서버오류');
            });
            await axios({
            url: `http://localhost:3000/goods/orderDetailPay`, //OD값 임시저장
            method: "POST",
            data: {
              ordersdetail_orders_no: this.defaultZero,
              ordersdetail_user_no: this.user.user_no,
              ordersdetail_goods_no: this.goods.goods_no,
              ordersdetail_orders_goods_name: this.goods.goods_name,
              ordersdetail_orders_goods_price: this.getOrderTotalPrice,
              ordersdetail_orders_goods_img: this.goods.goods_img,
              ordersdetail_orders_goods_cnt: this.$route.params.quantity,
              ordersdetail_deli_no: this.delino,
            },
          })
            .then((res) => {
              console.log(res);
            })
            .catch((error) => {
              console.log(error);
              this.$swal('서버오류');
            });
            await axios({
            url: `http://localhost:3000/goods/orderGoodsPay`, //goods값 임시저장
            method: "POST",
            data: {
              goods_no: this.goods.goods_no,
              goods_cnt: this.goodsCnt,
            },
          })
            .then((res) => {
              console.log(res);
              this.$swal('결제화면으로 이동합니다.')
              this.$router.push('/order/orderCheckout')
            })
            .catch((error) => {
              console.log(error);
              this.$swal('서버오류');
            });
        }
      } 
      //    goToTable() {
      //     if (this.deli.deli_name == "" || this.deli.deli_name == null) {
      //           this.$swal("이름을 입력하세요.");
      //           return
      //       }
      //       if (this.deli.deli_phone == "" || this.deli.deli_phone == null) {
      //           this.$swal("전화번호를 입력하세요.");
      //           return
      //       }
      //       if (this.deli.deli_zipcode == "" || this.deli.deli_zipcode == null) {
      //           this.$swal("우편번호를 입력하세요.");
      //           return
      //       }
      //       if (this.deli.deli_adr1 == "" || this.deli.deli_adr1 == null) {
      //           this.$swal("집주소를 입력하세요.");
      //           return
      //       }
      //       if (this.deli.deli_adr2 == "" || this.deli.deli_adr2 == null) {
      //           this.$swal("상세주소를 입력하세요.");
      //           return
      //       }
      //       else {
      //     axios({
      //       url: `http://localhost:3000/goods/orderPro?userNo=${this.user.user_no}`, //이건 후에 백단에서 응답할 주소 입력!
      //       method: "POST",
      //       data: {
      //         orders_goods_cnt: this.$route.params.quantity,
      //         orders_amt: this.totalPrice,
      //         orders_total: this.getOrderTotalPrice,
      //         orders_delivery: this.deliveryFee,
      //         orders_payment: this.orderspay,
      //         orders_discount: this.pointUsed,
      //         orders_type: this.$route.params.orderstype,
      //         orders_deli_no: this.delino,
      //       },
      //     })
      //       .then((res) => {
      //         console.log(res);
      //       })
      //       .catch((error) => {
      //         console.log(error);
      //         this.$swal('db오류');
      //       });
      // async deliTest() { //배송테스트
      //     await axios({
      //   url: `http://localhost:3000/auth/addDeli`,
      //   method: "POST",
      //   data: {
      //     ordersNo: this.delino,
      //     deliName: this.orderDeli.deliName,
      //     deliPhone: this.orderDeli.deliPhone,
      //     deliZipcode: this.orderDeli.deliZipcode,
      //     deliAdr1: this.orderDeli.deliAdr1,
      //     deliAdr2: this.orderDeli.deliAdr2,
      //     deliMemo: this.orderDeli.deliMemo,
      //     user_no: this.user.user_no
      //   }
      // })
      //   .then((res) => {
      //     if (res.data.message === 'complete') {
      //       this.$swal('결제화면으로 이동합니다.')
      //       // this.$router.push('/order/orderCheckout')
      //     } else {
      //       this.$swal('오류가 발생했습니다.')
      //     }
      //   });
      //   },
      //   }
      // }
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