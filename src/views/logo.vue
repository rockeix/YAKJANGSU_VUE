<template>
  <RouterLink to="/">
    <app>
      <div id="intro" ref="intro"></div>
      <button ref="btnRef" class="btn">Main</button>
    </app>
  </RouterLink>
</template>

<script setup>
import { ref, onMounted } from 'vue';


const intro = ref(null);
const btnRef = ref(null);

// intro에 data-text 속성을 설정하는 함수
function setIntroAttribute() {
  return new Promise((resolve) => {
    if (intro.value) {
      intro.value.setAttribute('data-text', 'YACJANGSU');
      resolve();
    }
  });
}

// body 요소에 'is-first' 클래스를 추가하는 함수
function addFirstBodyClass() {
  return new Promise((resolve) => {
    document.body.classList.add('is-first');
    resolve();
  });
}

// body 요소에 'is-second' 클래스를 추가하는 함수 (500ms 지연)
function addSecondBodyClass() {
  return new Promise((resolve) => {
    setTimeout(() => {
      document.body.classList.add('is-second');
      resolve();
    }, 500);
  });
}

// body 요소에 'is-third' 클래스를 추가하는 함수 (100ms후에 실행)
function addThirdBodyClass() {
  return new Promise((resolve) => {
    setTimeout(() => {
      document.body.classList.add('is-third');
      resolve();
    }, 1000);
  });
}

// body에 3500ms 후 버튼 생성
function makeButtonVisible() {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (btnRef.value) {
        btnRef.value.style.visibility = 'visible';
        btnRef.value.style.opacity = '1';
        resolve();
      }
    }, 3500);
  });
}

// start 함수를 추가합니다.
function start() {
  setIntroAttribute()
    .then(() => addFirstBodyClass())
    .then(() => addSecondBodyClass())
    .then(() => addThirdBodyClass())
    .then(() => makeButtonVisible())
    .catch((error) => {
      // 오류 처리
      console.error(error);
    });
}

// 컴포넌트가 마운트되었을 때 start 함수를 실행합니다.
onMounted(start);
</script>
<style scoped>
app {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(#9c0410 50%, #ffffff 50%);
}

app:before,
app:after {
  content: "";
  position: absolute;
  width: 0;
  height: 50vh;
  z-index: -1;
  transition: width 0.5s cubic-bezier(0.19, 1, 0.22, 1);
}

app:before {
  top: 0;
  left: 0;
  background: #9c0410;
}

app:after {
  bottom: 0;
  right: 0;
  background: #fff;
}

app.is-first:before,
app.is-first:after {
  width: 100%;
}

#intro {
  position: relative;
  width: 1000px;
  height: 200px;
  line-height: 200px;
  font-size: 80px;
  font-family: futura, "Century Gothic", sans-serif;
  text-transform: uppercase;
  text-align: center;
}

#intro:before,
#intro:after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  box-sizing: border-box;
  left: 0;
  width: 100%;
  padding-left: 40px;
  letter-spacing: 40px;
}

#intro:before {
  color: #fff;
  clip: rect(0px, 1000px, 100px, 1000px);
}

#intro:after {
  color: #9c0410;
  clip: rect(100px, 0px, 200px, 0px);
}

.is-second #intro:before,
.is-second #intro:after {
  transition: all 2s cubic-bezier(0.19, 1, 0.22, 1);
}

.is-second #intro:before {
  clip: rect(0px, 1000px, 100px, 0px);
}

.is-second #intro:after {
  clip: rect(100px, 1000px, 200px, 0px);
}

.is-third #intro:before {
  -webkit-animation: highToLow 3s cubic-bezier(0.19, 1, 0.22, 1);
  animation: highToLow 3s cubic-bezier(0.19, 1, 0.22, 1);
}

.is-third #intro:after {
  -webkit-animation: lowToHigh 3s cubic-bezier(0.19, 1, 0.22, 1);
  animation: lowToHigh 3s cubic-bezier(0.19, 1, 0.22, 1);
}

@-webkit-keyframes highToLow {
  0% {
    clip: rect(0px, 1000px, 100px, 0px);
  }

  33% {
    clip: rect(0px, 1000px, 140px, 0px);
  }

  66% {
    clip: rect(0px, 1000px, 60px, 0px);
  }

  100% {
    clip: rect(0px, 1000px, 100px, 0px);
  }
}

@keyframes highToLow {
  0% {
    clip: rect(0px, 1000px, 100px, 0px);
  }

  33% {
    clip: rect(0px, 1000px, 140px, 0px);
  }

  66% {
    clip: rect(0px, 1000px, 60px, 0px);
  }

  100% {
    clip: rect(0px, 1000px, 100px, 0px);
  }
}

@-webkit-keyframes lowToHigh {
  0% {
    clip: rect(100px, 1000px, 200px, 0px);
  }

  33% {
    clip: rect(140px, 1000px, 200px, 0px);
  }

  66% {
    clip: rect(60px, 1000px, 200px, 0px);
  }

  100% {
    clip: rect(100px, 1000px, 200px, 0px);
  }
}

@keyframes lowToHigh {
  0% {
    clip: rect(100px, 1000px, 200px, 0px);
  }

  33% {
    clip: rect(140px, 1000px, 200px, 0px);
  }

  66% {
    clip: rect(60px, 1000px, 200px, 0px);
  }

  100% {
    clip: rect(100px, 1000px, 200px, 0px);
  }
}

.btn {
  position: absolute;
  bottom: 10%;
  left: 0;
  right: 0;
  margin: auto;
  box-sizing: border-box;
  width: 120px;
  height: 40px;
  background: #9c0410;
  border: 1px solid #9c0410;
  font-size: 10px;
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  outline: none;
  visibility: hidden;
  opacity: 0;
}

#btn:hover {
  color: #fff;
  background: #9c0410;
}</style>