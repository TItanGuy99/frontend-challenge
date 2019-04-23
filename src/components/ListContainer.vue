<template>
  <div>
    <div class="grid-container">
      <!-- Define the top of our page -->
      <div class="item1">
        <Top
          v-on:sendTranscriptions="sendTranscriptions(transcriptions)"
          v-on:showTranscriptions="showTranscriptions"
        ></Top>
      </div>

      <!-- Here we show our object list -->
      <div class="item2">
        <div v-for="transcription, i in transcriptions">
          <!-- If we are change an object show this -->
          <div v-if="editTranscription === transcription.id">
            <ChangeTranscriptions
              v-bind:transcription="transcription"
              v-on:updateTranscription="updateTranscription(transcription.id, $event.transcriptionVoice, $event.transcriptionText)"
            ></ChangeTranscriptions>
          </div>

          <!-- Show list -->
          <div v-else>
            <ShowTranscrioptions
              v-bind:transcription="transcription"
              v-on:deleteTranscription="deleteTranscription(transcription.id, i)"
              v-on:editTranscription="editTranscription = transcription.id"
            ></ShowTranscrioptions>
          </div>
        </div>

        <!-- Add a new object on the list -->
        <div v-if="newTranscription === true">
          <AddTranscriptions
            v-on:addTranscription="addTranscription($event.transcriptionVoice, $event.transcriptionText)"
          ></AddTranscriptions>
        </div>
      </div>

      <!-- Our footer with the add button -->
      <div class="item3">
        <Footer v-on:newTranscription="newTranscription = true"></Footer>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VueAxios from "vue-axios";
import Top from "./Top";
import ChangeTranscriptions from "./ChangeTranscriptions";
import ShowTranscrioptions from "./ShowTranscriptions";
import AddTranscriptions from "./addTranscriptions";
import Footer from "./Footer";

export default {
  name: "ListTranscriptions",
  data: function() {
    return {
      editTranscription: null,
      newTranscription: false,
      transcriptions: [],
      person_icon_img: "../assets/images/fetch-document@2x.png"
    };
  },
  components: {
    Top,
    ChangeTranscriptions,
    ShowTranscrioptions,
    AddTranscriptions,
    Footer
  },
  methods: {
    showTranscriptions() {
      /* Load the Json from the server and feed the local array */
      axios
        .get("http://localhost:3000/data/")
        .then(response => (response = response.data))
        .then(mydata => {
          this.transcriptions = mydata;
          let is_more_vectors = false;

          for (let i = 0; i < mydata.length; i++) {
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
    /* Send the Data */
      axios
        .post("http://localhost:3000/data/", transcriptions, {
          headers: {
            "Content-type": "application/json"
          }
        })
        .then(() => {
          window.alert("The content has been sent");
        });
    },
    addTranscription(voice, text) {
    /* Add a new element in the local array */

      let i = 0;
      let bigger_id = 0;

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
      this.newTranscription = false;
    },
    deleteTranscription(id, i) {
      /* Delete an element in the local array */
      this.transcriptions.splice(i, 1);
    },
    updateTranscription(id, transcriptionVoice, transcriptionText) {
      /* Update a element in the local array */

      if (transcriptionVoice == "") {
        transcriptionVoice = "My Title";
      }

      if (transcriptionText == "") {
        transcriptionText = "My Content";
      }

      for (var i = 0; i < this.transcriptions.length; i++) {
        if (this.transcriptions[i].id === id) {
          this.transcriptions[i].voice = transcriptionVoice;
          this.transcriptions[i].text = transcriptionText;
        }
      }
      this.editTranscription = null;
    }
  }
};
</script>

<style scoped>
@import "../assets/css/List.css";
</style>