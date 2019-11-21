<template>
  <div id="home">
    <!-- <ul class="collection with-header">
      <li class="collection-header">
        <h4>Employees</h4>
      </li>
      <li v-for="employee in employees" v-bind:key="employee.id" class="collection-item">
        <div class="chip">{{employee.dept}}</div>
        <i class="fa fa-plus red"></i>
        {{employee.employee_id}}: {{employee.name}}
        <router-link
          class="secondary-content"
          :to="{ name: 'view-employee', params: { employee_id: employee.employee_id }}"
        >
          <i class="fa fa-eye"></i>
        </router-link>
      </li>
    </ul>-->
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>Employees</h4>
      </li>
      <li>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Employee Id</th>
              <th scope="col">Name</th>
              <th scope="col">Department</th>
              <th scope="col">postion</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          <tbody v-for="employee in employees" v-bind:key="employee.id">
            <tr>
              <th scope="row">{{employee.employee_id}}</th>
              <td>{{employee.name}}<img :src="employee.imageUrl" height="50px" /></td>
              <td>{{employee.dept}}</td>
              <td>{{employee.position}}</td>
              <td><router-link class="secondary-content" :to="{ name: 'view-employee', params: { employee_id: employee.employee_id }}" ><i class="fa fa-eye"></i> </router-link></td>
            </tr>
          </tbody>
        </table>
      </li>
    </ul>
    <div class="float-right">
      <router-link to="/new" class="btn-floating btn-large red">
        <i class="fa fa-plus"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import db from "./firebaseInit";
export default {
  name: "home",
  data() {
    return {
      employees: [],
      loading: true
    };
  },
  created() {
    db.firestore.collection("employees")
      .orderBy("employee_id")
      .get()
      .then(querySnapshot => {
        this.loading = false;
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            employee_id: doc.data().employee_id,
            name: doc.data().name,
            dept: doc.data().dept,
            position: doc.data().position,
            imageUrl:doc.data().imageUrl
          };
          this.employees.push(data);
        });
      });
  }
};
</script>