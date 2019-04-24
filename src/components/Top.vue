<template>
  <div>
    <!-- Define the top of our page -->
    <div class="sub-grid-container addborder">
      <div class="subitem3 title">Transcriptions</div>
      <div class="subitem9">
        <div v-on:click="$emit('sendTranscriptions')" class="alignment-right pointer-cursor">
          <img alt="Upload Data" src="../assets/images/upload.svg">&nbsp;
        </div>
      </div>
      <div class="subitem10">
        <div v-on:click="$emit('showTranscriptions')" class="alignment-left pointer-cursor">
          &nbsp;
          <img alt="Load list" src="../assets/images/fetch-document.svg">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
@import "../assets/css/List.css";
</style>


