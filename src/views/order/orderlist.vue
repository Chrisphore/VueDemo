<template>
	<div>
		<div ref="head">
		<div class="topBtn">
			<btn-custom :btnType="2" :custombtn="custombtn"></btn-custom>
		</div>
		<el-row class="topsercah">
			<el-form :inline="true" class="el-form-class" :model="listQuery">
				<el-col>
				<el-form-item label="日期">
					<tool-datepicker ref="picker" :defualtimeprop="listQuery.defualtimeprop"> </tool-datepicker>
				</el-form-item>
				<el-form-item label="订单号">
					<el-input v-model="listQuery.orderNo" placeholder="订单号"></el-input>
				</el-form-item>
					<el-form-item label="手机号码">
						<el-input v-model="listQuery.phone" placeholder="手机号码"></el-input>
					</el-form-item>
					<el-form-item label="客户名称">
						<el-input v-model="listQuery.khName" placeholder="客户名称"></el-input>
					</el-form-item>
					<el-button type="info" v-on:click="search" plain class="queryBtn">查询</el-button>
				</el-col>
			</el-form>
		</el-row>
		</div>
		<el-row>
			<el-col :span="24">
				<div class="bootomclas">
					<list-data :columndata="columndatas" :bindata="listdata" @rowdblclick="rowdblclick" :headHeight="headHeight"></list-data>
				</div>
			</el-col>
			<el-col :span="24">
				<div class="block">
					<tools-page :total="total" @setPage="setPage" :pagesize="listQuery.pageSize" :currentpage="listQuery.pageNum"></tools-page>
				</div>
			</el-col>
		</el-row>
		<order-merge></order-merge>
	</div>
</template>
<script>
import order from "@/api/order";
import toolsbtncustom from "@/components/toolsbtncustom";
import list from "@/components/list";
import toolspage from "@/components/toolspage";
import { mapState, mapActions } from "vuex";
import ordermerge from "./ordermerge";
import selectlist from "@/components/toolselect";
import toolsdatepicker from "@/components/toolsdatepicker";

export default {
  components: {
    "btn-custom": toolsbtncustom,
    "list-data": list,
    "tools-page": toolspage,
    "order-merge": ordermerge,
    "select-list": selectlist,
    "tool-datepicker": toolsdatepicker
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
          label: "来源",
          prop: "sourceName",
          width: "120"
        },
        {
          label: "合并单号",
          prop: "merageNo",
          width: "150"
        },
        {
          label: "支付状态",
          prop: "payStatusName",
          width: "120"
        },
        {
          label: "订单号",
          prop: "orderNo",
          width: "200"
        },
        {
          label: "订单状态",
          prop: "statusName",
          width: "120"
        },
        {
          label: "客户名称",
          prop: "khName",
          width: "120"
        },
        {
          label: "下单时间",
          prop: "createTime",
          width: "180",
          type: "ymd"
        },
        {
          label: "审核时间",
          prop: "applyTime",
          width: "180",
          type: "ymd"
        },
        {
          label: "总价",
          prop: "totalMoney",
          width: "120"
        },
        {
          label: "送货地址",
          width: "250",
          prop: "address",
          type: "title"
        },
        {
          label: "销售单号",
          width: "120",
          prop: "saleNo"
        },
        {
          label: "联系人",
          width: "120",
          prop: "recevier"
        },
        {
          label: "联系电话",
          width: "120",
          prop: "phone"
        },
        {
          label: "订单备注",
          width: "120",
          prop: "summary"
        },
        {
          label: "卡券名称",
          width: "120",
          prop: "cardName"
        },
        {
          label: "卡券面值",
          width: "120",
          prop: "cardMoney"
        },
        {
          label: "订单类型",
          width: "120",
          prop: "orderTypeName"
        }
      ],
      listdata: null,
      total: 1,
      listLoading: true,
      listQuery: {
        pageSize: 20,
        pageNum: 1,
        orderNo: "",
        phone: "",
        khName: "",
				defualtimeprop:[new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 7),new Date()]
      },
      headHeight: 0,
      editurl: "/order/orderedit",
      custombtn: [
        {
          name: "订单编辑",
          icoName: "edit s-green",
          fnHandler: 'modify_click("/order/orderedit")'
        },
        {
          name: "订单合并",
          icoName: "copy s-green",
          fnHandler: "modify_click()"
        }
      ]
    };
  },
  computed: {
    ...mapState({
      menuId: state => state.toolslist.menuId,
      params: state => state.toolslist.params
    })
  },
  mounted() {
    this.headHeight = this.$refs.head.offsetHeight;
    this.init();
  },
  methods: {

    init() {
			if(this.params.orderQuery != undefined)
			{
				this.listQuery = this.params.orderQuery;
				this.listQuery.defualtimeprop = [this.listQuery.dateStart,this.listQuery.dateEnd];
			}else{
				this.listQuery.dateStart = this.$refs.picker.starttime;
				this.listQuery.dateEnd = this.$refs.picker.endtime;
				this.$set(this.params,"orderQuery",this.listQuery);
			}
			this.listQuery.status = this.menuId;
     // console.log(this.listQuery.orderNo);
      order.orders("PAGE", this.listQuery).then(res => {
        this.total = res.data.total;
        this.listdata = res.data.list;
      });
    },
    search() {
      this.listQuery.pageNum = 1;
			
			this.listQuery.dateStart = this.$refs.picker.starttime;
			this.listQuery.dateEnd = this.$refs.picker.endtime;
			this.$set(this.params,"orderQuery",this.listQuery);
      this.init();
    },
    setPage(msg) {
      this.listQuery.pageSize = msg.pageSize;
      this.listQuery.pageNum = msg.pageNum;
      this.init();
    },
    rowdblclick(val) {
      this.$router.push({ path: this.editurl, query: { id: val.id } });
    }
  },
  beforeRouteUpdate(to, from, next) {
		
    this.listQuery.pageNum = 1;
    this.init();
  }
};
</script>
