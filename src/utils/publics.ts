import {Router} from "vue-router";

interface Component {

}
interface BaseStore {
    $setSsrPath:(s:string)=>{return }
    ssrPath:string;
}

// 执行注册store钩子
export const registerModules = (
    components: Component[],
    router: Router,
    store: BaseStore
) => {
    return components
        .filter((i: any) => typeof i.registerModule === "function")
        .forEach((component: any) => {
            component.registerModule({ router: router.currentRoute, store });
        });
};

// 调用当前匹配到的组件里asyncData钩子，预取数据
export const prefetchData = (
    components: Component[],
    router: Router,
    store: BaseStore
) => {
    const asyncDatas: any[] = components.filter(
        (i: any) => typeof i.asyncData === "function"
    );
    return Promise.all(
        asyncDatas.map((i) => {
            return i.asyncData({ router: router.currentRoute.value, store });
        })
    );
};

// ssr自定义钩子
export const getAsyncData = (
    router: Router,
    store: BaseStore,
    isServer: boolean
): Promise<void> => {
    return new Promise(async (resolve) => {
        const { matched, fullPath } = router.currentRoute.value;

        // 当前路由匹配到的组件
        const components: Component[] = matched.map((i) => {
            return i.components.default;
        });
        // 动态注册store
        registerModules(components, router, store);

        if (isServer || store.ssrPath !== fullPath) {
            // 预取数据
            await prefetchData(components, router, store);
            !isServer && store.$setSsrPath("");
        }

        resolve();
    });
};