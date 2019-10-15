<template>
      <div  class="wximgcontent">
           <router-link tag="li" :to="{ path:'/basic/advertisinglist', query: { imgtype:  'banner'} }">
        <a href="javescript:;"  class="a-banner" title="banner设置1"></a>
          </router-link>
            <router-link tag="li" :to="{ path:'/basic/menulist', query: { type:  '2'} }">
        <a href="javescript:;"  class="a-list" title="菜单设置"></a>
           </router-link>
          <router-link tag="li" to="/basic/articledetaillist">
        <a href="javescript:;"  class="a-zoumadeng" title="资讯设置"></a>
          </router-link>
           <router-link tag="li" :to="{ path:'/basic/floormenage', query: { flag:  'wx',floorid: '1'}}">
        <a href="javescript:;"  class="a-page1" title="楼层样式1">
                <span>楼层样式1</span>
        </a>
         </router-link>
          <router-link tag="li" :to="{ path:'/basic/floormenage', query: { flag:  'wx',floorid: '2'}}">
        <a href="javescript:;"  class="a-page2" title="楼层样式2">
             <span>楼层样式2</span>
        </a>
           </router-link>
             <router-link tag="li" :to="{ path:'/basic/floormenage', query: { flag:  'wx',floorid: '3'}}">
        <a href="javescript:;"  class="a-page3" title="楼层样式3">
            <span>楼层样式3</span>
        </a>
           </router-link>
            <router-link tag="li" :to="{ path:'/basic/floormenage', query: { flag:  'wx',floorid: '4'}}">
          <a href="javescript:;"  class="a-page4" title="楼层样式4">
            <span>楼层样式4</span>
        </a>
         </router-link>
            <router-link tag="li" :to="{ path:'/basic/advertisinglist', query: { imgtype:  'banner'} }">
        <a href="javescript:;"  class="a-banner" title="banner设置">
        </a>
           </router-link>
    </div>
</template>
<style scoped>
.wximgcontent {
	margin-top: 46px;
  width: 935px;
  height: 2760px;
  background: url(http://down.starwj.com//b2admin/floorimg/wechartimg1.png) no-repeat left top;
  position: relative;
}
.wximgcontent a {
  cursor: pointer;
  display: inline-block;
  border: 2px dashed #999999;
  position: absolute;
  z-index: 1111;
  text-decoration: none;
  width: 347px;
  left: 8px;
}
.wximgcontent a:hover {
  background: rgba(0, 0, 0, 0.3);
}
.wximgcontent a > span {
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
.wximgcontent .a-banner {
  top: 10px;
  height: 134px;
}
.wximgcontent .a-list {
  top: 158px;
  height: 158px;
}
.wximgcontent .a-zoumadeng {
  top: 326px;
  height: 36px;
}
.wximgcontent .a-page1 {
  top: 386px;
  height: 284px;
}
.wximgcontent .a-page2 {
  top: 685px;
  height: 415px;
}
.wximgcontent .a-page3 {
  top: 1115px;
  height: 613px;
}
.wximgcontent .a-page4 {
  top: 1742px;
  height: 945px;
}
</style>