import request from "../../common/js/request";
export const addJzData = (params)=>{
  return  request().post('/setList',params)
}

export const getIndexList = (params)=>{
  return  request().get('/index/getList',params)
}
export const getMonthDetailList = (params)=>{
  return  request().get('/index/getMonthDetailList',params)
}