<template>
  <div  class="list-grid-container">
    <div class="listitem3">
      <div class="left_header">
        <label class="container">
          <input type="checkbox">
          <span class="checkmark"></span>
        </label>
      </div>
      <div class="right_header reset-font">
        <img alt="List Icon" src="../assets/images/person.svg">
      </div>
    </div>

    <div class="listitem4">
      <p class="reset-font">
        <input v-model="Message.transcriptionVoice">
      </p>
      <p class="reset-font">
        <input v-model="Message.transcriptionText">
      </p>
    </div>

    <div class="listitem5">
      <button class="pointer-cursor" v-on:click="$emit('addTranscription', Message)">save</button>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      Message: {
        transcriptionVoice: "",
        transcriptionText: "",
      }  
    };
  }
};
</script>

<style scoped>
@import "../assets/css/List.css";
</style>


