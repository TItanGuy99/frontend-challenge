<template>
  <div class="list-grid-container">
    <div class="listitem3">
      <div class="left-box">
        <label class="container">
          <input type="checkbox">
          <span class="checkmark"></span>
        </label>
      </div>
      <div class="right-box">
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
      <button class="pointer-cursor" v-on:click="$emit('updateTranscription', Message)">save</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["transcription"],
  data: function() {
    return {
      Message: {
        transcriptionVoice: this.transcription.voice,
        transcriptionText: this.transcription.text,
      }
    };
  }
};
</script>

<style scoped>
  @import '../assets/css/List.css';
</style>


