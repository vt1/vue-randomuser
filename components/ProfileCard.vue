<template>
  <div class="card">
    <img @click="getUserInfo(user)" v-bind:src="user.picture.large">
    <p class="title" v-text="user.profileCardInfo.userTitle"></p>
    <p v-text="user.profileCardInfo.userValue == null ? defaultUserValue : user.profileCardInfo.userValue"></p>
    <ul class="values_list horizontal_center" id="values_list">
      <li v-on:mouseover="mouseover(user.profileCardInfo.nameTitle, user.name.first, user.id)" class="fa fa-user"></li>
      <li v-on:mouseover="mouseover(user.profileCardInfo.emailTitle, user.email, user.id)" class="fa fa-envelope"></li>
      <li v-on:mouseover="mouseover(user.profileCardInfo.dobTitle, user.dob.date, user.id)" class="fa fa fa-calendar"></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['user', 'defaultUserValue'],
  methods: {
    mouseover (userTitle, userValue, id) {
      const userInfo = { userTitle, userValue, id }
      this.$store.commit('setUserTitle', userInfo)
      this.$store.commit('setUserValue', userInfo)
    },
    getUserInfo (user) {
      alert(`My email is ${user.email}. \nGender is ${user.gender}. \nAge is ${user.dob.age}`)
    }
  }
}
</script>

<style>
  @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
    .card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    max-width: 300px;
    margin: 50px auto;
    text-align: center;
    }

    .title {
    color: grey;
    font-size: 18px;
    }

    img {
      width: 100%;
    }

    button {
    border: none;
    outline: 0;
    display: inline-block;
    padding: 8px;
    color: white;
    background-color: #000;
    text-align: center;
    cursor: pointer;
    width: 100%;
    font-size: 18px;
    }

    a {
    text-decoration: none;
    font-size: 22px;
    color: black;
    }

    button:hover, a:hover {
    opacity: 0.7;
    }

    .values_list {
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        float: left;
    }
    .horizontal_center {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
    }
    .values_list li {
    cursor: pointer;
    display: contents;
    width: 40px;
    height: 48px;
    float: left;
    margin: 20px;
    background-size: 378px;
    background-position-y: -48px;
    transition: all .25s ease-out;
}
</style>
