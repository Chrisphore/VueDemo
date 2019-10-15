export default
	[
		{
			path: '/goods',
			component: resolve => require(['@/views/home'], resolve),
			name: '商品',
			leaf: true, // 只有一个节点
			menuShow: true,
			meta: {
				keepAlive: true
			},
			redirect: '/goods/type',
			iconCls: 'iconfont icon-books',
			children: [
				{
					path: '/goods/type',
					component: resolve => require(['@/views/goods/type'], resolve),
					name: '商品发布',
					menuShow: true,
					meta: {
						keepAlive: true
					},
					redirect: '/goods/goodslist',
					children: [
						{
							path: '/goods/goodslist',
							component: resolve => require(['@/views/goods/goodslist'], resolve),
							name: '商品列表',
							menuShow: true,
							meta: {
								keepAlive: true
							}
						},
						{
							path: '/goods/goodsedit',
							component: resolve => require(['@/views/goods/goodsedit'], resolve),
							name: '编辑商品',
							menuShow: true,
							meta: {
								keepAlive: true
							}
						},
					]
				}
			]
		}
	]
