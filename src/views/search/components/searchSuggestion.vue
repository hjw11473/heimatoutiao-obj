<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <van-cell
            icon="search"
            v-for="(item, index) in hightgetSuggestion"
            :key="index"
        >
            <template #title>
                <span
                    v-html="item"
                    @click="$emit('change', Suggestion[index])"
                ></span>
            </template>
        </van-cell>
    </div>
</template>

<script>
//  map
//  - 返回新数组, 长度和原数组一致, 函数的返回值新数组那一项的值
// 动态正则
//  - /Anglar/ig 字面量形式的正则, 不能动态生成正则的内容
// - new RegExp(字符串,修饰符'ig')

// 字符串的 replace
// - 字符串.replace(正则,函数)
//  - 这个函数参数 match, 匹配上的结果, 函数的返回值回作为替换的结果
import { getsuggestion } from '@/api'
// lodash节流引入
import { debounce } from 'lodash'
export default {
    props: {
        keyvalue: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            Suggestion: []
        }
    },
    created() {
        this.getSuggestionAPI()
    },
    methods: {
        // 获取推荐列表
        getSuggestionAPI: debounce(async function () {
            try {
                const {
                    data: { data }
                } = await getsuggestion(this.keyvalue)
                // filter(Boolean)可以过滤
                this.Suggestion = data.options.filter(Boolean)
            } catch (err) {
                if (err.response) {
                    this.$toast.fail('获取搜索建议失败')
                } else {
                    throw err
                }
            }
        }, 500)
    },
    computed: {
        hightgetSuggestion() {
            const reg = new RegExp(this.keyvalue, 'ig')
            return this.Suggestion.map((item) => {
                return item.replace(
                    reg,
                    (match) => `<span style="color:red">${match}</span>`
                )
            })
        }
    },
    watch: {
        keyvalue: {
            // immediate为true的时候是属于立即执行
            immediate: true,
            handler: 'getSuggestionAPI'
        }
    }
}
</script>

<style lang="less" scoped></style>
