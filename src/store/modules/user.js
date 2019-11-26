import { login, logout, getInfo } from '@/api/login'
import { setToken, removeToken } from '@/utils/auth'
// import { getJwtToken } from '@/api/auth'
// import { getAllUsers, UserQueryInfo } from '@/api/user'

const user = {
  state: {
    id: '',
    code: '',
    token: 'admin',
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_ID: (state, id) => {
      state.id = id
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登录 and 验证密码
    LoginBk({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          // const data = response.data
          setToken({ refresh_token: 'admin', access_token: 'admin' })
          commit('SET_TOKEN', 'admin')
          commit('SET_NAME', userInfo.username)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    GetUserInfo({ commit }, user) {
      return new Promise((resolve, reject) => {
        // const userInfo = UserQueryInfo
        // userInfo.name = user
        // userInfo.page = 1
        // userInfo.limit = 1
        const roles = [{ code: 'admin' }]
        commit('SET_ROLES', roles.map(role => role.code))
        commit('SET_NAME', 'admin')
        commit('SET_CODE', 'admin')
        resolve([{ code: 'admin' }])
        // getAllUsers(userInfo).then(response => {
        //   // const data = response.data// 验证返回的roles是否是一个非空数组
        //   const data = response.data.content[0]
        //   commit('SET_ROLES', data.roles.map(role => role.code))
        //   commit('SET_NAME', data.name)
        //   commit('SET_AVATAR', '')
        //   commit('SET_CODE', data.code)
        //   commit('SET_ID', data.id)
        //   resolve(response)
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
