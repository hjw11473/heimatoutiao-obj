<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <van-datetime-picker
            v-model="currentDate"
            type="date"
            title="选择年月日"
            :min-date="minDate"
            :max-date="maxDate"
            @cancel="$emit('toChild')"
            @confirm="confirm"
        />
    </div>
</template>

<script>
import { Modifyuser } from '@/api'
import dayjs from 'dayjs'
export default {
    props: {
        value: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            minDate: new Date(1950, 0, 1),
            maxDate: new Date(),
            currentDate: new Date(this.value)
        }
    },
    methods: {
        // 修改用户的生日
        async confirm() {
            this.$toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration: 0 // 持续展示 toast
            })
            const uers = dayjs(this.currentDate).format('YYYY-MM-DD')
            try {
                await Modifyuser({
                    birthday: uers
                })
                // 更新个人信息页面视图
                this.$emit('input', uers)
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
        }
    }
}
</script>

<style lang="less" scoped></style>
