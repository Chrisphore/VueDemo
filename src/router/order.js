export default
	{
		path: '/order',
		component: resolve => require(['@/views/home'], resolve),
		name: '订单',
		leaf: true, // 只有一个节点
		menuShow: true,
		meta: {
			keepAlive: true
		},
		iconCls: 'iconfont icon-books',
		children: [
			{
				path: '/order/orderstate',
				component: resolve => require(['@/views/order/orderstate'], resolve),
				name: '订单状态',
				menuShow: true,
				meta: {
					keepAlive: true
				},
				redirect: '/order/orderlist/-1',
				children: [
					{
						path: '/order/orderlist/:menuId', component: resolve => require(['@/views/order/orderlist'], resolve), name: '订单处理', menuShow: true,
						meta: {
							keepAlive: false
						}
					},

				],
			},
			{
				path: '/order/orderedit', component: resolve => require(['@/views/order/orderedit'], resolve), name: '订单明细', menuShow: true,
				meta: {
					keepAlive: true
				}
			}
		]
	}
