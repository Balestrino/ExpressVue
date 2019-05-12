<template>
  <v-layout>
    <v-flex xs6>
      <panel title="Product metadata">
        <div class="product-title">
          {{product.title}}
        </div>
      </panel>

      <v-btn dark class="cyan" @click="navigateTo({name: 'products-edit'})">Edit</v-btn>
      <v-btn dark class="cyan" v-if="isUserLoggedIn && !bookmark" @click="setAsBookmark">bookmark</v-btn>
      <v-btn dark class="cyan" v-if="isUserLoggedIn && bookmark" @click="unsetAsBookmark">unbookmark</v-btn>
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
import BookmarksService from '@/services/BookmarksService'
import ProductsHistoryService from '@/services/ProductsHistoryService'
import {mapState} from 'vuex'

export default {
  data () {
    return {
      product: {},
      bookmark: null
    }
  },
  async mounted () {
    const productId = this.route.params.productId
    this.product = (await ProductsService.show(productId)).data

    // Insert the page view on the history / log
    if (this.isUserLoggedIn) {
      ProductsHistoryService.post({
        productId: productId
      })
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
    },
    async setAsBookmark () {
      try {
        this.bookmark = (await BookmarksService.post({
          productId: this.product.id
        })).data
        console.log('bookmark')
      } catch (err) {
        console.log('set bookmark error', err)
      }
    },
    async unsetAsBookmark () {
      console.log(this.product.id)
      try {
        await BookmarksService.delete(this.bookmark.id)
        this.bookmark = null
        console.log('unbookmark')
      } catch (err) {
        console.log('unset bookmark error', err)
      }
    }
  },
  watch:
  {
    async product () {
      if (!this.isUserLoggedIn) { return }
      try {
        const bookmark = (await BookmarksService.index({
          productId: this.product.id
        })).data
        if (bookmark.length) {
          this.bookmark = bookmark[0]
        }
      } catch (err) {
        console.log('error', err)
      }

      console.log('bookmark', this.isBookMarked)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
