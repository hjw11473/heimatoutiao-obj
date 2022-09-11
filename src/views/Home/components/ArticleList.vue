<template>
    <div>
        <List v-for="item in list" :key="item.art_id" :artice="item"></List>
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
            list: []
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
            } catch (err) {
                if (!err.response || err.response.status === 507) {
                    throw err
                } else if (err.response.status === 400) {
                    throw new Error(err.response.data.message)
                }
            }
        }
    }
}
</script>

<style lang="less" scoped></style>
