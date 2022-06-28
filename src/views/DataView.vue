<template>
  <main>
    <section v-if="this.token">
        <h1>Sikeres belépés!</h1>
        <table>
          <tr >
              <th>id</th>
              <th>text</th>
          </tr>

          <tr v-for="(value) in data" :key="value.id" >
              <td>{{value.id}}</td>
              <td>{{value.text}}</td>
          </tr>
        </table>

        <button @click="logout">Logout</button>
    </section>
    <section v-if="!this.token">
        <h1>Az adatok megtekintéséhez, be kell jelentkeznie!</h1>
        <button @click="logout">Sign in</button>
    </section>
  </main>

</template>

<script>
import axios from 'axios'
export default {
data() {
    return {
        token: sessionStorage.getItem("token"),    
        data:null
    }
},
created() {
    axios.defaults.headers.common = {
        "X-API-Key": this.token
    };

    axios.get('https://otthoni-feladat-backend.herokuapp.com/data')
    .then(response => {console.log(response.data), this.data = response.data})
    .catch(error => console.log(error))

    console.log(this.data)

},
methods: {
    logout() {
        sessionStorage. removeItem('token');
        this.$router.push({name: 'login'})
        }
    }
}

</script>

<style scoped>
* {
    color: #f5d888;
}

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #f5d888;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #6d6d6d;
}

button {
  margin: 15px 0;
  width: 70%;
  height: 50px;
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
</style>