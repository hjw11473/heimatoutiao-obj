<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <router-view></router-view>
        <van-tabbar v-model="active" route>
            <van-tabbar-item replace to="/ ">
                <template #icon>
                    <span class="toutiao toutiao-shouye"></span>
                    <span class="text">首页</span>
                </template>
            </van-tabbar-item>
            <van-tabbar-item replace to="/videoi">
                <template #icon>
                    <span class="toutiao toutiao-shipin"></span>
                    <span class="text">视频</span>
                </template>
            </van-tabbar-item>
            <van-tabbar-item replace to="/QA">
                <template #icon>
                    <span class="toutiao toutiao-wenda"></span>
                    <span class="text">问答</span>
                </template>
            </van-tabbar-item>
            <van-tabbar-item replace to="/my">
                <template #icon>
                    <span class="toutiao toutiao-wode"></span>
                    <span class="text">{{ isLogin ? '我的' : '未登陆' }}</span>
                </template>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            active: 0
        }
    },
    computed: {
        ...mapGetters(['isLogin'])
    }
}
</script>

<style lang="less" scoped>
:deep(.van-tabbar-item__icon) {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
}
.toutiao {
    font-size: 0.6rem;
}
.text {
    font-size: 0.4rem;
}
</style>
