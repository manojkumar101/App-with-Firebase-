 <template>
  <nav>
      <div class="nav-wrapper light-blue">
        <div class="container">
          <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">Menu</i></a>
          <router-link to="/" class="brand-logo">Employee Manager</router-link>    
          <ul class="right hide-on-med-and-down">
            <li v-if="isLoggedIn"><span class="email yellow-text">{{currentUser}}</span></li>
            <li v-if="isLoggedIn"><router-link to="/">Dashboard</router-link></li>            
            <li v-if="!isLoggedIn"><router-link to="/login">Login</router-link></li>
            <li v-if="!isLoggedIn"><router-link to="/register">Register</router-link></li>
            <!-- <li v-if="!verifyEmail && isLoggedIn"><button v-on:click="verificationEmail" class="btn red">Verify Your Email</button> -->
            <li v-if="!verifyEmail"><button v-on:click="verficationEmail" class="btn red">verify</button></li>
             <li v-if="isLoggedIn"><button v-on:click="logout" class="btn yellow">Logout</button></li>
             
          </ul>
          <ul class="side-nav" id="mobile-demo">
            <li v-if="isLoggedIn"><router-link to="/">Dashboard</router-link></li>
            <li v-if="!isLoggedIn"><router-link to="/login">Login</router-link></li>
            <li v-if="!isLoggedIn"><router-link to="/register">Register</router-link></li>
            <li><a href="#" class="divider"></a></li>
            <!-- <li v-if="!verifyEmail && isLoggedIn"><button v-on:click="verificationEmail" class="btn red">Verify Your Email</button> -->
            <li v-if="!verifyEmail"><button v-on:click="verficationEmail" class="btn red">Verify</button></li>
            <li v-if="isLoggedIn"><button v-on:click="logout" class="btn">Logout</button></li>
           
          </ul>
        </div>
      </div>
    </nav>
  </template>

<script>
import firebase from 'firebase';
export default {
  name: 'navbar',
  data() {
    return {
      isLoggedIn: false,
      currentUser: false,
      verifyEmail:true
    };
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
      this.verifyEmail=firebase.auth().currentUser.emailVerified;
    }
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.go({ path: this.$router.path });
        });
    },
    verficationEmail(){
      var t = this;
        var user = firebase.auth().currentUser;
        user.sendEmailVerification().then(function() {
          alert("Email sent");
          t.logout();
        //  if(alert("Email sent"))
        //  console.log("inside alert done") 
        //  var t = this;
        //  {
        //    t.logout()
        //  }

        }).catch(function(error) {
          // An error happened.
          window.alert("Error")
        });
    }
  }
};
</script>

<style scoped>
.email {
  padding-right: 10px;
}
</style>