import { defineStore } from 'pinia'
import { asyncRoutes, constantRoutes } from '../router'

function hasPermission (permissions, route) {
  if (route.meta && route.meta.permissions) {
    return permissions.some(permission => route.meta.permissions.includes(permission))
  } else {
    return true
  }
}

function filterAsyncRoutes (routes, permissions) {
  const res = []

  routes.forEach(route => {
    const tmp = Object.assign({}, route)
    if (hasPermission(permissions, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, permissions)
      }
      res.push(tmp)
    }
  })

  return res
}

export const usePermissionStore = defineStore('permission', {
  state () {
    return {
      routes: [],
      addRoutes: []
    }
  },
  actions: {    
    generateRoutes (permissions) {
      return new Promise(resolve => {
        const accessedRoutes = filterAsyncRoutes(asyncRoutes, permissions)
        this.addRoutes = accessedRoutes
        this.routes = constantRoutes.concat(accessedRoutes)
        resolve(accessedRoutes)
      })
    }
  }
})
