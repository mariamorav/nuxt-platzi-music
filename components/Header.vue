<template lang="pug">
    section.hero.is-success
        .hero-head
            header
                nav.navbar(role="navigation", aria-label="main navigation")
                    .navbar-brand
                        strong.navbar-item 🎶 Platzi Music
                        a.navbar-burger(@click="isActive" role="button", aria-label="menu", aria-expanded="false", data-target="navMenu")
                            span(aria-hidden="true")
                            span(aria-hidden="true")
                            span(aria-hidden="true")
                    div#navMenu.navbar-menu(:class="{'is-active': isBurgerActive }")
                        .navbar-start
                            router-link.navbar-item(to="search") Search
                            router-link.navbar-item(to="about") About us
                        .navbar-end
            .hero-body
                .container.has-text-centered
                    h1.title Platzi Music
                    h2.subtitle Songs so good!
</template>

<script>
export default {
    data() {
        return {
            isBurgerActive: false
        };
    },
    methods: {
        isActive() {
            this.isBurgerActive = !this.isBurgerActive;
        }
    }
};
</script>
