export default class LocalStorage {
    constructor(){
    }
    set = (key,value) => {
        return localStorage.setItem(key,value)
    }
    get = (key) => {
        return localStorage.getItem(key)
    }
    delete = (key) => {
        return localStorage.removeItem(key)
    }
    getAll = () => {
        return localStorage.getAll()
    }
    clear = () => {
        return localStorage.clear()
    }
    getKeys = () => {
        return localStorage.key()
    }
    getValues = () => {
        return localStorage.value()
    }
}