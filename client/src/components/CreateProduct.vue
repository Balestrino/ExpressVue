<template>
  <v-layout>
    <v-flex xs6>
      <div>
        <panel title="Product Metadata">
          <v-text-field required label="title" type="" v-model="product.title"></v-text-field>
          <v-text-field required label="author" type="" v-model="product.author"></v-text-field>
        </panel>
      </div>
    </v-flex>
    <v-flex xs6 ml-4>
      <div>
        <panel title="other">
          <v-text-field label="title" type=""></v-text-field>
          <v-text-field label="author" type=""></v-text-field>
        </panel>
      </div>
      <v-btn dark class="cyan" @click="create">Create product</v-btn>
    </v-flex>
  </v-layout>
</template>

<!-- script is the controller -->
<script>
import Panel from '@/components/Panel'
import ProductsService from '@/services/ProductsService'

export default {
  data () {
    return {
      product: {
        title: null,
        author: null
      },
      rules: {
      }
    }
  },
  methods: {
    async create () {
      // call API
      try {
        await ProductsService.post(this.product)
        this.$router.push({
          name: 'products'
        })
      } catch (err) {
        console.log(err)
      }
    }
  },
  components: {
    Panel
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
