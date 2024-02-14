<template>
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
                                    <font-awesome-icon icon="fa-solid fa-circle-question" size="xl"
                                        style="color: #9c0410;" />
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
            <div class="myinfo">
                <div>
                    <h2>내 정보</h2>
                </div>
                <hr>

                <div class="mypage">

                    <div class="detail">
                        <p>아이디</p>
                        <div>
                            <h4>{{ loginUser.user_id }}</h4>
                        </div>
                    </div>
                    <div class="detail">
                        <p>이메일</p>
                        <div>
                            <h4>{{ loginUser.user_email }}</h4>
                        </div>
                    </div>
                    <div class="detail">
                        <p>생년월일</p>
                        <div>
                            <h4>{{ loginUser.user_birth }}</h4>
                        </div>
                    </div>
                    <div class="detail">
                        <p>전화번호</p>
                        <div>
                            <h4>{{ loginUser.user_phone }}</h4>
                        </div>
                    </div>
                    <div class="detail">
                        <p>주소</p>
                        <div class="de">
                            <h4>{{ loginUser.user_zipcode }}</h4>
                            <br>
                            <h4>{{ loginUser.user_adr1 }}</h4>
                            <br>
                            <h4>{{ loginUser.user_adr2 }}</h4>
                            <br>
                        </div>
                    </div>
                </div>
                <hr>

                <div class="btn">
                    <router-link to="/mypage/mypageUpdate">
                        <button class="modifybtn">수정하기</button>
                    </router-link>
                    <div>
                        <button class="deletebtn" @click="confirmDeleteAccount(user)">회원탈퇴</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    // el: "#app",

    data() {
        return {
            // num: 0,
            loginUser: {},
            userOrder: {},
            userDeli: {},
        };
    },
    computed: {
        user() {
            return this.$store.state.user;
        }
    },
    mounted() {
        if (this.user.user_no == '') {
            alert('로그인해주세요');
            this.$router.push({ path: '/login' });
        }
    },
    created() {
        this.getUser();
        this.getUserOrder();
        this.getUserDeli();
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
                this.userOrder = response.data[0];
            } catch (error) {
                console.error(error);
            }
        },
        async getUserDeli() {
            try {
                const response = await axios.get(`http://localhost:3000/mypage/delibox/${this.user.user_no}`);
                this.userDeli = response.data[0];
            } catch (error) {
                console.error(error);
            }
        },
        confirmDeleteAccount(user) {
            this.$swal({
                title: `${this.loginUser.user_name}님 정말 탈퇴 하시겠습니까?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: '탈퇴',
                cancelButtonText: '취소',
                reverseButtons: true
            }).then(result => {
                if (result.value) {
                    this.deleteAccount(user);
                    this.$store.commit("user", {});
                    this.$swal({
                        position: 'top',
                        icon: 'success',
                        title: '탈퇴되셨습니다.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                        .then(() => {
                            window.location.href = "http://localhost:8080";
                        })

                }
            });
        },
        logout() {
            this.$store.commit("user", {})
                .then(() => {
                    window.location.href = "http://localhost:8080";
                })
        },
        async deleteAccount(user) {
            console.log('탈퇴 버튼 클릭 - 사용자 정보:', user);
            try {
                const response = await axios.delete(`http://localhost:3000/mypage/mypage/${this.user.user_no}`);
                this.logout();
                this.loginUser = response.data[0];
                console.log('탈퇴 성공:', response.data[0])
            } catch (error) {
                console.error('탈퇴 실패:', error);
            }
        },

    }

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

.container {
    margin: 40px 30px;
}

h2 {
    margin: 20px 0;
}

/*내 정보*/

.container-wrapper {
    border: 1.5px solid #9c0410;
    border-radius: 20px;
    padding: 15px;
    margin-top: 20px;
    height: 600px;
}

.myinfo {
    width: 500px;
    margin: 0 auto;
    margin-top: 90px;
    /* margin-bottom: -100px; */
    position: relative;
    font-weight: 700;
    /* background-color: #fff2c9; */
    height: 800px;
}

.mypage {
   margin-top: 50px;
}

.mypage p {
    width: 100px;
    font-size: 20px;
    /* font-size: 1rem; */
    display: inline-block;
    vertical-align: middle;
    padding: 2px;
    margin: 0px 30px 16px 0px;
    /* border: 1px solid red; */
}

hr {
    border: 1px solid rgb(89, 89, 89);
}
.mypage .detail {
    display: flex;
    margin-left: 60px;
    margin-bottom: 10px;
}

.mypage .detail h4 {
    font-size: 20px;
    
}

.detail .de h4 {
    margin-bottom: 10px;
}

/*수정 탈퇴 버튼*/

.btn {
    display: flex;
    margin-top: 40px;
    margin-left: 150px;
    text-align: center;
    margin-bottom: 50px;
}

.modifybtn {
    width: 80px;
    height: 40px;
    background-color: #9c0410;
    border: 2px solid #9c0410;
    color: #ffffff;
    border-radius: 10px;
    margin-right: 10px;
    margin-left: 180px;
    margin-top: -230px;
    font-size: 15px;
    font-family: 'SejonghospitalBold';
}

.deletebtn {
    width: 80px;
    height: 40px;
    background-color: #fff;
    border: 2px solid #707070;
    border-radius: 10px;
    margin-right: 20px;
    margin-top: -230px;
    font-size: 15px;
    font-family: 'SejonghospitalBold';
}
</style>