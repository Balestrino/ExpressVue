import Api from '@/services/Api'    // Api object imported from the /services/api

export default {
    register (credentials) {
        return Api().post('register', credentials)
    }
}

