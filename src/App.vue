<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <transition name="van-slide-up" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
export default {}
</script>

<style scoped lang="less"></style>
