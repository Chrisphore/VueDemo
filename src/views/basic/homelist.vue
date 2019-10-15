<template>
    <div  class="imgcontent">
        <!-- <router-link tag="li" to="/" @click.native="setlog">
        <a class="a-logo" title="logo设置" onclick="setlog"></a>
        </router-link> -->
        <a class="a-logo" title="logo设置" @click="setlog"></a>

        <a  class="a-search" title="搜索设置" @click="setkeywords"></a>
        <router-link tag="li" to="/goods/goodslist">
               <a  class="a-left" title="商品分类设置"></a>
        </router-link>  
        <router-link tag="li" :to="{ path:'/basic/menulist', query: { type:  '1'} }">
               <a  class="a-nav" title="导航条设置"></a>
        </router-link>
        <router-link tag="li" :to="{ path:'/basic/advertisinglist', query: { imgtype:  'banner'} }" >
                    <a href="javescript:;"  class="a-lunbo" title="轮播图设置"></a>
        </router-link>

       <a  @click="setbanner('小banner图1设置','rightbanner','rightbanner1','240*150')" 
         class="a-right" title="小banner图1设置"> </a>
       <a @click="setbanner('小banner图2设置','rightbanner','rightbanner2','240*150')" 
         class="a-right1" title="小banner图2设置"> </a>
       <a  @click="setbanner('小banner图3设置','rightbanner','rightbanner3','240*150')" 
        class="a-right2" title="小banner图3设置"></a>

        <router-link tag="li" to="/basic/brandlist">
                <a href="javescript:;"  class="a-links" title="品牌设置"></a>
        </router-link>
         <router-link tag="li"  :to="{ path:'/basic/floormenage', query: { flag:  'pc',floorid: '1'}}">
                <a href="javescript:;"  class="a-page1" title="楼层样式1设置">
                 <span>楼层样式1</span>
                 </a>
        </router-link>
           <router-link tag="li" :to="{ path:'/basic/floormenage', query: { flag:  'pc',floorid: '2'}}">
        <a href="javescript:;"  class="a-page2" title="楼层样式2设置">
            <span>楼层样式2</span>
        </a>
         </router-link>
        <router-link tag="li" :to="{ path:'/basic/floormenage', query: { flag:  'pc',floorid: '3'}}">
        <a href="javescript:;"  class="a-page3" title="楼层样式3设置">
            <span>楼层样式3</span>
        </a>
          </router-link>
                 <!-- <router-link tag="li" to="/goods/goodslist">
        <a href="javescript:;"  class="a-page4" title="秒杀设置">
            <span>秒杀</span>
        </a>
          </router-link> -->
        <router-link tag="li" to="/basic/linkslist">
                 <a href="javescript:;"  class="a-page5" title="友情链接设置">
            <span>友情链接</span>
        </a>
        </router-link>
        <router-link tag="li" to="/basic/articledetaillist">
        <a href="javescript:;"  class="a-page6" title="文章设置设置">
            <span>文章设置</span>
        </a>
        </router-link>
        <router-link tag="li" to="/basic/basiclist">
        <a href="javescript:;"  class="a-page7" title="底部信息设置">
            <span>底部信息</span>
        </a>
        </router-link>
        <router-link tag="li" to="/basic/basiclist">
        <a href="javescript:;"  class="a-page8" title="二维码设置"></a>
        </router-link>

        <logo-edit :showstu="showstatus.logostu" @closedialog="logohidden"></logo-edit>
        <keywords-edit :showstu="showstatus.keywordsstu" @closedialog="keywordshidden"> </keywords-edit>
        <banner-edit></banner-edit>
    </div>

    
</template>

<script>
import logoedit from "./home/logoedit";
import keywordsedit from "./home/keywordsedit";
import banneredit from "./home/banneredit";
import { mapActions } from "vuex";
export default {
  components: {
    "logo-edit": logoedit,
    "keywords-edit": keywordsedit,
    "banner-edit": banneredit
  },
  data() {
    return {
      showstatus: {
        logostu: false, //logo框状态
        keywordsstu: false
      }
    };
  },
  methods: {
    ...mapActions({
      setparms: "setparams"
    }),
    setlog() {
      this.showstatus.logostu = true;
    },
    setkeywords() {
      this.showstatus.keywordsstu = true;
    },
    logohidden() {
      this.showstatus.logostu = false;
    },
    keywordshidden() {
      this.showstatus.keywordsstu = false;
    },
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
.imgcontent {
	margin-top: 46px;
  width: 935px;
  height: 2777px;
  background: url(http://down.starwj.com//b2admin/floorimg/indexsss1.png) no-repeat;
    /* background: url(../../assets/img/indexsss.png) no-repeat; */
  position: relative;
}
a {
  cursor: pointer;
  display: inline-block;
  border: 2px dashed #999999;
  position: absolute;
  z-index: 1111;
  text-decoration: none;
}
a:hover {
  background: rgba(0, 0, 0, 0.3);
}
a > span {
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
.a-logo {
  left: 1px;
  top: 0px;
  width: 135px;
  height: 101px;
}
.a-search {
  left: 192px;
  top: 31px;
  width: 509px;
  height: 70px;
}
.a-phone {
  left: 736px;
  top: 32px;
  width: 190px;
  height: 70px;
}
.a-left {
  left: 1px;
  top: 121px;
  width: 141px;
  height: 394px;
}
.a-nav {
  left: 156px;
  top: 117px;
  width: 575px;
  height: 30px;
}
.a-lunbo {
  left: 152px;
  top: 152px;
  width: 578px;
  height: 369px;
}
.a-right {
  left: 735px;
  top: 152px;
  width: 192px;
  height: 121px;
}
.a-right1 {
  left: 735px;
  top: 277px;
  width: 192px;
  height: 121px;
}
.a-right2 {
  left: 735px;
  top: 401px;
  width: 192px;
  height: 121px;
}
.a-links {
  left: 0px;
  top: 533px;
  width: 919px;
  height: 54px;
}
.a-page1 {
  left: 2px;
  top: 602px;
  width: 919px;
  height: 507px;
}
.a-page2 {
  left: 2px;
  top: 1119px;
  width: 919px;
  height: 355px;
}
.a-page3 {
  left: 2px;
  top: 1482px;
  width: 919px;
  height: 507px;
}
.a-page4 {
  left: 2px;
  top: 1997px;
  width: 919px;
  height: 350px;
}
.a-page5 {
  left: 2px;
  top: 1997px;
  width: 919px;
  height: 142px;
}
.a-page6 {
  left: 2px;
  top: 2156px;
  width: 694px;
  height: 169px;
}
.a-page7 {
  left: 2px;
  top: 2340px;
  width: 919px;
  height: 59px;
}
.a-page8 {
  left: 721px;
  top: 2156px;
  width: 200px;
  height: 169px;
}
</style>