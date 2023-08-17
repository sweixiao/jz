<template>
  <view class="p-15">
    <view v-if="form.typeImg">
    <view class="mb-15">
      <view class="mb-10">标题</view>
      <up-input
        placeholder="请输入内容"
        border="surround"
        v-model="form.title"
        @change="change"
      ></up-input>
    </view>
    <view class="mb-15">
      <view class="mb-10">时间</view>
      <up-input
        placeholder="请输入内容"
        border="surround"
        v-model="form.date"
        @focus="
          date = form.date;
          datetimePickerShow = true;
        "
      ></up-input>
    </view>
    <view class="mb-15">
      <view class="mb-10">金额</view>
      <up-input
        placeholder="请输入内容"
        border="surround"
        v-model="form.money"
        @change="change"
      ></up-input>
    </view>

    <view class="box box-center mt-30">
      <view style="width: 80%">
        <u-button text="新增记账" type="primary" @click="save"></u-button>
      </view>
    </view>
  </view>
   <view v-else>
    <view class="box box-column-center" style="flex-wrap:wrap">
    <view class=" iconfont iconBox" v-for="(item,index) in  iconfontNameArr" :key="index" :class="`icon-${item}`" @click="form.typeImg=item"></view>
    </view>
  </view>
  </view>
 
   <u-toast ref="uToasts"></u-toast>
    <u-datetime-picker
      ref="datetimePicker"
      :show="datetimePickerShow"
      v-model="date"
      mode="datetime"
      @cancel="datetimePickerShow = false"
      @confirm="datetimePickerConfirm"
    ></u-datetime-picker>
</template>

<script setup>
import { ref, reactive, getCurrentInstance } from "vue";
import { addJzData } from "@/apis/index";
import moment from "moment";
const { proxy } = getCurrentInstance();
let form = ref({
  typeImg: "",
  title: "",
  date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
  money: "",
  type: 1,
});
const datetimePicker = ref(null);
const datetimePickerShow = ref(false);
let date = ref(moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"));
const datetimePickerConfirm = (e) => {
  form.value.date = moment(e.value).format("YYYY-MM-DD HH:mm:ss");
  datetimePickerShow.value = false;
};

const uToasts = ref(null);
const save = async () => {
  if (!form.value.title) {
    return proxy.$refs.uToasts.error("请输入标题");
  }
  let params = {
    ...form.value,
  };
  let { code, data } = await addJzData(params);
  if (code === 200) {
    proxy.$refs.uToasts.success("新增成功");
    setTimeout(() => {
      uni.switchTab({
        url: "/pages/index/index",
      });
    }, 500);
  }
};

let iconfontNameArr=ref(
  [
    'gouwu',
    'jiaotong',
    'lvxin',
    'meishi',
    'richang'
  ]
)
</script>

<style lang='scss' scoped>
.jzType {
  height: 48rpx;
  padding: 12rpx 18rpx;
  border: 2rpx solid $u-border-color;
  border-radius: 8rpx;
}
.iconBox{
  margin-right: 60rpx;
  padding: 30rpx 30rpx;
  border-radius: 50%;
  background: #f6f6f6;
  margin-bottom:60rpx ;
}
</style>