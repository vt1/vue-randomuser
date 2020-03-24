<template>
  <div class="container">
    <div class="filtes">
      <FilterOptions />
    </div>
    <div class="users">
      <ProfileCard v-for="user in $store.state.users" v-bind:key="user.id" v-bind:user=user v-bind:defaultUserValue=user.name.first />
    </div>
    <div class="loading">
      <button class="button" @click="loadMore">Load more</button>
    </div>
    <div class="pagination">
      <a @click="goToPage" v-for="quantity in $store.state.quantity" v-text="quantity" :key="quantity"></a>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ProfileCard from '~/components/ProfileCard.vue'
import FilterOptions from '~/components/FilterOptions.vue'
export default {
  components: {
    ProfileCard, FilterOptions
  },
  methods: {
    goToPage () {
      this.$store.dispatch('loadUsers', this.$route.query.page)
    },
    loadMore () {
      this.$store.dispatch('loadMoreUsers')
    }
  },
  computed: mapState(['users']),
  created () {
    this.$store.dispatch('loadUsers')
  }
}
</script>

<style>
.button {
  width: auto;
}

.pagination a {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  transition: background-color .3s;
}

.pagination a.active {
  background-color: dodgerblue;
  color: white;
}

.pagination a:hover:not(.active) {background-color: #ddd;}
</style>
