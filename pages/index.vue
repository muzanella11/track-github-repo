<template>
  <div class="l-landing-page container">
    <div class="row">
      <div class="col-lg-12">
        <div class="row landing-page__input-field">
          <label for="basic-url">Github Username</label>
          <div class="input-group mb-3">
            <input
              id="basic-url"
              :value="entry.username"
              type="text"
              class="form-control"
              @input="setUsername"
            >
            <i
              v-if="entry.username && !isLoading && isVerifiedUser !== undefined"
              class="mdi"
              :class="[isVerifiedUser ? 'mdi-check-circle' : 'mdi-close-circle error']"
            />
            <img
              v-if="entry.username && !isLoading && isVerifiedUser"
              class="avatar"
              :src="entries.avatar_url"
            >
          </div>
        </div>
        <div class="row landing-page__action-detail">
          <button
            type="button"
            class="btn btn-primary"
            :disabled="disabledActionDetail"
            @click="goToDetailPage"
          >
            Check github repo
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import * as USERSTPYES from '~/store/modules/users/types'

export default {
  data () {
    return {
      isLoading: false,
      isVerifiedUser: undefined
    }
  },

  computed: {
    ...mapState({
      entry: state => state.users.entry,
      entries: state => state.users.entries
    }),

    disabledActionDetail () {
      return !this.isVerifiedUser
    }
  },

  watch: {
    entry: {
      deep: true,
      handler: function (val) {
        if (val.username.length > 0) {
          this.fetchResources()
        }
      }
    }
  },

  methods: {
    ...mapActions({
      fetchUsers: USERSTPYES.FETCH_USERS
    }),

    ...mapMutations({
      setUsersState: USERSTPYES.SET_STATE
    }),

    setUsername (e) {
      this.setUsersState({ accessor: 'entry.username', value: e.target.value })
    },

    async fetchResources () {
      this.isLoading = true
      try {
        const res = await this.fetchUsers()
        this.isLoading = false

        if (res.data.id) {
          this.isVerifiedUser = true
        }
      } catch (error) {
        this.isLoading = false
        this.isVerifiedUser = false
      }
    },

    goToDetailPage () {
      if (!this.entries.login) return false

      window.location.href = `/users/${this.entries.login}`
    }
  }
}
</script>

<style lang="scss">
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
