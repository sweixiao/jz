<template>
  <view>
    <u-tabbar
      :value="store.state.tabIdx"
      :fixed="true"
      :placeholder="true"
      :safeAreaInsetBottom="true"
      activeColor="#ff9900"
      class="tabbarClass"
    >
      <view v-for="(item, index) in tabList" :key="index" :class="!item.icon?'bulgeImg':''">
        <u-tabbar-item
          :text="item.text"
          :icon="item.icon"
          @click="
            (index) => {
              tabClick(index, item);
            }
          "
        >
          <template #inactive-icon >
            <image
              src="../../static/add-btn.png"
               mode="widthFix"
             style="width: 60rpx"
            ></image>
          </template>
            <template #active-icon >
            <image
              src="../../static/add-btn.png"
               mode="widthFix"
             style="width: 60rpx"
            ></image>
          </template>
        </u-tabbar-item>
      </view>
    </u-tabbar>
  </view>
</template>

<script setup>
import { ref, watch } from "vue";
import store from "@/store/index.js";
let tabList = ref([
  {
    icon: "home",
    redirectTabbar: true,
    text: "首页",
    path: "/pages/index/index",
  },
  {
    icon: "",
    redirectTabbar: false,
    text: "记账",
    path: "/pages/addJz/index",
  },
  {
    icon: "account",
    redirectTabbar: true,
    text: "我的",
    path: "/pages/mine/index",
  },
]);
const tabClick = (index, item) => {
  store.commit("SET_TAB_IDX", index);
  if (item.redirectTabbar) {
    uni.switchTab({
      url: item.path,
    });
  } else {
    uni.navigateTo({
      url: item.path,
    });
  }
};
</script>

<style lang='scss' scoped>
.tabbarClass{
  position: relative;
  
}
// .bulgeImg{
//     position: absolute;
//     top: -30rpx;
//     background: #fff;
//   /deep/.u-tabbar-item__text{
//     padding-top: 60rpx !important;
//   }
//   }
</style>