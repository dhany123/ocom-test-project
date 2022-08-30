import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment';
Vue.use(Vuex)

import Library from '/./src/api/Library'
import Project from '/./src/api/Project'

const state = {
  libraries: [],
  projects: [],
  showProjectEditor: false
}

const actions = {
  async fetchLibraries({commit}){
    let response = await Library.get()
    commit("setLibraries", response.data)
  },
  
  async fetchProjects({commit}){
    let response = await Project.get()
    commit("setProjects", response.data)
  },
  
  async createProject({commit}, data){
    let response = await Project.add(data)
    commit("addProject", response.data)
  },

  async updateProject({commit}, data){
    let response = await Project.update(data)
    commit("editProject", response.data)
  },

  toggleProjectEditor({commit}, val){
    commit("setShowProjectEditor", val)
  }

}

const getters = {
  activeLibraries(state){
    return state.libraries.filter((item) => {
      return item.active_end_date === null || moment(item.active_end_date).isAfter() && moment(item.active_start_date).isBefore()
    })
  },
}

const mutations = {
  setLibraries(state, data){
    state.libraries = data
  },

  setProjects(state, data){
    state.projects = data
  },

  addProject(state, data){
    state.projects.push(data)
  },

  editProject(state, data){
    state.projects.splice(state.projects.findIndex(item => item.id === data.id), 1, data);
  },

  setShowProjectEditor(state, val){
    state.showProjectEditor = val
  }

}

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations
})
