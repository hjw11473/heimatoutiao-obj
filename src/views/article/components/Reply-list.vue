<!-- eslint-disable vue/no-parsing-error -->
<template>
    <div id="app">
        <!-- 头部nav -->
        <div class="nav">
            <van-nav-bar
                :title="
                    total.reply_count == 0
                        ? '暂无回复'
                        : total.reply_count + '条回复'
                "
                left-arrow
                @click-left="$emit('gochange')"
            />
        </div>
        <!-- 头部nav -->

        <!-- 评论列表 -->
        <!-- 楼主 -->
        <van-cell title="content">
            <van-image
                slot="icon"
                round
                width="30"
                height="30"
                style="margin-right: 10px"
                :src="total.aut_photo"
            />
            <span style="color: #466b9d" slot="title">{{
                total.aut_name
            }}</span>
            <div slot="label">
                <p style="color: #363636">{{ total.content }}</p>
                <p>
                    <span style="margin-right: 10px">{{ total.pubdate }}</span>
                    <van-button
                        size="mini"
                        type="default"
                        @click="isshow = true"
                        >回复{{ this.total.reply_count }}</van-button
                    >
                </p>
            </div>
            <van-icon slot="right-icon" name="like-o" />
        </van-cell>
        <!-- 楼主 -->

        <br />

        <!-- 楼层 -->
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="getcommentAPI"
        >
            <van-cell
                v-for="(item, index) in list"
                :key="index"
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
                            >回复</van-button
                        >
                    </p>
                </div>
                <van-icon slot="right-icon" name="like-o" />
            </van-cell>
        </van-list>
        <!-- 楼层 -->
        <!-- 评论列表

        <!-- 发布评论按钮 -->
        <div class="fabu">
            <van-cell
                center
                title="发布评论"
                clickable
                @click="isshow = true"
            />
        </div>
        <!-- 发布评论按钮 -->

        <!-- 发布评论 -->
        <van-popup
            v-model="isshow"
            position="bottom"
            :style="{ height: '25%' }"
        >
            <div class="comment-post">
                <van-field
                    class="post-field"
                    v-model.trim="message"
                    rows="2"
                    autosize
                    type="textarea"
                    maxlength="50"
                    placeholder="请输入留言"
                    show-word-limit
                />
                <van-button
                    touchstart
                    class="post-btn"
                    @click="getcommentaaaAPI"
                    >发布</van-button
                >
            </div>
        </van-popup>
        <!-- /发布评论 -->
    </div>
</template>

<script>
import { getcomment, getcomments } from '@/api'
export default {
    props: {
        total: {
            type: Object,
            default: () => {}
        },
        target: {
            type: [Number, String, Object],
            required: true
        }
    },
    data() {
        return {
            isshow: false, // 回复的弹出层
            list: {}, // 回复评论的评论的列表
            finished: false,
            loading: false,
            message: '', // 用户评论输入
            offset: '' // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
        }
    },
    created() {
        this.getcommentAPI()
    },
    methods: {
        huifu() {
            console.log(this.total)
        },
        // 获取评论的回复列表
        async getcommentAPI() {
            try {
                const {
                    data: { data }
                } = await getcomment({
                    type: 'c',
                    source: this.total.com_id,
                    offset: null
                })
                this.list = data.results
                console.log(this.list)
                if (data.results.length) {
                    this.offset = data.last_id
                }
                this.finished = true
            } catch (error) {
                if (
                    (error.response && error.response.status === 400) ||
                    error.response.status === 507
                ) {
                    this.$toast.fail('获取评论失败')
                } else {
                    throw error
                }
            } finally {
                this.loading = false
            }
        },
        // 回复楼主的评论
        async getcommentaaaAPI() {
            try {
                const {
                    data: { data }
                } = await getcomments({
                    target: this.total.com_id,
                    content: this.message,
                    art_id: this.target.art_id
                })
                this.list.unshift(data.new_obj)
                /* eslint-disable-next-line */
                this.total.reply_count++
                this.$toast.success('回复成功')
                this.isshow = false
                this.message = ''
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    this.$toast.fail('请登录后在回复评论')
                } else if (
                    (err.response && err.response.status === 400) ||
                    err.response.status === 507
                ) {
                    this.$toast.fail('回复失败')
                } else if (err.response && err.response.status === 403) {
                    this.$toast.fail('文章已关闭评论')
                } else {
                    throw err
                }
            }
        }
    }
}
</script>

<style lang="less" scoped>
#app {
    position: relative;
    margin-top: 100px;
}
[data-v-6bda6362] .van-nav-bar {
    position: fixed;
    top: 0;
    z-index: 1;
    width: 100%;
}

:deep(.fabu) {
    .van-cell {
        position: fixed;
        z-index: 100;
        bottom: 0;
        border-top: 0.01rem solid rgb(229, 227, 227);

        .van-cell__title {
            text-align: center;
        }
    }
}

.comment-post {
    display: flex;
    align-items: center;
    padding: 32px 0 32px 32px;

    .post-field {
        background-color: #f5f7f9;
    }

    .post-btn {
        width: 150px;
        border: none;
        padding: 0;
        color: #6ba3d8;

        &::before {
            display: none;
        }
    }
}
</style>
