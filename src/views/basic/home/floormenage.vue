<template>
  <div>
    <div ref="head">
          <div class="topBtn">
				<btn-custom :btnType="2" :custombtn="custombtn" :customrightbtn="custombtnright"></btn-custom>
		</div>
      <!-- <el-row class="btn btnactive">
        <el-col class="el-col-sty m-view">
          <template v-for="item in btnlist">
            <el-button size="small" :autofocus="item.autofocus ? true : false" v-if="item.show" round @click="addfloor(item.floorid)">{{item.name}}</el-button>
          </template>
        </el-col>
      </el-row> -->
    </div>
    <el-row>
      <div class="bootomclas">
        <list-member :columndata="columndatas" :bindata="listdata" ref="childrenlist" @rowdblclick="rowdblclick" 
        :headHeight="headHeight">
        </list-member>
      </div>
    </el-row>
  </div>
</template>
<script>
import list from "@/components/list";
import { mapGetters, mapActions } from "vuex";
import API from "@/api/decoration";
import toolsbtncustom from "@/components/toolsbtncustom";
export default {
  components: {
    "btn-custom": toolsbtncustom,
    "list-member": list
  },
  data() {
    return {
      formInline: {
        name: "",
        mobile: "",
        coustromtag: "",
        selectdata: {
          pcode: "",
          code: "",
          type: 2
        }
      },
      columndatas: [
        {
          label: "id",
          prop: "id",
          type: "selection"
        },
        {
          label: "楼层名称",
          prop: "name"
        },
        {
          label: "楼层类型",
          prop: "floorstyle"
        },
        {
          label: "排序",
          prop: "sort"
        },
        {
          label: "状态",
          prop: "floorsStatus"
        }
        // ,
        // {
        //   label: "操作",
        //   type: "btns",
        //   btns: [
        //     {
        //       type: "success",
        //       text: "编辑",
        //       handle: "edit"
        //     },
        //     {
        //       type: "danger",
        //       text: "删除",
        //       handle: "delete"
        //     }
        //   ]
        // }
      ],
      listdata: null,
      showstu: false,
      memberid: 0,
      headHeight: 0,
      custombtn: [
        {
          name: "返回",
          icoName: " fa-back s-green",
          fnHandler: "$parent.back_click()"
        },
        {
          name: "编辑",
          icoName: "edit s-green",
          fnHandler: "$parent.clickeditfloor()"
        },
        {
          name: "删除",
          icoName: "delete s-green",
          fnHandler: "$parent.clickdeletefloor()"
        }
      ],
      custombtnright: [
        {
          name: "新建楼层样式3",
          fnHandler: "$parent.addfloor(3)"
        },

        {
          name: "新建楼层样式2",
          fnHandler: "$parent.addfloor(2)"
        },
        {
          name: "新建楼层样式1",
          fnHandler: "$parent.addfloor(1)"
        }
      ],
      btnlist: [
        {
          name: "新建楼层样式一",
          autofocus: false,
          floorid: 1,
          show: true,
          index: 0
        },
        {
          name: "新建楼层样式二",
          autofocus: false,
          floorid: 2,
          show: true,
          index: 1
        },
        {
          name: "新建楼层样式三",
          autofocus: false,
          floorid: 3,
          show: true,
          index: 2
        },
        {
          name: "新建楼层样式四",
          autofocus: false,
          floorid: 4,
          show: true,
          index: 3
        }
      ],
      plantype: ""
    };
  },
  mounted() {
    this.headHeight = this.$refs.head.offsetHeight;
    if (this.$route.query.flag == "pc") {
      // this.btnlist[3].show = false;
      // this.$set(this.btnlist, 3, this.btnlist[3]);
      this.plantype = "1";
    } else {
      var p = { name: "新建楼层样式4", fnHandler: "$parent.addfloor(4)" };
      this.custombtnright.splice(0,0,p);
      this.plantype = "2";
    }
    this.search();
  },
  methods: {
    ...mapActions({
      setdialogshow: "setdialogshow",
      setid: "setid",
      setparams: "setparams"
    }),
    search() {
      var that = this;
      var p = { planType: this.plantype };
      API.getplandetailist(p).then(function(res) {
        if (res.meta.success) {
          //加载列数据
          that.listdata = res.data;
        }
      });
    },
    //记录双击事件
    rowdblclick(val) {
      this.$router.push({
        path: "/basic/flooredit",
        query: {
          planid: val.id
        }
      });
    },
    addfloor(id) {
      var flag = this.$route.query.flag; //pc or wx  floorid 楼层样式id  planid 楼层方案id
      this.$router.push({
        path: "/basic/flooredit",
        query: {
          planflag: flag,
          floorid: id,
          planid: 0
        }
      });
    },

    clickeditfloor() {
      var id = this.getcheckids(false);
      if (id != undefined) {
        this.edit(id);
      }
    },
    edit(id) {
      this.$router.push({
        path: "/basic/flooredit",
        query: {
          planid: id
        }
      });
    },
    clickdeletefloor() {
      var id = this.getcheckids(true);
      if (id != undefined) {
        this.delete(id);
      }
    },
    delete(id) {
      var p = { ids: id };
      var that = this;
      API.deletefloorbyid(p).then(function(res) {
        if (res.meta.success) {
          that.$message.success("删除成功");
          that.search();
        } else {
          that.$message.error("删除失败" + res.meta.message);
        }
      });
    },
    back_click() {
        this.$router.back(-1);
    },
    //获取选择id
    getcheckids(ismultiple) {
      var ids = "";
      var that = this;
      var list = that.$refs.childrenlist.multipleSelection;
      if (ismultiple) {
        if (list.length == 0) {
          that.$message.warning("请至少选择一条记录进行操作");
          return;
        }
        for (let i = 0; i < list.length; i++) {
          ids = ids + list[i].id + ",";
        }
        ids = ids.substring(0, ids.lastIndexOf(","));
      } else {
        if (list.length == 0) {
          that.$message.warning("请选择一条记录进行查看");
          return;
        }
        if (list.length > 1) {
          that.$message.warning("当前一次只能操作一条记录");
          return;
        }
        ids = list[0].id;
      }
      return ids;
    }
  }
};
</script>

<style>
.btnactive button:hover {
  color: #606266;
  background: #ffb822;
}
.btnactive button:focus {
  color: #606266;
  background: #ffb822;
}
.btnactive button:active {
  color: #606266;
  background: #ffb822;
}
</style>

