import { createApp } from './app'
const { app, router, store } = createApp()

// 这里需要先进行客户端状态同步 - 服务端携带过来的store
// 假设同学们用到的是vuex，我这边用的是自己写的状态管理包，就不写了
// 获取服务端渲染时，注入的__INITIAL_STATE__信息，并同步到客户端的vuex store中
// if (window.__INITIAL_STATE__) {
//     store.replaceState(window.__INITIAL_STATE__)
// }
//
// router.isReady().then(() => {
//     // 挂在当前vue实例于id为app的dom上
//     app.use(VueRescroll)
//         .use(VueImageLazyLoad)
//         .mount('#app');
// })
// // 开启路由后置钩子，进行页面数据请求
// router.afterEach(() => {
//     getAsyncData(router, store, false);
// })

// wait until router is ready before mounting to ensure hydration match
router.isReady().then(() => {
    app.mount('#app')
})
