const getters = {
  navList: state => state.permission.list,
  role:state => state.user.role,
  username:state => state.user.username,
}
export default getters
