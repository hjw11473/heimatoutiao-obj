<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <!-- <h1>登录</h1> -->
        <van-nav-bar title="登录" style="background-color: #1989fa" />
        <van-cell-group inset>
            <van-field
                v-model="value1"
                label="文本"
                left-icon="smile-o"
                right-icon="warning-o"
                placeholder="显示图标"
            />
            <van-field
                v-model="value2"
                clearable
                label="文本"
                left-icon="music-o"
                placeholder="显示清除图标"
            />
        </van-cell-group>
        <div id="btn">
            <van-button type="primary" block color="#1989fa">登录</van-button>
        </div>
        <!-- <van-button type="success">主要按钮</van-button> -->
    </div>
</template>

<script>
export default {}
</script>

<style scoped>
#btn {
    margin: 40px;
    background-color: ;
}
/* :deep(.van-button) {
    width: 11rem;
    height: 1.5rem;
} */
</style>
