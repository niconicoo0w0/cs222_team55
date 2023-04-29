<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
*,
html,
body,
p,
h1,
h2,
h3,
h4,
h5,
h6,
ul,
ol,
li,
dl,
dt,
dd {
  margin: 0;
  padding: 0;
  font-size: 16px;
  color: #fff;
}
#app {
  width: 100vw;
  height: 100vh;
  background: url('./assets/home.jpeg');
  color: #fff;
  padding: 20px;
}
div {
  box-sizing: border-box;
}
a {
  text-decoration: none;
}
ul li {
  list-style: none;
}
</style>
