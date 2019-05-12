<template>
  <v-layout column>
    <v-flex xs6>
      <panel title="Register">
        <form
          name="tab-tracker-form"
          autocomplete="off">
          <v-text-field label="Email"
            v-model="email"
          ></v-text-field>
          <br>

          <v-text-field label="Password" type="password"
            v-model="password"
            hint="At least 8 characters"
            data-vv-name="password"
            v-validate="'required'"
            :error-messages="errors.collect('password')"
            ref="password"
          ></v-text-field>
           <br>
          <v-text-field label="Retype your password" type="password"
            v-model="confirmPassword"
            hint="At least 8 characters"
            data-vv-name="confirmPassword"
            v-validate="'required|confirmed:password'"
            :error-messages="errors.collect('confirmPassword')"
          ></v-text-field>

        </form>
        <br>
        <div class="danger-alert" v-html="error" />
        <br>
        <v-btn
          dark
          class="cyan"
          @click="register">
          Register
        </v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
      email: '',
      error: null,
      password: '',
      confirmPassword: '',
        custom: {
        password: {
          required: () => 'Password can not be empty',
          confirmed: () => 'Passwords do not match',
          password: () => 'The Password field must be a valid Password.'
        },
        confirmPassword: {
          required: () => 'Password confirmation can not be empty',
          confirmed: () => 'Passwords do not match',
          password: () =>
            'The Password confirmation field must be a valid Password.'
        }
      }
    }
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'products'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    },

    submit () {
      this.$validator.validateAll()
    },
    clear () {
      this.name = ''
      this.password = ''
      this.select = null
      this.checkbox = null
      this.$validator.reset()
    }
  }
}
</script>

<style scoped>
</style>
