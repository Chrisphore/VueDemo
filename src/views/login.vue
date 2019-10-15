<template>
  <el-form ref="AccountFrom" :model="account" :rules="rules" label-position="left" label-width="0px"
           class="demo-ruleForm login-container">
    <h3 class="title">管理员登录</h3>
    <el-form-item prop="username">
      <el-input type="text" v-model="account.username" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="pwd">
      <el-input type="password" v-model="account.pwd" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleLogin" :loading="loading">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import API from "@/api/login";
import Md5 from "@/common/Md5Util";
export default {
  data() {
    return {
      loading: false,
      account: {
        username: "b2test",
        pwd: "abc123"
      },
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" }
          //{ validator: validaePass }
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" }
          //{ validator: validaePass2 }
        ]
      },
      checked: true
    };
  },
	mounted() {
		this.init();
	},
  methods: {
		init() {
      	var host = window.location.host;
			this.get("/main/domain",1, '').then(res => {
					localStorage.setItem(host + "tenantCode", res.data);
			});
		},
    handleLogin() {
      var that = this;
      var p = {
        userName: this.account.username,
        password: Md5.CalcuMD5(this.account.pwd)
      };
			var host = window.location.host;
			localStorage.setItem(host + "X-Token", "");
			localStorage.setItem(host + "X-User", this.account.username);
      API.login(p).then(function(res) {
        if (res.meta.success) {
          var jsonstr = JSON.stringify(res);
          localStorage.setItem(host + "UserId", res.data.user.id);
          localStorage.setItem(host + "X-router", 0);
          localStorage.setItem(host + "X-Token", res.data.token);
          localStorage.setItem(host + "X-User", res.data.user.username);
          that.$router.push("/member");
        }
      });
    }
  }
};
</script>
<style scoped>
body {
  background: #dfe9fb;
}
</style>
<style lang="scss" scoped>
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 160px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;

  background: -ms-linear-gradient(top, #ace, #00c1de); /* IE 10 */
  background: -moz-linear-gradient(top, #ace, #00c1de); /*火狐*/
  background: -webkit-gradient(
    linear,
    0% 0%,
    0% 100%,
    from(#ace),
    to(#00c1de)
  ); /*谷歌*/
  background: -webkit-linear-gradient(
    top,
    #ace,
    #00c1de
  ); /*Safari5.1 Chrome 10+*/
  background: -o-linear-gradient(top, #ace, #00c1de); /*Opera 11.10+*/

  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}
</style>
