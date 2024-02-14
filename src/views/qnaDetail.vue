<template>
    <div class="con">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <div>
            <div class="write" v-for="item in content" :key="item.QNA_NO">
                <div style="margin-top: 50px;"></div>
                <h1 style="text-align: center;">문의 상세</h1>

                <div class="name">
                    <h4>작성자: {{ content[0].USER_NAME }}</h4>
                </div>

                <div class="container-wrapper">
                    <div style="margin-top: 3px;">
                        <h3>제목</h3>
                        <textarea class="qna_title" rows=1 :disabled="editable === false"
                            v-model="content[0].QNA_TITLE"></textarea>
                    </div>

                    <div style="margin-top: 15px;">
                        <h3>내용</h3>
                        <textarea class="qna_content" rows=3 :disabled="editable === false"
                            v-model="content[0].QNA_CONTENT"></textarea>
                    </div>

                    <div style="margin-top: 15px; width:50%; display: flex;" v-if="item.QNA_PW == 1">
                        <h3><label for="qna_pw" class="secret">비밀글</label></h3>
                        <input type="checkbox" v-model="content[0].QNA_PW" class="checkbox" id="qna_pw" style="margin-left: 5px;">
                    </div>


                    <div style="margin-top: 15px; width:50%; display: flex;" v-else>
                        <h3><label for="qna_pw" class="secret">비밀글</label></h3>
                        <input type="checkbox" v-model="content[0].QNA_PW" class="checkbox" id="qna_pw" style="margin-left: 5px;">
                    </div>

                    <div style="margin-top: 15px;">
                        <h3>이미지</h3>
                        <img v-if="!content[0].QNA_IMG" src="../assets/imgEmptyInput.png" alt="..." width="50%;">
                        <img v-else :src="require(`../../../node-back/uploads/uploadQna/${content[0].QNA_IMG}`)" alt="..."
                            :width="300">
                    </div>

                    <hr style="margin-top: 20px;">

                    <div style="margin-top: 20px">
                        <h3>답변</h3>
                        <textarea class="qna_answer" rows=3 readonly v-model="content[0].QNA_COMMENT"></textarea>
                    </div>

                </div>

                <br>
                <br>
                <div class="btnarea">
                    <button @click="QnaMain">목록</button>

                    <button type="button" @click="editContent()"
                        v-if="(editable === false) && this.user.user_no == this.content[0].USER_NO">수정</button>
                    <button type="button" @click="confirmEditContent()"
                        v-else-if="this.user.user_no == this.content[0].USER_NO">수정완료</button>
                    <button type="button" v-if="this.user.user_no == this.content[0].USER_NO" @click="confirmDeleteContent(item.QNA_NO)">삭제</button>

                </div>
            </div>


        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name: 'App',

    data() {
        return {
            quantity: 1,
            goods: {},
            content: [],
            editable: false,
            qna_pw: false,
        };
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
    },
    created() {
        this.getGoods();
    },
    mounted() {
        axios({
            url: "http://localhost:3000/qna/qnacontent",
            method: "POST",
            data: {
                QNA_NO: this.$route.query.QNA_NO
            },
        }).then(res => {
            this.content = res.data.map(item => ({
                ...item,
                QNA_PW: !!item.QNA_PW, 
            }));
        }).catch(err => {
            alert(err);
        });

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
        confirmDeleteContent(QNA_NO) {
            if (this.user.user_no != this.content[0].USER_NO) {
                this.$swal("본인이 작성한 글만 삭제 가능합니다.")
            } else {
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
                        this.$swal({
                            position: 'top',
                            icon: 'success',
                            title: '삭제되었습니다',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        this.$router.push('/goods/goodsDetail?page=1');
                    }
                });
            }

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
                const goodsno = this.goods.goods_no;
                this.$router.push({ path: `/goods/goodsDetail/${goodsno}` });
            }).catch(err => {
                alert(err);
            });

        },
        editContent() {
            if (this.user.user_no != this.content[0].USER_NO) {
                this.$swal("본인이 작성한 글만 수정 가능합니다.")
            } else {

                this.editable = true;
            }

        },
        confirmEditContent() {
            axios.post("http://localhost:3000/qna/edit", {
                content: this.content[0].QNA_CONTENT,
                title: this.content[0].QNA_TITLE,
                qnano: this.content[0].QNA_NO,
                qnapw: this.content[0].QNA_PW ? 1 : 0,
            })
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
            this.$swal("수정완료");
            this.editable = false;
            // this.$router.push('/qnamain?page=1');
        },

        QnaMain() {
            console.log("실행 확인")
            const goodsno = this.goods.goods_no;
            this.$router.push({ path: `/goods/goodsDetail/${goodsno}` });
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
    font-style: normal; */

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
    font-family: 'Noto Sans KR', sans-serif;
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
    font-size: 2vw;
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

.star-rating .far.fa-star {
    color: #ccc;
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

p {
    margin: 20px 0 4px 0;
}

hr {
    border: 1px solid #ececec;
    margin-right: 110px;
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
    height: 2.8vw;
    padding: 0.5vw 0.3vw;
    font-size: 1rem;
    font-family: 'SejonghospitalBold';
    background-color: #fff;
    border: 2px solid #424141;
    border-radius: 10px;
    cursor: pointer;
    font-size: x-large;
    /* margin-right: 1%; */
    margin-left: -10px;
}

/* .add-to-like:hover, */
.add-to-cart:hover,
.buy-now:hover {
    background-color: #848484;
}

/* .separator {
    width: 1400px;
    border: 1px solid #f0f0f0;
} */

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
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    cursor: pointer;
    border-right: 1px solid #c8c7c7;
    border-bottom: 1px solid #c8c7c7;

    /* margin-right: 10vw; */
}

.teb #qna {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    cursor: pointer;
    margin-bottom: -2px;
    background: #fff;
    border-bottom: 1px solid #fff;
    /* margin-right: 10vw; */
}

#detail.active,
#review.active {
    /* 활성화된 탭 아이템 스타일 */
    color: #9c0410;
    background-color: #ffffff;
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

/*qna 상세*/

.name {
    margin-top: 50px;
    margin-left: 647px;
    margin-bottom: -40px;
    font-family: 'TheJamsil5Bold';
}

.write {
    width: 800px;
    margin: auto;
    font-family: 'Noto Sans KR', sans-serif;
    margin-top: 20px;
}

.container-wrapper {
    font-family: 'Noto Sans KR', sans-serif;
    border: 1.7px solid #9c0410;
    border-radius: 10px;
    /* width: 900px; */
    padding: 20px;
    margin-top: 50px;
}

.qna_title {
    width: 100%;
    border: 1px solid #525151;
    border-radius: 10px;
    padding: 10px;
    overflow: visible;
    text-overflow: ellipsis;
    margin-top: 5px;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 16px;
}

.qna_content {
    width: 100%;
    border: 1px solid #525151;
    border-radius: 15px;
    padding: 10px;
    border: 1;
    overflow: visible;
    text-overflow: ellipsis;
    margin-top: 5px;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 16.5px;
}

.qna_answer {
    width: 100%;
    border: 1px solid #525151;
    border-radius: 15px;
    padding: 10px;
    border: 1;
    overflow: visible;
    text-overflow: ellipsis;
    margin-top: 5px;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 16px;
}



/*목록 버튼*/
.btnarea {
    /* margin-left: 650px; */
    margin-bottom: 70px;
}

.btnarea button {
    width: 80px;
    height: 40px;
    background-color: #fff;
    border: 2px solid #9c0410;
    border-radius: 15px;
    /* margin-right: px; */
    font-size: large;
    font-family: 'Noto Sans KR', sans-serif;

}
</style>