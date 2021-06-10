<template>
    <div id="app">
        <Navigation />
        <router-view />
    </div>
</template>

<script>
import Navigation from '@/components/Navigation';
import UserService from '@/services/UserService';
import { mapActions } from 'vuex';
export default {
    components: {
        Navigation,
    },
    methods: {
        ...mapActions(['saveUser']),
    },
    async created() {
        try {
            const response = await UserService.isLoggedIn();
            if (response.data.user) {
                await this.saveUser(response.data.user);
            }
        } catch (error) {
            console.log(error.message);
        }
    },
};
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
