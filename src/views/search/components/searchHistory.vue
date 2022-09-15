<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <!-- 搜索历史的标题 -->
        <van-nav-bar left-text="搜索记录" :border="false">
            <template #right>
                <van-icon
                    name="delete-o"
                    size="18"
                    v-if="!isshow"
                    @click="isshow = true"
                />
                <div v-else id="deltext">
                    <span @click="$store.commit('SET_HISTORIES', [])"
                        >全部删除</span
                    >
                    &nbsp;&nbsp;&nbsp;
                    <span @click="isshow = false">完成</span>
                </div>
            </template>
        </van-nav-bar>
        <!-- 搜搜历史 -->
        <van-cell
            icon="search"
            v-for="item in histories"
            :key="item"
            :title="item"
            @click="!isshow && $emit('change', item)"
        >
            <template #extra>
                <van-icon
                    name="close"
                    v-show="isshow"
                    @click="
                        $store.commit(
                            'SET_HISTORIES',
                            histories.filter((i) => item !== i)
                        )
                    "
                />
            </template>
        </van-cell>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            list: [],
            isshow: false
        }
    },
    computed: {
        ...mapState(['histories'])
    }
}
</script>

<style lang="less" scoped>
// :deep(.van-nav-bar__right) {
//     #deltext {
//         span {
//             display: block;
//             padding: 0.1rem;
//             background-color: #c4c4c4;
//             border-radius: 0.01rem solid #000;
//         }
//     }
// }
</style>
