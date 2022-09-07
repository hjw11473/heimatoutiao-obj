<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <h1>{{ count }}</h1>
        <!-- <h1>{{ this.$store.state.count }}</h1> -->
        <!-- <h1>{{ this.$store.getters.setbun }}</h1> -->
        <h1>count的方法{{ setbun }}</h1>
        <button @click="setcount(10)">点击加1</button>
    </div>
</template>

<script>
// mapState将vuex里面state映射到computed
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
    methods: {
        // btn() {
        //     this.$store.commit('setcount', 100)
        // },
        ...mapMutations(['setcount'])
    },
    computed: {
        ...mapState(['count']),
        ...mapGetters(['setbun'])
    }
}
</script>

<style lang="scss" scoped></style>
