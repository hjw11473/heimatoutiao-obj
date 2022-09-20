<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <van-nav-bar
            title="更新昵称"
            left-text="取消"
            right-text="保存"
            left-arrow
            @click-left="$emit('toChild')"
            @click-right="ModifyusernameAPI"
        />
        <van-field
            class="textarea"
            v-model.trim="message"
            rows="2"
            autosize
            type="textarea"
            maxlength="10"
            placeholder="请输入新的昵称"
            show-word-limit
        />
    </div>
</template>

<script>
import { Modifyuser } from '@/api'
export default {
    props: {
        value: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            message: this.value
        }
    },
    created() {},
    methods: {
        async ModifyusernameAPI() {
            this.$toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration: 0 // 持续展示 toast
            })
            try {
                if (!this.message) {
                    return this.$toast.fail('用户名不能为空')
                }
                await Modifyuser({
                    name: this.message
                })
                // 更新个人信息页面视图
                this.$emit('input', this.message)
                // 完成后要关闭field组件
                this.$emit('toChild')
                // 完成后提示更新成功
                this.$toast.success('修改成功')
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    this.$toast.fail('更新昵称失败')
                } else {
                    throw error
                }
            }
        }
    },
    computed: {}
}
</script>

<style scoped lang="less">
:deep(.textarea) {
    background-color: #fafafa;
}
</style>
