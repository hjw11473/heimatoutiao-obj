<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div id="app">
        <!-- 个人信息导航条 -->
        <van-nav-bar
            id="nav"
            title="个人信息"
            left-arrow
            color="#3296fa"
            @click-left="$router.push('/my')"
        />
        <!-- 信息修改 -->

        <!-- 更新头像 -->
        <!-- <input type="text" /> -->
        <input
            type="file"
            ref="file"
            hidden
            accept=".png,.ipg"
            multiple
            @change="selectphoto"
        />
        <van-cell title="头像" is-link clickable @click="$refs.file.click()">
            <van-image round width=".8rem" height=".8rem" :src="avator" />
        </van-cell>

        <!-- 更新头像的弹出层 -->
        <van-popup
            v-model="isshow"
            closeable
            position="bottom"
            :style="{ height: '80%' }"
        >
            <UpdateavatarVue
                v-if="isshow"
                :avator.sync="avator"
                :photo="photo"
            ></UpdateavatarVue>
        </van-popup>

        <!-- 更新昵称 -->
        <van-cell
            title="昵称"
            is-link
            @click="nicknameisshow = true"
            :value="Usermsg.name"
        />
        <!-- 更新昵称的弹出层 -->
        <van-popup
            v-model="nicknameisshow"
            position="bottom"
            :style="{ height: '80%' }"
        >
            <ModifynicknameVue
                v-if="nicknameisshow"
                @toChild="nicknameisshow = false"
                v-model="Usermsg.name"
            ></ModifynicknameVue>
        </van-popup>

        <!-- 更新性别 -->
        <van-cell
            title="性别"
            is-link
            :value="Usermsg.gender == 1 ? '女' : '男'"
            @click="Genderisshow = true"
        />
        <!-- 更新性别的弹出层 -->
        <van-popup
            v-model="Genderisshow"
            position="bottom"
            :style="{ height: '40%' }"
        >
            <ModifyGenderVue
                v-if="Genderisshow"
                @toChild="Genderisshow = false"
                v-model="Usermsg.gender"
            ></ModifyGenderVue>
        </van-popup>

        <!-- 更新生日 -->
        <van-cell
            title="生日"
            is-link
            :value="Usermsg.birthday"
            @click="birthdayisshow = true"
        />
        <!-- 更新生日的弹出层 -->
        <van-popup
            v-model="birthdayisshow"
            position="bottom"
            :style="{ height: '40%' }"
        >
            <ModifybirthdayVue
                v-if="birthdayisshow"
                @toChild="birthdayisshow = false"
                v-model="Usermsg.birthday"
            ></ModifybirthdayVue>
        </van-popup>
    </div>
</template>

<script>
// 修改图片
import UpdateavatarVue from './components/Updateavatar.vue'
// 修改昵称
import ModifynicknameVue from './components/Modifynickname.vue'
// 修改性别
import ModifyGenderVue from './components/ModifyGender.vue'
// 修改生日
import ModifybirthdayVue from './components/Modifybirthday.vue'
// 获取登录用户信息
import { Getuserprofile } from '@/api'

import { resolveToBase64 } from '@/utils'
export default {
    components: {
        UpdateavatarVue,
        ModifynicknameVue,
        ModifyGenderVue,
        ModifybirthdayVue
    },
    data() {
        return {
            isshow: false,
            nicknameisshow: false,
            Genderisshow: false,
            birthdayisshow: false,
            photo: '',
            avator: '',
            Usermsg: {}
        }
    },
    created() {
        this.GetUsermsg()
    },
    methods: {
        async selectphoto() {
            console.log(this.$refs.file.files)
            const files = this.$refs.file.files[0]
            // file对象转成img.src可识别的属性
            // file对象转换成base64
            const base64 = await resolveToBase64(files)
            console.log(base64)
            // 传递给子组件
            this.photo = base64
            // 打开弹窗
            this.isshow = true
            this.$refs.file.value = ''
        },
        // 获取登录用户信息
        async GetUsermsg() {
            const {
                data: { data }
            } = await Getuserprofile()
            this.Usermsg = data
            console.log(data)
        }
    }
}
</script>
<style lang="less" scoped>
#app {
    width: 100%;
    height: 100vh;
    background-color: #fafafa;
}
#nav {
    background-color: #3296fa;
    :deep(.van-icon-arrow-left) {
        color: #fff;
    }
    :deep(.van-nav-bar__title) {
        color: #fff;
    }
}
</style>
