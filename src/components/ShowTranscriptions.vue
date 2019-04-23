<template>
  <div class="parent list-grid-container">
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
      <p
        v-on:click="$emit('editTranscription')"
        class="pointer-cursor list-title"
      >{{transcription.voice}}</p>
      <p
        v-on:click="$emit('editTranscription')"
        class="pointer-cursor list-content"
      >{{transcription.text}}</p>
    </div>

    <div class="listitem5">
      <div
        class="hidden pointer-cursor padding-bin alignment-right"
        v-on:click="$emit('deleteTranscription')">
        <img alt="Delete" src="../assets/images/delete@1x.png">&nbsp;
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["transcription"]
};
</script>

<style scoped>
@import "../assets/css/List.css";
</style>

