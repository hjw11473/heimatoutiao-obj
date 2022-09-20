<!-- eslint-disable vue/no-mutating-props -->
<!-- eslint-disable vue/no-mutating-props -->
<template>
    <div class="article-comments">
        <!-- 评论列表 -->
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="getcommentAPI"
        >
            <van-cell
                v-for="item in list"
                :key="item.com_id"
                :title="item.content"
            >
                <van-image
                    slot="icon"
                    round
                    width="30"
                    height="30"
                    style="margin-right: 10px"
                    :src="item.aut_photo"
                />
                <span style="color: #466b9d" slot="title">{{
                    item.aut_name
                }}</span>
                <div slot="label">
                    <p style="color: #363636">{{ item.content }}</p>
                    <p>
                        <span style="margin-right: 10px">{{
                            item.pubdate
                        }}</span>
                        <van-button
                            size="mini"
                            type="default"
                            @click="huifu(item)"
                            >回复{{ item.reply_count }}</van-button
                        >
                    </p>
                </div>
                <van-icon slot="right-icon" name="like-o" />
            </van-cell>
        </van-list>
        <!-- 评论列表 -->

        <!-- 评论页面组件 -->
        <van-popup
            class="popups"
            v-model="Replyisshow"
            position="bottom"
            :style="{ height: '100%' }"
        >
            <ReplyListVue
                @gochange="change"
                :total="replyToASingleComment"
                :target="target"
            ></ReplyListVue>
        </van-popup>
        <!-- 评论页面组件 -->
    </div>
</template>

<script>
import { getcomment } from '@/api'
// 回复页面
import ReplyListVue from './Reply-list.vue'
export default {
    props: {
        target: {
            type: [Number, String, Object],
            required: true
        },
        list: {
            type: Array,
            default: () => []
        }
    },
    components: {
        ReplyListVue
    },
    data() {
        return {
            // list: [], // 评论列表
            loading: false, // 上拉加载更多的 loading
            finished: false, // 是否加载结束
            isshow: false, // 评论列表显示
            source: this.$route.params.articleId,
            offset: null,
            Replyisshow: false, // 评论页面弹出层
            lists: [],
            total: [],
            replyToASingleComment: []
        }
    },
    created() {
        this.getcommentAPI()
    },
    methods: {
        // 获取评论第一层列表
        async getcommentAPI() {
            try {
                const {
                    data: { data }
                } = await getcomment({
                    type: 'a',
                    source: this.source,
                    offset: this.offset
                })
                console.log(data)
                this.total = data
                this.$emit('Numberofcomments', data)
                const { results } = data
                this.list.push(...results)
                if (results.length) {
                    this.offset = data.last_id
                } else {
                    this.finished = true
                }
                this.$emit('subprice', this.list) // 子向父
            } catch (error) {
                if (error.response && error.response.status === 507) {
                    this.$toast.fail('获取评论失败')
                } else {
                    throw error
                }
            } finally {
                // 关闭loading
                this.loading = false
            }
        },
        huifu(item) {
            this.replyToASingleComment = item
            this.Replyisshow = true
            console.log(item)
        },
        change() {
            this.Replyisshow = false
        }
    }
}
</script>

<style scoped lang="less">
:deep(.popups) {
    z-index: 100;
}
.publish-wrap {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
}

.van-list {
    margin-bottom: 45px;
}
</style>
