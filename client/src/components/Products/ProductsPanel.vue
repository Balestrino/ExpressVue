<template>
  <panel title="Products">
    <v-btn slot="action" class="cyan accent-3"
    @click="navigateTo({name: 'products-create'})"
    light fab medium absolute right middle>
      <v-icon>add</v-icon>
    </v-btn>
    <div v-for="product in products" v-bind:key="product.id">
      <v-layout>
        <v-flex xs6>
          <div class="product-title">
            {{product.title}}
          </div>
        </v-flex>
        <v-flex xs6>
          <div class="product-title">
            {{product.author}}
          </div>

          <v-btn dark class="cyan" @click="navigateTo({
            name: 'product',
            params: {
              productId: product.id
            }
            })">View
          </v-btn>
        </v-flex>
      </v-layout>
    </div>
  </panel>
</template>

<!-- script is the controller -->
<script>
import ProductsService from '@/services/ProductsService'
export default {
  data () {
    return {
      products: null
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        this.products = (await ProductsService.index(value)).data
      }
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
