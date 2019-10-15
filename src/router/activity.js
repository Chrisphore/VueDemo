export default
	{
		path: '/seckill',
		component: resolve => require(['@/views/home'], resolve),
		name: '秒杀',
		leaf: true, // 只有一个节点
		menuShow: true,
		meta: {
			keepAlive: true
		},
		iconCls: 'iconfont icon-books',
		redirect: '/seckill/list',
		children: [{
			path: '/seckill/list',
			component: resolve => require(['@/views/activity/seckilllist'], resolve),
			name: '秒杀列表',
			menuShow: true,
			meta: {
				keepAlive: true
			}
		},
		{
			path: '/seckill/edit',
			component: resolve => require(['@/views/activity/seckilledit'], resolve),
			name: '秒杀发布',
			menuShow: true,
			meta: {
				keepAlive: false
			}
		},
		{
			path: '/seckill/seckilldetail',
			component: resolve => require(['@/views/activity/seckilldetail'], resolve),
			name: '秒杀详情',
			menuShow: true,
			meta: {
				keepAlive: true
			}
		}
		]
	}
