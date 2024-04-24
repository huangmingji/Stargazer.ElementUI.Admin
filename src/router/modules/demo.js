import Layout from '../../layout/index.vue'

const demoRouter = {
  path: '/demo',
  component: Layout,
  hidden: false,
  meta: {
    title: 'demo',
    icon: 'el-icon-menu'
  },
  children: [
    {
      path: 'editor',
      name: 'Editor',
      component: () => import('../../components/RichTextEditor/demo.vue'),
      hidden: false,
      meta: {
        title: 'Editor',
        permissions: ['admin'],
        icon: 'el-icon-edit'
      }
    },
    {
      path: 'upload',
      name: 'Upload',
      component: () => import('../../components/Upload/demo.vue'),
      hidden: false,
      meta: {
        title: 'Upload',
        permissions: ['admin'],
        icon: 'el-icon-upload'
      }
    },
    {
      path: 'echarts',
      name: 'Echarts',
      component: () => import('../../components/ECharts/demo.vue'),
      hidden: false,
      meta: {
        title: 'Echarts',
        permissions: ['admin'],
        icon: 'el-icon-pie-chart'
      }
    }
  ]
}

export default demoRouter
