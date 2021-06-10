<template>
    <div>
        <header class="top">
            <nav class="nav">
                <div class="nav__section nav__section--pages">
                    <li class="nav__item">
                        <router-link :to="{ name: 'Home' }" class="nav__link nav__link--logo">
                            <img src="@/assets/images/logo.png" alt="" />
                        </router-link>
                    </li>
                    <li class="nav__item">
                        <router-link :to="{ name: 'Movies' }" class="nav__link">
                            Movies
                        </router-link>
                    </li>
                    <li v-if="$store.state.isAdmin" class="nav__item">
                        <router-link :to="{ name: 'AddMovie' }" class="nav__link">
                            Add movie
                        </router-link>
                    </li>
                </div>
                <div class="nav__section nav__section--user">
                    <li v-if="!$store.state.isLoggedIn" class="nav__item">
                        <router-link :to="{ name: 'Register' }" class="nav__link">
                            Register
                        </router-link>
                    </li>
                    <li v-if="!$store.state.isLoggedIn" class="nav__item">
                        <router-link :to="{ name: 'Login' }" class="nav__link">
                            Login
                        </router-link>
                    </li>
                    <li @click="logout" v-if="$store.state.isLoggedIn" class="nav__item">
                        <router-link to="/logout" class="nav__link">
                            Logout
                        </router-link>
                    </li>
                    <li v-if="$store.state.isLoggedIn" class="nav__item">
                        <router-link to="/account" class="nav__link">
                            Account
                        </router-link>
                    </li>
                </div>
            </nav>
        </header>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'Navigation',
    methods: {
        ...mapActions(['removeUser']),
        async logout() {
            this.removeUser();
            this.$router.push({ name: 'Home' });
        },
    },
    data() {
        return {};
    },
};
</script>

<style></style>
