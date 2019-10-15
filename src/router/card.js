export default
	{
		path: '/card',
		component: resolve => require(['@/views/home'], resolve),
		name: '优惠券',
		leaf: false, // 只有一个节点
		menuShow: true,
		meta: {
			keepAlive: true
		},
		iconCls: 'iconfont icon-books',
		children: [{
			path: '/card/planlist',
			component: resolve => require(['@/views/card/planlist'], resolve),
			name: '卡券管理',
			menuShow: true,
			meta: {
				keepAlive: true
			}
		},
		{
			path: '/card/plannew',
			component: resolve => require(['@/views/card/plannew'], resolve),
			name: '新增卡券',
			menuShow: false,
			meta: {
				keepAlive: true
			}
		},
		{
			path: '/card/putInType',
			component: resolve => require(['@/views/card/putInType'], resolve),
			name: '卡券精准投放',
			menuShow: true,
			meta: {
				keepAlive: true
			}
		},
		{
			path: '/card/putInNotOrdersByMonth',
			component: resolve => require(['@/views/card/putInNotOrdersByMonth'], resolve),
			name: '激活可能流失的用户',
			menuShow: false,
			meta: {
				keepAlive: true
			}
		},
		{
			path: '/card/putInLoginNotOrders',
			component: resolve => require(['@/views/card/putInLoginNotOrders'], resolve),
			name: '激活关注未下单用户',
			menuShow: false,
			meta: {
				keepAlive: true
			}
		},
		{
			path: '/card/putInWhileHeatHighKh',
			component: resolve => require(['@/views/card/putInWhileHeatHighKh'], resolve),
			name: '回馈热度较高的用户',
			menuShow: false,
			meta: {
				keepAlive: true
			}
		},
		{
			path: '/card/putInLoyaltyKh',
			component: resolve => require(['@/views/card/putInLoyaltyKh'], resolve),
			name: '回馈忠诚用户',
			menuShow: false,
			meta: {
				keepAlive: true
			}
		},
		{
			path: '/card/putInCustom',
			component: resolve => require(['@/views/card/putInCustom'], resolve),
			name: '自定义投放范围',
			menuShow: false,
			meta: {
				keepAlive: true
			}
		},
		{
			path: '/card/putInSelLog',
			component: resolve => require(['@/views/card/putInSelLog'], resolve),
			name: '查询投放记录',
			menuShow: false,
			meta: {
				keepAlive: true
			}
		},
		]
	}
