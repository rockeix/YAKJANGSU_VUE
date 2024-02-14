<template>
  <div class="app-container">
      <div class="con">
      <div class="content cate-list">
        <div class="cate-header">
          <mark><span>"{{ keyword }}" 검색 결과</span></mark>
          <p class="h6"> 총 <strong>{{ goodsList.length }}</strong> 개</p>
          <div class="dropdown">
            <div class="mo_sorting">
              <button type="button" style="border: none;"> {{ sortCase }}
              </button>
              <ul id="sort_btn">
                  <li><a class="dropdown-item" href="#" @click="sortList(0)">최근 순</a></li>
                  <li><a class="dropdown-item" href="#" @click="sortList(1)">오래된 순</a></li>
                  <li><a class="dropdown-item" href="#" @click="sortList(2)">낮은 가격</a></li>
                  <li><a class="dropdown-item" href="#" @click="sortList(3)">높은 가격</a></li>
                  <li><a class="dropdown-item" href="#" @click="sortList(4)">이름 순</a></li>
              </ul>
            </div>
          </div>
        </div>
        <hr>
        <div class="s1" v-for="(row, rowIndex) in rowList" :key="rowIndex" style="height: 210px;">
          <div class="s2" v-for="(goods, index) in row" :key="index" >
            <div class="box">
              <a class="imgSpace" :href="'http://localhost:8080/goods/goodsDetail/' + goods.goods_no">
                <img :src="goods.goods_img ? require(`../../../node-back/uploads/uploadGoods/${goods.goods_img}`) : '/goodsempty.jpg'"
              alt="상품 이미지" @click="goToDetail(goods.goods_no)" style="width: 100%; height: 230px; padding-right: 30px;">
                <p class="card-text align-left goods-name">{{ goods.goods_name }}</p>
                <p class="card-text align-left goods-price" style="color: black"> {{ formatPrice(goods.goods_price) }} </p>
                <!-- <p class="card-text align-left" style="margin: 0;">
                  <span style="color: gray">#{{ goods.goods_tag1 }}</span>
                  <span v-if="goods.goods_tag2 != ''" style="color: gray">&nbsp;#{{ goods.goods_tag2 }}</span>
                  <span v-if="goods.goods_tag3 != ''" style="color: gray">&nbsp;#{{ goods.goods_tag3 }}</span>
                </p> -->
              </a>
            </div>
          </div>
        </div>
        <div v-if="goodsList.length == 0" class="s1">
          <h1><img src="../../public/goodsempty.jpg" alt="..." style="text-align: center"></h1>
        </div>
        <nav class="page">
          <ul>
            <li v-for="i in pageCnt" :key="i" class="page-item">
              <a href="#" style="text-decoration: none;" @click="setPage(i)">
                {{ i }}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>
<script>

import axios from 'axios';
export default {
  data() {
    return {
      goodsList: [],
      rowList: [],
      sortCase: "최근 순",
      keyword: this.$route.params.keyword,
      pageGoodsList: [],
      pageNum: 0,
      pageCnt: 0,
      onePageCnt: 12,
    };
  },
  computed: {
    rows() {
      return this.items.length;
    }
  },
  created() {
    this.getGoodsList(0);
  },
  mounted() {
    this.setOpt();
  },
  methods: {
    setPage(page) {
      this.pageGoodsList = []
      this.pageNum = page - 1;
      this.sliceList()
    },
    sliceList() {
      const start = 0 + this.pageNum * this.onePageCnt
      this.pageGoodsList = this.goodsList.slice(start, start + this.onePageCnt);
      this.arrangeRows();
    },
    sortList(sortNum) {
      if (sortNum == 0) {
        this.sortCase = "최근 순"
      } else if (sortNum == 1) {
        this.sortCase = "오래된 순"
      }
      else if (sortNum == 2) {
        this.sortCase = "낮은 가격"
      }
      else if (sortNum == 3) {
        this.sortCase = "높은 가격"
      }
      else {
        this.sortCase = "이름 순"
      }
      this.getGoodsList(sortNum);
    },
    goToDetail(goodsno) {
      window.location.href = `http://localhost:8080/goods/goodsDetail/${goodsno}`;
    },
    async getGoodsList(sortCase) {
      try {
        const response = await axios.get(`http://localhost:3000/goods/goodsSearch/${this.keyword}/${sortCase}`);
        this.goodsList = response.data;
        this.pageCnt = Math.ceil(this.goodsList.length / this.onePageCnt)
        this.setPage(1)
      } catch (error) {
        console.error(error);
      }
    },
    arrangeRows() {
      this.rowList = [];
      const rowSize = 4;
      let row = [];

      this.pageGoodsList.forEach((goods, index) => {
        row.push(goods);
        if ((index + 1) % rowSize === 0 || index === this.pageGoodsList.length - 1) {
          this.rowList.push(row);
          row = [];
        }
      });
    },
    formatPrice(price) {
      const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return `${formattedPrice} 원`;
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
  },
  watch: {
    '$route'() {
      // this.getGoodsList();
    },
    goodsList: {
      immediate: true,
      handler() {
        this.arrangeRows();
      }
    }
  }

};
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

/* html,
body {
  width: 100%;
  height: 100vh;
  margin: 0;
} */

body {
  font-family: 'SejonghospitalBold';
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

button,
a {
  cursor: pointer;
}

p {
  margin-left: 20px;
  line-height: 24px;
  font-size: 12px;
  color: rgb(173, 173, 173);
}

ul,
li {
  list-style: none;
}

a {
  text-decoration: none;
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

/*제품목록 관련*/

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


.content {
  max-width: 1200px;
  width: 100%;
  margin: auto;
  padding-top: 30px;
}

.goods-name {
  font-size: 14px;
  color: black;
  font-weight: bold;
}

.goods-price {
  font-size: 13px;
}

.cate-header {
  display: flex;
  justify-content: space-between;
}

.cate-header mark {
  height: 36px;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 1.5rem;
  font-weight: 600;
  color: #000;
  background-color: #ffffff;
}

.cate-header .h6 {
  font-size: 14px;
}

/*제품 이미지*/

.s1 {
  display: flex;
  margin-left: 40px;
  margin-top: 50px;
  margin-bottom: 150px;
}

.s2 {
  margin-bottom: 150px;
  margin-right: 30px;
}

.s2:hover .box {
  transform: scale(1.12);
  transition: all 0.1s linear;
}

.s2:hover .box p {
  color: #9c0410;
}

.s2:not(:hover) .box {
  transform: scale(1.0);
  transition: all 0.1s linear;
}

img {
  width: auto;
  height: 200px;
  object-fit: contain;
}

.card-text {
  margin: 3px;
  margin-top: 5px;
}

.card-text.align-left {
  text-align: left;
}

.card {
  flex-direction: column;
  flex-wrap: wrap;
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

/*페이지*/


.page {
  margin-top: 40px;
  text-align: center;
  width: 100%;
}

.page-item {
  display: inline-block;
  margin-right: 10px;
}
</style>