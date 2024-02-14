<template>
  <div v-if="$route.path.includes('/logo')">
  </div>
  <div v-else class="app-container">
    <div class="app-header">
      <div class="app-header-left">
        <router-link to="/logo">
          <a href="#" style="text-decoration: none;">
            <p class="app-name">YACJANGSU</p>
          </a>
        </router-link>
        <div class="search-wrapper">
          <input v-model="keyword" class="search-input" type="text" placeholder="Search" @keyup.enter="searchKeyword(keyword)">
          <button class="searchbtn" type="submit" @click="searchKeyword(keyword)"><font-awesome-icon :icon="['fas', 'magnifying-glass']" size="xl" style="color: #000000;" /></button>
        </div>
      </div>
      <div class="app-header-right">
          <button v-if="adminCheck == 1" class="admin-btn" @click="goToAdmin">
            <font-awesome-icon :icon="['fas', 'gear']" size="2xl" style="color: #000000;" />
            <span class="tooltip">관리자모드</span>
          </button>
          <button v-if="user.user_id == ''" class="join-btn" @click="goToLogin()">
            <font-awesome-icon :icon="['fas', 'user-plus']" size="2xl" style="color: #000000;" />
            <span class="tooltip">로그인/회원가입</span>
          </button>
          <div v-else style="display: flex;">
          <button class="cart-btn" @click="goToCart()">
            <font-awesome-icon :icon="['fas', 'cart-shopping']" size="2xl" style="color: #000000;" />
            <span class="tooltip">장바구니</span>
          </button>
          <button class="profile_btn" @click="goToMypage()">
            <font-awesome-icon :icon="['fas', 'circle-user']" size="2xl" style="color: #000000;" />
            <span class="tooltip">마이페이지</span>
          </button>
          <button @click="logout" class="logout_btn">
            <font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']" size="2xl" style="color: #000000;" />
            <span class="tooltip">로그아웃</span>
          </button>
        </div>
      </div>
    </div>

    <div v-if="!$route.path.includes('/login') && !$route.path.includes('/find') && !$route.path.includes('/join')" class="app-middle">
        <button @click="goToCategory(1)">유산균</button>
        <button @click="goToCategory(2)">비타민</button>
        <button @click="goToCategory(3)">오메가</button>
        <button @click="goToCategory(4)">홍삼</button>
        <button @click="goToCategory(5)">기타</button>
     
        <button @click="goToEvent()" style="margin-right: 0px;">이벤트</button>

    </div>
  </div>
</template>
  
<script>
import axios from 'axios';

export default {
  name: 'header',
  data(){
    return {
      loginUser: {},
      adminCheck: 0,
      keyword: this.$route.params.keyword,
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  created() {
    this.getUser();
  },
  mounted() {
    if (this.user.user_id == '') {
      // 일단은 로그인 여부 체크 
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
            this.adminCheck = 1;
          }
        })
        .catch(() => {
          this.$swal("접속 오류");
        })
    }
  },
  methods:{
    async getUser() {
      try {
        const response = await axios.get(`http://localhost:3000/mypage/mypage/${this.user.user_no}`);
        this.loginUser = response.data[0];
      } catch (error) {
        console.error(error);
      }
    },
    goToLogin(){
      this.$router.push({path: '/login'});
    },
    goToMypage() {
      this.$router.push({ path: '/mypage' });
    },
    goToAdmin() {
      this.$router.push({ path: '/admin/userInfo' });
    },
    goToCart() {
      this.$router.push({ path: '/cart' });
    },
    goToEvent() {
      if(this.loginUser.user_doevent == 1){
        this.$swal("이미 이벤트에 참여하셨습니다.")
        this.$router.push({path: '/'});
      } else{
        this.$router.push({path: '/event'});
      }

      if(this.user.user_no === ''){
        this.$swal("로그인이 필요한 페이지입니다.")
        this.$router.push({path: '/login'});
      }
    },
    logout(){
      this.$store.commit("user", {});
      this.$swal({
        position: 'top',
        icon: 'success',
        title: '로그아웃되셨습니다.',
        showConfirmButton: false,
        timer: 1000
      })
        .then(() => {
          window.location.href = "http://localhost:8080";
        })
    },
    async goToCategory(category) {
      try {
        window.location.href = `http://localhost:8080/goodsCate/${category}`;

      } catch (error) {
        console.error('전송 실패:', error);
      }
    },
    searchKeyword(keyword) {
      if (keyword) {
        window.location.href = `http://localhost:8080/goodsSearch/`+ keyword;
      }
    },

  }
}
</script>
  
<style>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--app-container);
  transition: 0.2s;
  max-width: 1800px;
}

.app-container button,
.app-container input,
.app-container optgroup,
.app-container select,
.app-container textarea {
  font-family: 'SejonghospitalBold';
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px 24px;
  position: relative;
}

.app-header-left,
.app-header-right {
  display: flex;
  align-items: center;
}

.app-header-left {
  flex-grow: 1;
}

.app-name {
  font-family: 'ChosunCentennial';
  color: #9c0410;
  margin: 0;
  font-size: 20px;
  line-height: 24px;
  font-weight: 700;
  margin: 0 32px;
}

.app-header-right button {
  margin-left: 10px;
}


.search-wrapper {
  border-radius: 20px;
  background-color: var(--search-area-bg);
  padding-right: 12px;
  margin: 0 auto;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 480px;
  color: var(--light-font);
  box-shadow: 0 2px 6px 0 rgba(136, 148, 171, 0.2), 0 24px 20px -24px rgba(71, 82, 107, 0.1);
  overflow: hidden;
}

.search-input {
  border: none;
  flex: 1;
  outline: none;
  height: 100%;
  padding: 0 20px;
  font-size: 16px;
  background-color: var(--search-area-bg);
  color: var(--main-color);
}

.search-input:placeholder {
  color: var(--main-color);
  opacity: 0.6;
}
.searchbtn{
  background-color: #fff;
  border: none;
}


.tooltip {
  position: absolute;
  bottom: -10px;
  padding: 0 12px;
  height: 27px;
  border-radius: 15px;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  font-size: 13px;
  line-height: 27px;
  white-space: nowrap;
  transition: opacity 0.2s;
  opacity: 0;
  pointer-events: none;
}

.admin-btn {
  color: var(--main-color);
  background-color: transparent;
  border: 0;
  border-radius: 50%;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);

    .tooltip {
      opacity: 1;
    }
  }
}



.join-btn {
  color: var(--main-color);
  background-color: transparent;
  border: 0;
  border-radius: 50%;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);

    .tooltip {
      opacity: 1;
    }
  }
}

.cart-btn {
  color: var(--main-color);
  background-color: transparent;
  border: 0;
  border-radius: 50%;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);

    .tooltip {
      opacity: 1;
    }
  }
}

.profile_btn {
  color: var(--main-color);
  background-color: transparent;
  border: 0;
  border-radius: 50%;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);

    .tooltip {
      opacity: 1;
    }
  }
}

.logout_btn {
  color: var(--main-color);
  background-color: transparent;
  border: 0;
  border-radius: 50%;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);

    .tooltip {
      opacity: 1;
    }
  }
}

/*카테고리 버튼*/

.app-middle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px 200px 24px 200px;
  position: relative;
}

.app-middle button {
  width: 100px;
  height: 35px;
  border: 0;
  border-radius: 5px;
  background-color: #9c0410;
  color: #fff;
  font-size: 15px;
}
</style>