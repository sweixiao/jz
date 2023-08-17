<template>
  <view class="content">
    <view class="bck-canvas"></view>

    <view class="content_box">
      <view class="box box-column box-center white">
        <text class="fz-14">月记账</text>
        <text class="mt-10 fz-24">{{monthMoney?'-'+monthMoney:0}}</text>
      </view>

      <view
        class="box box-around box-column-center mt-30 bck-white pt-10 pb-10 mr-15 ml-15 border-radius"
      >
        <view class="box box-column box-column-center fz-12">
          <image
            src="../../static/index_detail.png"
            alt=""
            mode="widthFix"
            style="width: 50rpx"
          ></image>
          <view class="mt-10">记账明细</view>
        </view>

        <view class="box box-column box-column-center fz-12">
          <image
            src="../../static/chart_logo.png"
            alt=""
            mode="widthFix"
            style="width: 50rpx"
          ></image>
          <view class="mt-10">图表分析</view>
        </view>
      </view>

      <view class="mt-15 bck-white">
        <view
          class="pt-10 pb-10 box box-column-center"
          style="border-bottom: 2rpx solid #edeef4"
          v-for="item in list" :key='item.id'
        >
          <image
            :src="`../../static/img/${item.typeImg}.png`"
            alt=""
            mode="widthFix"
            style="width: 60rpx"
            class="pl-15"
          ></image>
          <view class="box box-column-center box-between box-1 ml-15 pr-15">
            <view class="box box box-column">
              <text>{{item.title}}</text>
              <view class="fz-12 mt-5" style="color: #898989">
                <text class="mr-15">{{item.date}}</text>
              </view>
            </view>
            <text class="bold">{{item.money}}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
  <tabbar></tabbar>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getIndexList } from "@/apis/index";
import { onShow } from "@dcloudio/uni-app"
const list=ref([]);
let monthMoney = ref(0);
const getList =async ()=>{
  let {code,data} =await getIndexList();
  if(code===200){
    list.value=data;
    monthMoney.value=0;
    data.forEach(item=>{
      monthMoney.value+=item.money*1
    })
  }
};
getList()
onShow(()=>{
  getList()
})
</script>

<style lang='scss' scoped>
.content {
  position: relative;
  height: calc(100vh - 50px - env(safe-area-inset-bottom));
  .bck-canvas {
    height: 400rpx;
    background: linear-gradient(to bottom, #ff9900, #fdf6ec);
  }
  .content_box {
    position: absolute;
    top: 40rpx;
    left: 0;
    right: 0;
  }
}
</style>
