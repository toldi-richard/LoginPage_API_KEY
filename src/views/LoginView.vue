<template>
    <main class="content">
 
      <div class="text">Login</div>
      <form action="#">

        <div class="field">
          <span class="fas fa-user"></span>
          <input type="text" minlength="5" maxlength="29" required
          pattern="^[A-Za-z0-9_]{5,29}$" placeholder="User"
          v-model="userName">
         </div>

         <!-- Min 5 char max 29 letters and numbers only -->
         <p class="error" v-if="userNameWarning">A felhasználó név megadása kötelező!</p>
         <p class="error" v-if="incorrectUserName">A felhasználó név helytelen!</p>

        <div class="field">
          <span class="fas fa-lock"></span>
          <input type="password" minlength="5" maxlength="29" required
          pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" placeholder="Password"
          v-model="password">
        </div> 
        <!-- Min 8 chars and atleast one number or letter -->
        <p class="error" v-if="passwordWarning">A jelszó megadása kötelező!</p>
        <p class="error" v-if="incorrectPassword">A jelszó helytelen!</p>
        
        <div class="forgot-pass"><a href="#">Forgot Password?</a></div>

        <p class="error" v-if="globalWarning">Minden mező kitöltése kötelező!</p>
        <button @click="validation();enter()">Sign in</button>

        <div class="signup">Not a member?
          <a href="#">sign up now</a>
        </div>

      </form>
    </main>
</template>

<script>
import axios from 'axios';
// TODO: Tesztelés egységtesztek írása
export default {
data() {
  return {
    userName:'',
    password:'',
    correctUserName:/[A-Za-z0-9_]{5,29}$/,
    correctPassword:/(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    incorrectUserName:false,
    incorrectPassword:false,
    globalWarning: false,
    userNameWarning:false,
    passwordWarning:false,
    correctInputs:false,
    token:null
  }
},
methods: {

  validation() {
    if (this.userName == '' && this.password == '') {
      this.globalWarning = true
    } else if (this.userName == '' && this.password !='') {
      this.userNameWarning = true
      this.globalWarning = false
    } else if (this.userName != '' && this.password =='') {
      this.passwordWarning = true
      this.globalWarning = false
      this.userNameWarning = false
    } else if(!this.correctUserName.test(this.userName)){
      this.incorrectUserName = true
      this.passwordWarning = false
      this.globalWarning = false
      this.userNameWarning = false
    } else if(!this.correctPassword.test(this.password)){
      this.incorrectPassword = true
      this.incorrectUserName = false
      this.passwordWarning = false
      this.globalWarning = false
      this.userNameWarning = false
    } else {
      this.incorrectPassword = false
      this.incorrectUserName = false
      this.passwordWarning = false
      this.globalWarning = false
      this.userNameWarning = false
      this.correctInputs = true
    }
  },
  enter() {
    if (this.correctInputs) {
    axios.post('https://otthoni-feladat-backend.herokuapp.com/login',
      {user: this.userName,
      password: this.password
      })

      // .then(response => {sessionStorage.setItem("token", response.data.token), console.log(response.data.token)})

      .then(response => {sessionStorage.setItem("token", response.data.token), 
      response.data ? this.$router.push({name: 'dataView'}) : this.correctInputs = false})

      .catch(error => {console.log(error),
      alert("A belépési adatok helytelenek!")})}
    }
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

* {
  margin:0;
  padding: 0;
  box-sizing: border-box;
}

.content {
  font-family: 'Poppins', sans-serif;
  width: 340px;
  background: #242424;
  border-radius: 10px;
  padding: 40px 30px;
	box-shadow: -5px -5px 10px rgba(255, 255, 255, 0.144), 5px 5px 15px rgba(0, 0, 0, 0.7);
}

.content .text {
  font-size: 33px;
  font-weight: 600;
  margin-bottom: 70px;
  color: #f5d888;
  text-shadow: 2px 2px 2px #000000, -2px -2px 2px #313131;
}

.content .field {
  height: 50px;
  width: 100%;
  display: flex;
  position: relative;
}

.field input {
  height: 100%;
  width: 100%;
  padding-left: 45px;
  font-size: 18px;
  outline: none;
  border: none;
  color:#f5d888;
  background: #212121;
  border-radius: 25px;
  box-shadow: inset 1px 1px 6px #000000,
  inset -1px -2px 4px #313131;
}

.field:nth-child(2){
  margin-top: 20px;
}

.field span {
  position: absolute;
  width: 50px;
  line-height: 50px;
  color: #f5d888;
  text-shadow: 2px 2px 2px #000000, -2px -2px 2px #313131;
}

.field label {
  position: absolute;
  top: 50%;
  left: 45px;
  pointer-events: none;
  color: #f5d888;
  transform: translateY(-50%);
}

.forgot-pass {
  text-align: left;
  margin: 10px 0 10px 5px;
}

.forgot-pass a {
  font-size: 16px;
  color:#f5d888;
  text-decoration: none;
}

.forgot-pass:hover a {
  text-decoration: underline;
}

button {
  margin: 15px 0;
  width: 70%;
  height: 50px;
  color: #f5d888;
  font-size: 18px;
  font-weight: 600;
  background: #212121;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 25px;
  box-shadow: 2px 2px 5px #000000, -5px -5px 5px #7171712c;
  text-shadow: 2px 2px 2px #000000, -2px -2px 2px #313131
}

button:focus {
  color: #34dba3;
  box-shadow:inset 2px 2px 5px #000000,inset -5px -5px 5px #7171712c;
}

.signup {
  font-size: 16px;
  color: #c6c6c6dc;
  margin: 10px 0;
}

.signup a {
  color:#f5d888;
  text-decoration: none;
}

.signup a:hover {
  text-decoration: underline;
}

::placeholder
{
  color: #f5d888;
  font-weight: 300;
}

.error {
  color: red;
}
</style>