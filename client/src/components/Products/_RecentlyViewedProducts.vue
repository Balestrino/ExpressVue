<!-- Fetch all the history that the users have -->
<template>
  <panel title="History">
    <v-data-table
    :headers="headers"
    :pagination.sync="pagination"
    :items="products">
    <template slot="items" scope="props">
      <td class="text-xs-right">
        {{props.item.title}}
      </td>
      <td class="text-xs-right">
        {{props.item.author}}
      </td>
    </template>
    </v-data-table>
  </panel>
</template>

<!-- script is the controller -->
<script>
import ProductsHistoryService from '@/services/ProductsHistoryService'
import {mapState} from 'vuex'

export default {
  data () {
    return {
      headers: [
        {
          text: 'Title',
          value: 'title'
        },
        {
          text: 'Author',
          value: 'author'
        }
      ],
      pagination: {
        sortBy: 'created_at',
        descending: true
      },
      products: []
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  async mounted () {
    if (this.isUserLoggedIn) {
      this.products = (await ProductsHistoryService.index()).data
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
