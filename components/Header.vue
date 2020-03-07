<template>
  <header>
    <nav class="navbar navbar-expand-md navbar-light fixed-top bg-light">
      <a
        class="navbar-brand"
        href="javascript:;"
      >
        {{ titleHeader }}
      </a>
    </nav>
  </header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      //
    }
  },

  computed: {
    ...mapState({
      layoutSettings: state => state.layoutSettings
    }),

    titleHeader () {
      return this.layoutSettings.titleHeader
    }
  }
}
</script>
