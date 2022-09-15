<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="result">
        <van-list
            v-model="loading"
            @load="getResults"
            :finished="finished"
            finished-text="没有更多了..."
            :error.sync="error"
            error-text="加载失败,点击重试.."
        >
            <van-cell
                v-for="item in results"
                :key="item.art_id"
                @click="
                    $router.push({
                        path: '/detail',
                        query: { articleld: item.art_id }
                    })
                "
            >
                <template #title>
                    <span>{{ item.title }}</span>
                    <!-- <p>{{ item.pubdate }}</p> -->
                </template>
            </van-cell>
        </van-list>
    </div>
</template>

<script>
import { getResultAPI } from '@/api'
export default {
    props: {
        keyvalue: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            Result: [],
            loading: false,
            finished: false,
            error: false,
            page: 1,
            perpage: 10,
            results: []
        }
    },
    methods: {
        async getResults() {
            try {
                // if (Math.random() < 0.5) {
                //     throw new Error()
                // }
                // 发送请求
                const {
                    data: { data }
                } = await getResultAPI(this.page++, this.perpage, this.keyvalue)

                if (data.results.length === 0) {
                    this.finished = true
                }
                // 保存数据
                this.results = [...this.results, ...data.results]
            } catch (err) {
                // this.error = true
            } finally {
                // 关闭loading
                this.loading = false
            }
        }
    }
}
</script>

<style lang="less" scoped>
.result {
    height: calc(100vh - 108px);
    overflow: overlay;
}
</style>
