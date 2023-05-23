export const isTokenFresh = () => {
    if (localStorage.getItem('tokenInfo') === null) {
        return false
    } else {
        const lifeTime =  ((JSON.parse(localStorage.getItem('tokenInfo')!)).ttl * 1000)
        return lifeTime > Date.now()
    }
}