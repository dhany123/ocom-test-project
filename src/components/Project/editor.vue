<template>
  <div>
    <b-modal
      no-close-on-backdrop
      no-close-on-esc
      modal-header-close
      id="editorModal"
      hide-footer
      ref="modal"
      size="xl"
    >
    <template #modal-header="">
      <h5>{{modalTitle}}</h5>
     <div class="row">
        <div class="col-4">
          <button class="btn btn-secondary" @click="toggleProjectEditor(false)">
            Cancel
          </button>
        </div>
        <div class="col-8">
          <button class="btn btn-primary" @click="onSubmitProjectClick">
            Save Project
          </button>
        </div>
     </div>

    
    </template>
    
      <form ref="form">
        <b-row>
          <b-col md="6"> 
            <b-form-group
              label="Name"
              invalid-feedback="Name is required"
              class="mb-2"
            >
              <b-form-input
                v-model="form.name"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="Client Name"
              invalid-feedback="Name is required"
              class="mb-2"
            >
              <b-form-input
                v-model="form.client_name"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group
              label="Description"
              invalid-feedback="Name is required"
              class="mb-2"
            >
              <b-form-input
                v-model="form.description"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group
              label="Git URL"
              invalid-feedback="Name is required"
              class="mb-2"
            >
              <b-form-input
                v-model="form.git_url"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>


          <b-col md="6">
            <b-form-group
              label="Test URL"
              invalid-feedback="Name is required"
              class="mb-2"
            >
              <b-form-input
                v-model="form.testing_url"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="Production URL"
              invalid-feedback="Name is required"
              class="mb-2"
            >
              <b-form-input
                v-model="form.production_url"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group
            label="Active Start Date"
            invalid-feedback="Name is required"
            class="mb-2"
            >
            <b-form-datepicker 
              v-model="form.active_start_date" 
              class="mb-2">
            </b-form-datepicker>
        </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="Active End Date"
              invalid-feedback="Name is required"
              class="mb-2"
            >

            <b-form-datepicker 
              v-model="form.active_end_date">
            </b-form-datepicker>
            </b-form-group>
          </b-col>
        </b-row>

        <b-card>
          <div class="fw-bolder">Table of Libraries</div>
          <b-row  align-v="end">
              <b-col md="5">
                <b-form-group  label="Library" label-for="input-3">
                  <select v-model="selectedLibrary" class="form-select">
                    <option v-for="item in activeLibraries" :key="item.id">{{item.description}}</option>
                  </select>
                </b-form-group>
              </b-col>
              <b-col md="5">
                <b-form-group
                  label="Version"
                  invalid-feedback="Name is required"
                >
                  <b-form-input
                    v-model="libraryVersion"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="2">
                <b-button @click="onAddLibraryClick">Add</b-button>
              </b-col>
            </b-row>
            <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Library</th>
            <th scope="col">Version</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in form.libraries" :key="item.id">
            <td>{{item.description}}</td>
            <td>{{item.version}}</td>
          </tr>
        </tbody>
      </table>
        </b-card>
      </form>
    </b-modal>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';

export default {
  name: "ProjectEditor",

  props: {
    item: Object,
  },

  data(){
    return {
      form: null,
      selectedLibrary: null,
      libraryVersion: null,
      libraries: [],
    }
  },

  computed: {
    ...mapGetters([
      'activeLibraries'
    ]),

    modalTitle() {
      return this.item && this.item.id ? "Edit Project" : "Create Project";
    },
  },

  methods: {
    ...mapActions([
      'toggleProjectEditor',
      'createProject',
      'updateProject',
    ]),

    onAddLibraryClick(){
      if(this.selectedLibrary == null && this.libraryVersion == null ){
        return
      }

      this.form.libraries.push({
        library_id: this.activeLibraries.find(items => items.description === this.selectedLibrary).id,
        description: this.selectedLibrary,
        version: this.libraryVersion
      })
    },

    onSubmitProjectClick(){
      console.info(this.form)
      try {
        if(this.item && this.item.id){
          this.updateProject(this.form)
          return
        }
        
        delete this.form["id"]
        this.createProject(this.form)
      } catch (error) {
        
      }
      finally{
        this.toggleProjectEditor(false)
      }
    },
    
  },

  watch: {
    item: {
      handler(val) {
        this.form = {
          ...{
            id: null,
            active_end_date: "",
            active_start_date: new Date() ,
            client_name: "",
            description: "",
            git_url: "",
            name: "",
            production_url: "",
            testing_url: "",
            libraries: [],
          },
          ...val,
        };
      },
      immediate: true,
    },
  },

  mounted(){
    this.$bvModal.show("editorModal")
  }

}
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
