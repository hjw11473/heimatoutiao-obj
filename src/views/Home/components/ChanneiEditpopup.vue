<template>
    <div id="channlEdit">
        <!-- 我的频道 -->
        <van-cell title="我的频道">
            <van-button
                class="btn"
                size="mini"
                round
                plain
                hairline
                style="color: red; border-color: red"
                @click="isEitl = !isEitl"
                >{{ isEitl ? '完成' : '编辑' }}</van-button
            >
        </van-cell>
        <!-- 频道 -->
        <div class="my-pannel">
            <van-grid :gutter="10" :border="false">
                <van-grid-item
                    :class="{ active: item.name === '推荐' }"
                    v-for="(item, index) in maychannel"
                    :key="item.id"
                    :text="item.name"
                    :icon="isEitl && item.name !== '推荐' ? 'cross' : ''"
                    @click="handlermychannels(item, index)"
                >
                    <template #icon>
                        <!-- <van-icon name="cross" /> -->
                    </template>
                </van-grid-item>
            </van-grid>
        </div>
        <!-- 推荐频道 -->
        <van-cell title="推荐频道" />
        <div class="recommend-pannel">
            <van-grid :gutter="10" :border="false">
                <van-grid-item
                    v-for="item in recommdChannels"
                    :key="item.id"
                    :text="item.name"
                    icon="plus"
                    @click="$emit('addchannel', item)"
                >
                </van-grid-item>
            </van-grid>
        </div>
    </div>
</template>

<script>
import { getALLchannleAPT } from '@/api'
export default {
    props: {
        maychannel: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            isEitl: false,
            channelsAll: []
        }
    },
    created() {
        this.getALLchannle()
    },
    methods: {
        // 获取全部的频道
        async getALLchannle() {
            try {
                const {
                    data: { data }
                } = await getALLchannleAPT()
                console.log(data)
                this.channelsAll = data.channels
                console.log(this.channelsAll)
            } catch (err) {}
        },
        // 点击每一个列表选项删除或者新增
        handlermychannels({ name, id }, index) {
            if (this.isEitl && name !== '推荐') {
                this.$emit('delchannel', id)
            } else {
                this.$emit('change-active', index)
            }
        }
    },
    computed: {
        // 所有的频道列表减去用户自己的频道列表
        recommdChannels() {
            return this.channelsAll.filter((item) => {
                const target = this.maychannel.find(
                    (items) => items.id === item.id
                )
                // 如果有就返回false,如果有就返回true
                return !target
            })
        }
    }
}
</script>

<style lang="less" scoped>
:deep(.active) {
    .van-grid-item__text {
        color: red;
    }
}
#channlEdit {
    padding-top: 1.2rem;
    :deep(.van-button) {
        width: 1rem;
        height: 0.5rem;
        font-size: 0.3rem;
        margin: 0.1rem;
    }
    :deep(.van-icon) {
        font-size: 0.175rem;
    }
    :deep(.van-grid-item__content) {
        background-color: #f4f5f6;
    }
}
// 我的频道
.my-pannel {
    // 编辑按钮居中
    .van-cell__value {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    // 关闭按钮样式
    :deep(.van-grid-item__content) {
        position: relative;

        .van-grid-item__content {
            position: absolute;
            top: 0;
            right: 0;
        }
    }
}
:deep(.van-icon-cross) {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 25px;
    transform: translate(20%, -35%);
    border: 0.02667rem solid #000;
    border-radius: 50%;
    text-align: center;
    line-height: 0.32rem;
}
// 推荐频道
.recommend-pannel {
    // 推荐频道加号样式
    :deep(.van-grid-item__content) {
        flex-direction: row;

        .van-grid-item__icon {
            font-size: 0.5rem;
        }

        .van-grid-item__text {
            margin-top: 0 !important;
        }
    }
}
:deep(.van-grid-item__icon + .van-grid-item__text) {
    margin-top: 0 !important;
}
</style>
