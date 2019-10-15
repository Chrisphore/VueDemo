<template>
	<div>
		<div ref="head">
        <div class="topBtn">
				<btn-custom :btnType="2" :custombtn="custombtn"></btn-custom>
		</div>
		
				<el-row class="topsercah">
			<el-form :inline="true" class="el-form-class" :model="listQuery">
				<el-col>
				<el-form-item label="商品名称">
					<el-input v-model="listQuery.keyword" placeholder="商品名称"></el-input>
				</el-form-item>
				<el-form-item label="条形码">
					<el-input v-model="listQuery.barCode" placeholder="条形码"></el-input>
				</el-form-item>
				<el-form-item label="型号">
					<el-input v-model="listQuery.typeSpecification" placeholder="型号"></el-input>
				</el-form-item>
        	<el-button type="info" @click="search" plain class="queryBtn">查询</el-button>
				</el-col>
        	
				<!-- <el-col> 
					<el-form-item label="品牌">
						<select-list ref="brand" pcode="" code="" type="4" >
						</select-list>
					</el-form-item>
					<el-button type="info" @click="init" plain class="queryBtn">查询</el-button>
				</el-col> -->
			</el-form>
		</el-row>
		</div>
		<el-row>
			<el-col :span="24">
				<div class="bootomclas" style="margin-top:5px">
					<list-data ref="childrenlist" :columndata="columndatas" :bindata="listdata" :headHeight="headHeight"></list-data>
				</div>
			</el-col>
			<el-col :span="24">
				<div class="block">
					<tools-page :total="total" ref="pagetool" @setPage="setPage" ></tools-page>
				</div>
			</el-col>
		</el-row>
    <serach-goods @checkgoods="checkgoods"></serach-goods>
	</div>
</template>
<script>
import API from "@/api/decoration";
import list from "@/components/list";
import toolspage from "@/components/toolspage";
import { mapState, mapActions } from "vuex";
import toolsbtncustom from "@/components/toolsbtncustom";
import selectlist from "@/components/toolselect";
import toolsearchgoods from "@/components/toolsearchgoods";
export default {
  components: {
    "btn-custom": toolsbtncustom,
    "list-data": list,
    "tools-page": toolspage,
    "serach-goods": toolsearchgoods
  },
  computed: {
    ...mapState({
      params: state => state.toolslist.params
    })
  },
  data() {
    return {
      columndatas: [
        {
          label: "主键",
          prop: "id",
          type: "selection",
          align: "center"
        },
				{
					label: "畅销分组",
					prop: "typeName",
					width: "110"
				},
        {
          label: "图片",
          prop: "picture",
          type: "img",
          imgheight: "40px",
          width: "55"
        },
        {
          label: "商品编号",
          prop: "goodsCode",
          width: "110"
        },
        {
          label: "名称",
          prop: "goodsName"
        },
        {
          label: "条形码",
          prop: "barCode"
        },
        {
          label: "型号",
          prop: "typeSpecification"
        }
      ],
      total: 0,
      pageNum: 1,
      listdata: null,
      listQuery: {
        keyword: "",
        barCode: "",
        typeSpecification: ""
      },
      headHeight: 0,
      custombtn: [
        {
          name: "返回",
          icoName: " fa-back s-blue",
          fnHandler: "$parent.back_click()"
        },
        {
          name: "添加商品",
          icoName: " fa-add s-green",
          fnHandler: "$parent.addgoods()"
        },
        {
          name: "移除商品",
          icoName: "edit s-green",
          fnHandler: "$parent.deletegoods()"
        }
      ]
    };
  },
  mounted() {
    this.headHeight = this.$refs.head.offsetHeight;
  },
  methods: {
    ...mapActions({
      setparams: "setparams"
    }),
    //初始化
    init() {
      var that = this;
      var p = {
        pageNum: that.pageNum,
        pageSize: that.$refs.pagetool.page_size,
        sellTypeId: that.params.typeid,
        // brandId: that.$refs.brand.values,
        barCode: that.listQuery.barCode,
        keyword: that.listQuery.keyword,
        typeSpecification: that.listQuery.typeSpecification
      };
      // console.log(JSON.stringify(p));
      API.getsellgoodslist(p).then(function(res) {
        console.log(res);
        if (res.meta.success) {
          //加载列数据
          that.listdata = res.data.list;
          that.total = res.data.total;
        }
      });
    },
    setPage(val) {
      this.pageNum=val.pageNum;
      this.init();
    },
    search() {
      this.pageNum = 1;
      this.init();
    },
    rowdblclick(val) {},
    //添加商品
    addgoods() {
      if (this.params.typeid == "-1" || this.params.typeid == undefined) {
        this.$message.error("全部类型状态下不能添加商品");
        return;
      }
      this.$set(this.params, "goodsshow", true);
    },
    //移除商品
    deletegoods() {
      var that = this;
      var list = that.$refs.childrenlist.multipleSelection;
      var ids = "";
      for (let i = 0; i < list.length; i++) {
        ids = ids + list[i].id + ",";
      }
      ids = ids.substring(0, ids.lastIndexOf(","));
      var p = { ids: ids };
      API.deletesellgoods(p).then(function(res) {
        if (res.meta.success) {
          that.$message.success("移除成功");
          that.init();
        } else {
          that.$message.error("移除失败");
        }
      });
    },
    //返回按钮
    back_click() {
      this.$router.back(-1);
    },
    checkgoods(ids) {
      var that = this;
      var p = { sellTypeId: this.params.typeid, ids: ids };
      API.addsellgoods(p).then(function(res) {
        if (res.meta.success) {
          that.$message.success("添加商品成功");
          that.init();
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
.btn.mt10.el-row {
  margin-top: 5px;
}
.right-button {
  float: right;
}
.el-button--warning {
  color: #000;
  background-color: #ffb822;
  border-color: #ffb822;
}
.el-button--warning:hover {
  background: #ebb563;
  border-color: #ebb563;
}
</style>
