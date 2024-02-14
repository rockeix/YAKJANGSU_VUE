<template>
    <div class="con">
        <div class="info">
            <div style="margin-left: 30px;">
                <h2 style="color: #fff;">{{ loginUser.user_name }} 관리자님</h2>
                <h2 style="color: #fff;">환영합니다.</h2>
            </div>

        </div>
        <div style="width: 100px;">
        </div>
        <div class="container">
            <nav>
                <div class="sidebar">
                    <div class="icon-bar adminpage-bar">
                        <div>
                            <router-link to="/admin/userInfo" class="m">
                                <button style="background-color: #fff; border-color: #fff; border-style: none;">
                                    <font-awesome-icon icon="fa-solid fa-address-card" size="xl" style="color: #9c0410;" />
                                    <p>회원 관리</p>
                                </button>

                            </router-link>
                        </div>
                        <div>
                            <router-link to="/admin/goodsList" class="m">
                                <button style="background-color: #fff; border-color: #fff; border-style: none;">
                                    <font-awesome-icon icon="fa-solid fa-list" size="xl" style="color: #9c0410;" />
                                    <p>상품 목록</p>
                                </button>
                            </router-link>

                        </div>
                        <div>
                            <router-link to="/admin/goodsAdd" class="m">
                                <button style="background-color: #fff; border-color: #fff; border-style: none;">
                                    <font-awesome-icon icon="fa-solid fa-pen-to-square" size="xl" style="color: #9c0410;" />
                                    <p>상품 등록</p>
                                </button>


                            </router-link>
                        </div>

                        <div>
                            <router-link to="/admin/orderM" class="m">
                                <button style="background-color: #fff; border-color: #fff; border-style: none;">
                                    <font-awesome-icon :icon="['fas', 'paper-plane']" size="xl" style="color: #9c0410;" />
                                    <p>배송 관리</p>
                                </button>


                            </router-link>
                        </div>

                        <div>
                            <router-link to="/admin/qnaList" class="m">
                                <button style="background-color: #fff; border-color: #fff; border-style: none;">
                                    <font-awesome-icon icon="fa-solid fa-circle-question" size="xl"
                                        style="color: #9c0410;" />
                                    <p>문의 내역</p>
                                </button>

                            </router-link>
                        </div>

                    </div>

                </div>
            </nav>
            <section>
                <div class="admininfo">
                    <div class="write">
                        <h1 style="text-align: center; margin: 30px 0 30px 0;">상품 등록</h1>
                        <div class="container-wrapper">
                            <div class="container goods_add">
                                <div class="goods_content">
                                    <div class="goodsbox">
                                        <label class="form-label">상품명 *</label>
                                        <input type="text" class="form-control" v-model="goods.goods_name"
                                            placeholder="상품명을 입력하세요.">
                                    </div>
                                    <div class="goodsbox">
                                        <label class="form-label" style="margin-top: 0.5px;">카테고리 *</label>
                                        <div class="inputRadio">
                                            <label><input type="radio" v-bind:value="cateValue1"
                                                    v-model="picked">&nbsp;유산균</label>
                                            <label><input type="radio" v-bind:value="cateValue2"
                                                    v-model="picked">&nbsp;비타민</label>
                                            <label><input type="radio" v-bind:value="cateValue3"
                                                    v-model="picked">&nbsp;오메가</label>
                                            <label><input type="radio" v-bind:value="cateValue4"
                                                    v-model="picked">&nbsp;홍삼</label>
                                            <label><input type="radio" v-bind:value="cateValue5"
                                                    v-model="picked">&nbsp;기타</label>
                                        </div>
                                    </div>

                                    <div class="goodsbox">
                                        <label class="form-label">상품 가격 *</label>

                                        <div class="input-group">
                                            <input type="number" class="form-control" v-model="goods.goods_price"
                                                placeholder="숫자만 입력하세요.">
                                            <span class="input-group-text">원</span>
                                        </div>

                                    </div>

                                    <div class="goodsbox">
                                        <label class="form-label">해시태그 1 *</label>

                                        <input type="text" class="form-control" v-model="goods.goods_tag1"
                                            placeholder="해시태그를 입력하세요.">

                                    </div>

                                    <div class="goodsbox">
                                        <label class="form-label">해시태그 2</label>

                                        <input type="text" class="form-control" v-model="goods.goods_tag2"
                                            placeholder="해시태그를 입력하세요.">

                                    </div>

                                    <div class="goodsbox">
                                        <label class="form-label">해시태그 3</label>

                                        <input type="text" class="form-control" v-model="goods.goods_tag3"
                                            placeholder="해시태그를 입력하세요.">

                                    </div>

                                    <div class="goodsbox">
                                        <label class="form-label">재고 *</label>

                                        <div class="input-group">
                                            <input type="number" class="form-control" v-model="goods.goods_cnt"
                                                placeholder="숫자만 입력하세요.">
                                            <span class="input-group-text">개</span>
                                        </div>

                                    </div>

                                    <!-- <div class="goodsbox">
                                        <label class="form-label">메인 이미지 *</label>
                                            <input type="file" class="form-control" accept="image/png,image/jpeg" @change="uploadFile($event.target.files, 0)">
                                    </div> -->
                                    <!-- <div class="goodsbox" style="margin-left: 150px;">
                                        <img :src="imgSrc" alt="goods" width="200px;" style="border-radius:15px;">
                                    </div> -->

                                    <div class="goodsbox" style="display: flex; align-items: center;">
                                        <label class="form-label">메인 이미지 *</label>

                                        <input type="text" class="form-control" :value="fileName" placeholder="상품 이미지를 업로드 하세요"
                                            disabled>
                                        <div class="input-img">
                                            <label for="upload-file">파일선택</label>
                                            <input type="file" name="upload" id="upload-file"
                                                @change="uploadFile($event.target.files, 0)">
                                        </div>
                                    </div>


                                    <div class="goodsbox">
                                        <label class="form-label">설명 이미지 *</label>
                                        <input type="text" class="form-control" :value="fileName2"
                                            placeholder="상품 상세 이미지를 업로드 하세요" disabled>
                                        <div class="input-img">
                                            <label for="upload-file2">파일선택</label>
                                            <input type="file" name="upload" id="upload-file2"
                                                @change="uploadFile2($event.target.files, 1)">
                                        </div>
                                    </div>
                                    <!-- <div class="goodsbox" style="margin-left: 150px;">
                                        <img :src="imgSrc2" alt="goods" width="100px;" height="150px"
                                            style="border-radius:15px;">
                                    </div> -->

                                    <!-- <div class="goodsbox">
                                        <label class="form-label">메인 이미지 *</label>
                                        <input type="text" class="form-control" :value="mainImageFileName"
                                            placeholder="이미지를 업로드하세요" disabled>
                                        <div class="input-img">
                                            <input type="file" id="main-image-upload" @change="handleMainImageUpload">
                                            <label for="main-image-upload" class="custom-label">파일선택</label>
                                        </div>

                                    </div>
                                    <div class="goodsbox" style="margin-left: 150px;">
                                        <img :src="imgSrc" alt="goods" width="200px;" style="border-radius:15px;">
                                    </div>


                                    <div class="goodsbox">
                                        <label class="form-label">설명 이미지 *</label>
                                        <input type="text" class="form-control" :value="descriptionImageFileName"
                                            placeholder="이미지를 업로드하세요" disabled>
                                        <div class="input-img">
                                            <input type="file" id="description-image-upload"
                                                @change="handleDescriptionImageUpload">
                                            <label for="description-image-upload" class="custom-label">파일선택</label>
                                        </div>

                                    </div>
                                    <div class="goodsbox" style="margin-left: 150px;">
                                        <img :src="imgSrc2" alt="goods" width="100px;" height="150px"
                                            style="border-radius:15px;">
                                    </div> -->
                                </div>
                            </div>

                        </div>

                        <div class="btnarea" style="margin-top: 5%;">
                            <button @click="goodsInsert">등록</button>
                            <router-link to="/admin/goodsList">
                                <button style=" border: 2px solid black;">취소</button>
                            </router-link>
                        </div>
                    </div>
                </div>
            </section>
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
            loginUser: {},
            cateValues: '',
            picked: '',
            cateValue1: '유산균',
            cateValue2: '비타민',
            cateValue3: '오메가',
            cateValue4: '홍삼',
            cateValue5: '기타',
            // isDisabled: true,
            fileName: '상품 이미지를 업로드 하세요',
            fileName2: '상품 상세 이미지를 업로드 하세요',
            goods: {
                goods_name: "",
                goods_category: 1,  // 1: 유산균 2: 비타민 3: 오메가 4: 홍삼 5: 기타
                goods_price: 0,
                goods_tag1: "",
                goods_tag2: "",
                goods_tag3: "",
                goods_cnt: 100,

                // 이미지 파일명만 저장할 변수 
                goods_img: "",
                goods_content: "",
            },
        };
    },
    computed: {
        user() {
            return this.$store.state.user;
        }
    },
    mounted() {
        if (this.user.user_no == '') {
            // 일단은 로그인 상태 체크 
            this.$swal("관리자 외 접근제한 페이지입니다.");
            this.$router.push({ path: '/login' });
        }
        else {
            axios({
                url: "http://localhost:3000/auth/admin_check",
                method: "POST",
                data: {
                    user_no: this.user.user_no,
                },
            })
                .then(res => {
                    if (res.data.message == 'admin') {
                        console.log(res.data.message);
                    }
                    else if (res.data.message == 'user') {
                        this.$swal("관리자 외 접근제한 페이지입니다.");
                        this.$router.push({ path: '/' });
                    }
                })
                .catch(() => {
                    this.$swal("접속 오류");
                })
        }
    },
    created() {
        this.getUser();
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
        async uploadFile(file, type) {

            let name = "";
            if (file) {
                name = file[0].name;
            }
            else {
                return;     // 파일 미선택 시 반환
            }

            const formData = new FormData();

            formData.append('img', file[0]);
            this.fileName = file ? file[0].name : '이미지를 업로드 하세요';

            for (let key of formData.keys()) {
                console.log(key, ":", formData.get(key));
            }

            try {
                axios({
                    url: `http://localhost:3000/goods/upload_img`,
                    method: 'POST',
                    headers: { 'Content-Type': 'multipart/form-data' },
                    data: formData
                })
                    .then((res) => {
                        if (res.data.message == 'success') {
                            if (type == 0) {
                                this.goods.goods_img = name;
                            }
                            else if (type == 1) {
                                this.goods.goods_content = name;
                            }
                        }
                        else {
                            this.$swal("DB 에러");
                        }
                    })
                    .catch(e => {
                        console.log(e);
                    })
                return true;

            } catch (err) {
                console.log(err);
                return false;
            }

        },
        async uploadFile2(file, type) {

            let name = "";
            if (file) {
                name = file[0].name;
            }
            else {
                return;     // 파일 미선택 시 반환
            }

            const formData = new FormData();

            formData.append('img', file[0]);
            this.fileName2 = file ? file[0].name : '이미지를 업로드 하세요';

            for (let key of formData.keys()) {
                console.log(key, ":", formData.get(key));
            }

            try {
                axios({
                    url: `http://localhost:3000/goods/upload_img`,
                    method: 'POST',
                    headers: { 'Content-Type': 'multipart/form-data' },
                    data: formData
                })
                    .then((res) => {
                        if (res.data.message == 'success') {
                            if (type == 0) {
                                this.goods.goods_img = name;
                            }
                            else if (type == 1) {
                                this.goods.goods_content = name;
                            }
                        }
                        else {
                            this.$swal("DB 에러");
                        }
                    })
                    .catch(e => {
                        console.log(e);
                    })
                return true;

            } catch (err) {
                console.log(err);
                return false;
            }

        },
        goodsInsert() {
            if (!this.validationCheck()) {
                return;
            }
            else {
                axios({
                    url: "http://localhost:3000/goods/add_goods",
                    method: "POST",
                    data: {
                        goods_name: this.goods.goods_name,
                        goods_category: this.goods.goods_category,
                        goods_price: this.goods.goods_price,
                        goods_tag1: this.goods.goods_tag1,
                        goods_tag2: this.goods.goods_tag2,
                        goods_tag3: this.goods.goods_tag3,
                        goods_cnt: this.goods.goods_cnt,

                        goods_img: this.goods.goods_img,
                        goods_content: this.goods.goods_content,
                    },
                })
                    .then((res) => {
                        if (res.data.message == 'add_complete') {
                            this.$swal({
                                position: 'top',
                                icon: 'success',
                                title: '상품 등록 성공!',
                                showConfirmButton: false,
                                timer: 1000
                            })
                                .then(() => {
                                    window.location.href = "http://localhost:8080/admin/goodsList";
                                })
                        } else if (res.data.message == 'already_exist_goods') {
                            this.$swal("이미 등록된 상품입니다.");
                        }
                        else if (res.data.message == '파일 변경 실패') {
                            this.$swal("파일 변경 실패");
                        }
                        else {
                            this.$swal("상품 등록 실패");
                        }
                    })
                    .catch(() => {
                        this.$swal("오류 발생")
                    })
            }
        },
        validationCheck() {
            if (this.goods.goods_name == "") {
                this.$swal("상품명은 필수 입력값입니다.");
                return false;
            }
            if (this.picked == '유산균') {
                this.goods.goods_category = 1;
            }
            else if (this.picked == '비타민') {
                this.goods.goods_category = 2;
            }
            else if (this.picked == '오메가') {
                this.goods.goods_category = 3;
            }
            else if (this.picked == '홍삼') {
                this.goods.goods_category = 4;
            }
            else if (this.picked == '기타') {
                this.goods.goods_category = 5;
            }
            if (this.goods.goods_price == "" || this.goods.goods_price == 0) {
                this.$swal("상품 가격을 입력하세요.");
                return false;
            }
            if (this.goods.goods_tag1 == "") {
                this.$swal("태그를 한 개 이상 입력해주세요.");
                return false;
            }
            // if (this.goods.goods_img == "") {
            //     this.$swal("상품 메인 이미지를 등록해주세요.");
            //     return false;
            // }
            // if (this.goods.goods_content == "") {
            //     this.$swal("상품 상세 이미지를 등록해주세요.");
            //     return false;
            // }
            return true;
        },
        // handleMainImageUpload(event) {
        //     const file = event.target.files[0];
        //     this.mainImageFileName = file.name;

        //     const reader = new FileReader();
        //     reader.onload = (e) => {
        //         this.imgSrc = e.target.result;
        //     };
        //     reader.readAsDataURL(file);
        // },
        // handleDescriptionImageUpload(event) {
        //     const file = event.target.files[0];
        //     this.descriptionImageFileName = file.name;

        //     const reader = new FileReader();
        //     reader.onload = (e) => {
        //         this.imgSrc2 = e.target.result;
        //     };
        //     reader.readAsDataURL(file);
        // }
    },
};
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
    margin: 50px;
    flex-direction: column;
    height: 1500px;

}

.info {
    background-color: #9c0410;
    width: 100%;
    height: 200px;
    justify-content: space-between;
    flex: 2;
    border-radius: 32px 32px 0px 0px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    font-family: 'GmarketSansMedium';
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
    margin-right: 200px;
}

nav p {
    font-family: 'seolleimcool-SemiBold';
}

.adminpage-bar {
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.adminpage-bar::-webkit-scrollbar {
    display: none;
}

.adminpage-bar {

    width: 100px;
    top: 150px;
    margin-top: 20px;
    left: 0;
    overflow-x: hidden;
}

.adminpage-bar .m,
.icon-bar p {
    color: #9c0410;
}

.adminpage-bar p {
    margin: auto;
    font-size: 20px;
    padding-top: 4px;
    margin-bottom: 80px;
}

.adminpage-bar a {
    margin: auto;
    font-size: 20px;
    padding-top: 4px;
    margin-bottom: 80px;
}

.container {
    margin: 40px 30px;
}


/*회원목록*/


.admininfo {
    width: 500px;
    margin: 0 auto;
    /* margin-top: 30px; */
    position: relative;
    font-weight: 700;
    height: 800px;
}

.admin {
    margin-top: 50px;
}

.userlist-table {
    width: 900px;
    max-width: 1200px;
    text-align: center;
    background-color: #ffffff;
    border-radius: 10px;
    border-spacing: 10px 10px;
    border-collapse: collapse;
}

.userlist-table thead {
    position: sticky;
    top: 0px;
    border-bottom: 2px solid black
}


.userlist-table th {
    text-align: center;
    padding: 25px;
}

.userlist-table tbody tr {
    height: 30px;
}

.userlist-table button {
    width: 70px;
    padding: 4px;
    border-radius: 6px;
    color: #ffffff;
    background-color: #9c0410;
    cursor: pointer;
    border: none;
}

.form-control {
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    font-size: 1rem;
    padding-left: 20px;
    color: rgb(137, 137, 137);
    border: 2px solid rgb(221, 221, 221);
    border-radius: 10px;
    margin-right: 10px;
    font-family: 'SejonghospitalBold';
}

.list-title {
    margin: 13px 0px;
    display: flex;
    justify-content: space-between;
    /* color: #9c0410; */
}

.list-title2 {
    vertical-align: middle;
    display: inline-flex;
    margin: auto 0px;
}

.table-title {
    text-align: center;
    background-color: #ffffff;
}

.search_bar {
    display: flex;
    margin: 0px 170px;
}

.search-btn {
    color: #fff;
    background-color: #9c0410;
    border-radius: 5px;
    border: none;
    width: 50px;
    height: 40px;
}


/*드롭박스*/

.dropdown {
    display: inline-block;
}

.dropdown:hover {
    display: block;

}

.pl {
    border: 1px solid #C4C4C4;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 12px 13px;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    font-family: 'SejonghospitalBold';
}

.pl:focus {
    border: 2px solid #000;
    box-sizing: border-box;
    border-radius: 10px;
    border-radius: 10px;
}

/*페이지*/

.page {
    margin-top: 40px;
    margin-left: 400px;
}

.page-item {
    color: #9c0410;
}

/* 박스 */
.container-wrapper {
    border: 1.5px solid #9c0410;
    border-radius: 20px;
    padding: 20px;
    height: 60 0px;
    text-align: center;
    height: 700px;


}

.write {
    width: 650px;
    margin: auto;
    margin-top: 80px;
    height: 1200px;

}

/*이미지 업로드*/

.input-img .upload-name {
    display: flex;
    align-items: center;
    width: 300px;
    height: 40px;
    font-size: 1rem;
    padding-left: 20px;
    color: rgb(137, 137, 137);
    border: 2px solid rgb(221, 221, 221);
    border-radius: 10px;
    margin-right: 10px;
}

.input-img {
    display: flex;
}

.input-img label {
    width: 105px;
    height: 40px;
    padding: 10px 20px;
    background-color: #fff;
    border: 2px solid black;
    vertical-align: middle;
    border-radius: 15px;
    margin-left: 10px;
    /* font-size: large; */
    cursor: pointer;
}

.input-img input[type="file"] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
}


/*section 내용*/

section {
    float: left;
    margin-top: 50px;
    margin-left: 130px;
}

.info {
    background-color: #9c0410;
    width: 100%;
    height: 200px;
    justify-content: space-between;
    flex: 2;
    border-radius: 32px 32px 0px 0px;
    padding: 40px;
    display: flex;
    flex-direction: column;
}

.admininfo {
    margin-top: 30px;
    position: relative;
    top: -60px;
}

.form-control {
    display: flex;
    align-items: center;
    width: 300px;
    height: 40px;
    font-size: 1rem;
    padding-left: 20px;
    color: rgb(137, 137, 137);
    border: 2px solid rgb(221, 221, 221);
    border-radius: 10px;
    margin-right: 10px;
}

.goods_add {
    color: #9c0410;
}

.inputCheck {
    display: flex;
}

.inputRadio {
    display: flex;
}

.inputRadio label {
    margin-right: 7px;
}


.goods_content {
    color: #1f1c24;
}

.goodsbox {
    display: flex;
    margin-bottom: 30px;
}

.form-label {
    margin-top: 10px;
    width: 120px;
    display: flex;
}

.input-group {
    display: flex;
}

.input-group span {
    margin-top: 10px;
}</style>