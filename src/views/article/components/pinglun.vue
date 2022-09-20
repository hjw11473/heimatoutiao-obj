<template>
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
        <van-button touchstart class="post-btn" @click="getcommentsAPI"
            >发布</van-button
        >
    </div>
</template>

<script>
import { getcomments } from '@/api'
export default {
    name: 'CommentPost',
    components: {},
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
    data() {
        return {
            message: '',
            value: {}
        }
    },
    methods: {
        async getcommentsAPI() {
            try {
                const {
                    data: { data }
                } = await getcomments({
                    target: this.target.art_id,
                    content: this.message,
                    art_id: null
                })
                if (!this.message) {
                    this.$toast.success('文本输入不能为空')
                }
                this.list.unshift(data.new_obj)
                console.log(this.list)
                this.$toast.success('发送成功')
                if (this.$toast.success('发送成功')) {
                    this.$emit('Replyplusone', 1)
                }
                this.$emit('Usercomment', this.message)
                this.$emit('toCilden')
                this.message = ''
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    this.$toast.fail('请登录后在发表评论')
                } else if (
                    (err.response && err.response.status === 400) ||
                    err.response.status === 507
                ) {
                    this.$toast.fail('评论失败')
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

<style scoped lang="less">
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
