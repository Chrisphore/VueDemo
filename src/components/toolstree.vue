<template>
<div >
    <el-tree
  :data="bindata"
  :show-checkbox="ischeck"
  :node-key="nodekey"
  ref="tree"
  highlight-current
  :expand-on-click-node="isexpandclick"
  @node-click="nodeclick"
  :props="defaultProps">
</el-tree>  
</div>

</template>

<script>
export default {
  props: {
    ischeck: {
      type: Boolean,
      default: false
    },
    nodekey: {
      type: String,
      default: "id"
    },
    isexpandclick: {
      type: Boolean,
      default: true
    },
    treedata: {
      type: Array,
      default() {
        return [];
      }
    },
    defaultProps: {
      type: Object,
      default() {
        return {
          children: "children",
          label: "typeName"
        };
      }
    }
  },
  data() {
    return {
      tree_data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1",
              children: [
                {
                  id: 9,
                  label: "三级"
                }
              ]
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      bindata: this.treedata
    };
  },
  watch: {
    treedata: function(newVal) {
      this.bindata = newVal;
    }
  },
  methods: {
    nodeclick(data) {
      // console.log(data.id);
    }
  }
};
</script>
