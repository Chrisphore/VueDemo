<template>
	<el-select v-model="values" clearable style="width:100%;" @visible-change="visiblechange">
		<template v-if="selecttype==2 || selecttype==3 || selecttype==4 || selecttype==5 || selecttype==6">
			<el-option v-for="item in items" :key="item.id" :label="item.name" :value="item.id" >
			</el-option>
			
		</template>
		<template  v-else>
			<el-option v-for="item in items" :key="item.code" :label="item.name" :value="item.code">
			</el-option>
		</template>
	</el-select>
</template>

	<script>
import API from "@/api/base";
import member from "@/api/member";
import basic from "@/api/basic";
export default {
  props: ['pcode','code','type'],
  data() {
    return {
      items: null,
      values: "",
      selecttype: this.type
    };
  },
  watch: {
    code: function(newVal) {
      this.values = newVal;
    }
  },
  created() {
    this.init();
  },
  methods: {
    visiblechange(a) {
      if (a) {
        this.init();
      }
    },
    init() {
      //加载状态数据源
      var that = this;
      switch (that.type) {
        case "1": //商城字典表
          var p = {
            keyword: that.pcode
          };
          API.getdictlist(p).then(function(res) {
            if (res.meta.success) {
              that.items = res.data;
              that.values = that.code;
            } else {
              console.log("获取失败");
            }
          });
          break;
        case "2": //分组
          var p = {
            keyword: that.pcode
          };
          member.getmembergroup(p).then(function(res) {
            if (res.meta.success) {
              that.items = res.data;
              that.values = that.code;
            } else {
              console.log("获取失败");
            }
          });
          break;
        case "3": //仓库列表
          var p = {
            status: that.pcode
          };
          member.getmemberstore(p).then(function(res) {
            if (res.meta.success) {
              that.items = res.data;
              that.values = that.code;
            } else {
              console.log("获取失败");
            }
          });
          break;
        case "4": //品牌列表
          basic.brand("LIST", "").then(function(res) {
            if (res.meta.success) {
              that.items = res.data;
              that.values = that.code;
            } else {
              console.log("获取失败");
            }
          });
          break;
        case "5": //员工列表
          API.getemployeelist("").then(function(res) {
            if (res.meta.success) {
              that.items = res.data.list;
              that.values = that.code;
            } else {
              console.log("获取失败");
            }
          });
          break;
        case "6": //客户端字典列表、
          var p = {
            dictionaryTypeId: that.pcode
          };
          API.getdictionnarylist(p).then(function(res) {
            if (res.meta.success) {
              that.items = res.data;
              that.values = that.code;
            } else {
              console.log("获取失败");
            }
          });
          break;
				case "7": // 日期类型
					that.items =  [
						{name:"日",code:"0"},
						{name:"月",code:"1"},
						{name:"年",code:"2"}
					];
					that.values = that.code;
					break;
				case "8": // 统计类型
					that.items = [
						{name:"金额",code:"0"},
						{name:"数量",code:"1"},
						{name:"毛利",code:"2"}
					];
					that.values = that.code;
					break;
				case "9": // 分类级别
					that.items = [
						{name:"一级",code:"1"},
						{name:"二级",code:"2"},
						{name:"三级",code:"3"},
						{name:"四级",code:"4"},
						{name:"五级",code:"5"}
					];
					that.values = that.code;
					break;	
				case "10": // 客户信息
					API.getcustomerlist({status:1}).then(function(res) {
						if (res.meta.success) {
							that.items = res.data ;
							that.values = that.code;
						} else {
							console.log("获取失败");
						}
					});
					break;
				case "11": // 员工类型
					that.items = [
						{name:"业务员",code:"0"},
						{name:"经手人",code:"1"}
					];
					that.values = that.code;
					break;
				case "12": // 机构信息
					API.getauthorganizationlist("").then(function(res) {
						if (res.meta.success) {
							that.items = res.data;
							that.values = that.code;
						} else {
							console.log("获取失败");
						}
					});
					break;
				case "13": // 单品销售统计类型
					that.items = [
						{name:"金额",code:"1"},
						{name:"数量",code:"2"}
					];
					that.values = that.code;
					break;
				case "14": // 数量类型
					that.items = [
						{name:"件数",code:"0"},
						{name:"散数",code:"1"}
					];
					that.values = that.code;
					break;
				case "15": // 销售类型
					//加载状态数据源
					var that = this;
					this.get("/common/pubTable/list", 1, {
						tableName: 'pub_im_saletype'
					}).then(res => {
						if (res.meta.success) {
							that.items = res.data;
							if(that.code != 0 && that.code != '')
							{
								that.values = that.code;
							}
						} else {
							console.log("获取失败");
						}
					});
					break;
      }
    }
  }
};
</script>
