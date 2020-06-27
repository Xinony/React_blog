export const menus = [{
    key: '/admin/app/index',
    title: '首页',
    icon: 'home'
  },
  {
    key: '/admin/app/blog',
    title: '博客',
    icon: 'edit',
    sub: [{
      key: '/admin/app/blog/publish',
      title: '发布博客',
      icon: ''
    }],
  },
  {
    key: '/admin/app/catalog',
    title: '分类',
    icon: 'exception',
    sub: [{
      key: '/admin/app/catalog/list',
      title: '分类列表',
      icon: ''
    }, {
      key: '/admin/app/catalog/new',
      title: '创建分类',
      icon: ''
    }]
  },
  {
    key: '/admin/app/collect',
    title: '收藏',
    icon: 'star',
    sub: [{
      key: '/admin/app/collect/list',
      title: '收藏列表',
      icon: ''
    }, {
      key: '/admin/app/collect/new',
      title: '添加收藏',
      icon: ''
    }]
  }
]