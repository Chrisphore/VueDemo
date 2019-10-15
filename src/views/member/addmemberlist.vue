<template>
	<el-dialog title="请选择需添加的会员" :visible="ishow" center width="60%" @open="init" @close="closedialog">
		<div>
			<el-row>
				<el-col :span="24">
					<div class="bootomclas"  style="margin-top:5px">
						<list-data :columndata="columndatas" :bindata="listdata" @rowdblclick="rowdblclick"></list-data> 
					</div>
				</el-col>
				<el-col :span="24">
					<div class="block">
						<tools-page :total="total" @setPage="setPage" :pagesize="listQuery.pageSize"></tools-page>
					</div>
				</el-col>
			</el-row>
		</div>
		<div slot="footer" class="dialog-footer">
			<el-button type="info" class="eidtButton" @click="closedialog" plain>取消</el-button>
			<el-button type="warning" class="eidtButton" @click="onSubmit">保存</el-button>
		</div>
	</el-dialog>
</template>
<script>
import API from "@/api/member";
import toolsbtn from "@/components/toolsbtn";
import list from "@/components/list";
import toolspage from "@/components/toolspage";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    "btn-tools": toolsbtn,
    "list-data": list,
    "tools-page": toolspage
  },
  computed: {
    ...mapState({
      multipleSelection: state => state.toolslist.multipleSelection,
      ishow: state => state.toolslist.dialogshow,
      id: state => state.toolslist.id
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
          label: "账号",
          prop: "phone"
        },
        {
          label: "公司名称",
          prop: "company"
        },
        {
          label: "客户编号",
          prop: "code"
        },
        {
          label: "客户名称",
          prop: "name"
        },
        {
          label: "联系人",
          prop: "contact"
        },
        {
          label: "售价方式",
          prop: "priceMode"
        },
        {
          label: "职位",
          prop: "job"
        }
      ],
      listdata: [],
      total: 0,
      listLoading: true,
      listQuery: {
        pageSize: 20,
        pageNum: 1,
        memberGroupId: 0
      },
      myHeight: window.innerHeight - 220 + "px"
    };
  },

  methods: {
    ...mapActions({
      setdialoghidden: "setdialoghidden",
      setMultipleSelection: "setMultipleSelection"
    }),

    init() {
      var that = this;
      that.listQuery.memberGroupId = that.id;
	  console.log(this.listQuery);
      API.getmemberselectlist(that.listQuery).then(function(res) {
        if (res.meta.success) {
          that.total = res.data.total;
          that.listdata = res.data.list;
		  console.log(res.data.list);
        }
      });
    },
    setPage(msg) {
      this.listQuery.pageSize = msg.pageSize;
      this.listQuery.pageNum = msg.pageNum;
      this.init();
    },
    closedialog() {
      this.setdialoghidden();
    },
    rowdblclick(val) {},

    onSubmit() {
      var that = this;
      var list = that.multipleSelection;
      var params = {
        memberGroupId: 0,
        memberIds: null
      };

      if (list.length == 0) {
        this.$message({
          message: "请选择要添加的会员记录!",
          type: "warning"
        });
      } else {
        let ids = "";
        for (let i = 0; i < list.length; i++) {
          ids = ids + "," + list[i].id;
        }
        if (ids.length > 0) {
          ids = ids.substring(1);
        }
        params.memberIds = ids;
        params.memberGroupId = that.id;
        API.addgroupdetail("GET", params).then(function(res) {
          if (res.meta.success) {
            that.$message({
              message: "添加成功",
              type: "success"
            });
            that.$parent.init();
            that.setdialoghidden();
            that.setMultipleSelection(null);
          } else {
            console.log(res);
            that.$message.error("添加失败");
          }
        });
      }
    }
  }
};
</script>
<style scoped lang="scss">
.btn.mt10.el-row {
  margin-top: 5px;
}
</style>
