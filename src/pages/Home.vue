<template>
    <h1>Home</h1>
    <p>
      123
    </p>
    <button @click="state.count++">count is: {{ state.count }}</button>
    <p class="virtual">msg from virtual module: {</p>
    <p class="inter">this will be styled with a font-face</p>
    <p class="import-meta-url">{{ state.url }}</p>
    <p class="protocol">{{ state.protocol }}</p>

    <ImportType />
</template>

<script setup>
    import { reactive, defineAsyncComponent } from 'vue'
    const ImportType = load('ImportType')
    function load(file) {
        return defineAsyncComponent(() => import(`../components/${file}.vue`))
    }

    // const url = import.meta.url
    const url = import.meta.env.SSR
        ? import.meta.url
        : document.querySelector('.import-meta-url').textContent
    const protocol = new URL(url).protocol
    const state = reactive({
        count: 0,
        protocol,
        url
    })
</script>

<style scoped>
    h1,
    a {
        color: green;
    }
</style>