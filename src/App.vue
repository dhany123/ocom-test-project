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
      ref="projectEditor"
      :showEditor="showProjectEditor"
      :item="editProject"
    >

    </project-editor>
  </div>
</template>

<script>
import ProjectEditor from "./components/Project/editor.vue"

export default {
  name: "App",
  components: {
    ProjectEditor,
  },

  data(){
    return {
      projects: [],
      libraries: [],
      showProjectEditor: false,
      editProject: null
    }
  },

  methods: {
    getLibraries(){
      this.axios.get("http://localhost:3000/library").then((response) => {
        console.info(response.data)
        this.libraries = response.data
      })
    },

    getProjects(){
      this.axios.get("http://localhost:3000/project").then((response) => {
        console.info(response.data)
        this.projects = response.data
        console.info(this.projects)
      })
    },

    onAddProjectClick(){
      this.showProjectEditor = true
      this.$refs.projectEditor.showModal()
    },

    onEditProjectClick(id){
      console.info("id---", id)
      let item = this.projects.find(item => item.id === id)
      let newLibraries = []

      item.libraries.forEach(library => {
        newLibraries.push({
          id: library.library_id,
          description: this.libraries.find(item => item.id === library.library_id).description,
          version: library.version
        })
      })

      item['libraries'] = newLibraries

      this.editProject = { ...{}, ...item }
      this.$refs.projectEditor.showModal()

    },
    
  },

  mounted(){
    this.getProjects()
    this.getLibraries()
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
