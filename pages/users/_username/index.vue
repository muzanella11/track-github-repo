<template>
  <div class="l-users container">
    <div class="users__repositories">
      <ul
        v-if="repositories.length > 0"
        class="repositories__list"
      >
        <li
          v-for="(itemRepository, indexRepository) in repositories"
          :key="indexRepository"
        >
          <a :href="`/users/${parameterActive}/${itemRepository.name}`">
            {{ itemRepository.name }}
          </a>
        </li>
      </ul>

      <div
        class="row"
      >
        <div
          v-if="repositories.length > 0"
          class="col-lg-12 cta-box"
        >
          <button
            v-if="!isLoading && lastDataCounter > 0"
            type="button"
            class="btn btn-primary cta-next"
            @click="setPage('next')"
          >
            Next
          </button>

          <div
            v-if="isLoading"
            class="loading"
          >
            Loading. . .
          </div>
        </div>

        <div
          v-else
          class="col-lg-12 empty-state"
        >
          {{ emptyStateWording }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import * as ROOTTYPES from '~/store/types'
import * as USERSTYPES from '~/store/modules/users/types'

export default {
  layout: 'layout-main',

  data () {
    return {
      isLoading: false,
      limitPerPage: 5,
      lastDataCounter: 0
    }
  },

  computed: {
    ...mapState({
      entry: state => state.users.entry,
      entries: state => state.users.entries,
      repositories: state => state.users.repositories
    }),

    titlePage () {
      return this.parameterActive + ' projects'
    },

    parameterActive () {
      return this.$route.params.username
    },

    showNextPage () {
      return this.lastDataCounter >= this.limitPerPage
    },

    emptyStateWording () {
      return this.isLoading ? 'Loading. . .' : 'No data showing :('
    }
  },

  watch: {
    entry: {
      deep: true,
      handler: function () {
        this.fetchResources()
      }
    }
  },

  mounted () {
    this.init()
  },

  methods: {
    ...mapActions({
      fetchRepositories: USERSTYPES.FETCH_REPOSITORIES
    }),

    ...mapMutations({
      setUsersState: USERSTYPES.SET_STATE,
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
    },

    setUsername (value) {
      this.setUsersState({ accessor: 'entry.username', value: value })
    },

    setPage (type) {
      const value = type === 'next' ? this.entry.filters.page + 1 : this.entry.filters.page - 1
      this.setUsersState({ accessor: 'entry.filters.page', value: value })
    },

    pruneFilter () {
      const value = {
        type: '',
        page: 1,
        per_page: this.limitPerPage,
        sort: ''
      }
      this.setUsersState({ accessor: 'entry.filters', value: value })
    },

    setSort () {
      const sortValue = this.entry.filters.sort
      this.pruneFilter()
      this.setUsersState({ accessor: 'entry.filters.sort', value: sortValue })
    },

    async fetchResources () {
      this.isLoading = true
      try {
        const res = await this.fetchRepositories()
        this.isLoading = false

        this.lastDataCounter = res.data.length
      } catch (error) {
        this.isLoading = false
      }
    },

    goToDetailPage () {
      if (!this.entries.login) return false

      window.location.href = `/${this.entries.login}`
    }
  }
}
</script>
