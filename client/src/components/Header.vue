<template>
  <v-toolbar fixed class="cyan">
    <v-toolbar-title class="mr-4 home" @click="navigateTo({name: 'index'})">
      ExpressVue
    </v-toolbar-title>
    <v-toolbar-items>
      <v-btn flat dark @click="navigateTo({name: 'products'})">
        Products
      </v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn v-if="!$store.state.isUserLoggedIn" flat dark @click="navigateTo({name: 'login'})">
        Login
      </v-btn>
      <v-btn v-if="!$store.state.isUserLoggedIn" flat dark @click="navigateTo({name: 'register'})">
        Sign Up
      </v-btn>
      <v-btn v-if="$store.state.isUserLoggedIn" flat dark @click="logout">
        Logout
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'home'
      })
    }
  }
}
</script>

<style scoped>
.home {
  cursor: pointer;
}
</style>
