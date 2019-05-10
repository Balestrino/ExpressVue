<template>
    <div>
        <h1>Register</h1>

        <input type="text" name="email" placeholder="email" v-model="email" />
        <br>
        <input type="password" name="password" placeholder="password" v-model="password" />
        <br>
        <!-- calling register method -->
        <button @click="register">Register</button>
        <div class="error" v-html="error" />
    </div>

</template>

<!-- script is the controller -->
<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        console.log(response.data)
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.error {
  color: red;
}
</style>
