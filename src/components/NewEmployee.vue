<template>
  <div id="new-employee">
    <h3>New Employee</h3>
    <div class="row">
      <form @submit.prevent="saveEmployee" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="employee_id" required />
            <label>Employee ID#</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="name" required />
            <label>Name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="dept" required />
            <label>Department</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="position" required />
            <label>Position</label>
          </div>
        </div>
        <div class="form-group">
          <input
            type="file"
            ref="file"
            id="myfile"
            style="display : none"
            accept="image/*"
            @change="onFilePick"
          />
          <a
            href="javascript:document.querySelector('input#myfile').click()"
            class="btn btn-primary"
          >Upload Photo</a>
        </div>
        <div>
          <img :src="imageUrl" height="50px" />
        </div>
        <button type="submit" class="btn">Submit</button>
        <router-link to="/" class="btn grey">Cancel</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import db from "./firebaseInit";
// import dbs from "./firebaseStorage"
export default {
  name: "new-employee",
  data() {
    return {
      employee_id: null,
      name: null,
      dept: null,
      position: null,
      imageUrl: "",
      image: null
    };
  },
  methods: {
    onFilePick(event) {
      const files = event.target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf(".") <= 0) {
        return alert("Please add a valid file");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    },
    saveEmployee() {
      let imageUrl;
      let key;
      db.firestore
        .collection("employees")
        .add({
          employee_id: this.employee_id,
          name: this.name,
          dept: this.dept,
          position: this.position
        })
        .then(docRef => {
          key = docRef.id;
          return key;
        })
        .then(key => {
          const filename = this.image.name;
          const ext = filename.slice(filename.lastIndexOf("."));
          return db.firestorage
            .ref(`${key}/` + "profile" + "." + ext)
            .put(this.image);
        })
        .then(fileData => {
          // console.log("Metadata : ",fileData.metadata)
          imageUrl = fileData.metadata.downloadURLs[0];
          db.firestore
            .collection("employees")
            .where("employee_id", "==", this.employee_id)
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                doc.ref
                  .update({
                    imageUrl: imageUrl
                  })
                  .then(() => {
                    this.$router.push({ name: "Home" });
                  });
              });
            });
        })
        .catch(error => {
          console.error("Error adding employee: ", error);
        });
    }
  }
};
</script>
