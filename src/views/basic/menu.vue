<template>
  <tool-menu :menulist="menudata" ></tool-menu>
</template>

<script>
import toolsmenu from "@/components/toolsmenu";
export default {
  components: {
    "tool-menu": toolsmenu
  },
  data() {
    return {
      menudata: [
        {
          name: "商城首页装修",
          isactive: false,
          path: "/basic/homelist"
        },
        {
          name: "微商城装修",
          isactive: false,
          path: "/basic/wxhomelist"
        },
        {
          name: "订货中心",
          isactive: false,
          path: "/basic/ordercenter"
        },
        // {
        //   name: "畅销设置",
        //   isactive: false,
        //   path: "/bascic/sell"
        // },
        {
          name: "基本信息设置",
          isactive: false,
          path: "/basic/basiclist"
        },
        {
          name: "品牌设置",
          isactive: false,
          path: "/basic/brandlist"
        },
        {
          name: "秒杀广告",
          isactive: false,
          path: "/basic/advertisinglist?imgtype=seckillbanner"
        },
				// {
				// 	name: "公告设置",
				// 	isactive: false,
				// 	path: "/basic/noticelist"
				// },
        {
          name: "文章分类设置",
          isactive: false,
          path: "/basic/articlecatlist"
        },
        {
          name: "文章管理",
          isactive: false,
          path: "/basic/articledetaillist"
        },
        {
          name: "友情链接",
          isactive: false,
          path: "/basic/linkslist"
        }
				
        // ,
        // {
        //   name: "导航菜单设置",
        //   isactive: false,
        //   path: "/basic/menulist"
        // }
      ]
    };
  }
};
</script>

<style>

</style>
