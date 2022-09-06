<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <router-view></router-view>
        <van-tabbar route>
            <van-tabbar-item replace to="/Layout/Home" icon="home-o"
                >首页</van-tabbar-item
            >
            <van-tabbar-item replace to="/Layout/videoi" icon="search"
                >视频</van-tabbar-item
            >
            <van-tabbar-item replace to="/Layout/wenda" icon="friends-o"
                >问答</van-tabbar-item
            >
            <van-tabbar-item replace to="/Layout/My" icon="setting-o"
                >我的</van-tabbar-item
            >
            <van-tabbar-item replace to="/login" icon="setting-o"
                >登录</van-tabbar-item
            >
        </van-tabbar>
        <!-- <div class="app"></div> -->
        <!-- <van-tabbar route>
            <van-tabbar-item badge="3">
                <span>自定义</span>
                <template #icon="props">
                    <img :src="props.active ? icon.active : icon.inactive" />
                </template>
            </van-tabbar-item>
            <van-tabbar-item icon="search">标签</van-tabbar-item>
            <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
        </van-tabbar> -->
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    mounted() {},
    methods: {}
}
</script>

<style scoped>
.app {
    width: 5rem;
    height: 5rem;
    background-color: red;
}
</style>
