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
					<el-button type="info" @click="init" plain class="queryBtn">查询</el-button>
				</el-col>
			</el-form>
		</el-row>

			<el-row>
				<el-col :span="18">
					<div class="bootomclas">
						<list-data :columndata="columndatas" :bindata="listdata" headHeight="350" @btnclick="btnclick"></list-data>
					</div>
				</el-col>
				<el-col :span="5" style="margin-left:10px;">
				 <el-upload 
  action="#"
  :on-remove="handleRemove"
  :file-list="fileList2"
  list-type="picture">
</el-upload>
				</el-col>
			</el-row>
      <el-row>
        <el-col :span="24">
	      <div class="block">
						<tools-page :total="total" @setPage="setPage" :pagesize="listQuery.pageSize"></tools-page>
					</div>
        </el-col>
      </el-row>
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
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      columndatas: [
        {
          label: "操作",
          prop: "id",
          type: "btns",
          width: "75px",
          btns: [
            {
              type: "success",
              text: "选择",
              handle: "edit"
            }
          ]
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
      fileList2: []
    };
  },
  computed: {
    ...mapState({
      ishow: state => state.toolslist.datamodel.goodsshow,
      datamodel: state => state.toolslist.datamodel,
      arealist: state => state.toolslist.datamodel.arealist
    })
  },
  methods: {
    ...mapActions({
      setdatamodel: "setdatamodel"
    }),
    closedialog() {
      this.datamodel.goodsshow = false;
    },
    openinit() {
      this.initData();
    },
    setPage(msg) {
      this.listQuery.pageSize = msg.pageSize;
      this.listQuery.pageNum = msg.pageNum;
      this.serach();
    },
    onSubmit() {},
    initData() {
      this.initCategory();
      this.initPageData();
      this.initSelectData();
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
    //初始化已选择的数据
    initSelectData() {
      var that = this;
      that.fileList2 = [];
      var p = this.arealist.filter(function(item) {
        if (item.dictId == that.datamodel.id) {
          if (item.goodsId != "") {
            var q = { id: item.goodsId };
            API.getgoodsdetail(q).then(function(res) {
              var e = {
                id: res.data.obj.goodsId,
                name: res.data.obj.goodsCode,
                url: res.data.obj.picture,
                goodsName: res.data.obj.goodsName
              };
              that.fileList2.push(e);
            });
          }
        }
      });
    },
    handleRemove(file, fileList) {
      for (let i = 0; i < this.fileList2.length; i++) {
        if (this.fileList2[i].id == file.id) {
          this.fileList2.splice(i, 1);
        }
      }

      var that = this;
      this.arealist.filter(function(item) {
        if (item.dictId == that.datamodel.id) {
          if (that.fileList2.length > 0) {
            item.goodsId = that.fileList2[0].id;
            item.goodsName = that.fileList2[0].goodsName;
          }
          else
          {
            item.goodsId = "";
            item.goodsName = "";
          }
        }
      });
    },
    btnclick(id, handle) {
      eval("this." + handle + "(" + id + ")");
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
       this.listQuery.pageNum = 1;
       this.serach();
    },
    edit(id) {
      var that = this;
      if (this.fileList2.length >= this.limit) {
        this.$message.error("当前最多添加" + this.limit + "个商品");
        return;
      }
      var p = this.listdata.filter(function(item) {
        if (item.id == id) {
          return item;
        }
      });
      if (p.length > 0) {
        var q = {
          id: p[0].goodsId,
          name: p[0].goodsCode,
          url: p[0].picture,
          goodsName: p[0].goodsName
        };
        var f = false;
        if (this.fileList2.length > 0) {
          for (let i = 0; i < this.fileList2.length; i++) {
            if (this.fileList2[i].id == q.id) {
              f = true;
            }
          }
        }
        if (!f) {
          this.fileList2.push(q);
        }
        this.arealist.filter(function(item) {
          if (item.dictId == that.datamodel.id) {
            if (that.fileList2.length > 0) {
              item.goodsId = that.fileList2[0].id;
              item.goodsName = that.fileList2[0].goodsName;
            }
          }
        });
      }
    }
  }
};
</script>
