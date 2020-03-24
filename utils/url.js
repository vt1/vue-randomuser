const resource = 'https://randomuser.me/api/'
export default {
  get (quantity, gender) {
    return resource + `?results=${quantity}&gender=${gender}`
  },
  getWithPage (quantity, gender, page, seed) {
    return resource + `?results=${quantity}&gender=${gender}&seed=${seed}&page=${page}`
  },
  getMoreUsers (gender) {
    return resource + `?results=1&gender=${gender}`
  }
}
