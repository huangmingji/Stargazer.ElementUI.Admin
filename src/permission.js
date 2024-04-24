import router from './router'
import { useUserStore } from './stores/user'
import { usePermissionStore } from './stores/permission'
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from './utils/auth' // get token from cookie
import getPageTitle from './utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/account/login', '/404'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // set page title
  document.title = getPageTitle(to.meta.title)
  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/account/login') {
      // if is logged in, redirect to the home page
      return next({path: '/dashboard'})
    }
    const userStore = useUserStore()
    // determine whether the user has obtained his permission roles through getInfo
    const hasPermissions = userStore.permissions && userStore.permissions.length > 0
    if (hasPermissions) {
      return next()
    }
    try {
      // get user info
      let {permissions} = await userStore.getCurrentUserInfo()
      const permissionStore = usePermissionStore()
      // generate accessible routes map based on roles
      let accessRoutes = await permissionStore.generateRoutes(permissions)
      // dynamically add accessible routes
      router.addRoute(accessRoutes)
      // hack method to ensure that addRoutes is complete
      // set the replace: true, so the navigation will not leave a history record
      return next({...to, replace: true})
    } catch (error) {
      // remove token and go to login page to re-login
      await userStore.resetToken()
      ElMessage.error(error || 'Has Error')
      return next(`/account/login?redirect=${to.path}`)
    }
  }
  if (whiteList.indexOf(to.path) !== -1) {
    // in the free login whitelist, go directly
    return next()
  } else {
    return next(`/account/login?redirect=${to.path}`)
  }
})

router.afterEach(() => {
})
