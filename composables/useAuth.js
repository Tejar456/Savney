export const useAuth = () => {
    const getToken = () => {
        if (process.client) {
            return localStorage.getItem('token')
        }
        return null
    }

    const isAuthenticated = () => {
        if (process.client) {
            return !!localStorage.getItem('token')
        }
        return false
    }
   
    const setToken = (token) => {
        if (process.client) {
            localStorage.setItem('token', token)
        }
    }
    
    const removeToken = () => {
        if (process.client) {
            localStorage.removeItem('token')
        }
    }

    return {
        getToken,
        isAuthenticated,
        setToken,
        removeToken
    }
}