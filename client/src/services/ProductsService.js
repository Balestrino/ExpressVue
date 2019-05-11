// Api object imported from the /services/api
import Api from '@/services/Api'

export default {
  index () {
    return Api().get('products')
  },
  show (productId) {
    return Api().get(`products/${productId}`)
  },
  post (product) {
    return Api().post('products', product)
  },
  put (product) {
    return Api().put(`products/${product.id}`, product)
  }
}
