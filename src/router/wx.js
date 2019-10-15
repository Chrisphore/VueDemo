export default
	{
		path: '/wx',
		component: resolve => require(['@/views/home'], resolve),
		name: '微信',
		leaf: true, // 只有一个节点
		menuShow: true,
		meta: {
			keepAlive: true
		},
		iconCls: 'iconfont icon-books',
		children: [{
			path: '/wx/wxlist',
			component: resolve => require(['@/views/wx/wxlist'], resolve),
			name: '微信列表',
			menuShow: true,
			meta: {
				keepAlive: true
			}
		},
		{
			path: '/wx/wxedit',
			component: resolve => require(['@/views/wx/wxedit'], resolve),
			name: '微信配置编辑',
			menuShow: true,
			meta: {
				keepAlive: true
			}
		}
		]
	}
