<!-- Fetch all the product bookmarks that the users have -->
<template>
  <panel title="Bookmarks">
    <v-data-table
    :headers="headers"
    :pagination.sync="pagination"
    :items="bookmarks">
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
import BookmarksService from '@/services/BookmarksService'
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
      bookmarks: []
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
      this.bookmarks = (await BookmarksService.index({
        userId: this.user.id
      })).data
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
