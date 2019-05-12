<template>
  <v-layout column>
    <v-flex xs6>
      <ProductsSearchPanel />
      <ProductsPanel class="mt-2"/>
    </v-flex>
  </v-layout>
</template>

<!-- script is the controller -->
<script>
import ProductsPanel from './_ProductsPanel'
import ProductsSearchPanel from './_ProductsSearchPanel'
import ProductsService from '@/services/ProductsService'

export default {
  components: {
    ProductsPanel,
    ProductsSearchPanel
  },
  data () {
    return {
      product: {}
    }
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
