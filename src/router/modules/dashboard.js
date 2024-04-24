import Layout from '../../layout/index.vue'

const dashboardRouter = {
  path: '/dashboard',
  component: Layout,
  hidden: false,
  children: [
    {
      path: '',
      name: 'Dashboard',
      component: () => import('../../views/dashboard/index.vue'),
      hidden: false,
      meta: {
        permissions: ['admin'],
        title: 'Dashboard',
        icon: 'el-icon-s-home'
      }
    }
  ]
}

export default dashboardRouter
