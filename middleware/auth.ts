export default defineNuxtRouteMiddleware((to) => {  
  if (process.client) {
    const token = localStorage.getItem('token');
        
    const publicRoutes = ['/login', '/register'];
        
    if (!publicRoutes.includes(to.path)) {
      if (!token) {
        return navigateTo('/login');
      }
    }
    
    if (token && publicRoutes.includes(to.path)) {
      return navigateTo('/');
    }
  }
});