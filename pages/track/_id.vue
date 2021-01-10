<template lang="pug">
    .container
        .columns(v-if="track && track.album")
            .column.is-3.has-text-centered
                figure.media-left
                    p.image
                        img(:src="track.album.images[0].url")
                    p.button-bar
                        a.button.is-primary.is-large
                            span.icon(@click="selectTrack") ▶
            .column.is-8
                .panel
                    .panel-heading
                        h1.title {{ trackTitle }}
                .panel-block
                    article.media
                        .media-content
                            .content
                                ul(v-for="(v, k) in track")
                                    li
                                        strong {{ k }}:&nbsp;
                                        span {{ v }}
                        nav.level
                            .level-left
                                a.level-item
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import trackService from '~/plugins/track'
export default {
    data () {
        return {
            track: {}
        }
    },

    head () {
        return {
            title: this.track.name
        }
    },

    computed: {
        ...mapState(['track']),
        ...mapGetters(['trackTitle'])
    },

    methods: {
        ...mapActions(['getTrackById'])
    },

    asyncData ({ params }) {
        const id = params.id

        console.log(id)
        return trackService.getTrackById( {params} )
                .then((res) => {
                    return {
                        track: res
                    }
                })
    }
}
</script>

<style lang="scss" scoped>
.columns {
    margin: 20px;
}

.button-bar {
    margin-top: 20px;
}
</style>
