<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <!-- 搜索框 -->
        <van-search
            v-model.trim="value"
            background="#3296fa"
            placeholder="请输入搜索关键词"
            show-action
            @search="onSearch"
            @focus="isShowSearchResult = false"
        >
            <!-- @cancel="$router.push('/ ')" -->
            <template #action>
                <span class="coler" @click="cancel">取消</span>
            </template>
        </van-search>
        <!-- 搜索历史 / 建议 / 搜搜结果 -->
        <component
            :keyvalue="value"
            :is="componentNmaes"
            @change="onSearch"
        ></component>
    </div>
</template>

<script>
import searchResult from './components/searchResult.vue'
import searchHistory from './components/searchHistory.vue'
import searchSuggestion from './components/searchSuggestion.vue'
import { mapMutations, mapState } from 'vuex'

export default {
    components: {
        searchResult,
        searchHistory,
        searchSuggestion
    },
    data() {
        return {
            value: '',
            isShowSearchResult: false
        }
    },
    created() {
        // this.getSuggestion()
    },
    methods: {
        ...mapMutations(['SET_HISTORIES']),

        // 如果input有值就出发vant组件sreach事件，将值变为true
        onSearch(sreachname) {
            // 1.去重，获取没有去重的数组
            // 2.放在 new Set(arr)(平时：S要大写)
            // 3.[...set]
            const duplicateremoval = [
                ...new Set([sreachname, ...this.histories])
            ]
            this.SET_HISTORIES(duplicateremoval)
            // this.SET_HISTORIES([sreachname, ...this.histories])

            this.value = sreachname
            this.isShowSearchResult = true
        },
        cancel() {
            if (this.value) {
                this.value = ''
            } else {
                this.$router.push('/ ')
            }
        }
    },
    computed: {
        ...mapState(['histories']),

        componentNmaes() {
            if (this.value === '') {
                // 如果input为空显示搜索历史
                return searchHistory
            }
            if (this.isShowSearchResult) {
                // 如果input有值就渲染搜索结果
                return searchResult
            }
            // 如果input事件还没有触发，就渲染渲染历史
            return searchSuggestion
        }
    }
}
</script>

<style lang="less" scoped>
.coler {
    color: #fff;
}

// 属性选择器 []·
[role='button'] {
    color: #fff;
}

:deep(.van-nav-bar__content) {
    .van-nav-bar__text {
        color: #000;
    }
    .van-icon {
        color: #000;
    }
}
</style>
