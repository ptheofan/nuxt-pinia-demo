<template>
  <v-row
    justify="center"
    align="center"
  >
    <v-col
      cols="12"
      sm="8"
      md="6"
    >
      <v-card>
        <v-card-title class="headline">
          Personality Test Demo
        </v-card-title>
        <v-card-text>
          <p>This is an unreliable personality test demo app that you should not take seriously. It is designed purely as a very simple example.</p>
          <p>
            To learn more about real personality tests have a look at <a
              href="https://www.psychologies.co.uk"
              target="_blank"
              rel="noopener noreferrer"
            >
              psychologies.co.uk
            </a>.
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            nuxt
            to="/questionnaire"
            id="start-button"
          >
            Take the quiz
          </v-btn>
          <v-spacer />
          <v-btn
            text
            nuxt
            to="/admin"
          >
            Admin
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>
