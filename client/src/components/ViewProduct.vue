<template>
  <v-layout>
    <v-flex xs6>
      <panel title="Product metadata">
        <div>
          {{product.title}}
        </div>
      </panel>

      <v-btn dark class="cyan" @click="navigateTo({name: 'products-edit'})">Edit</v-btn>
    </v-flex>

    <v-flex xs6>
      <panel title="other" class="ml-2">
      </panel>
    </v-flex>
  </v-layout>
</template>

<!-- script is the controller -->
<script>
import ProductsService from '@/services/ProductsService'

export default {
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
    const productId = this.$store.state.route.params.productId
    this.product = (await ProductsService.show(productId)).data
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
