<template>
<div>
  <div class="grid-container">
    <!-- Define the top of our page -->
    <div class="item1">
      <div class="sub-grid-container addborder">
        <div class="subitem3 title">Transcriptions</div>
        <div class="subitem9">
          <div v-on:click="sendTranscriptions(transcriptions)" class="alignment-right pointer-cursor">
            <img alt="Upload Data" src="../assets/images/upload@1x.png">&nbsp;
          </div>
        </div>
        <div class="subitem10">
          <div v-on:click="showTranscriptions" class="alignment-left pointer-cursor">
            &nbsp;<img alt="Load list" src="../assets/images/fetch-document@1x.png">
          </div>
        </div>
      </div>
    </div>

    <!-- Here we show our object list -->
    <div class="item2">
      <div v-for="transcription, i in transcriptions">
        <!-- If we are change an object show this -->
        <div v-if="editTranscription === transcription.id" class="list-grid-container">
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
              <input v-model="transcription.voice">
            </p>
            <p class="reset-font">
              <input v-model="transcription.text">
            </p>
          </div>

          <div class="listitem5">
            <button v-on:click="updateTranscription(transcription)">save</button>
          </div>
        </div>

        <!-- Show list -->
        <div v-else class="parent list-grid-container">
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
            <p v-on:click="editTranscription = transcription.id" class="pointer-cursor list-title">
              {{transcription.voice}}
            </p>
            <p v-on:click="editTranscription = transcription.id" class="pointer-cursor list-content">
              {{transcription.text}}
            </p>
          </div>

          <div class="listitem5">
            <div class="hidden pointer-cursor padding-bin alignment-right" v-on:click="deleteTranscription(transcription.id, i)">
              <img alt="Delete" src="../assets/images/delete@1x.png">&nbsp;
            </div>
          </div>
        </div>
      </div>

      <!-- Add a new object on the list -->
      <div v-if="newTranscription === true" class="list-grid-container">

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
            <input v-model="transcriptionVoice">
          </p>
          <p class="reset-font">
            <input v-model="transcriptionText">
          </p>
        </div>

        <div class="listitem5">
          <button v-on:click="addTranscription(transcriptionVoice, transcriptionText)">save</button>
        </div>
      </div>

    </div>

    <!-- Our footer with the add button -->
    <div class="item3">
      <div class="sub-grid-container col-color-grey">
        <div v-on:click="newTranscription = true" class="subitem7 pointer-cursor">
          <img alt="Add a new row" src="../assets/images/add-row@1x.png">
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "ListTranscriptions",
  data: function() {
    return {
      editTranscription: null,
      transcriptionVoice: "",
      transcriptionText: "",
      newTranscription: false,
      transcriptions: [],
      person_icon_img: '../assets/images/fetch-document@2x.png'
    };
  },
  methods: {
    showTranscriptions() {
      /* Load the Json from the server and feed the local array */

      fetch("http://localhost:3000/data/")
        .then(response => response.json())
        .then(mydata => {
          this.transcriptions = mydata;
          var is_more_vectors = false;

          for (var i = 0; i < mydata.length; i++) {
            if (!mydata[i].id) {
              is_more_vectors = true;
            }
          }
          if (is_more_vectors) {
            this.transcriptions = mydata[mydata.length - 1];
          }
        });
    },
    sendTranscriptions(transcriptions) {
      /* Send the structure from the local array to the server */

      fetch("http://localhost:3000/data/", {
        body: JSON.stringify(transcriptions),
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(() => {
        window.alert('The content has been sent');
      });
    },
    addTranscription(voice, text) {
      /* Add a new element in the local array */

      var i = 0;
      var bigger_id = 0;

      if (this.transcriptions.length > 0) {
        for (i = 0; i < this.transcriptions.length; i++) {
          if (this.transcriptions[i].id > bigger_id) {
            bigger_id = this.transcriptions[i].id;
          }
        }
      }

      bigger_id = bigger_id + 1;

      if (voice == "") {
        voice = "My Title";
      }

      if (text == "") {
        text = "My Content";
      }

      this.transcriptions.push({
        voice: voice,
        text: text,
        id: bigger_id
      });
      this.transcriptionVoice = "";
      this.transcriptionText = "";
      this.newTranscription = false;
    },
    deleteTranscription(id, i) {

      this.transcriptions.splice(i, 1);

    },
    updateTranscription(transcription) {
      /* Update a element in the local array */

      if (transcription.voice == "") {
        transcription.voice = "My Title";
      }

      if (transcription.text == "") {
        transcription.text = "My Content";
      }

      for (var i = 0; i < this.transcriptions.length; i++) {
        if (this.transcriptions.id == transcription.id) {
          this.transcriptions.voice = transcription.voice;
          his.transcriptions.text = transcription.text;
        }
      }

      this.editTranscription = null;
    }
  }
};
</script>

<style scoped>
  @import '../assets/css/List.css';
</style>
