<template>
  <div>
    <b-modal
      id="editorModal"
      hide-footer
      ref="modal"
      title="Submit Your Name"
      size="xl"
    >
    <template #modal-header="{ close }">
      <h5>Create Project</h5>
      <!-- Emulate built in modal header close button action -->
      <button class="btn btn-primary" @click="onSubmitProjectClick">
        Save Project
      </button>
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
          <b-form-input
            v-model="form.active_start_date"
            type="date"
            required
          ></b-form-input>
        </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="Active End Date"
              invalid-feedback="Name is required"
              class="mb-2"
            >
              <b-form-input
                v-model="form.active_end_date"
                type="date"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <b-card>
          <div class="fw-bolder">Table of Libraries</div>
          <b-row  align-v="end">
              <b-col md="5">
                <b-form-group  label="Library" label-for="input-3">
                  <select v-model="selectedLibrary" class="form-select">
                    <option v-for="item in libraries" :key="item.id">{{item.description}}</option>
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

export default {
  name: "ProjectEditor",

  props: {
    item: Object,
    value: Boolean,
  },

  data(){
    return {
      form: null,
      selectedLibrary: null,
      libraryVersion: null,
      libraries: [],

      options: [
        { value: null, text: 'Please select an option' },
        { value: 'a', text: 'This is First option' },
        { value: 'b', text: 'Selected Option' },
        { value: { C: '3PO' }, text: 'This is an option with object value' },
        { value: 'd', text: 'This one is disabled', disabled: true }
      ],

      items: [
        {  first_name: 'Dickerson', last_name: 'Macdonald' },
        { first_name: 'Larsen', last_name: 'Shaw' },
        { first_name: 'Geneva', last_name: 'Wilson' },
        {  first_name: 'Jami', last_name: 'Carney' }
      ]
    }
  },


  methods: {
    getLibraries(){
      this.axios.get("http://localhost:3000/library").then((response) => {
        console.info(response.data)
        this.libraries = response.data
      })
    },

    showModal(){
      this.$bvModal.show("editorModal")
    },

    closeModal() {
      this.$bvModal.hide("editorModal")
    },

    onAddLibraryClick(){
      if(this.selectedLibrary == null && this.libraryVersion == null ){
        return
      }

      this.form.libraries.push({
        library_id: this.libraries.find(items => items.description === this.selectedLibrary).id,
        description: this.selectedLibrary,
        version: 2
      })
    },

    onSubmitProjectClick(){
      delete this.form["id"]
      this.axios.post("http://localhost:3000/project", this.form).then((response) => {
        console.info(response.data)
      })
      
    },
    
  },

  watch: {
    item: {
      handler(val) {
        this.form = {
          ...{
            id: null,
            active_end_date: "",
            active_start_date: "",
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
