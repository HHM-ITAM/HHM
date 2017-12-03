<template>
  <div class="login">
      <form>
        <input type="email" name="email" id="email">
        <input type="password" name="pass" id="pass">
        <button type="submit">
          Login
        </button>
      </form>
  </div>
</template>

<script>
export default {
  name: 'Login'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login{
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
}

form{
  align-self: center;
  width: 250px;
}

input{
  display: box;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 5px;
}
button{
  display: box;
}
</style>
