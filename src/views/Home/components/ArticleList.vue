<template>
    <div class="article">
        <van-pull-refresh v-model="listLoading" @refresh="getlistscoll">
            <van-list
                v-model="loading"
                @load="getlistscoll"
                offset="100"
                :immediate-check="false"
                :finished="finished"
                finished-text="没有更多文章了~~"
                :error.sync="error"
                error-text="请求失败，点击重试加载"
            >
                <List
                    v-for="item in list"
                    :key="item.art_id"
                    :artice="item"
                ></List>
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
import { getarticles } from '@/api'
import List from '@/views/Home/components/List.vue'

export default {
    components: {
        List
    },
    props: {
        id: [String, Number]
    },
    data() {
        return {
            list: [],
            page: '',
            loading: false,
            finished: false,
            error: false,
            listLoading: false
        }
    },
    created() {
        this.getgetarticlesAPI()
    },
    methods: {
        async getgetarticlesAPI() {
            try {
                const {
                    data: { data }
                } = await getarticles(this.id, +new Date())
                this.list = data.results
                // 保存下一页的时间戳，用于分页
                console.log(data)
                this.page = data.pre_timestamp
            } catch (err) {
                if (!err.response || err.response.status === 507) {
                    throw err
                } else if (err.response.status === 400) {
                    throw new Error(err.response.data.message)
                }
            }
        },
        async getlistscoll() {
            try {
                // if (Math.random() < 0.5) {
                //     throw new Error()
                // }
                // 发送请求
                const {
                    data: { data }
                } = await getarticles(this.id, this.page)
                // 如果没有下文了就显示没有更多文章了
                if (!data.pre_timestamp) {
                    this.finished = true
                }
                if (this.loading) {
                    // 添加到list原数组
                    this.list.push(...data.results)
                } else {
                    this.list.unshift(...data.results)
                }
                // 更新时间戳
                this.page = data.pre_timestamp
            } catch (err) {
                this.err = true
            } finally {
                // 更改loading为false,可以继续请求下一次
                // finally里更改laoding语义化更强
                this.loading = false
                this.listLoading = false
            }
        }
    }
}
</script>

<style lang="less" scoped>
.article {
    height: calc(100vh - 92px - 83px - 100px);
    overflow: auto;
    // 页面滚动槽
    &::-webkit-scrollbar {
        background-color: transparent;
        width: 10px;
    }
    // 滚动滑块
    &::-webkit-scrollbar-thumb {
        background-color: #3296fa;
        border-radius: 10px;
    }
}
</style>
