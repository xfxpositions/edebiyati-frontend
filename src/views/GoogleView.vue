<template>
  <div>
    <button @click="getUserInfo">Get User Info</button>
    <div v-if="userData">
      <p>Name: {{ userData.name }}</p>
      <p>Email: {{ userData.email }}</p>
      <p>Profile Picture: {{ userData.picture }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      userData: null,
      accessToken:
        "4/0AVHEtk4e1lE01H3GE-5A_l4x70kjIdiddF38yZABv1XCuEvosBSMrWNFLfVEcAupnK7PWg",
      clientId:
        "996476342171-ngk6soejcvscvj1a7mgtgshpqj4boejv.apps.googleusercontent.com",
      clientSecret: "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",
    };
  },
  methods: {
    async getUserInfo() {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            params: {
              access_token: this.accessToken,
            },
            headers: {
              Authorization: `Bearer ${this.accessToken}`,
              "client-id": this.clientId,
              "client-secret": this.clientSecret,
            },
          }
        );
        this.userData = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
  computed: {},
};
</script>
