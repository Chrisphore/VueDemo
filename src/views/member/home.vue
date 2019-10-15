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
          name: "会员管理",
          isactive: true,
          path: "/member/index"
        },
        {
          name: "待审核",
          isactive: false,
          path: "/member/aduitlist"
        },
        {
          name: "客户发布",
          isactive: false,
          path: "/member/custormerpublish"
        }
      ]
    };
  }
};
</script>

