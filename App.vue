<template>
    <div class="app">
      <h1>Hello, {{ name }}!</h1>
      <p>This is a simple Vue.js application.</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: 'World',
      };
    },
  };
  </script>
  
  <style lang="scss">
  .app {
    font-family: sans-serif;
    text-align: center;
    padding: 20px;
  }
  </style>
  