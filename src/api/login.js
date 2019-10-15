import * as API from '@/api'

export default {
  //登录
  login: params => {
    return API.GET('/account/user', 2,params)
  }
}
