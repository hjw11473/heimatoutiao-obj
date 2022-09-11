<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <van-search
            v-model="value"
            shape="round"
            background="#3296fa"
            placeholder="请输入搜索关键词"
        />
    </div>
</template>

<script>
export default {
    data() {
        return {
            value: ''
        }
    },
    mounted() {},
    methods: {}
}
</script>

<style lang="less" scoped></style>
