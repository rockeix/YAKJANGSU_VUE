<template>
    <div>
        <div id="mainslider">
            <img class="slider-image" src="../assets/banner3.png" alt="main1" />
        </div>
        <div class="con">
            <!-- <div id='title'>
                <h2>퀴즈를 맞추면 적립금을 드립니다.</h2>
            </div> -->
            <div id='container'>
                <div v-if="questions.length > 0 && questionCounter < questions.length">
                    <img :src="questions[questionCounter].img" alt="Event Image" />
                    <div v-if="questionCounter === 0">
                        <button class="button" @click="nextQuestion">문제 풀기</button>
                    </div>
                    <div v-else>
                        <ul>
                            <li v-for="(choice, index) in questions[questionCounter].choices" :key="index">
                                <input type="radio" :value="index" v-model="selections[questionCounter]" /> {{ choice }}
                            </li>
                        </ul>
                    </div>
                </div>

                <div v-if="questionCounter >= questions.length - 1 && selections[questionCounter] !== null" class="toMain">
                    <p v-if="numCorrect == 3">모두 정답이므로 포인트 3000원이 적립되었습니다.</p>
                    <p v-else>총 {{ questions.length - 4 }}개의 문제 중 {{ 3 - numCorrect }}개를 틀리셨습니다.</p>
                    <button class="button" @click="goToMain" style="margin-left: 300px;">메인가기</button>
                </div>

                <div class="button-group">
                    <!-- <button class="button" @click="prevQuestion" v-if="questionCounter > 1 || (!questionCounter === 2 || !questionCounter === 4) ">이전 문제</button> -->
                    <button class="button" @click="nextQuestion"
                        v-if="questionCounter < questions.length - 1 && selections[questionCounter] !== null">정답 확인</button>
                    <button class="button" @click="nextQuestion" v-if="(questionCounter === 2 || questionCounter === 4)">다음
                        문제</button>
                    <button class="button" @click="submitEvent()" v-if="questionCounter === 6">제출</button>
                </div>
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
            questions: [
                {
                    img: require("../assets/event.png"),
                },
                {
                    img: require("../assets/event1-0.png"),
                    question: "영양제의 효과는 모두에게 동일하게 나타난다.",
                    choices: ['O', 'X'],
                    correctAnswer: 1
                },
                {
                    img: require("../assets/event1-1.png"),
                },
                {
                    img: require("../assets/event2-0.png"),
                    question: "영양제 별 권장 복용시간이 있다.",
                    choices: ['O', 'X'],
                    correctAnswer: 0
                },
                {
                    img: require("../assets/event2-1.png"),
                },
                {
                    img: require("../assets/event3-0.png"),
                    question: "영양제는 물로 복용하는 가장 좋다.",
                    choices: ['O', 'X'],
                    correctAnswer: 0
                },
                {
                    img: require("../assets/event3-1.png"),
                },
            ],
            questionCounter: 0,
            selections: []
        };
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
        numCorrect() {
            return this.selections.filter((selection, index) => selection === this.questions[index].correctAnswer).length;
        }
    },
    methods: {
        nextQuestion() {
            if (this.selections[this.questionCounter] === undefined) {
                alert('정답을 선택해 주세요!');
            } else {
                this.questionCounter++;
            }
        },
        prevQuestion() {
            this.questionCounter--;
        },
        goToMain() {
            this.$router.push({ path: '/' });
        },
        submitEvent() {
            if (this.selections[this.questionCounter] === undefined) {
                alert('정답을 선택해 주세요!');
            } else {
                this.questionCounter++;
            }
            if (this.numCorrect == 3) {
                axios({
                    url: "http://localhost:3000/auth/event_o",
                    method: "POST",
                    data: {
                        user_doevent: 1,
                        user_no: this.user.user_no,
                    }
                })
                    .then(() => {
                        this.$swal("적립금 지급 완료.")
                    })
                    .catch(err => {
                        console.log(err);
                    })
            } else {
                axios({
                    url: "http://localhost:3000/auth/event_x",
                    method: "POST",
                    data: {
                        user_doevent: 1,
                        user_no: this.user.user_no,
                    }
                })
                    .then(() => {
                        this.$swal("다음 기회에")
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        },
    },
    created() {
        this.selections = new Array(this.questions.length).fill(null);
    }
}
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


.app-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: var(--app-container);
    transition: 0.2s;
    max-width: 1800px;
}


.slider-image {
    width: 100%;
    height: 300px;
    object-fit: cover;
}

img {
    width: auto;
    height: 200px;
    /* object-fit: contain; 이미지 비율 */
}

.slider-image {
    width: 100%;
    height: 345px;
    object-fit: cover;
}


/*이벤트 내용 부분*/

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

h1 {
    text-align: center;
}

h2 {
    text-align: center;
}

h3 {
    text-align: center;
}

ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 120px;

}

li {
    width: 180px;
    margin-left: 90px;
    border-radius: 3px;
    /* 테두리 둥글게 */
    background-color: #fff;
    /* 배경색 추가 */
    transition: all 0.3s ease;
    /* 호버 효과를 위한 전환 효과 */
}

li:hover {
    transform: scale(1.1);
    /* 호버시 확대 */
}

#quiz {
    text-indent: 10px;
    display: none;
    margin-left: 90px;
}

.button {
    border: 5px;
    border: 2px solid #000;
    border-radius: 10px;
    width: 80px;
    height: 30px;
    padding-left: 5px;
    padding-right: 5px;
    position: relative;
    float: right;
    background-color: #f3f2f2;
    color: black;
    /* text-align: center; */
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 2px 0 2px;
    font-family: 'GmarketSansMedium';
}

#container button {
    position: relative;
    float: right;
    margin-top: 30px;
}

.button a {
    text-decoration: none;
    color: black;
}

#container img {
    width: 600px;
    height: 600px;
    margin: 35px 20px 20px 35px;
}

.con img {
    width: 600px;
    height: 600px;
    margin: 35px 20px 20px 35px;
}

.con button {
    margin-right: 270px;
}

#title {
    margin-top: 20px;
}

/* #container ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
} */

#prev {
    /* display:none; */
    display: flex;
    align-items: center;
    justify-content: center;
}

#start {
    /* display:none; */
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90px;
}

.button-group {
    float: right;
    display: flex;
    gap: 10px;
    justify-content: space-between;
}

.toMain .button {
    width: 100px;
}

.toMain p {
    text-align: center;
    margin-top: 30px;
    margin-left: 50px;
    font-size: 25px;
}
.toMain .button {
    width: 100px;
    text-align: center;
    margin-top: 30px;
    margin-left: 50px;
}
</style>