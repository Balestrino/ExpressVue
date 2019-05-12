import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Products from '@/components/Products/Index'
import ViewProduct from '@/components/Products/ViewProduct'
import CreateProduct from '@/components/Products/CreateProduct'
import EditProduct from '@/components/Products/EditProduct'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/products',
      name: 'products',
      component: Products
    },
    {
      path: '/products/create',
      name: 'products-create',
      component: CreateProduct
    },
    {
      path: '/products/:productId',
      name: 'product',
      component: ViewProduct
    },
    {
      path: '/products/:productId/edit',
      name: 'products-edit',
      component: EditProduct
    },
    {
      path: '*',
      redirect: 'products'
    }
  ]
})
