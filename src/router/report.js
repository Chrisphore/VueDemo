export default
	{
		path: '/report',
		component: resolve => require(['@/views/home'], resolve),
		name: '报表与分析',
		leaf: false, // 只有一个节点
		menuShow: true,
		meta: {
			keepAlive: true
		},
		iconCls: 'iconfont icon-books',
		children: [
			{
				path: '/report/reportlist',component: resolve => require(['@/views/report/reportlist'], resolve),name: '综合查询',menuShow: true,
				meta: {
					keepAlive: true
				}
			},
			{
				path: '/report/query/:menuCode',component: resolve => require(['@/views/report/query'], resolve),name: '报表查询',menuShow: false,
				meta: {
					keepAlive: true
				}
			},
			{
				path: '/report/tableconfiglist', component: resolve => require(['@/views/report/tableconfiglist'], resolve), name: '列表配置', menuShow: true,
				meta: {
					keepAlive: true
				}
			},
			{
				path: '/report/tableconfigedit', 
				component: resolve => require(['@/views/report/tableconfigedit'], resolve), 
				name: '新增/编辑列表配置', 
				menuShow: false,
				meta: {
					keepAlive: true
				}
			}
		]
	}
