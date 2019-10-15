<template>
	<el-dialog title="选择商品" :visible="ishow" center width="60%" height="500px" @open="openinit" @close="closedialog" class="eidt_body">
		<el-container>
			<el-aside width="79%">
					<div class="serachgoods">
						<el-form :inline="true" class="el-form-class" :model="listQuery">
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
						
						</el-form>
					</div>
					<div class="bootomclas">
								<list-data :columndata="columndatas" :bindata="listdata" headHeight="250" @btnclick="btnclick"></list-data>
							</div>
						
						<div class="block">
								<tools-page :total="total" @setPage="setPage" :pagesize="listQuery.pageSize"></tools-page>
							</div>
						
			</el-aside>
			<el-main>
					<el-upload 
					  class="avatar-uploader"
						action="#"
						:on-remove="handleRemove"
						:file-list="fileList2"
						list-type="picture">
					</el-upload>
			</el-main>
		</el-container>
		

			
      
    <!-- <div slot="footer" class="dialog-footer">
   
         <el-button type="primary" >确定选择</el-button>
    </div> -->
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
      default: 8
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
      var that = this;
      this.params.listdata.filter(function(item) {
        if (item.id == that.params.id) {
          item.typeGoodsSize = that.fileList2.length;
        }
      });
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
      //新增分类的时候 初始化已选择的商品值
      if (this.params.viewflag == "add") {
        var p = this.params.listdata.filter(function(item) {
          if (item.id == that.params.id) {
            that.fileList2 = item.goodslist;
          }
        });
      }
      //加载已有分类时的初始化已选择的商品
      if (this.params.viewflag == "edit") {
        var p = { typeId: this.params.id };
        var f = false;
        var j = [];
        //判断商品列表是否已经更改过  如果更改过 则以更改过的为主
        this.params.listdata.filter(function(item) {
          if (item.id == that.params.id && item.flag) {
            j = item.goodslist;
            f = true;
          }
        });
        if (f) {
          that.fileList2 = j;
        } else {
          //初始化加载商品选择数据
          API.getplandetailgoodsbyid(p).then(function(res) {
            if (res.data.length > 0) {
              res.data.forEach(element => {
                var q = {
                  id: element.goodsId,
                  name: element.goodsCode,
                  url: element.picture
                };
                that.fileList2.push(q);
              });
            }
            that.params.listdata.filter(function(item) {
              if (item.id == that.params.id) {
                item.goodslist = that.fileList2;
                item.flag = true;
              }
            });
          });
        }
      }
    },
    handleRemove(file, fileList) {
      for (let i = 0; i < this.fileList2.length; i++) {
        if (this.fileList2[i].id == file.id) {
          this.fileList2.splice(i, 1);
        }
      }
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
        this.listQuery.pageNum =1;
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
        var q = { id: p[0].goodsId, name: p[0].goodsCode, url: p[0].picture };
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
        this.params.listdata.filter(function(item) {
          if (item.id == that.params.id) {
            item.goodslist = that.fileList2;
          }
        });
      }
    }
  }
};
</script>

<style> 
	
	
	.serachgoods{
		margin-top: 5px;
		background: #FFF;
		width: 99%;
		border: 1px solid #d4d8d9;
	}
	
	.avatar-uploader > .el-upload-list{
		margin-top: -35px;
	}
	
	.avatar-uploader > .el-upload-list--picture .el-upload-list__item{
		width: 200px;
		margin-top:5px;
		height: 82px;
	}
	
	.avatar-uploader > .el-upload-list--picture .el-upload-list__item-name{
		margin-right: 0px;
		
	}
	
	.avatar-uploader > .el-upload-list--picture .el-upload-list__item-thumbnail {
    width: 60px;
    height: 60px;
	}
	
</style>