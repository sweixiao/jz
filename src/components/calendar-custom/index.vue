<template>
  <view class="mt-15 mb-10 box box-center">
    <text @click="dateChange(1)">{{ `<` }}</text>
    <text class="ml-15 mr-15">{{ currentDate }}</text>
    <text @click="dateChange(2)">{{ `>` }}</text>
  </view>
  <view class="calendar-box">
    <view class="box box-column-center">
      <view
        v-for="(item, index) in weekArr"
        :key="index"
        class="box box-center dayClass"
        >{{ item }}</view
      >
    </view>

    <view class="box box-column-center" style="flex-wrap: wrap">
      <view
        v-for="(item, index) in dayArr"
        :key="index"
        class="dayClass box box-center box-column fz-12"
        @click="getDetail(item)"
        :class="currentIdx&&currentIdx==item.day?'currentbck':''"
      >
        <text style="margin-bottom: 4rpx">{{ item.day }}</text>
        <text :class="item.daytotalMoney < 0 ? 'red' : 'green'" v-if="item">{{
          item.daytotalMoney > 0
            ? `+${item.daytotalMoney}`
            : `${item.daytotalMoney}`
        }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, watch } from "vue";
import moment from "moment";
import { getMonthDetailList } from "@/apis/index";
const props = defineProps(["tabType"]);
const emit = defineEmits(["getList", "getDetail"]);
const weekArr = ref(["日", "一", "二", "三", "四", "五", "六"]);
const dayArr = ref([]);
const currentDate = ref(moment(new Date()).format("YYYY-MM"));

let currentIdx = ref(moment(new Date()).date() + 1);
//点击天数后的详情数据
const getDetail = (item) => {
  console.log(item,15454)
  currentIdx.value = item.day;
  emit("getDetail", item);
};

//获取月数据
const getMonthList = async () => {
  let { code, data } = await getMonthDetailList({
    month: currentDate.value,
    monthDay: moment(currentDate.value).daysInMonth(),
  });
  if (code === 200) {
    data.forEach((item) => {
      item.daytotalMoney = 0;
      item.dayList.forEach((res) => {
        item.daytotalMoney += res.money * 1;
      });
    });
    for (let i = 0; i < data.length; i++) {
      dayArr.value.push(data[i]);
    }
    if(currentIdx.value){
      getDetail(dayArr.value[currentIdx.value]);
    }
    
  }
};

//获取日历的排列天数
const getDayList = () => {
  if(currentDate.value==moment(new Date()).format('YYYY-MM')){
    currentIdx.value=moment(new Date()).date()+1;
  }else{
     currentIdx.value =''
  }
  let weekNum = moment(currentDate.value).startOf("month").day();
  dayArr.value = [];
  if (weekNum > 0) {
    //获取月第一天是星期几来判断日历前面空几个格子
    for (let i = 0; i < weekNum; i++) {
      dayArr.value.push("");
    }
  }
  getMonthList();
};
getDayList();
emit("getList", currentDate.value);

//切换月份
const dateChange = (type) => {
  //type =1时月份减一，type=2时月份加一
  if (type == 1) {
    currentDate.value = moment(currentDate.value)
      .subtract(1, "months")
      .format("YYYY-MM");
  } else {
    currentDate.value = moment(currentDate.value)
      .add(1, "months")
      .format("YYYY-MM");
  }
  getDayList();
};

watch(props.tabType, () => {});
</script>

<style lang='scss' scoped>
.calendar-box {
  padding: 15px;
  transform: translateX(20rpx);
}
.dayClass {
  width: 12%;
  height: 80rpx;
  margin-bottom: 30rpx;
  margin-right: 10rpx;
  border-radius: 10rpx;
  background: #f6f6f6;
}
.red {
  color: red;
}
.green {
  color: blue;
}
.currentbck{
  background: #ff9900;
}
</style>