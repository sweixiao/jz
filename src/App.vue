<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-plus/index.scss";
  @import "@/common/default.scss";
  @import '@/static/iconfont/iconfont.css';
  #app{
    background: #f6f6f6;
  }
</style>
<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    uni.removeStorageSync('tabIdx')
  },
}
</script>
