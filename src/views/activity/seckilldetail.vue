<template>
  <div>
    <div ref="head">
      <div class="topBtn">
        <btn-custom :btnType="2" :custombtn="custombtn"></btn-custom>
      </div>
    </div>
    <el-row>
      <el-col :span="24">
        <div class="bootomclas" style="margin-top:5px">
          <list-data ref="childrenlist" :columndata="columndatas" :bindata="listdata" :headHeight="headHeight"></list-data>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="block">
          <tools-page :total="total" ref="pagetool" @setPage="setPage"></tools-page>
        </div>
      </el-col>
    </el-row>
    <seckill-qrcode></seckill-qrcode>
  </div>
</template>

<script>
import toolsbtncustom from "@/components/toolsbtncustom";
import toolspage from "@/components/toolspage";
import list from "@/components/list";
import API from "@/api/seckill";
import seckillqrcode from "./seckillqrcode";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    "btn-custom": toolsbtncustom,
    "list-data": list,
    "tools-page": toolspage,
    "seckill-qrcode": seckillqrcode
  },
  data() {
    return {
      columndatas: [
        {
          label: "活动名称",
          prop: "title"
        },
        {
          width: 260,
          label: "秒杀商品",
          prop: "goodsName"
        },
        {
          label: "秒杀价",
          prop: "seckillPrice"
        },
        {
          label: "秒杀单号",
          prop: "orderNo"
        },
        {
          label: "秒杀人",
          prop: "khName"
        },
        {
          label: "秒杀数量",
          prop: "amount"
        },
        {
          label: "总金额",
          prop: "totalMoney"
        },
        {
          label: "状态",
          prop: "statusName",
          align: "center"
        },
        {
          label: "秒杀时间",
          prop: "createTime",
          type: "ymd"
        }
      ],
      listdata: null,
      total: 0,
      headHeight: 0,
      custombtn: [
        {
          name: "返回",
          icoName: " fa-back s-blue",
          fnHandler: "$parent.back_click()"
        }
      ]
    };
  },
  mounted() {
		this.headHeight = this.$refs.head.offsetHeight+10;
    this.serarch();
  },
  activated() {
    this.serarch();
  },
  methods: {
    ...mapActions({
      setparms: "setparams"
    }),
    setPage() {},
    serarch() {
      var that = this;
      var p = {
        pageNum: that.$refs.pagetool.page_currentpage,
        pageSize: that.$refs.pagetool.page_size,
        seckillId: this.$route.query.id
      };
      API.getseckillqueuedetail(p).then(function(res) {
        if (res.meta.success) {
          //加载列数据
          that.listdata = res.data.list;
          that.total = res.data.total;
        }
      });
    },
    back_click() {
      this.$router.back(-1);
    }
  }
};
</script>