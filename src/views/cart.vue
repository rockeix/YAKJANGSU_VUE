<template>
  <div class="app-container">

    <div class="con">

      <section class="cart">
        <h1>장바구니</h1>
        <table class="cartlist">
          <!-- <form> -->
          <thead>
          <tr>
            <td style="border: none;"><input type="checkbox" v-model="selectAll" @change="checkAll()"></td>
            <td style="border: none;" colspan="2">상품정보</td>
            <td>수량</td>
            <td>상품금액</td>
            <td>배송비</td>
          </tr>
          </thead>
          <tbody>
          <tr class="cartlist_detail" v-for="(row, rowIndex) in rowList" :key="rowIndex" >
            <td><input type="checkbox" v-model="checkboxes[rowIndex]" :multiple="rowIndex" :value="rowIndex" @click="checkboxPrice"></td>
            <td style="width: 150px; margin-right: 30px;"><img :src="row.GOODS_IMG? require(`../../../node-back/uploads/uploadGoods/${row.GOODS_IMG}`) : require(`../uploads/1-0.jpg`)" alt="상품사진" @click="goToDetail(row.GOODS_NO)"></td>
            <td style="padding-left: 20px;">{{ row.GOODS_NAME.split(' ')[0] }}
              <p>{{ row.GOODS_NAME }}</p>
              <span class=" price">{{row.GOODS_PRICE}}</span>
            </td>
            <td class="cartlist_option">
              <p><button class="quantity" @click="minus(rowIndex)">-</button>
                <input class="quantity_num" type="number" v-model="row.CART_GOODS_CNT"/>
                <button class="quantity" @click="plus(rowIndex)">+</button>
              </p>
            </td>
            <td style="width: 15%;"><span class="price">{{ formatPrice(row.GOODS_PRICE * row.CART_GOODS_CNT) }}</span><br>
              <button class="cartlist_orderbtn" @click="goToOrder">주문하기</button>
            </td>
            <td>무료</td>
          </tr>

          </tbody>
          <tfoot>
          <tr>
            <td colspan="4"><button class="cartlist_optionbtn" @click="checkDelete">선택상품 삭제</button>
            </td>
            <td colspan="2" style="text-align: center;"> 총 상품 금액 &nbsp; = &nbsp;{{checkboxPrice(formatPrice(totalPrice()))}}</td>
          </tr>
          </tfoot>
          <!-- </form> -->
        </table>
        <!-- <div class="cart_mainbtns">
              <button class="cart_bigorderbtn left">쇼핑 계속하기</button>
              <button class="cart_bigorderbtn right">주문하기</button>
          </div> -->
        <div class="cart_mainbtns" style="margin-top: 5%;">
          <button style=" border: 2px solid black;" @click="goToMain">쇼핑 계속하기</button>
          <button @click="goToOrderDetail()">주문하기</button>
        </div>
      </section>

    </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      rowList: [],
      selectAll: false,
      checkboxes: [] // 체크박스의 상태를 저장

    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  created() {
    this.getOrder()
  },

  methods: {
    goToDetail(goodsno) {
      window.location.href = `http://localhost:8080/goods/goodsDetail/${goodsno}`;
    },
    async minus(index) {
      this.rowList[index].CART_GOODS_CNT--;
      if (this.rowList[index].CART_GOODS_CNT <= 0) {
        this.rowList[index].CART_GOODS_CNT = 1;
      }
      try {
        axios.get(`http://localhost:3000/goods/cartUpdate/${this.user.user_no}/${this.rowList[index].GOODS_NO}/${this.rowList[index].CART_GOODS_CNT}`)
      } catch (e) {
        console.log(e)
      }
    },
    async plus(index) {
      this.rowList[index].CART_GOODS_CNT++;
      try {
        axios.get(`http://localhost:3000/goods/cartUpdate/${this.user.user_no}/${this.rowList[index].GOODS_NO}/${this.rowList[index].CART_GOODS_CNT}`)
      } catch (e) {
        console.log(e)
      }
    },
    formatPrice(price) {
      if (price !== undefined) {
        const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return `${formattedPrice} 원`;
      }
      return "";
    },
    checkAll() {
      if (this.selectAll) {
        this.checkboxes = this.checkboxes.map(() => true);
      } else {
        this.checkboxes = this.checkboxes.map(() => false);
      }
    },
    goToOrder() {
      this.$swal('주문화면으로 이동합니다.')
      this.$router.push('/order')
    },
    goToOrderDetail() {
      if(this.checkboxes.length === 0) {
        this.$swal('선택한 상품이 없습니다.')
      }else{
        this.$swal('주문화면으로 이동합니다.')
        this.$router.push('/order')
        var i = this.rowList.length;
        while (i--) {
          if (!this.checkboxes[i]) {
            axios.get(`http://localhost:3000/goods/deleteCart/${this.user.user_no}/${this.rowList[i].GOODS_NO}/${this.rowList[i].CART_GOODS_CNT}`)
            this.rowList.splice(i, 1);
            this.checkboxes.splice(i, 1);
          }
        }
      }
    },
    goToMain() {
      this.$router.push('/')
    },
    async getOrder() {
      try {
        const response = await axios.get(`http://localhost:3000/goods/cartInfo/${this.user.user_no}`)
        this.rowList = response.data.results
      } catch (e) {
        console.log(e)
      }
    },
    totalPrice() {
      var price = 0;
      for (var i = 0; i < this.rowList.length; i++) {
        price += this.rowList[i].CART_GOODS_CNT * this.rowList[i].GOODS_PRICE
      }
      return price
    },
    checkboxPrice() {
      var price = 0;
      for (var i = 0; i < this.rowList.length; i++) {
        if (this.checkboxes[i]) {
          price += this.rowList[i].CART_GOODS_CNT * this.rowList[i].GOODS_PRICE
        }
      }
      return price
    },
    checkDelete() {
      var i = this.rowList.length;
      while (i--) {
        if (this.checkboxes[i]) {
          axios.get(`http://localhost:3000/goods/deleteCart/${this.user.user_no}/${this.rowList[i].GOODS_NO}/${this.rowList[i].CART_GOODS_CNT}`)
          this.rowList.splice(i, 1);
          this.checkboxes.splice(i, 1);
        }
      }
      this.$swal('삭제되었습니다.')
    },
    uncheckedItemDelete() {
      var i = this.rowList.length;
      while (i--) {
        if (!this.checkboxes[i]) {
          axios.get(`http://localhost:3000/goods/deleteCart/${this.user.user_no}/${this.rowList[i].GOODS_NO}/${this.rowList[i].CART_GOODS_CNT}`)
          this.rowList.splice(i, 1);
          this.checkboxes.splice(i, 1);
        }
      }
    },
  },
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
  font-family: 'SejonghospitalBold';
  font-size: 25px;
  overflow: scroll;
  display: flex;
  justify-content: center;
  background-color: var(--app-container);
}

/*body 스크롤바*/
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

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.app-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--app-container);
  transition: 0.2s;
  max-width: 1800px;
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

/*장바구니*/

img {
  display: block;
  width: 100%;
  height: 80%;
  margin-left: 15px;
}

.cart {
  width: 80%;
  margin: auto;
  padding: 30px;
}

.cart ul {
  background-color: whitesmoke;
  padding: 30px;
  margin-bottom: 50px;
  border: whitesmoke solid 1px;
  border-radius: 5px;
  font-size: 15px;
  font-weight: 300;
}

.cart ul :first-child {
  color: limegreen;
}

.cartlist {
  margin: 50px auto;
}

/* .line {
  border: 1px solid #9c9c9c;
  width: 400px;

} */

table {
  border-top: 1px solid black;
  border-collapse: collapse;
  width: 100%;
  font-size: 18px;
}

thead {
  text-align: center;
  font-weight: bold;
  border-bottom: 1px solid black;
}

/* thead td {
  border-left: 2px solid rgb(255, 255, 255);
} */

tbody {
  font-size: 15px;
  border-bottom: 1px solid rgb(85, 85, 85);

}

td {
  padding: 16px 0px
  /* border-bottom: 1px solid lightgrey; */
}

hr{
border-top: 1px solid lightgrey;
}

.cartlist_detail :nth-child(3) a {
  font-size: 15px;
}

.cartlist_detail :nth-child(3) p {
  margin-top: 6px;
  font-weight: bold;
}

.cartlist_smartstore {
  font-size: 15px;
  color: gray;
}

/*수량*/

.cartlist_option {
  text-align: center;
  padding-top: 25px;
  padding-bottom: 0px;
}

.cartlist_option p {
  margin-bottom: 25px;
  position: relative;
}

.quantity {
  width: 25px;
  height: 25px;
  font-size: 20px;
  text-align: center;
  /* border: none; */
  background-color: 1px solid #f2f2f2;
  border: 1px solid #f2f2f2;
  margin-top: -100px;
}

.quantity_num {
  width: 35px;
  height: 25px;
  font-size: 15px;
  text-align: center;
  border: 1px solid #ffffff;
  /* border-radius: 4px; */
  margin-top: -100%
}

.cartlist_optionbtn {
  background-color: #ffffff;
  color: #282828;
  font-size: 15px;
  border: 1px solid #a1a1a1;
  border-radius: 10px;
  padding: 7px;
  margin-left: 20px;
}

/* .cartlist_detail :nth-child(4),
.cartlist_detail :nth-child(5),
.cartlist_detail :nth-child(6) {
} */

.cartlist_detail :nth-child(5),
.cartlist_detail :nth-child(6) {
  text-align: center;
}

.cartlist_detail :nth-child(5) button {
  background-color: #9c0410;
  border: 1px solid #9c0410;
  color: rgb(255, 255, 255);
  border-radius: 7px;
  padding: 4px 8px;
  font-size: 11px;
  margin-top: 5px;
}

.price {
  font-weight: bold;
}

.cart_mainbtns {
  width: 420px;
  height: 200px;
  padding-top: 40px;
  display: block;
  margin: auto;
}

.cart_bigorderbtn {
  width: 200px;
  height: 50px;
  font-size: 16px;
  margin: auto;
  border-radius: 15px;
}

.cart_bigorderbtn.left {
  background-color: white;
  border: 2px lightgray solid;
}

.cart_bigorderbtn.right {
  background-color: #9c0410;
  color: white;
  border: none;
}

.form-control {
  width: 50px;
}

/*주문버튼 */
.cart_mainbtns {
  text-align: center;
  margin-bottom: 50px;
}

.cart_mainbtns button {
  width: 140px;
  height: 45px;
  color: #fff;
  background-color: #9c0410;
  border: 1px solid #9c0410;
  border-radius: 10px;
  margin-right: 10px;
  font-size: large;
}</style>