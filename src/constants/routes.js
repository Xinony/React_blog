import BlogList from '../components/blog/list/list'
import Desc from '../components/blog/desc/desc'
import Archive from '../components/blog/archive/archive'
import About from '../components/blog/about/about'
import Collect from '../components/blog/collect/collect'

import Index from '../components/admin/index/index'
import Publish from '../components/admin/publish/publish'
import Edit from '../components/admin/edit/edit'
import CatalogNew from '../components/admin/catalog/catalognew'
import CatalogList from '../components/admin/catalog/cataloglist'
import CatalogEdit from '../components/admin/catalog/catalogedit'
import StarNew from '../components/admin/star/starnew'
import StarList from '../components/admin/star/starlist'
import StarEdit from '../components/admin/star/staredit'
export const routes = [{
  key: '首页',
  path: '/app/index',
  component: BlogList
}, {
  key: '标签搜索',
  path: '/app/tags/:tags',
  component: BlogList
}, {
  key: '分类搜索',
  path: '/app/catalog/:catalog',
  component: BlogList
}, {
  key: '归档',
  path: '/app/archive',
  component: Archive
}, {
  key: '博客详情',
  path: '/app/blog/desc/:id',
  component: Desc
}, {
  key: '文章收藏',
  path: '/app/collect',
  component: Collect
}, {
  key: '关于我',
  path: '/app/about',
  component: About
},
  {
    key: '管理员首页',
    path: '/admin/app/index',
    component: Index
  }, {
    key: '发布博客',
    path: '/admin/app/blog/publish',
    component: Publish
  }, {
    key: '编辑博客',
    path: '/admin/app/blog/edit/:id',
    component: Edit
  }, {
    key: '分类列表',
    path: '/admin/app/catalog/list',
    component: CatalogList
  }, {
    key: '创建分类',
    path: '/admin/app/catalog/new',
    component: CatalogNew
  }, {
    key: '编辑分类',
    path: '/admin/app/catalog/edit/:id',
    component: CatalogEdit
  }, {
    key: '添加收藏',
    path: '/admin/app/collect/new',
    component: StarNew
  }, {
    key: '收藏列表',
    path: '/admin/app/collect/list',
    component: StarList
  }, {
    key: '编辑收藏',
    path: '/admin/app/collect/edit/:id',
    component: StarEdit
  }]