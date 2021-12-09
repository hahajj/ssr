import { createApp } from "./app";
import { renderToString } from "@vue/server-renderer";

import { getAsyncData } from './utils/publics.ts';

export async function render(url, manifest) {
    const { app, router, store } = createApp();

    // 同步url
    router.push(url);
    // store.$setSsrPath(url);
    await router.isReady();
    // 新加 + 当路由准备完毕，调用自定义钩子，在服务端获取数据
    await getAsyncData(router, store, true);

    // 生成html字符串
    const ctx = {};
    const html = await renderToString(app, ctx);

    // 根据打包时生成的服务端预取清单manifest，生成资源预取数组
    const preloadLinks = ctx.modules
        ? renderPreloadLinks(ctx.modules, manifest)
        : [];
    return [html, preloadLinks, store];
}

function renderPreloadLinks(modules, manifest) {
    let links = ''
    const seen = new Set()
    modules.forEach((id) => {
        const files = manifest[id]
        if (files) {
            files.forEach((file) => {
                if (!seen.has(file)) {
                    seen.add(file)
                    links += renderPreloadLink(file)
                }
            })
        }
    })
    return links
}

function renderPreloadLink(file) {
    if (file.endsWith('.js')) {
        return `<link rel="modulepreload" crossorigin href="${file}">`
    } else if (file.endsWith('.css')) {
        return `<link rel="stylesheet" href="${file}">`
    } else if (file.endsWith('.woff')) {
        return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`
    } else if (file.endsWith('.woff2')) {
        return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`
    } else if (file.endsWith('.gif')) {
        return ` <link rel="preload" href="${file}" as="image" type="image/gif">`
    } else if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
        return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`
    } else if (file.endsWith('.png')) {
        return ` <link rel="preload" href="${file}" as="image" type="image/png">`
    } else {
        // TODO
        return ''
    }
}