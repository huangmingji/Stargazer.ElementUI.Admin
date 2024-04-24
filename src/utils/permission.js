import useUserStore from '../stores/user'

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export default function checkPermission (value) {
  const store = useUserStore()
  if (value && value instanceof Array && value.length > 0) {
    const roles = store.getPermissions()
    const permissions = value

    const hasPermission = roles.some(permission => {
      return permissions.includes(permission)
    })

    if (!hasPermission) {
      return false
    }
    return true
  } else {
    console.error(`need permissions! Like v-permission="['admin','editor']"`)
    return false
  }
}
