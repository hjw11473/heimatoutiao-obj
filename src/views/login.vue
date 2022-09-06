<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <!-- <h1>登录</h1> -->
        <van-nav-bar title="登录" style="background-color: #1989fa" />
        <van-form @submit="onSubmit" id="from">
            <van-cell-group inset>
                <van-field
                    v-model="mobile"
                    name="mobile"
                    placeholder="请输入手机号"
                    :rules="[
                        {
                            // pattern设定一个正则表达式
                            pattern:
                                /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
                            message: '手机格式错误'
                        },
                        { required: true, message: '请填写手机号' }
                    ]"
                >
                    <template #label>
                        <span class="toutiao toutiao-shouji"></span>
                    </template>
                </van-field>
                <van-field
                    v-model="code"
                    name="code"
                    placeholder="请输入验证码"
                    :rules="[
                        {
                            pattern: /[0-9]{6}/,
                            message: '验证码格式错误'
                        },
                        { required: true, message: '请填写验证码' }
                    ]"
                >
                    <template #label>
                        <span class="toutiao toutiao-yanzhengma"></span>
                    </template>
                    <template #button>
                        <van-button
                            round
                            size="small"
                            type="primary"
                            color="#ededed"
                            >发送验证码</van-button
                        >
                    </template>
                </van-field>
            </van-cell-group>
            <div style="margin: 16px">
                <van-button
                    block
                    native-type="submit"
                    type="primary"
                    color="#6db4fb"
                    >登录</van-button
                >
            </div>
        </van-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            mobile: '',
            code: ''
        }
    },
    methods: {
        onSubmit(values) {
            console.log('submit', values)
        }
    }
}
</script>

<style scoped lang="less">
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
</style>
