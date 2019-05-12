<template>
  <v-layout>
    <v-flex xs6 v-if="isUserLoggedIn">
      <products-bookmarks />
      <recently-viewed-products class="mt-2" />
    </v-flex>
    <v-flex :class="{
      xs12: !isUserLoggedIn,
      xs6: isUserLoggedIn}"
      class="ml-2">
      <ProductsSearchPanel />
      <ProductsPanel class="mt-2"/>
    </v-flex>
  </v-layout>
</template>

<!-- script is the controller -->
<script>
import ProductsService from '@/services/ProductsService'

import ProductsPanel from './_ProductsPanel'
import ProductsSearchPanel from './_ProductsSearchPanel'
import ProductsBookmarks from './_ProductsBookmarks'
import RecentlyViewedProducts from './_RecentlyViewedProducts'

import {mapState} from 'vuex'

export default {
  components: {
    ProductsPanel,
    ProductsSearchPanel,
    ProductsBookmarks,
    RecentlyViewedProducts
  },
  data () {
    return {
      product: {}
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user',
      'route'
    ])
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  },
  async mounted () {
    // Do a request to the backend for all the projects
    this.products = (await ProductsService.index()).data
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
