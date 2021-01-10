<template lang="pug">
    main
        transition(name="move")
            pmNotification(v-show="showNotification")
                p(slot="body") No were found songs with that name.
        transition(name="move")
            pmLoader(v-show="isLoading")
        section.section(v-show="!isLoading")
            nav.navbar
                .container
                    .field.has-addons
                        .control.is-expanded
                            input.input.is-large(
                                type="text",
                                placeholder="What song are you looking for?",
                                v-model="searchQuery",
                                @keyup.enter="search"
                            )
                        .control
                            a.button.is-info.is-large(@click="search") Search
                        .control
                            a.button.is-danger.is-large &times;
            p.help.is-info.has-text-right
                small {{ searchMessage }}
            .container.results
                .columns.is-multiline
                    .column.is-one-quarter(v-for="t in tracks")
                        pm-track(
                            v-blur="t.preview_url",
                            v-bind:track="t",
                            :class="{'is-active': t.id === selectedTrack}"
                            @select="setSelectedTrack",
                            )
</template>

<script>
import trackService from '~/plugins/track.js'

import PmTrack from '~/components/Track'

import PmLoader from '~/components/shared/Loader'
import PmNotification from '~/components/shared/Notification'

export default {
    name: 'app',

    components: { PmTrack, PmLoader, PmNotification },

    data () {
        return {
            searchQuery: '',
            tracks: [],

            isLoading: false,
            showNotification: false,

            selectedTrack: ''
        }
    },
    methods: {
        search () {
            if (!this.searchQuery) { return }

            this.isLoading = true

            trackService.search(this.searchQuery)
                .then(res => {
                console.log(res)
                this.showNotification = res.tracks.total === 0
                this.tracks = res.tracks.items
                this.isLoading = false
            })
        },
        setSelectedTrack (id) {
            if (!this.track.preview_url) { return }
            this.$store.commit('setTrack', id)
        }
    },
    computed: {
        searchMessage () {
            return `Found: ${this.tracks.length}`
        }
    },
    watch: {
        showNotification () {
            if (this.showNotification) {
                setTimeout(() => {
                    this.showNotification = false
                }, 3000)
            }
        }
    }
}
</script>

<style lang="scss">

.results {
    margin-top: 50px;
}

.is-active {
    border: 3px solid #48c775;
}
</style>
