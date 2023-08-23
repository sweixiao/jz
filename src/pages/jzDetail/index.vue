<template>
  <div>
    <u-tabs :list="tabArr" @click="tabChange" :scrollable='false'></u-tabs>
    <calendar-custom @getDetail='getDetail'></calendar-custom>

        <view class=" bck-white" style="border-top:2rpx solid #ccc">
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
  </div>
</template>

<script setup>
import { ref } from "vue";
import calendarCustom from '@/components/calendar-custom/index'
import moment from "moment";
import { getIndexList,getMonthDetailList } from "@/apis/index";

let tabArr = ref([
  {
    name: "日记账",
  },
  {
    name: "月记账",
  },
  {
    name: "年记账",
  },
  {
    name: "累计记账",
  },
]);
const tabChange = (item) => {
  console.log("item", item);
};
const list =ref([]);
const getDetail = async (item) => {
    list.value = item.dayList;
};
</script>

<style lang='scss' scoped>
</style>