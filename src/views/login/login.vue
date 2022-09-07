<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <!-- <h1>登录</h1> -->
        <van-nav-bar
            title="登录"
            left-arrow
            style="background-color: #1989fa"
        />
        <van-form @submit="onSubmit" id="from" ref="from">
            <van-cell-group inset>
                <van-field
                    v-model="mobile"
                    name="mobile"
                    placeholder="请输入手机号"
                    :rules="MobileRules"
                >
                    <template #label>
                        <span class="toutiao toutiao-shouji"></span>
                    </template>
                </van-field>
                <van-field
                    v-model="code"
                    name="code"
                    placeholder="请输入验证码"
                    :rules="CodeRule"
                >
                    <template #label>
                        <span class="toutiao toutiao-yanzhengma"></span>
                    </template>
                    <template #button>
                        <van-button
                            round
                            size="small"
                            type="default"
                            class="btn"
                            v-if="isShowbtn"
                            @click="sendCode"
                            native-type="button"
                            >发送验证码</van-button
                        >
                        <van-count-down
                            v-else
                            :time="3 * 1000"
                            format="ss秒"
                            @finish="isShowbtn = true"
                        />
                    </template>
                </van-field>
            </van-cell-group>
            <div style="margin: 16px">
                <van-button
                    block
                    native-type="submit"
                    type="primary"
                    @click="Getlogin"
                    color="#1989fa"
                    >登录</van-button
                >
            </div>
        </van-form>
    </div>
</template>

<script>
import { MobileRules, CodeRule } from '@/views/login/rule'
import { loginAPI, GetcodesAPI } from '@/api/index'
import { mapMutations } from 'vuex'
export default {
    data() {
        return {
            mobile: '',
            code: '',
            MobileRules,
            CodeRule,
            isShowbtn: true
        }
    },
    created() {
        // this.Getlogin()
    },
    methods: {
        ...mapMutations(['SET_TOKE']),
        loading() {
            this.$toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration: 0
            })
        },
        onSubmit(values) {
            console.log('submit', values)
        },
        // 登录按钮
        async Getlogin() {
            this.$toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration: 0
            })
            try {
                const { data } = await loginAPI(this.mobile, this.code)
                console.log(data)
                this.SET_TOKE(data, data)
                // 成功后跳转路由
                this.$router.push('/my')
                this.$toast.success('登录成功')
            } catch (err) {
                if (err.response && err.response.status === 400) {
                    this.$toast.fail(err.response.data.message)
                    console.log(err)
                    console.log(err.response.data.message)
                } else {
                    // console.dir(err)
                    this.$toast.clear()
                    throw err
                    // this.$toast.fail('登录失败')
                }
            }
        },
        // 验证码显示倒计时组件，并发送请求
        async sendCode() {
            // validate()验证用户是否输入了有效的手机号码
            await this.$refs.from.validate('mobile')
            this.loading()
            try {
                await GetcodesAPI(this.mobile)
                // 显示倒计时时间
                this.isShowbtn = false
                this.$toast.success('发送验证码成功')
            } catch (err) {
                if (
                    err.response &&
                    (err.response.status === 429 || err.response.status === 404)
                ) {
                    // 提示验证码不能重复的发送信息
                    this.$toast.fail(err.response.data.message)
                } else {
                    this.$toast.clear()
                    throw err
                }
            }
        }
    }
}
</script>

<style scoped lang="less">
:deep(.van-icon-arrow-left) {
    color: #fff;
}
:deep(.van-count-down) {
    display: block;
    padding: 0.1812rem;
}
#btn {
    margin: 40px;
}

:deep(.van-nav-bar__title) {
    color: #fff;
}

:deep(#from) {
    .van-cell__title {
        flex: 1;
    }

    .van-cell__value {
        flex: 20;
    }

    .toutiao {
        font-size: 40px;
    }
}
.btn {
    color: #917b66;
}
</style>
