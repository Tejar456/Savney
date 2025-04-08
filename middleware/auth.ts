export default defineNuxtRouteMiddleware((to, from) => {
    if (to.params.id === '1') {
      return abortNavigation()
    }    
    if (to.path !== '/') {
      return navigateTo('/')
    }
  })
  