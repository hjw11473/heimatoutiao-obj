<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <van-cell
            v-if="artice.cover.type === 0"
            :title="artice.title"
            :label="label"
            :to="`/articleDetailsPage/${artice.art_id}`"
        />
        <van-cell
            v-else-if="artice.cover.type === 1"
            :title="artice.title"
            :label="label"
            :to="`/articleDetailsPage/${artice.art_id}`"
        >
            <van-image width="100" height="60" :src="artice.cover.images[0]" />
        </van-cell>
        <van-cell
            v-else-if="artice.cover.type === 3"
            :title="artice.title"
            :label="label"
            :to="`/articleDetailsPage/${artice.art_id}`"
        >
            <template #label>
                <van-image
                    v-for="(item, index) in artice.cover.images"
                    :key="index"
                    width="100"
                    height="60"
                    :src="item"
                />
                <p>{{ label }}</p>
            </template>
        </van-cell>
    </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
export default {
    props: {
        artice: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        label() {
            const { aut_name, comm_count, pubdate } = this.artice
            return `${aut_name} ${comm_count}评论 ${dayjs().to(dayjs(pubdate))}`
        }
    }
}
</script>

<style lang="less" scoped>
:deep(.van-image) {
    margin-left: 0.2rem;
}
</style>
