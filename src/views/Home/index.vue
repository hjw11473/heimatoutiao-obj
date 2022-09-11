<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <!-- 搜索按钮 -->
        <van-nav-bar style="background-color: #3296fa">
            <template #title>
                <van-button type="info" round size="small" color="#5babfb">
                    <van-icon name="search" color="#fff" />
                    <span>搜索</span>
                </van-button>
            </template>
        </van-nav-bar>
        <!-- nav导航切换 -->
        <van-tabs v-model="active" swipeable>
            <van-tab :title="item.name" v-for="item in hannel" :key="item.id">
                <!-- 文章详情 -->
                <ArticleList :id="item.id"></ArticleList>
            </van-tab>
            <span class="toutiao toutiao-gengduo"></span>
        </van-tabs>
    </div>
</template>

<script>
import ArticleList from '@/views/Home/components/ArticleList.vue'
import { getchannel } from '@/api'
export default {
    components: {
        ArticleList
    },
    data() {
        return {
            // value: ''
            active: 0,
            hannel: []
        }
    },
    created() {
        this.getchannelnav()
    },
    methods: {
        // 1. ?? ==> 相当于 || ，常用于语句
        // 2. ?. ==> 可选链操作符，？前面是undifined,那么不会往后取值
        async getchannelnav() {
            try {
                const {
                    data: { data }
                } = await getchannel()
                this.hannel = data.channels
            } catch (err) {
                // if (err.response && err.response.status === 507) {
                if (err.response && err.response.status === 507) {
                    this.$toast.fail('服务器异常，请刷新')
                } else {
                    throw err
                }
            }
        }
    }
}
</script>

<style lang="less" scoped>
// 穿透搜索框的按钮样式
:deep(.van-button) {
    border: 0;
    width: 7.4rem;
    font-size: 30px;
}
:deep(.van-nav-bar__title) {
    max-width: unset;
}
// nav导航切换
/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
    padding-right: 66px;

    .van-tabs__nav {
        padding-left: 0;
        padding-right: 0;

        /* tab标签 */
        .van-tab {
            border: 1px solid #eee;
            width: 200px;
            height: 82px;
        }

        /* tab标签下划线 */
        .van-tabs__line {
            width: 31px;
            height: 6px;
            background-color: #3296fa;
            bottom: 40px;
        }
    }
}

/* 字体图标 */
.toutiao-gengduo {
    position: absolute;
    top: 0;
    right: 0;
    width: 66px;
    height: 82px;
    font-size: 40px;
    line-height: 82px;
    text-align: center;
    opacity: 0.6;
    border-bottom: 1px solid #eee;

    &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        height: 70%;
        width: 1px;
        background-image: url('~@/assets/images/gradient-gray-line.png');
    }
}
</style>
