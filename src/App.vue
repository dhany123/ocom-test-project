<template>
  <div id="app">
    <div class="card p-2 m-3">
      <div class="text-end">
        <button class="btn btn-primary" @click="onAddProjectClick">
          Add Project
        </button>
      </div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Client Name</th>
            <th scope="col">Production URL</th>
            <th scope="col">Test URL</th>
            <th scope="col">Git URL</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in projects" :key="item.id">
            <td @click="onEditProjectClick(item.id)">{{item.name}}</td>
            <td>{{item.client_name}}</td>
            <td>{{item.production_url}}</td>
            <td>{{item.testing_url}}</td>
            <td>{{item.git_url}}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <project-editor
      v-if="showProjectEditor"
      :item="editProject"
    >
    </project-editor>

  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ProjectEditor from "./components/Project/editor.vue"

export default {
  name: "App",
  components: {
    ProjectEditor,
  },

  data(){
    return {
      editProject: null
    }
  },

  computed: {
    ...mapState([
      'projects',
      'libraries',
      'showProjectEditor'
    ]),

  },

  methods: {
    ...mapActions([
      'fetchLibraries',
      'fetchProjects',
      'toggleProjectEditor'
    ]),

    onAddProjectClick(){
      this.editProject = null
      this.toggleProjectEditor(true)
    },

    onEditProjectClick(id){
      let item = this.projects.find(item => item.id === id)

      item.libraries.map(library => {
        library.description = this.libraries.find(item => item.id === library.library_id).description
        return library
      })

      this.editProject = { ...{}, ...item }
      this.toggleProjectEditor(true)
    },
    
  },

  mounted(){
    this.fetchLibraries()    
    this.fetchProjects()
  }

};

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
