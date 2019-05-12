<template>
  <panel title="Products">
    <v-btn slot="action" class="cyan accent-3"
    v-if="isUserLoggedIn"
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
          <div class="product-author">
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
import {mapState} from 'vuex'
import ProductsService from '@/services/ProductsService'

export default {
  props: [
    'product'
  ],
  data () {
    return {
      products: null,
      isBookMarked: false
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
