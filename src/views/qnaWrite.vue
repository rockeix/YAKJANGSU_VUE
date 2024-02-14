<template>
    <div class="con">


        <div>
            <div class="write">
                <h1 style="text-align: center; margin: 60px 0 60px 0;">문의 작성</h1>

                <div class="container-wrapper">
                    <div class="infoQ">

                        <h3>작성자</h3>
                        <p>{{ loginUser.user_name }}</p>

                        <h3>제목</h3>
                        <textarea class="qna-title" rows=3 v-model="qna_title">제목란</textarea>
                        <div>
                            <h3>내용</h3>
                            <textarea class="qna-content" rows=10 v-model="qna_content">내용 작성란</textarea>
                        </div>
                        <div style="margin-bottom: 40px;">
                            <label for="qna_pw" class="secret">비밀글</label>
                            <input type="checkbox" v-model="qna_pw" class="checkbox" id="qna_pw">
                        </div>
                        <div class="input-img">
                            <h3>사진 등록</h3>
                            <input type="text" class="upload-name" :value="fileName" placeholder="이미지를 업로드 하세요" disabled>
                            <label for="upload-file">파일선택</label>
                            <input type="file" name="upload" id="upload-file" @change="handleFileUpload">
                        </div>
                        <br>
                        <img :src="imgSrc" alt="" width="56%;" style="border-radius:15px;">
                    </div>
                </div>
            </div>

            <br>
            <br>
            <div class="btnarea">

                <button type="submit" @click="onSubmitWrite">등록</button>


                <button @click="cancle(goods.goods_no)" style=" border: 2px solid black;">취소</button>

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
            loginUser: {},
            quantity: 1,
            goods: {},
            fileName: '이미지를 업로드 하세요',
            // imgSrc: '../assets/00031.jpg',
            qna_title: '',
            qna_content: '',
            qna_img: '',
            qna_pw: false, // 비밀글 옵션 추가
        };
    },
    computed: {
        user() {
            return this.$store.state.user; // 로그인 확인
        }
    },
    created() {
        this.getUser();
        this.getGoods();
    },
    mounted() {
        if (this.user.user_id == '') {
            this.$swal("로그인이 필요한 페이지입니다.");
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
        async getGoods() {
            try {
                const goodsno = this.$route.params.goodsno;
                const response = await axios.get(`http://localhost:3000/goods/goodsDetail/${goodsno}`);
                this.goods = response.data[0];
            } catch (error) {
                console.error(error);
            }
        },
        onSubmitWrite() {
            if (!this.validationCheck()) {
                return;
            }
            axios.post("http://localhost:3000/qna/write", {
                user_no: this.user.user_no,
                qna_title: this.qna_title,
                qna_content: this.qna_content,
                qna_pw: this.qna_pw,
                qna_img: this.qna_img,
                goods_no: this.goods.goods_no,
            })
                .then(response => {
                    console.log(response.data);
                    this.$swal("작성완료");

                })
                .catch(error => {
                    console.log(error);
                    // 오류 처리
                });
            const goodsno = this.goods.goods_no;
            this.$router.push({ path: `/goods/goodsDetail/${goodsno}` })
        },
        validationCheck() {

            if (this.qna_title == "") {
                this.$swal("제목을 입력하세요.");
                return false;
            }
            if (this.qna_content == "") {
                this.$swal("내용을 입력하세요.");
                return false;
            }

            return true;
        },

        async handleFileUpload(event) {
            const formData = new FormData();
            const file = event.target.files[0];
            this.qna_img = file.name;
            if (!file) return;
            formData.append('upload', file)
            this.fileName = file ? file.name : '이미지를 업로드 하세요';

            await axios({
                method: 'post',
                url: 'http://localhost:3000/qna/upload',
                headers: { "Content-Type": "multipart/form-data" },
                data: formData
            })

        },
        cancle(goodsno) {
            window.location.href = `http://localhost:8080/goods/goodsDetail/${goodsno}`;
            // this.$router.push({ path: `/admin/goodsUpdate/${goodsno}` });
        },
    },
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
    font-family: 'SejonghospitalBold';
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
}

.goods-info {
    display: inline;
    max-width: 800px;
    max-height: 560px;
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
    margin-bottom: 20px;
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
    border: 1px solid #f0f0f0;
}

/*수량버튼*/

.quantity-section h3 {
    margin-right: 10px;
}

.quantity-section {
    display: flex;
    font-size: 1vw;
    margin-top: 1vw;
    margin-bottom: 6vw;
}

.quantity-section .quantity {
    width: 4vw;
    font-size: 2vw;
    max-width: 3.6vw;
    height: 2.8vw;
    max-height: 3.6vw;
    text-align: center;
    border-radius: 4px;
    /* border: 2px solid #9c0410; */
    background-color: #fff;
}

.quantity-section .quantity_num {
    font-size: 1vw;
    width: 3vw;
    height: 2vw;
    text-align: center;
    margin-right: 4px;
    font-family: 'SejonghospitalBold';
    border: 2px solid #000;
    border-radius: 4px;
    margin-left: 4px;
}

.quantity-section input:focus {
    outline: none;
}

.quantity-section {
    display: flex;
    font-size: 1rem;
    margin-top: 1rem;
    margin-bottom: 2rem;
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
}

.buy-now,
.add-to-cart,
.add-to-like {
    margin-top: 20px;

}

.buy-now {
    width: 10vw;
    height: 3vw;
    padding: 0.5vw 1vw;
    font-size: 1rem;
    font-family: 'SejonghospitalBold';
    background-color: #fff;
    border: 2px solid #9c0410;
    border-radius: 10px;
    cursor: pointer;
}

.add-to-cart {
    width: 10vw;
    height: 3vw;
    padding: 0.5vw 1vw;
    font-size: 1rem;
    font-family: 'SejonghospitalBold';
    background-color: #fff;
    border: 2px solid #000;
    border-radius: 10px;
    cursor: pointer;
    margin-right: 1%;
}

.add-to-like {
    width: 3vw;
    height: 3vw;
    padding: 0.7vw 0.3vw;
    font-size: 1rem;
    font-family: 'SejonghospitalBold';
    background-color: #fff;
    border: 2px solid #000;
    border-radius: 10px;
    cursor: pointer;
    font-size: larger;
    margin-right: 1%;
    margin-left: 20px;
}

.add-to-like:hover,
.add-to-cart:hover,
.buy-now:hover {
    background-color: #fff7f8;
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

.write {
    width: 800px;
    margin: auto;
}

.container-wrapper {
    border: 1.5px solid #9c0410;
    border-radius: 20px;
    padding: 20px;
}

.write h3 {
    margin-bottom: 10px;
}

.write p,
textarea {
    margin-bottom: 30px;
}

.qna-title {
    width: 100%;
    border-color: black;
    border-radius: 15px;
    padding: 10px;
    border: 1;
    overflow: visible;
    text-overflow: ellipsis;
}

.qna-content {
    width: 100%;
    border-color: black;
    border-radius: 15px;
    padding: 10px;
    border: 1;
    overflow: visible;
    text-overflow: ellipsis;
}

.upload-name {
    display: inline-block;
    width: 40%;
    height: 40px;
    padding: 0 10px;
    vertical-align: middle;
    border: 1px solid #dddddd;
    border-color: black;
    color: #999999;
    border-radius: 15px;
}

.checkbox {
    position: relative;
    top: 2px;
    left: 5px;
}

.input-img label {
    /* /* display: inline-block; */
    width: 80px;
    height: 40px;
    padding: 10px 20px;
    background-color: #fff;
    border: 2px solid black;
    vertical-align: middle;
    border-radius: 15px;
    margin-left: 10px;
    font-size: large;
    cursor: pointer;
}

.input-img [type="file"] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
}

/*목록 버튼*/

.btnarea {
    margin-left: 0px;
    margin-bottom: 50px;
}

.btnarea button {

    width: 80px;
    height: 40px;
    background-color: #fff;
    border: 2px solid #C52922;
    border-radius: 15px;
    margin-right: px;
    font-size: large;

}
</style>