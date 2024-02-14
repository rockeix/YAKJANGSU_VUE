<template>
    <div class="con">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <div>
            <div class="goods-details">
                <div class="goods-image">
                    <img :src="goods.goods_img ? require(`../../../node-back/uploads/uploadGoods/${goods.goods_img}`) : '/goodsempty.jpg'"
                        alt="상품 이미지">
                </div>
                <div class="goods-info">
                    <div class="category">{{ categoryType(goods.goods_category) }}</div>
                    <div class="header">
                        <h2>{{ goods.goods_name }}</h2>
                    </div>
                    <div class="hashtags">
                        <span class="hashtag">#{{ goods.goods_tag1 }}</span>
                        <span class="hashtag" v-if="goods.goods_tag2 !== null && goods.goods_tag2 !== ''">#{{
                            goods.goods_tag2 }}</span>
                        <span class="hashtag" v-if="goods.goods_tag3 !== null && goods.goods_tag3 !== ''">#{{
                            goods.goods_tag3 }}</span>
                    </div>
                    <div class="star-rating">
                        <div class="star-rating">
                            <div class="star" v-for="score in 5" :key="score">
                                <span v-if="score < totalScore + 1"><i class="fa fa-star"></i></span>
                                <span v-if="score >= totalScore + 1"><i class="fa fa-star-o"></i></span>
                            </div>
                            <router-link to="/">
                                <span style="padding-left: 5px;">({{ reviewCnt }}개)</span>
                            </router-link>
                        </div>
                    </div>
                    <div style="margin-top: -10px;"></div>
                    <hr>
                    <div style="margin-bottom: 13px;"></div>
                    <span style="font-weight: bold; font-size: 18px;">판매가</span><span style="padding-left: 15px;"></span>
                    <span style="font-weight: normal;">{{ formatPrice(goods.goods_price) }}</span><br>

                    <span style="font-weight: bold; font-size: 18px;">배송비</span><span style="padding-left: 15px;"></span>
                    <span style="font-weight: normal;">무료</span>
                    <!-- <span style="font-weight: normal;" v-if="goods.goods_price >= 50000">무료</span>
                    <span style="font-weight: normal;" v-else>3000원 (50,000원 이상 구매 시 무료)</span> -->
                    <div style="margin-top: -8px;"></div>
                    <hr>


                    <div class="quantity-section">
                        <h3> 수량 :</h3>
                        <button class="quantity" @click="minus">-</button>
                        <input class="quantity_num" type="number" v-model="quantity" min="1" />
                        <button class="quantity" @click="plus(goods.goods_cnt)">+</button>
                        <p style="font-size: small;"> 재고 : {{ goods.goods_cnt }} 개</p>
                    </div>
                    <br>
                    <div id="app">
                        <p>예상 적립금: {{ formatPrice(goods.goods_price * quantity * 0.03) }}</p>
                        <h3 style="font-size: 1.3rem;">총 상품금액: {{ formatPrice(goods.goods_price * quantity) }}</h3>
                    </div>
                    <hr>
                    <div class="buttons">
                        <button class="add-to-like">
                            <font-awesome-icon :style="{ color: isFavorited ? '#9c0410' : 'gray' }" icon="heart"
                                @click="toggleFavorite()" />
                        </button>


                        <button class="add-to-cart" style="margin-left:5px" @click="showAlert">장바구니</button>

                        <button class="buy-now" @click="goToOrder(goods.goods_no)" style="margin-left:5px">바로구매</button>
                    </div>
                </div>
            </div>
            <div style="margin-top: 20px;"></div>

            <div class="teb">
                <div id="detail" role="tab" @click="handleTabClick('detail')" :class="{ active: isTabActive('detail') }">
                    상세정보</div>
                <div id="review" role="tab" @click="handleTabClick('review')" :class="{ active: isTabActive('review') }">리뷰
                </div>
                <div id="qna" role="tab" @click="handleTabClick('qna')" :class="{ active: isTabActive('qna') }">문의</div>
            </div>
            <div>
                <div class="section1" v-show="isTabActive('detail')">
                    <div class="image-container">
                        <img class="showstep1"
                            :src="goods.goods_content ? require(`../../../node-back/uploads/uploadGoods/${goods.goods_content}`) : '/goodsempty.jpg'"
                            alt="상품 이미지">
                    </div>
                </div>
                <div class="section2" v-show="isTabActive('review')">
                    <div style="padding: 16px">
                        <h2 style="margin: 60px 0px -70px 335px;">전체 평점</h2>
                        <div class="total_review">
                            <div style="padding: 40px; margin-left: 70px; margin-top: 10px;">
                                <div class="total_score">
                                    <h1 style="margin: 0px -12px -15px -20px;">{{ totalScoreDem }}</h1>
                                    <p style="margin: 16px 20px -13px 17px;">({{ reviewCnt }}개)</p>
                                </div>
                                <div class="total_review_star">
                                    <div class="star" v-for="score in 5" :key="score">
                                        <span v-if="score < totalScore + 1"><i class="fa fa-star"></i></span>
                                        <span v-if="score >= totalScore + 1"><i class="far fa-star"></i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="review" v-for="(review) in reviewList" :key="review">
                        <hr>
                        <!-- <hr style="margin: 10px 0px;"> -->
                        <div style="margin-left: 200px;">
                            <div class="review_header">
                                <!-- <div class="review1_img">
                                    <img src="../assets/00031.jpg" alt="...">
                                </div> -->
                            </div>

                            <div class="review_profile">
                                <div class="review_star">
                                    <div class="star" v-for="score in 5" :key="score">
                                        <span v-if="score < review.REVIEW_SCORE + 1"><i class="fa fa-star"></i></span>
                                        <span v-if="score >= review.REVIEW_SCORE + 1"><i class="far fa-star"></i></span>
                                    </div>
                                    <p>({{ review.REVIEW_SCORE }})</p>
                                </div>

                                <div class="review_user_info">
                                    <p>{{ review.USER_NAME }} | {{ formatDateTime(review.REVIEW_DATE) }} </p>
                                    <p>
                                    <pre> </pre>
                                    </p>
                                </div>

                            </div>
                            <div class="review_body">
                                    <div class="review_content">
                                        <p>{{ review.REVIEW_CON }}</p>
                                    </div>
                                    <div v-if="review.REVIEW_IMG" style="display: flex;">
                                    <div class="review_img" @click="showImg(review.REVIEW_IMG)">
                                        <img :src="require(`../../../node-back/uploads/uploadReview/${review.REVIEW_IMG}`)"
                                            alt="...">
                                    </div>
                                </div>
                                <div v-else>
                                    <div class="review_content2">
                                        <img src="../assets/imgEmptyInput.png" alt="..." width="100px">
                                        <p>{{ review.REVIEW_CON }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="section3" v-show="isTabActive('qna')">
                    <div class="qna">
                        <div class="list_title">
                            <h2>문의 목록</h2>

                            <div class="btn1">
                                <div v-if="user.user_id == ''">
                                    <button class="addbtn" @click="login">문의 등록</button>
                                </div>
                                <div v-else>
                                    <button class="addbtn" @click="write_qna">문의 등록</button>
                                </div>
                            </div>
                        </div>
                        <table class="qnalist-table">

                            <thead class="table-light">
                                <tr style="text-align: center;">
                                    <th scope="col">번호</th>
                                    <th scope="col">답변 여부</th>
                                    <th scope="col">내용</th>
                                    <th scope="col">작성자</th>
                                    <th scope="col">등록일자</th>
                                    <th scope="col">비밀글</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr style="text-align: center;" v-for="item in contentlist" :key="item.QNA_NO"
                                    @click="item.QNA_PW === 0 ? movetocontent(item.QNA_NO) : movetoSecret(item)">

                                    <th scope="row" style="color:black;">{{ item.QNA_NO }}</th>

                                    <td v-if="item.QNA_COMMENT != null" class="answer">답변완료</td>
                                    <td v-else class="answer">답변대기</td>
                                    <td class="content1">{{ item.QNA_TITLE }}</td>
                                    <td>{{ item.USER_NAME }}</td>
                                    <td>{{ item.QNA_DATE.split('T')[0] }}</td>
                                    <td><i v-if="item.QNA_PW == 1" class="fa fa-lock"></i></td>

                                </tr>
                            </tbody>
                        </table>

                        <!--페이징-->

                        <div class="btn-cover">
                            <button @click="movetopreviouspage" class="page-btn">이전</button>
                            <span class="page-count">{{ $route.query.page || 1 }}/{{ totalpage }} 페이지</span>
                            <button @click="movetonextpage" class="page-btn">다음</button>
                        </div>

                        <!-- <nav class="page">
                    <a href="#top" style="text-decoration: none;">
                        <li style="list-style: none;" class="page-item-page-link-active">1</li>
                    </a>
                </nav> -->

                    </div>
                </div>

                <div id="top_btn">
                    <a href="#top" class="show-top-button">
                        <font-awesome-icon icon="fa-solid fa-chevron-up" size="xl" style="color: #000000;" />
                    </a>
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
            activeTab: 'detail',
            quantity: 1,
            goods: {},
            isFavorited: false,
            like: 0,
            reviewCnt: 0,
            reviewList: [], //리뷰
            contentlist: [], //문의
            totalScore: 0,
            totalScoreDem: 0,
            cnt: 0,
            pageSize: 10, //한페이지에 보여지는 정보 갯수
            largeImg: '',
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
    created() {
        this.getGoods();
        this.getLike();
        this.likeCheck();
        this.getReviewList();
        this.getQna();
        this.getUser();
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        async getGoods() {
            try {
                const goodsno = this.$route.params.goodsno;
                const response = await axios.get(`http://localhost:3000/goods/goodsDetail/${goodsno}`);
                this.goods = response.data[0];
            } catch (error) {
                console.error(error);
            }
        },
        calTotalScore() {
            if (this.reviewList.length > 0) {
                this.reviewList.forEach((review) => {
                    this.totalScoreDem += review.REVIEW_SCORE;
                    this.reviewCnt++;
                });
                this.totalScoreDem /= this.reviewCnt;
                this.totalScoreDem = this.totalScoreDem.toFixed(1);
                this.totalScore = Math.round(this.totalScoreDem)
            }
        },

        // async getReviewList() {
        //     try {
        //         const goodsno = this.$route.params.goodsno;
        //         const response = await axios.get(`http://localhost:3000/goods/getReview/${goodsno}`);
        //         this.reviewList = response.data;
        //         this.calTotalScore();
        //     } catch (error) {
        //         console.error(error);
        //     }
        // }, // 리뷰 불러오기 추가
        async likeCheck() {
            const user_no = this.user.user_no || null;
            const response = await axios.post(`http://localhost:3000/goods/likeCheck/${this.$route.params.goodsno}/${user_no}`);
            if (response.data.message === 'complete') {
                this.isFavorited = response.data.isLiked;
            } else {
                this.isFavorited = false;
            }
        },
        async getLike() {
            try {
                const goodsno = this.$route.params.goodsno;
                const response = await axios.get(`http://localhost:3000/goods/likeCount/${goodsno}`);
                this.like = response.data;
                if (this.like === null) {
                    this.like = 0;
                }
            } catch (error) {
                console.error(error);
            }
        },
        async likeInsert() {
            if (this.user.user_no === '') {
                this.$swal('로그인해주세요');
                this.$router.push({ path: '/login' });
            } else {
                await axios.post(`http://localhost:3000/goods/likeInsert/${this.$route.params.goodsno}/${this.user.user_no}`);

                await this.getLike();
            }
        },
        async likeDelete() {
            if (this.user.user_no === '') {
                this.$swal('로그인해주세요');
                this.$router.push({ path: '/login' });
            } else {
                await axios.post(`http://localhost:3000/goods/likeDelete/${this.$route.params.goodsno}/${this.user.user_no}`);

                await this.getLike();
            }
        },
        async toggleFavorite() {
            if (this.isFavorited) {
                await this.likeDelete();
            } else {
                await this.likeInsert();
            }
            this.isFavorited = !this.isFavorited;
        },
        // 이미지 함수 둘 추가
        handleTabClick(tab) {
            this.activeTab = tab;
        },
        isTabActive(tab) {
            return this.activeTab === tab;
        },
        minus() {
            if (this.quantity > 1) {
                this.quantity--;
            }
        },
        plus(goods_cnt) {
            if (this.quantity < goods_cnt) {
                this.quantity++;
            } else if (this.quantity + 1 > goods_cnt) {
                alert('구매가능수량을 초과했습니다');
            }
        },
        formatPrice(price) {
            if (price !== undefined) {
                const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                return `${formattedPrice} 원`;
            }
            return "";
        },
        categoryType(socialType) {
            if (socialType === 1) {
                return '유산균';
            } else if (socialType === 2) {
                return '비타민';
            } else if (socialType === 3) {
                return '오메가';
            } else if (socialType === 4) {
                return '홍삼';
            } else if (socialType === 5) {
                return '기타';
            } else {
                return 'null';
            }
        },
        async showAlert() {
            if (this.user.user_no === '') {
                this.$swal('로그인해주세요');
                this.$router.push({ path: '/login' });
            } else {
                axios({
                    url: `http://localhost:3000/goods/add-cart?userNo=${this.user.user_no}`,
                    method: "POST",
                    data: {
                        goodsNo: this.$route.params.goodsno,
                        cartGoodsCnt: this.quantity
                    },
                })
                    .then(res => {
                        if (res.data.message === 'check_error') {
                            this.$swal("이미 장바구니에 담긴 상품입니다")
                        } else {
                            this.$swal({
                                title: '상품이 장바구니에 담겼습니다.',
                                icon: 'info',
                                showDenyButton: true,
                                confirmButtonText: '장바구니로 이동',
                                denyButtonText: `계속 쇼핑하기`,
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    location.href = "/cart"
                                }
                                else if (result.isDenied) {
                                    location.reload();
                                }
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        this.$swal("이미 장바구니에 담긴 상품입니다")
                    })
            }
        },

        async getReviewList() {
            try {
                const goodsno = this.$route.params.goodsno;
                const response = await axios.get(`http://localhost:3000/goods/getReview/${goodsno}`);
                this.reviewList = response.data;
                this.calTotalScore();
            } catch (error) {
                console.error(error);
            }
        },
        async getUser() {
            try {
                const response = await axios.get(`http://localhost:3000/mypage/mypage/${this.user.user_no}`);
                this.loginUser = response.data[0];
            } catch (error) {
                console.error(error);
            }
        },
        async getQna() {
            try {
                const goodsno = this.$route.params.goodsno;
                const response = await axios.get(`http://localhost:3000/qna/goodsqnalist/${goodsno}`);
                this.contentlist = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        write_qna() {
            const goodsno = this.goods.goods_no;
            //this.$router.push({ path: `/goods/qnaWrite/${goodsno}` });
            window.location.href = `http://localhost:8080/goods/qnaWrite/${goodsno}`;
        },
        login() {
            this.$swal({

                title: '로그인 하신 후에 작성하실 수 있습니다.',
                showConfirmButton: true,
            })
                .then(() => {
                    window.location.href = "http://localhost:8080/login";
                })
        },

        movetocontent(QNA_NO) {
            //   if(this.item.qna_pw == 0  ){
            const goodsno = this.goods.goods_no;
            // window.location.href = window.location.pathname + `/${goodsno}/?QNA_NO=` + QNA_NO;
            window.location.href = `http://localhost:8080/goods/qnaDetail/${goodsno}/?QNA_NO=` + QNA_NO;
            //   } else {
            //     this.$swal("비밀글입니다")
            //     this.$router.push({path:'/goods/goodsQna'})
            //   }
        },
        movetoSecret(item) {
            if (this.loginUser.user_type == 1 || item.USER_NO == this.user.user_no) {
                const goodsno = this.goods.goods_no;
                window.location.href = `http://localhost:8080/goods/qnaDetail/${goodsno}/?QNA_NO=` + item.QNA_NO
                // const goodsno = this.goods.goods_no;
                // window.location.href = window.location.pathname + `/${goodsno}/?QNA_NO=` + item.QNA_NO
            } else {
                this.$swal("비밀글입니다")
                const goodsno = this.goods.goods_no;
                this.$router.push({ path: `/goods/goodsDetail/${goodsno}` })
            }
        },
        //페이징
        movetopreviouspage() {
            if (this.$route.query.page == 1) {
                this.$swal('첫번째 페이지입니다!');
            } else {
                var pp = parseInt(this.$route.query.page) - 1;
                window.location.href = window.location.pathname + '?page=' + pp
            }
        },
        movetonextpage() {
            if (this.$route.query.page == Math.ceil(this.cnt / 10)) {
                this.$swal('마지막 페이지입니다!');
            } else {
                var pp = parseInt(this.$route.query.page) + 1;
                window.location.href = window.location.pathname + '?page=' + pp
            }
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
        goToOrder(goodsno) {
            const orderstype = 0;

            if (this.user.user_no === '') {
                this.$swal('로그인해주세요');
                this.$router.push({ path: '/login' });
            } else {
                const quantity = this.quantity; // 선택된 수량 사용                
                this.$router.push(`/order/${orderstype}/${goodsno}/${quantity}`);
            }
        },


    }
};
</script>


<style scoped>
@charset "UTF-8";

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

/* @font-face {
    font-family: 'SejonghospitalBold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2312-1@1.1/SejonghospitalBold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
} */

@font-face {
    font-family: 'Noto Sans KR', sans-serif;
    src: url('https://fonts.googleapis.com/earlyaccess/notosanskr.css');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'TheJamsil5Bold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302_01@1.0/TheJamsil5Bold.woff2') format('woff2');
    font-weight: 800px;
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

/* 
  html, body {
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

/*내용 박스*/

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
    /* padding: 50px; */
    margin: 50px;
    display: flex;
    flex-direction: column;
}


/*상품 상세 설명 */

.goods-details {
    font-family: 'Noto Sans KR', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px 10%;
}

.goods-image {
    display: inline;
    /* width: 100%; */
    /* max-width: 560px; */
    text-align: center;
    margin-right: 100px;
}

.goods-image img {
    width: 600px;
    border-radius: 40px;
    background-color: #eee;
    margin-left: 40px;
}

.goods-info {
    display: inline;
    max-width: 800px;
    max-height: 560px;
    margin-left: 50px;
    /* border: 1px solid rgb(0, 200, 130); */
}

.goods-info h2 {
    font-size: 2vw;
    margin-bottom: 10px;
}

.goods-info hr {
    margin-top: 20px;
}

.goods-info .category {
    font-size: 1rem;
    padding-bottom: 2px;
    color: #aaa;
    margin-bottom: 10px;
    margin-left: 3px;
}

.goods-info .header {
    display: flex;
    align-items: center;
    width: 500px;
}

.goods-info .header h2 {
    font-size: 25px;
    font-weight: 600;
    margin-bottom: 10px;
    margin-right: 10px;
}

.goods-info .header i {
    font-size: 2em;
}

/*해시태그*/
.hashtags {
    /* margin-bottom: 20px; */
    font-size: 14px;
}

.hashtag {
    display: inline-block;
    text-align: center;
    color: #9c0410;
    /* background-color: #f2f2f2; */
    border-radius: 5px;
    padding: 6px 6px;
}

/*리뷰 평점*/
.star-rating {
    display: flex;
    font-size: 16px;
    margin-bottom: 10px;
    /* color: #ffc74f; */
}

.star {
    margin-top: 3px;
}

.star-rating .fa-star {
    color: #ffc74f;
    padding-left: 5px;
}

.star-rating .fa-star-o {
    color: #ccc;
    padding-left: 5px;
}

.checked {
    color: #ffc74f;
}

.fa-star-half {
    color: #ffc74f;
}

.star-rating label {
    display: flex;
    font-size: 16px;
    margin-top: 3px;
    margin-bottom: 10px;
    color: black;
    margin-left: 20px;
}

.star-rating .avg {
    display: flex;
    font-size: 15px;
    margin-top: 4px;
    margin-bottom: 10px;
    color: black;
    margin-left: 10px;
}

.rate {
    background: url(https://aldo814.github.io/jobcloud/html/images/user/star_bg02.png) no-repeat;
    width: 121px;
    height: 20px;
    position: relative;
    color: #ffc74f;
}

.rate span {
    position: absolute;
    background: url(https://aldo814.github.io/jobcloud/html/images/user/star02.png);
    width: auto;
    height: 20px;
    color: #ffc74f;
}

/* p {
    margin: 0px 0px 0px 8px;
} */

hr {
    border: 1px solid #dddcdc;
    margin-right: 40px;
    margin-bottom: 14px;
}

/*수량버튼*/

.quantity-section h3 {
    margin-right: 15px;

}

/* .quantity-section {
    display: flex;
    font-size: 1vw;
    margin-top: 1vw;
    margin-bottom: 6vw;
} */
.quantity-section .quantity {
    width: 2vw;
    font-size: 1vw;
    max-width: 2.6vw;
    height: 1.8vw;
    max-height: 3.6vw;
    text-align: center;
    border-radius: 2px;
    /* border: 2px solid #9c0410; */
    background-color: #ededed;
    font-family: 'TheJamsil5Bold';
}


.quantity-section .quantity_num {
    font-size: 1vw;
    margin-right: -6px;
    margin-left: -7px;
    width: 2.5vw;
    height: 1.8vw;
    text-align: center;
    font-family: 'SejonghospitalBold';
    border: 1px solid #ededed;
    border-radius: 2px;
}

.quantity-section input:focus {
    outline: none;
}

.quantity-section {
    display: flex;
    font-size: 1rem;
    margin-top: 5px;
    margin-bottom: -4px;
    align-items: center;
}

.quantity-section button {
    font-size: 1rem;
    padding: 0.3rem 0.6rem;
    margin: 0 0.3rem;
    border: none;
    background-color: #f2f2f2;
    border-radius: 5px;
    cursor: pointer;
}

.quantity-section input {
    width: 5rem;
    padding: 0.3rem 0.5rem;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 5px;
}

/*수량 버튼 숫자 가운데, 증감 버튼 없애기*/
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/*찜 장바구니 구매하기 버튼*/

.buttons {
    display: flex;
    margin-left: 10px;
    margin-top: -20px;
}

.buy-now,
.add-to-cart,
.add-to-like {
    margin-top: 20px;

}

.buy-now {
    width: 10vw;
    height: 2.9vw;
    padding: 0.5vw 1vw;
    font-size: 1rem;
    font-family: 'SejonghospitalBold';
    background-color: #9c0410;
    border: #9c0410;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
}

.add-to-cart {
    width: 10vw;
    height: 2.9vw;
    padding: 0.5vw 1vw;
    font-size: 1rem;
    font-family: 'SejonghospitalBold';
    background-color: #fff;
    border: 2px solid #424141;
    border-radius: 5px;
    cursor: pointer;
    /* margin-right: 1%; */
}

.add-to-like {
    width: 3vw;
    height: 2.9vw;
    padding: 0.5vw 0.3vw;
    font-size: 3rem;
    font-family: 'SejonghospitalBold';
    background-color: #fff;
    border: 2px solid #424141;
    border-radius: 5px;
    cursor: pointer;
    font-size: x-large;
    /* margin-right: 1%; */
    /* margin-left: -5px; */
}

/* .add-to-like:hover, */
.add-to-cart:hover,
.buy-now:hover {
    background-color: #848484;
}

.separator {
    width: 1400px;
    border: 1px solid #f0f0f0;
}

/* 상단탭 */
.teb {
    border-top: 2px solid #555;
    display: flex;
    height: 70px;
    width: 100%;
    font-size: 1.2rem;
    font-family: 'SejonghospitalBold';
}

.teb #detail {
    width: 50%;
    height: 105%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-right: 1px solid #c8c7c7;
    border-bottom: 1px solid #c8c7c7;
    cursor: pointer;
    /* margin-left: 10vw; */
}

.teb #review {
    width: 50%;
    height: 105%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-right: 1px solid #c8c7c7;
    border-bottom: 1px solid #c8c7c7;
    cursor: pointer;

    /* margin-right: 10vw; */
}

.teb #qna {
    width: 50%;
    height: 105%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    cursor: pointer;
    border-bottom: 1px solid #c8c7c7;

}

#detail.active,
#review.active,
#qna.active {
    /* 활성화된 탭 아이템 스타일 */
    color: #9c0410;
    background-color: #ffffff;
    border-bottom: none;
}

.image-container {
    overflow: hidden;
}

.section1 img {
    width: 80vw;
    max-width: 900px;
    margin: 30px auto 0;
    display: flex;
    margin-bottom: 60px;
    margin-top: 100px;
}

/* top_btn */
.show-top-button {
    display: scroll;
    width: 40px;
    height: 32px;
    text-align: center;
    font-size: 12px;
    /* font-family: GmarketSansMedium; */
    position: fixed;
    bottom: 60px;
    right: 4%;
    padding-top: 8px;
    cursor: pointer;
    border-radius: 20px;
    /* background-color: #9c0410; */
    z-index: 1;
    margin-right: 50px;
    text-decoration: none;
    font-size: large;
    color: #9c0410;
}

/* 전체평점박스 */

.total_review {
    font-family: 'SejonghospitalBold';
    max-width: 600px;
    /* height: 200px; */
    margin: auto;
    margin-top: 80px;
    font-size: 20px;
    vertical-align: middle;
    border: 2px solid #9c0410;
    border-radius: 12px;
}

/* 전체평점 별 */
.rate {
    background: url(https://aldo814.github.io/jobcloud/html/images/user/star_bg02.png) no-repeat;
    width: 121px;
    height: 20px;
    position: relative;
}

.rate span {
    position: absolute;
    background: url(https://aldo814.github.io/jobcloud/html/images/user/star02.png);
    width: auto;
    height: 20px;
}

/* 리뷰 */
.review_box {
    display: inline;
    padding-left: 8px;
}

.review_star {
    display: flex;
    font-size: 20px;
    margin-top: 10px;
    margin-left: -40px;
    color: #ffd87d;
}

.review_user_info {
    margin-left: 380px;
    
}

.review_user_info p {
    margin-top: -20px;
    font-size: 15px;
}

.review_content p {
    margin-top: 20px;
    font-size: 13px;
    line-height: 18px;
    color: #14161a;
    margin-left: -40px;
}

.review_content2 p {
    margin: 0px 10px;
    font-size: 14px;
    color: black;
}

.review {
    margin: auto;
    max-width: 900px;
    margin-bottom: 50px;
}

.review_header {
    display: flex;
    /* padding: 10px 10px 0px 10px; */
}

.review1_img img {
    margin: 0 auto;
    width: 70%;
    /* margin-top: 200px; */
}

.review_profile {
    display: inline;
    padding-left: 8px;
}

/* 
.review_body {
    display: flex;
} */

.review_img {
    height: 130px;
    width: 130px;
    min-width: 130px;
    overflow: hidden;
    border-radius: 3px;
    margin: 10px 10px 10px 10px;
}

.review_img :hover {
    cursor: pointer;
}

.review_img img {
    object-fit: cover;
    width: 130px;
}

.total_score {
    margin: auto;
    display: flex;
}

.total_score p {
    font-size: 15px;
    margin: 23px 0px 0px 3px
}

.total_review_star {
    display: flex;
    color: #ffd87d;
    margin-left: 180px;
    font-size: 50px;
    margin-top: -35px;
}

/*문의 목록*/

.qna {
    font-family: 'SejonghospitalBold';
    margin: auto;
    max-width: 900px;
    padding: 15px;
    /* align-items: center; */
}


.qnalist-table {
    width: 900px;
    margin: 0 auto;
    text-align: center;
    background-color: #ffffff;
    border-radius: 10px;
    /* border-collapse: separate; */
    border-spacing: 10px 10px;
    border-collapse: collapse;
}

.list_title h2 {
    margin-top: 50px;
    margin-bottom: 40px;
    text-align: center;
}

.qnalist-table thead {
    position: sticky;
    /* top: 0px; */
    border-bottom: 2px solid rgb(120, 120, 120);
    border-top: 2px solid rgb(120, 120, 120);
}


.qnalist-table th {
    text-align: center;
    padding: 15px;
}

.qnalist-table tbody tr {
    /* border-bottom: 2px solid #f5f5f7; */
    height: 30px;
}

.btn1 {
    float: right;

}

.addbtn {
    width: 80px;
    height: 35px;
    color: #fff;
    background-color: #9c0410;
    border: 2px solid #9c0410;
    border-radius: 10px;
    font-family: 'SejonghospitalBold';
    font-size: 14px;
    margin-bottom: 15px;
    margin-right: -15px;

}

/* .page {
    margin: 20px 0 20px 300px;
}

.page-item-page-link-active {
    color: #9c0410;
} */

.btn-cover {
    margin: 20px 0 20px 350px;
    position: relative;

}

.page-count {
    padding: 0 15px 0 20px;
    /* 위 오 아래 왼 간격 조절 */
}

.page-btn {
    height: 30px;
    width: 50px;
    border: 2px solid #3c3c3c;
    border-radius: 7px;
    font-family: 'SejonghospitalBold';
    color: #000000;
    background-color: #fff;
    font-size: 14px;
    box-shadow: 0px 1px 10px 0.1px rgb(240, 240, 240);

}

button.page-btn:hover {
    cursor: pointer;
    background-color: #cccccc;

}
</style>