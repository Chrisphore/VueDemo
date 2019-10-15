export default
	{
		path: '/wms',
		component: resolve => require(['@/views/home'], resolve),
		name: 'wms',
		leaf: true, // 只有一个节点
		menuShow: true,
		meta: {
			keepAlive: true
		},
		iconCls: 'iconfont icon-books',
		children: [{
			path: '/wms/performance',
			component: resolve => require(['@/views/wms/performance'], resolve),
			name: 'wms绩效看榜',
			menuShow: true,
			meta: {
				keepAlive: true
			}
		}
		]
	}
