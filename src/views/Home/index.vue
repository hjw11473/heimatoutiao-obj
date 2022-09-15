<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <!-- 搜索按钮 -->
        <van-nav-bar style="background-color: #3296fa">
            <template #title>
                <van-button
                    type="info"
                    round
                    size="small"
                    color="#5babfb"
                    @click="$router.push('/search')"
                >
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
            <span class="toutiao toutiao-gengduo" @click="isShow = true"></span>
        </van-tabs>
        <!-- 频道弹出层 -->
        <van-popup
            v-model="isShow"
            position="bottom"
            :style="{ height: '100%' }"
            closeable
            close-icon-position="top-left"
        >
            <ChannelEdit
                v-if="isShow"
                @change-active=";[(isShow = false), (active = $event)]"
                :maychannel="hannel"
                @delchannel="del"
                @addchannel="add"
            ></ChannelEdit>
        </van-popup>
    </div>
</template>

<script>
import ArticleList from '@/views/Home/components/ArticleList.vue'
import ChannelEdit from '@/views/Home/components/ChanneiEditpopup.vue'
import { getuserchannel, getdelchannelAPT, getaddchannelAPT } from '@/api'
import { mapGetters, mapMutations } from 'vuex'
export default {
    components: {
        ArticleList,
        ChannelEdit
    },
    data() {
        return {
            // value: ''
            active: 0,
            hannel: [],
            isShow: false
        }
    },
    created() {
        this.initchannles()
    },
    methods: {
        ...mapMutations(['SET_MYCHANNLES']),
        initchannles() {
            // 1. 如果你登录了，应该发送请求获取用户自己的频道
            if (this.isLogin) {
                this.getchannelnav()
            } else {
                // 2. 如果你没有登录,应该读取本地存储的数据
                const statechannles = this.$store.state.mychannles
                if (statechannles.length === 0) {
                    this.getchannelnav()
                } else {
                    this.hannel = statechannles
                }
            }
        },
        // 1. ?? ==> 相当于 || ，常用于语句
        // 2. ?. ==> 可选链操作符，？前面是undifined,那么不会往后取值
        // 获取用户自己的频道
        async getchannelnav() {
            try {
                const {
                    data: { data }
                } = await getuserchannel()
                console.log(data)
                this.hannel = data.channels
            } catch (err) {
                if (err.response && err.response.status === 507) {
                    this.$toast.fail('服务器异常，请刷新')
                } else {
                    throw err
                }
            }
        },
        // 删除我的频道的选项
        async del(id) {
            const newchannles = this.hannel.filter((item) => item.id !== id)
            try {
                if (this.isLogin) {
                    // 发送请求删除频道
                    await getdelchannelAPT(id)
                } else {
                    // 把我的频道存在本地
                    this.SET_MYCHANNLES(newchannles)
                }
                // 视图层删除频道
                this.hannel = newchannles
                this.$toast.success('删除频道成功~')
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    this.$toast.fail('请登录在删除')
                } else {
                    throw err
                }
            }
        },
        // 添加我的频道
        async add(item) {
            try {
                if (this.login) {
                    // 发送请求添加频道
                    await getaddchannelAPT(item.id, this.hannel.length)
                } else {
                    // 把我的频道存在本地
                    this.SET_MYCHANNLES([...this.hannel, item])
                }
                // 视图层添加频道
                this.hannel.push(item)
                this.$toast.success('添加频道成功')
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    this.$toast.fail('请登录在添加')
                } else {
                    throw err
                }
            }
        }
    },
    computed: {
        ...mapGetters(['isLogin'])
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
