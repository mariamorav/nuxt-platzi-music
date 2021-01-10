import trackService from '~/plugins/track'

export const state = () => ({
    track: {}
})

export const getters = () => ({
    trackTitle (state) {
        if (!state.track.name) { return '' }
        return `${state.track.name} - ${state.track.artists[0].name}`
    }
})

export const mutations = () => ({
    setTrack (state, track) {
        state.track = track
    }
})

export const actions = () => ({
    getTrackById (context, payload) {
    return trackService.getById(payload.id)
        .then(res => {
        context.commit('setTrack', res)
        return res
        })
    }
})

