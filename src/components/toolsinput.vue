<template>
    <el-autocomplete
     v-model="values"
     :fetch-suggestions="querySearchAsync"
     placeholder="请输入客户名称"
     @select="handleSelect"
     :disabled="ishow"
>
  <i
    class="el-icon-delete el-input__icon"
    slot="suffix"
    @click="cleartxt">
  </i></el-autocomplete>
</template>

<script>
export default {
  props: ["listdata", "placeholder","enable"],
  data() {
    return {
      restaurants: this.listdata,
      title: this.placeholder,
      ishow: this.enable,
      values: "",
      selectid: 0 //用于外部直接获取选择的id
    };
  },
  watch: {
    listdata: function(newVal) {
      this.restaurants = newVal;
    },
    enable: function (newVal) {
        this.ishow=newVal
    }
  },
  methods: {
    querySearchAsync(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 1000 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) != -1);
        };
      },
    handleSelect(item) {
     this.selectid=item.id;
    },
    cleartxt() {
        this.values="";
        this.selectid="";
    }
  }
};
</script>
