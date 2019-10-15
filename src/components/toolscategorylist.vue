<template>
    <tools-cascader :defaultProps="defaultProps" :bindata="treedata" @setvalue="setvalue"></tools-cascader>
</template>

<script>
import toolscascader from "@/components/toolscascader";
import goods from "@/api/goods";
export default {
  components: {
    "tools-cascader": toolscascader
  },
  props: {
    datatype: {
      type: String,
      default: '1'
    }
  },
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "name",
        value: "code"
      },
      treedata: [],
      values: ""
    };
  },
  methods: {
    //初始化分类
    init() {
			
      var p = { type: this.datatype };
      goods.getAllType(p).then(res => {

        this.treedata = this.toTree(res.data, "parentId", "id", null);
      });
    },
    setvalue(val) {
      this.values = val;
    }
  },
  mounted() {
    this.init();
  }
};
</script>
