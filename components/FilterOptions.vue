<template>
  <div>
    <div class="quantity">
      <p v-if="errors.length">
      <b>Please, fix the following errors:</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
      </p>

      <p>
        <label for="quantity">Cards quantity:</label>
        <input id="quantity" v-model="quantity" type="number" name="quantity" placeholder="Enter num [1:20]">
      </p>
    </div>

    <div class="gender">
      <b-form-group label="Gender">
        <b-form-radio v-model="gender" name="male" value="male">male</b-form-radio>
        <b-form-radio v-model="gender" name="female" value="female">female</b-form-radio>
        <b-form-radio v-model="gender" name="any" value="any">any</b-form-radio>
      </b-form-group>
    </div>

    <button class="button" @click="validate">Submit</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      errors: [],
      quantity: null,
      gender: 'any'
    }
  },
  methods: {
    validate (e) {
      this.errors = []

      if (!this.quantity) {
        this.errors.push('Cards quantity field required')
        return false
      }

      if (this.quantity < 1 || this.quantity > 20) {
        this.errors.push('Cards quantity field must be [1:20]')
        return false
      }

      this.$store.commit('setQuantity', ~~this.quantity)
      this.$store.commit('setGender', this.gender)
      this.$store.dispatch('loadUsers')
      e.preventDefault()
    }
  }
}
</script>
