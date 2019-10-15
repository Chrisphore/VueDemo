<template>
	<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
		<el-checkbox v-for="item in items" :label="item.code" :key="item.code">{{item.name}}</el-checkbox>
	</el-checkbox-group>
	
</template>

	<script>
import API from "@/api/base";

export default {
  props: ['code','type'],
  data() {
    return {
      items: null,
	  checkedCities:[],
      values: "1"
    };
  },
  created() {
    this.init();
  },
  methods: {
    handleCheckedCitiesChange(value) {
		let vl = "";
		for(let i=0;i<value.length;i++)
		{
			if(i > 0)
			{
				vl = vl + ",";
			}
			vl = vl+value[i];
		}
		this.values = vl;
    },
    init() {
      //加载状态数据源
      var that = this;
      switch (that.type) {
		case "1": // 单品销售统计类型
			that.items = [
				{name:"金额",code:"1"},
				{name:"数量",code:"2"}
			];
			that.checkedCities = [that.code];
			break;
      }
    }
  }
};
</script>
