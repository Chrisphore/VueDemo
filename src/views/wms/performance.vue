<template>
  <div class="wms-perform">
    <div>
      <h1>绩效排行榜</h1>
      <ul>
        <li>
          <h3>{{titleObj.yxgs}}</h3>
          <p>今日有效工时</p>
        </li>
        <li><h3>{{titleObj.orderQty}}</h3><p>今日单号</p></li>
        <li><h3>{{titleObj.dpQty}}</h3><p>今日条码数</p></li>
        <li><h3>{{titleObj.pickQty}}</h3><p>今日数量</p></li>
        <li><h3>{{titleObj.totalAmount}}</h3><p>今日金额</p></li>
        <li><h3>{{titleObj.jxgz}}</h3><p>今日绩效</p></li>
      </ul>
    </div>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="date"
        label="排名"
        width="80"
        type="index">
        <template slot-scope="scope">

          <img class="wmsimg" src="../../assets/img/wms1.png" alt="" v-if="scope.$index===0" >
          <img class="wmsimg" src="../../assets/img/wms2.png" alt="" v-else-if="scope.$index===1" >
          <img class="wmsimg" src="../../assets/img/wms3.png" alt="" v-else-if="scope.$index===2" >
          <p v-else class="wmsp">{{scope.$index+1}}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="100">
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型"
         width="150">
      </el-table-column>
      <el-table-column
        prop="orderQty"
        label="单数"
        width="150">
      </el-table-column>
      <el-table-column
        prop="yxgs"
        label="有效工时"
        width="150">
      </el-table-column>
      <el-table-column
        prop="totalIP"
        label="总件数"
        width="150">
      </el-table-column>
      <el-table-column
        prop="totalSP"
        label="总散数"
        width="150">
      </el-table-column>
      <el-table-column
        prop="dpQty"
        label="条码数"
        width="150">
      </el-table-column>
      <el-table-column
        prop="pickQty"
        label="拣货数量"
        width="150">
      </el-table-column>
      <el-table-column
        prop="totalAmount"
        label="拣货金额"
        width="150">
      </el-table-column>
      <el-table-column
        prop="jxgz"
        label="绩效工资">
      </el-table-column>
    </el-table>
  </div>
  
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        titleObj:{}
      }
	},
	mounted() {
		this.init();
	},
    methods: {
		init(){
      let _this=this;
			this.get('/other/analysis/achievementsTotal','1',{}).then(res=>{
        _this.titleObj=Object.assign({},res.data);
				console.log(_this.titleObj,res.data)
			})
			this.get('/other/analysis/achievementsDetail',1,{}).then(res=>{
        console.log(res)
        _this.tableData=res.data
			})
		}
    }
  }
</script>

<style scoped>
	.wms-perform{
    width: 99%;
    margin: 0.5%;
    background: #ffffff;
    padding: 10px;
    box-sizing: border-box;
  }
  .wms-perform>div>h1{
    margin-bottom: 20px;
    text-align: center;
  }
  .wms-perform>div>ul{
    display: flex;
  }
  .wms-perform>div>ul>li{
    flex-grow: 1;
    margin: 10px;
    list-style-type:none;
  }
  .wms-perform>div>ul>li>h3{
    text-align: center;
    color: #f13a3a;
    font-size: 22px;
  }
  .wms-perform>div>ul>li>p{
    text-align: center;
    font-weight: bold;
    font-size: 14px;
  }
  .wmsimg{
    margin: 0 auto;
    display: block;
    padding: 5px;
  }
  .wmsp{
    text-align: center;
  }
</style>
