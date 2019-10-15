<!-- Table -->
<template>
    <el-dialog title="二维码" :visible="ishow" center width="15%" @open="openinit" @close="closedialog">
        <el-row>
            <el-form :inline="true" class="el-form-class" label-width="120">
                <el-form-item>
                    <img :src="imgurl" style="width:100%;"></img>
                </el-form-item>
            </el-form>

        </el-row>

    </el-dialog>

</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
        imgurl: ""
    };
  },
  computed: {
    ...mapState({
      params: state => state.toolslist.params,
      ishow: state => state.toolslist.params.qrcodestt
    })
  },
  methods: {
    ...mapActions({
      setparms: "setparams"
    }),
    //窗体初始化加载事件
    openinit: function() {
        this.imgurl=this.params.qrcodeimgurl;
    },
    closedialog: function() {
        this.params.qrcodestt=false;
    }
  }
};
</script>