<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div id="app">
        <!-- 头部nav -->
        <header>
            <!-- 登录状态结构 -->
            <div class="login banner" v-if="isLogin">
                <van-row></van-row>

                <van-row>
                    <van-col span="13">
                        <van-row
                            type="flex"
                            justify="space-around"
                            align="center"
                        >
                            <van-image
                                round
                                width="1.6rem"
                                height="1.5rem"
                                :src="userinfo.photo"
                            />
                            <span class="mobile">{{ userinfo.name }}</span>
                        </van-row>
                    </van-col>

                    <van-col span="5"></van-col>

                    <van-col span="5">
                        <van-row
                            type="flex"
                            justify="center"
                            align="center"
                            style="height: 100%"
                        >
                            <van-button
                                type="default"
                                size="mini"
                                round
                                @click="EditMsg"
                                >编辑按钮</van-button
                            >
                        </van-row>
                    </van-col>
                </van-row>

                <van-row>
                    <van-grid class="grid" :border="false">
                        <van-grid-item text="头条">
                            <template #icon>
                                {{ userinfo.art_count }}
                            </template>
                        </van-grid-item>
                        <van-grid-item text="粉丝">
                            <template #icon>
                                {{ userinfo.fans_count }}
                            </template>
                        </van-grid-item>
                        <van-grid-item text="关注">
                            <template #icon>
                                {{ userinfo.follow_count }}
                            </template>
                        </van-grid-item>
                        <van-grid-item text="获赞">
                            <template #icon>
                                {{ userinfo.like_count }}
                            </template>
                        </van-grid-item>
                    </van-grid>
                </van-row>
            </div>
            <!-- 未登录状态结构 -->
            <div class="logout banner" v-else>
                <van-image
                    :src="MobileSrc"
                    width="1.76rem"
                    height="1.76rem"
                    @click="$router.push('/login')"
                />
                <span class="text">登录 / 注册</span>
            </div>
        </header>

        <!-- 主体 -->
        <main>
            <van-grid class="grids" column-num="2" clickable>
                <van-grid-item icon="photo-o" text="收藏">
                    <template #icon>
                        <span class="toutiao toutiao-shoucang"></span>
                    </template>
                </van-grid-item>
                <van-grid-item icon="photo-o" text="历史">
                    <template #icon>
                        <span class="toutiao toutiao-lishi"></span>
                    </template>
                </van-grid-item>
            </van-grid>
            <div class="link">
                <van-cell title="消息通知" is-link />
                <van-cell title="小智同学" is-link />
            </div>
        </main>

        <!-- 底部 -->
        <footer>
            <van-button block v-if="isLogin" class="btnblank" @click="fanhui"
                >退出
            </van-button>
        </footer>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MobileSrc from '@/assets/images/mobile.png'
import { GetUsermsg } from '@/api/user'
export default {
    name: 'VueMy',
    data() {
        return {
            MobileSrc,
            userinfo: {}
        }
    },

    created() {
        this.GetUsermsg()
    },
    methods: {
        // 点击提示

        async fanhui() {
            await this.$dialog.confirm({
                title: '提示',
                message: '您确定要退出账号吗？'
            })
            this.$store.commit('SET_TOKE', {})
        },
        // 获取用户个人信息
        async GetUsermsg() {
            try {
                if (!this.GetUsermsg) return
                const { data } = await GetUsermsg()
                console.log(data)
                this.userinfo = data.data
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    this.$toast.fail('用户认证失败，请重新登录')
                } else {
                    throw err
                }

                console.log(err)
            }
        },
        // 编辑用户个人信息
        // EditMsg() {}
        // fanhui() {
        //     this.$dialog
        //         .confirm({
        //             title: '提示',
        //             message: '您确定要退出账号吗？'
        //         })
        //         .then(() => {
        //             // on confirm
        //             this.$store.commit('SET_TOKE', {})
        //             // this.$router.push('/login')
        //         })
        //         .catch(() => {
        //             // on cancel
        //         })
        // },
        EditMsg() {
            this.$router.push('/User')
        }
    },
    computed: {
        ...mapGetters(['isLogin'])
    }
}
</script>

<style lang="less" scoped>
#app {
    height: 100vh;
    background-color: #f5f7f9;
    .link {
        margin: 10px 0;
    }
}
.banner {
    width: 100%;
    height: 5.34667rem;
    background: url(@/assets/images/banner.png) no-repeat 0 0 / cover;
    background-size: 100% 100%;
}
.logout {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    span {
        margin-top: 20px;
        font-size: 35px;
        color: #fff;
    }
}
.login {
    display: flex;
    flex-direction: column;

    > .van-row {
        flex: 1;
    }
    .mobile {
        font-size: 30px;
        color: #fff;
    }
    .van-col {
        height: 100%;
    }
    .edit-btn {
        width: 1.6rem;
        height: 0.42667rem;
        color: #666;
    }
}
:deep(.grid) {
    color: #fff;
    // background-color: transparent;
    .van-grid-item__content {
        font-size: 30px;
        background-color: inherit;
    }
    .van-grid-item__text {
        color: #fff;
    }
}
:deep(.grids) {
    .toutiao {
        font-size: 0.7rem;
    }
    .toutiao-shoucang {
        color: rgb(221, 22, 22);
    }
    .toutiao-lishi {
        color: rgb(232, 232, 31);
    }
}
:deep(.btnblank) {
    color: red;
}
</style>
