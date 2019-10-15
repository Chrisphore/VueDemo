<template>
	<el-dialog title="选择商品" :visible="ishow" center width="60%" height="500px" @open="openinit" @close="closedialog" class="eidt_body">
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
							<el-form-item label="品牌">
						<select-list ref="brand" pcode="" code="" type="4">
						</select-list>
					</el-form-item>
					<el-form-item label="商品分类">
					 <tools-cascader :bindata="treedata" ref="cascader"> </tools-cascader>
					</el-form-item>
          		<el-form-item >
					<el-button type="info" @click="init" plain class="queryBtn">查询</el-button>
          	</el-form-item>
				</el-col>
			</el-form>
		</el-row>

			<el-row>
				<el-col :span="24">
					<div class="bootomclas">
						<list-data ref="childrenlist" :columndata="columndatas" :bindata="listdata" headHeight="350" ></list-data>
					</div>
				</el-col>
			</el-row>
      <el-row>
        <el-col :span="24">
	      <div class="block">
						<tools-page :total="total" @setPage="setPage" :pagesize="listQuery.pageSize"></tools-page>
		  </div>
        </el-col>
      </el-row>
    <div slot="footer" class="dialog-footer">
         <el-button type="primary" @click="cofirmcheck" >确定选择</el-button>
    </div>
	</el-dialog>
</template>

<script>
import goods from "@/api/goods";
import editbtn from "@/components/editbtn";
import { mapState, mapActions } from "vuex";
import list from "@/components/list";
import toolspage from "@/components/toolspage";
import selectlist from "@/components/toolselect";
import toolscascader from "@/components/toolscascader";
import API from "@/api/decoration";
export default {
  components: {
    "btn-tools": editbtn,
    "list-data": list,
    "tools-page": toolspage,
    "select-list": selectlist,
    "tools-cascader": toolscascader
  },
  props: {
    limit: {
      type:Number,
      default: 0
    }
  },
  data() {
    return {
      columndatas: [
        {
          label: "操作",
          prop: "id",
          type: "selection",
          width: "75px"
        },
        {
          label: "图片",
          prop: "picture",
          type: "img",
          imgheight: "60px",
          width: "75px"
        },
        {
          label: "商品编号",
          prop: "goodsCode",
          width: 150
        },
        {
          label: "名称",
          prop: "goodsName"
        }
      ],
      listdata: null,
      total: 1,
      listLoading: true,
      listQuery: {
        keyword: "",
        pageSize: 20,
        pageNum: 1,
        typeId: -1,
        brandId: -1,
        status: 0,
        barCode: "",
        typeSpecification: ""
      },
      headHeight: 0,
      treedata: [],
      ids: ""
    };
  },
  computed: {
    ...mapState({
      ishow: state => state.toolslist.params.goodsshow,
      params: state => state.toolslist.params
    })
  },
  methods: {
    ...mapActions({
      setparams: "setparams"
    }),
    closedialog() {
      this.params.goodsshow = false;
    },
    openinit() {
      this.initData();
    },
    setPage(msg) {
      this.listQuery.pageSize = msg.pageSize;
      this.listQuery.pageNum = msg.pageNum;
      this.serach();
    },
    initData() {
      this.initCategory();
      this.initPageData();
    },
    //初始化分类数据
    initCategory() {
      goods.typeRelease("LIST", "", "").then(res => {
        this.treedata = this.toTree(res.data, "parentId", "typeId", null);
      });
    },
    //初始化查询
    initPageData() {
      goods.release("PAGE", this.listQuery).then(res => {
        this.total = res.data.total;
        this.listdata = res.data.list;
      });
    },
    serach() {
      this.listQuery.typeId = this.$refs.cascader.selectval;
      this.listQuery.brandId = this.$refs.brand.values;
      goods.release("PAGE", this.listQuery).then(res => {
        this.total = res.data.total;
        this.listdata = res.data.list;
      });
    },
    init() {
        this.listQuery.pageNum =1;
        this.serach();
    },
    //确定选择
    cofirmcheck() {
      var that = this;
      var list = that.$refs.childrenlist.multipleSelection;
      if(that.limit!=0) {
        if(that.limit<list.length) {
          that.$message.error("当前最多选择"+that.limit+"个商品");
          return;
        }
      }
      var ids = "";
      for (let i = 0; i < list.length; i++) {
        ids = ids + list[i].goodsId + ",";
      }
      ids = ids.substring(0, ids.lastIndexOf(","));
      that.ids = ids;
      that.params.goodsshow = false;
      that.$emit("checkgoods", that.ids);
    }
  }
};
</script>
