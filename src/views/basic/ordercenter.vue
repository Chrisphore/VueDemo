<template>
      <div  class="ordercentercontent">
          <router-link tag="li" to="/goods/goodslist">
        <a href="javescript:;"  class="a-list" title="商品类型设置"><span>商品类型设置</span></a>
         </router-link>

        <a  @click="setbanner('订货中心广告图设置','orderleftbanner','orderleftbanner','240*150')"  
          class="a-img" title="广告图设置">  <span>订货中心广告图</span></a>

           <router-link tag="li" to="/bascic/sell">
        <a href="javescript:;"  class="a-page1" title="畅销栏目设置"><span>畅销栏目设置</span></a>
          </router-link>
           <!-- <router-link tag="li" to="/goods/goodslist">
        <a href="javescript:;"  class="a-page2" title="类型分类设置"></a>
          </router-link> -->
           <router-link tag="li" to="/goods/goodslist">
        <a href="javescript:;"  class="a-page3" title="商品设置"><span>商品设置</span></a>
         </router-link>
                 <banner-edit></banner-edit>
    </div>
</template>
<script>
import banneredit from "./home/banneredit";
import { mapActions } from "vuex";
export default {
  components: {
    "banner-edit": banneredit
  },
  methods: {
    ...mapActions({
      setparms: "setparams"
    }),
    setbanner(title, bannertype, flag, imgsize) {
      var p = {
        title: title,
        bannertype: bannertype,
        flag: flag,
        bannerstatus: true,
        imgsize: imgsize
      };
      this.setparms(p);
    }
  }
};
</script>




<style scoped>
.ordercentercontent {
	margin-top: 46px;
  width: 935px;
  height: 1280px;
  background: url(http://down.starwj.com//b2admin/floorimg/orercenter1.png)
    no-repeat left top;
  position: relative;
}
.ordercentercontent a {
  cursor: pointer;
  display: inline-block;
  border: 2px dashed #999999;
  position: absolute;
  z-index: 1111;
  text-decoration: none;
}
.ordercentercontent a:hover {
  background: rgba(0, 0, 0, 0.3);
}
.ordercentercontent a > span {
  height: 36px;
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  line-height: 36px;
  width: 120px;
  padding: 2px 5px;
  border-radius: 28px;
  background: rgba(0, 0, 0, 0.5);
  display: block;
}
.ordercentercontent .a-list {
  left: 86px;
  top: 122px;
  height: 600px;
  width: 138px;
}
.ordercentercontent .a-img {
  left: 86px;
  top: 741px;
  height: 235px;
  width: 138px;
}
.ordercentercontent .a-page1 {
  left: 234px;
  top: 125px;
  height: 55px;
  width: 611px;
}
.ordercentercontent .a-page2 {
  left: 234px;
  top: 152px;
  height: 28px;
  width: 611px;
}
.ordercentercontent .a-page3 {
  left: 234px;
  top: 208px;
  height: 790px;
  width: 611px;
}
</style>