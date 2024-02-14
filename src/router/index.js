import { createRouter, createWebHistory } from 'vue-router'

//메인
import logo from '../views/logo.vue'
import main from '../views/main.vue'
import event from '../views/event.vue'
import login from '../views/login.vue'
import find from '../views/find.vue'

//관리자
import adminUserInfo from '../admin/userInfo.vue'
import adminGoodsList from '../admin/goodsList.vue'
import adminGoodsUpdate from '../admin/goodsUpdate.vue'
import adminGoodsAdd from '../admin/goodsAdd.vue'
import adminOrderM from '../admin/orderM.vue'
import adminQnaList from '../admin/qnaList.vue'
import adminQnaDetail from '../admin/qnaDetail.vue'
import adminQnaAnswer from '../admin/qnaAnswer.vue'

//마이페이지
import mypage from '../mypage/mypage.vue'
import mypageUpdate from '../mypage/mypageUpdate.vue'
import pwUpdate from '../mypage/pwUpdate.vue'
import myOrderList from '../mypage/myOrderList.vue'
import orderDetail from '../mypage/orderDetail.vue'
import myReviewList from '../mypage/myReviewList.vue'
import reviewWrite from '../mypage/reviewWrite.vue'
import reviewUpdate from '../mypage/reviewUpdate.vue'
import myQnaList from '../mypage/myQnaList.vue'
import myQnaDetail from '../mypage/qnaDetail.vue'
import wishList from '../mypage/wishList.vue'

//제품 관련
import goodsCate from '../views/goodsCate.vue'
import cart from '../views/cart.vue'
import goodsDetail from '../views/goodsDetail.vue'
import goodsSearch from '../views/goodsSearch.vue'
import qnaWrite from '../views/qnaWrite'
import qnaDetail from '../views/qnaDetail'

//주문 결제
import order from '../views/order.vue'
import orderCheckout from '../views/orderCheckout.vue'
import orderFail from '../views/orderFail.vue'
import orderSuccess from '../views/orderSuccess.vue'


const routes = [
  /*메인*/
  {
    path: '/logo',
    name: logo,
    component: logo
  },
  {
    path: '/',
    name: main,
    component: main
  },
  {
    path: '/login',
    name: login,
    component: login
  },
  {
    path: '/find',
    name: find,
    component: find
  },
  {
    path: '/event',
    name: event,
    component: event
  },
  {
    path: '/goodsCate/:category',
    name: goodsCate,
    component: goodsCate,
  },
  {
    path: '/cart',
    name: cart,
    component: cart,
  },

  /*관리자*/
  {
    path: '/admin/userInfo',
    name: adminUserInfo,
    component: adminUserInfo
  },
  {
    path: '/admin/goodsList',
    name: adminGoodsList,
    component: adminGoodsList
  },
  {
    path: '/admin/goodsUpdate/:goodsno',
    name: adminGoodsUpdate,
    component: adminGoodsUpdate
  },
  {
    path: '/admin/goodsAdd',
    name: adminGoodsAdd,
    component: adminGoodsAdd
  },
  {
    path: '/admin/orderM',
    name: adminOrderM,
    component: adminOrderM
  },
  {
    path: '/admin/qnaList',
    name: adminQnaList,
    component: adminQnaList
  },
  {
    path: '/admin/qnaDetail',
    name: adminQnaDetail,
    component: adminQnaDetail
  },
  {
    path: '/admin/qnaAnswer',
    name: adminQnaAnswer,
    component: adminQnaAnswer
  },

  /*마이페이지*/
  {
    path: '/mypage',
    name: mypage,
    component: mypage
  },
  {
    path: '/mypage/mypageUpdate',
    name: mypageUpdate,
    component: mypageUpdate
  },
  {
    path: '/mypage/pwUpdate',
    name: pwUpdate,
    component: pwUpdate
  },
  {
    path: '/mypage/myOrderList',
    name: myOrderList,
    component: myOrderList
  },
  {
    path: '/mypage/myReviewList',
    name: myReviewList,
    component: myReviewList
  },
  {
    path: '/reviewWrite/:orderno',
    name: reviewWrite,
    component: reviewWrite
  },
  {
    path: '/reviewUpdate/:reviewno',
    name: reviewUpdate,
    component: reviewUpdate
  },
  {
    path: '/mypage/myQnaList',
    name: myQnaList,
    component: myQnaList
  },
  {
    path: '/mypage/qnaDetail',
    name: myQnaDetail,
    component: myQnaDetail
  },
  {
    path: '/mypage/wishList',
    name: wishList,
    component: wishList
  },

  /*제품상세*/
  {
    path: '/goods/goodsDetail/:goodsno',
    name: goodsDetail,
    component: goodsDetail
  },
  {
    path: '/goods/qnaWrite/:goodsno',
    name: qnaWrite,
    component: qnaWrite
  },
  {
    path: '/goods/qnaDetail/:goodsno',
    name: qnaDetail,
    component: qnaDetail
  },
  {
    path: '/goodsSearch/:keyword',
    name: goodsSearch,
    component: goodsSearch
  },

  /*주문 결제*/
  {
    path: '/order',
    name: order,
    component: order
  },
  /*주문 결제*/
  {
    path: '/order/:orderstype/:goodsno/:quantity',
    name: order,
    component: order
  },
  {
    path: '/order/orderCheckout',
    name: orderCheckout,
    component: orderCheckout
  },
  {
    path: '/order/orderFail',
    name: orderFail,
    component: orderFail
  },
  {
    path: '/order/orderDetail/:orderno',
    name: orderDetail,
    component: orderDetail
  },
  {
    path: '/order/orderSuccess',
    name: orderSuccess,
    component: orderSuccess
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
