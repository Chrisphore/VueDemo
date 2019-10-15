<template>
    <el-cascader
       expand-trigger="hover"
  :options="options"
  :show-all-levels="showalllevels"
  v-model="default_options"
   :filterable="filterable"
 :change-on-select="changeonselect"
  @change="handleChange"
  :props="defaultProps"
  @blur="handleblur"
></el-cascader>
</template>

<script>
export default {
  props: {
    expandtrigger: {
      type: String,
      default: "hover"
    },
    bindata: {
      type: Array,
      default() {
        return [];
      }
    },
    showalllevels: {
      type: Boolean,
      default: false
    },
    filterable: {
      type: Boolean,
      default: true
    },
    defaultoptions: {
      type: Array,
      default() {
        return [];
      }
    },
    changeonselect: {
      type: Boolean,
      default: true
    },
    defaultProps: {
      type: Object,
      default() {
        return {
          children: "children",
          label: "typeName",
          value: "typeId"
        };
      }
    }
  },
  data() {
    return {
      options: [],
      default_options: this.defaultoptions,
      selectval: ""
    };
  },
  methods: {
    handleChange(value) {
      if (value.length > 0) {
        this.selectval = value[value.length - 1];
      }
    },
    handleblur() {
      this.$emit("setvalue", this.selectval);
    }
  },
  watch: {
    bindata: function(newVal) {
      this.options = newVal;
    }
  }
};
</script>

<style>
</style>
