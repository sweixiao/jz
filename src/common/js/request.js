/*
 * @Author: liudecai 18379794399@163.com
 * @Date: 2023-08-14 17:58:42
 * @LastEditors: liudecai 18379794399@163.com
 * @LastEditTime: 2023-08-17 14:57:01
 * @FilePath: \vue3-chargeAccount\src\common\js\request.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 请求
export default function request(path) {
  const url = path || "http://192.168.0.26:8888";
  return {
    get: function get(urlPath, data, header) {
      return new Promise(function (resolve, reject) {
        uni.request({
          url: url + urlPath,
          data: data,
          header: header,
          method: "GET",
          success: function (res) {
            console.log(res.data)
            resolve(res.data);
          },
          error: function (err) {
            console.log(err);
          },
        });
      });
    },
    post: function post(urlPath, data, header) {
      return new Promise(function (resolve, reject) {
        uni.request({
          url: url + urlPath,
          data: data,
          header: header,
          method: "POST",
          success: function (res) {
            console.log(res.data)
            resolve(res.data);
          },
          error: function (err) {
            console.log(err);
          },
        });
      });
    },
  };
}
