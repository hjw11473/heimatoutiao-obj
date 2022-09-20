<template>
    <div class="article-container markdown-body">
        <!-- 导航栏 -->
        <div>
            <van-nav-bar
                class="page-nav-bar"
                left-arrow
                title="黑马头条"
                @click-left="$router.push('/ ')"
            ></van-nav-bar>
        </div>
        <!-- /导航栏 -->

        <div class="main-wrap">
            <!-- 加载中 -->
            <div class="loading-wrap" v-if="loading">
                <van-loading color="#3296fa" vertical>加载中</van-loading>
            </div>
            <!-- /加载中 -->

            <!-- 加载完成-文章详情 -->
            <div class="article-detail" v-else-if="article.title">
                <!-- 文章标题 -->
                <h1 class="article-title">{{ article.title }}</h1>
                <!-- /文章标题 -->

                <!-- 用户信息 -->
                <van-cell class="user-info" center :border="false">
                    <van-image
                        class="avatar"
                        slot="icon"
                        round
                        fit="cover"
                        :src="article.aut_photo"
                    />
                    <div slot="title" class="user-name">
                        {{ article.aut_name }}
                    </div>
                    <div slot="label" class="publish-date">
                        {{ article.pubdate }}
                    </div>
                    <van-button
                        v-if="article.is_followed"
                        class="follow-btn"
                        round
                        size="small"
                        @click="addfollowingsAPI"
                    >
                        已关注</van-button
                    >
                    <van-button
                        v-else
                        class="follow-btn"
                        round
                        type="info"
                        size="small"
                        icon="plus"
                        @click="addfollowingsAPI"
                        >关注</van-button
                    >
                </van-cell>
                <!-- /用户信息 -->

                <!-- 文章内容 -->
                <div class="article-content" v-html="article.content"></div>
                <van-divider>正文结束</van-divider>
            </div>
            <!-- /加载完成-文章详情 -->

            <!-- 加载失败：404 -->
            <div class="error-wrap" v-else-if="fourandfour === 404">
                <van-icon name="failure" />
                <p class="text">该资源不存在或已删除！</p>
            </div>
            <!-- /加载失败：404 -->

            <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
            <div class="error-wrap" v-else>
                <van-icon name="failure" />
                <p class="text">内容加载失败！</p>
                <van-button class="retry-btn" @click="getarticlesidAPI"
                    >点击重试</van-button
                >
            </div>
            <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->

            <!-- 用户评论区域 -->
            <div>
                <CommentList
                    v-if="article.art_id"
                    :source="article.art_id"
                    :list="lists"
                    @Numberofcomments="totalcount"
                    :target="article"
                ></CommentList>
            </div>
            <!-- 用户评论区域 -->
        </div>

        <!-- 底部 -->
        <van-tabbar>
            <van-button type="default" size="mini" round @click="coshowPL"
                >写评论</van-button
            >
            <!-- 显示文章数量功能 -->
            <van-tabbar-item
                icon="comment-o"
                :badge="total.total_count"
            ></van-tabbar-item>
            <!-- 收藏功能 -->
            <van-tabbar-item>
                <template #icon>
                    <van-icon
                        v-if="article.is_collected"
                        name="star"
                        @click="collectionsAPI"
                        color="yellow"
                    />
                    <van-icon v-else name="star-o" @click="collectionsAPI" />
                </template>
            </van-tabbar-item>

            <van-tabbar-item icon="good-job-o"></van-tabbar-item>
            <van-tabbar-item icon="share-o"></van-tabbar-item>
        </van-tabbar>
        <!-- 评论弹出层 -->
        <van-popup
            v-model="coshow"
            position="bottom"
            :style="{ height: '25%' }"
        >
            <pinglun :target="article" @toCilden="kkk" :list="lists"></pinglun>
        </van-popup>
    </div>
</template>

<script>
import {
    getarticlesID,
    Getuserprofile,
    addfollowings,
    delfollowings,
    addcollections,
    delcollections
} from '@/api'
// 发送评论
import pinglun from '@/views/article/components/pinglun.vue'
// 评论列表
import CommentList from '@/views/article/components/Comment-List.vue'

import 'github-markdown-css'

export default {
    name: 'ArticleIndex',
    components: {
        pinglun,
        CommentList
    },
    props: {
        articleId: {
            type: [Number, String, Object],
            required: true,
            textcomm: ''
        }
    },
    data() {
        return {
            article: {}, // 文章详情
            avatar: '',
            fourandfour: 0, // 页面404
            loading: true,
            isshow: false, // 发送评论
            Usercomments: ' ', // 用户评论
            lists: [],
            total: [], // 显示评论数量
            coshow: false,
            source: this.$route.params.articleId
        }
    },
    computed: {},
    watch: {},
    created() {
        this.getarticlesidAPI()
        // this.GetuserprofileAPI()
    },
    mounted() {},
    methods: {
        async getarticlesidAPI() {
            this.loading = true
            try {
                const {
                    data: { data }
                } = await getarticlesID(this.articleId)
                this.article = data
                console.log(data)
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    this.fourandfour = 404
                }
            }
            this.loading = false
        },
        async GetuserprofileAPI() {
            const {
                data: { data }
            } = await Getuserprofile()
            console.log(data)
            // this.avatar = data
        },
        onseccus() {},
        // 关注用户
        async addfollowingsAPI() {
            try {
                if (this.article.is_followed) {
                    await delfollowings(this.article.aut_id)
                    console.log(this.article.aut_id)
                    this.$toast.success('取消关注成功')
                } else {
                    await addfollowings(this.article.aut_id)
                    this.$toast.success('关注成功')
                }
                this.article.is_followed = !this.article.is_followed
            } catch (error) {
                if (error.response.status === 401) {
                    this.$toast.fail('请登录后在关注')
                } else if (error.response && error.response.status === 507) {
                    this.$toast.fail('关注失败')
                } else if (error.response && error.response.status === 400) {
                    this.$toast.fail('你不能关注自己')
                } else {
                    throw error
                }
            }
        },
        totalcount(data) {
            this.total = data
            console.log(this.total)
        },
        CommentDisplay() {
            this.isshow = true
            this.$nextTick(() => {
                console.log(this.$refs.Comment)
                // this.$refs.Comment.style
                // this.$refs.Comment.setAttribute('class', 'Comment')
            })
        },
        coshowPL() {
            this.coshow = true
        },
        kkk() {
            this.coshow = false
        },
        // 收藏文章
        async collectionsAPI() {
            try {
                if (this.article.is_collected) {
                    await delcollections(this.source)
                    this.$toast.success('取消收藏成功')
                    this.article.is_collected = 0
                } else {
                    await addcollections(this.source)
                    this.$toast.success('收藏成功')
                    // this.$refs.icons.style.color = 'yellow'
                    this.article.is_collected = 1
                }
            } catch (error) {
                if (error.response.status === 401) {
                    this.$toast.fail('请登录后在收藏')
                } else if (error.response && error.response.status === 507) {
                    this.$toast.fail('收藏失败')
                } else if (error.response && error.response.status === 400) {
                    this.$toast.fail('你不能收藏自己')
                } else {
                    throw error
                }
            }
        }
    }
}
</script>

<style scoped lang="less">
:deep(.van-nav-bar) {
    z-index: 0;
}
:deep(.van-tabbar) {
    z-index: -1;
}
:deep(.van-field__value) {
    background-color: #f5f7f9;
    // margin: 0.3rem 0.5rem;
    padding: 0.4rem;
    height: 2rem;
    width: 100%;

    .van-field__word-limit {
        margin-top: 0.3rem;
    }
}

.pinglun {
    display: flex;
}

.article-container {
    .main-wrap {
        position: fixed;
        left: 0;
        right: 0;
        top: 92px;
        bottom: 88px;
        overflow-y: scroll;
        // width: 10rem;
        background-color: #fff;
    }

    .article-detail {
        .article-title {
            font-size: 40px;
            padding: 50px 32px;
            margin: 0;
            color: #3a3a3a;
        }

        .user-info {
            padding: 0 32px;

            .avatar {
                width: 70px;
                height: 70px;
                margin-right: 17px;
            }

            .van-cell__label {
                margin-top: 0;
            }

            .user-name {
                font-size: 24px;
                color: #3a3a3a;
            }

            .publish-date {
                font-size: 23px;
                color: #b7b7b7;
            }

            .follow-btn {
                width: 170px;
                height: 58px;
            }
        }

        .article-content {
            padding: 55px 32px;

            /deep/ p {
                text-align: justify;
            }
        }
    }

    .loading-wrap {
        padding: 200px 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
    }

    .error-wrap {
        padding: 200px 32px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #fff;

        .van-icon {
            font-size: 122px;
            color: #b4b4b4;
        }

        .text {
            font-size: 30px;
            color: #666666;
            margin: 33px 0 46px;
        }

        .retry-btn {
            width: 280px;
            height: 70px;
            line-height: 70px;
            border: 1px solid #c3c3c3;
            font-size: 30px;
            color: #666666;
        }
    }
    :deep(.van-hairline--top-bottom) {
        align-items: center;
        .van-button {
            flex: 4;
            margin: 0.5rem;
        }
    }
}
</style>
