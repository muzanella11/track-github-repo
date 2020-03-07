<template>
  <div class="l-users container">
    <div class="users__repositories">
      <div class="row">
        <div
          v-if="!errorMessages && readmeContent"
          v-html="readmeContent"
        />
        <div
          v-if="errorMessages"
          class="col-lg-12 empty-state"
        >
          {{ errorMessages }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import * as USERSTPYES from '~/store/modules/users/types'
import * as ROOTTYPES from '~/store/types'
import ShowDown from 'showdown'

export default {
  layout: 'layout-main',

  data () {
    return {
      readmeContent: '',
      errorMessages: ''
    }
  },

  computed: {
    ...mapState({
      fileSource: state => state.users.fileSource
    }),

    titlePage () {
      return this.parameterActive + ' projects'
    },

    parameterActive () {
      return this.$route.params.username
    },

    repoActive () {
      return this.$route.params.id
    }
  },

  mounted () {
    this.init()
  },

  methods: {
    ...mapActions({
      fetchFile: USERSTPYES.FETCH_FILE
    }),

    ...mapMutations({
      setUsersState: USERSTPYES.SET_STATE,
      setRootState: ROOTTYPES.SET_STATE
    }),

    init () {
      if (!this.parameterActive) {
        window.location.href = '/'
        return false
      }

      this.setUsername(this.parameterActive)
      this.setRootState({ accessor: 'layoutSettings.titleHeader', value: this.titlePage })

      this.fetchResources()
      this.convertContentReadme()
    },

    setUsername (value) {
      this.setUsersState({ accessor: 'entry.username', value: value })
    },

    async fetchResources () {
      this.isLoading = true
      try {
        await this.fetchFile({
          repoName: this.repoActive,
          fileName: 'readme'
        })
        this.isLoading = false
      } catch (error) {
        this.errorMessages = 'Something wrong'

        if (error.response.status === 404) {
          this.errorMessages = error.response.status + ' ' + error.response.statusText
        }

        this.isLoading = false
      }
    },

    convertContentReadme () {
      let result = ''

      if (process.browser) {
        setTimeout(() => {
          const rawText = this.fileSource.fileContent
          const contentEncode = window.atob(JSON.parse(rawText))
          const converter = new ShowDown.Converter()

          result = converter.makeHtml(contentEncode)

          this.readmeContent = result
        }, 1000)
      }
    }
  }
}
</script>
