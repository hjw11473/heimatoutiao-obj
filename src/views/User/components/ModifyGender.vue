<template>
    <div>
        <van-picker
            title="更新性别"
            show-toolbar
            :columns="sex"
            :default-index="value"
            @change="onChange"
            @cancel="$emit('toChild')"
            @confirm="ModifyuserGenderAPI"
        />
    </div>
</template>

<script>
import { Modifyuser } from '@/api'
export default {
    props: {
        value: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            sex: ['男', '女'],
            sexindex: this.value
        }
    },
    methods: {
        // 修改用户的性别
        async ModifyuserGenderAPI() {
            this.$toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration: 0 // 持续展示 toast
            })
            try {
                await Modifyuser({
                    gender: this.sexindex
                })
                // 更新个人信息页面视图
                this.$emit('input', this.sexindex)
                // 完成后要关闭field组件
                this.$emit('toChild')
                // 完成后提示更新成功
                this.$toast.success('修改成功')
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    this.$toast.fail('修改失败')
                } else {
                    throw error
                }
            }
        },
        onChange(picker, values, index) {
            // picker.setColumnValues(1, cities[values[0]])
            console.log({ index })
            this.sexindex = index
        }
    }
}
</script>

<style lang="less" scoped>
:deep(.van-picker__columns) {
    background-color: #fafafa;
}
</style>
