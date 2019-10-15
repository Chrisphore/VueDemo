export default [{
    path: '/basic',
    name: '网站',
    component: resolve => require(['@/views/home'], resolve),
    leaf: true,
    menuShow: true,
    meta: {
        keepAlive: true
    },
    iconCls: 'iconfont icon-home', // 图标样式class
    children: [{
        path: '/basic',
        component: resolve => require(['@/views/basic/menu'], resolve),
        name: '网站设置',
        menuShow: false,
        meta: {
            keepAlive: true
        },
        redirect: '/basic/homelist',
        children: [
            {
                path: '/basic/homelist',
                component: resolve => require(['@/views/basic/homelist'], resolve),
                name: '商城首页装修',
                meta: {
                    keepAlive: true
                },
                menuShow: true
            },
            {
                path: '/basic/wxhomelist', component: resolve => require(['@/views/basic/wxhomelist'], resolve), name: '微商城装修', meta: {
                    keepAlive: true
                }, menuShow: true
            },
            {
                path: '/basic/flooredit', component: resolve => require(['@/views/basic/home/flooredit'], resolve), name: '楼层编辑', meta: {
                    keepAlive: true
                }, menuShow: false
            },
            {
                path: '/basic/ordercenter', component: resolve => require(['@/views/basic/ordercenter'], resolve), name: '订货中心', meta: {
                    keepAlive: true
                }, menuShow: true
            },
            {
                path: '/basic/basiclist', component: resolve => require(['@/views/basic/basiclist'], resolve), name: '基本信息设置', meta: {
                    keepAlive: true
                }, menuShow: true
            },
            {
                path: '/basic/brandlist', component: resolve => require(['@/views/basic/brandlist'], resolve), name: '品牌设置', meta: {
                    keepAlive: true
                }, menuShow: true
            },
            {
                path: '/basic/advertisinglist', component: resolve => require(['@/views/basic/advertisinglist'], resolve), name: '广告设置', meta: {
                    keepAlive: true
                }, menuShow: true
            },
            {
                path: '/basic/noticelist', component: resolve => require(['@/views/basic/noticelist'], resolve), name: '公告设置', meta: {
                    keepAlive: true
                }, menuShow: true
            },
            {
                path: '/basic/articlecatlist', component: resolve => require(['@/views/basic/articlecatlist'], resolve), name: '文章分类设置', meta: {
                    keepAlive: true
                }, menuShow: true
            },
            {
                path: '/basic/articledetaillist', component: resolve => require(['@/views/basic/articledetaillist'], resolve), name: '文章管理', meta: {
                    keepAlive: true
                }, menuShow: true
            },
            {
                path: '/basic/linkslist', component: resolve => require(['@/views/basic/linkslist'], resolve), name: '友情链接', meta: {
                    keepAlive: true
                }, menuShow: true
            },
            {
                path: '/basic/menulist', component: resolve => require(['@/views/basic/menulist'], resolve), name: '导航菜单设置', meta: {
                    keepAlive: true
                }, menuShow: true
            },
            {
                path: '/basic/floormenage', component: resolve => require(['@/views/basic/home/floormenage'], resolve), name: '楼层管理', meta: {
                    keepAlive: true
                }, menuShow: true
            }
        ]
    },
    {
        path: '/bascic/sell',
        component: resolve => require(['@/views/basic/ordercenter/sellhotcategory'], resolve),
        name: '畅销类目',
        menuShow: true, meta: {
            keepAlive: true
        },
        redirect: '/bascic/sell/sellhotgoods',
        children: [
            {
                path: '/bascic/sell/sellhotgoods',
                component: resolve => require(['@/views/basic/ordercenter/sellhotgoods'], resolve),
                name: '畅销商品', meta: {
                    keepAlive: true
                },
                menuShow: true
            }
        ]
    }
    ]
}]