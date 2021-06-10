export default {
    saveUser(state, user) {
        state.user = user;
        state.isLoggedIn = true;
        state.isAdmin = user.isAdmin;
    },
    logout(state) {
        state.user = null;
        state.isLoggedIn = false;
        state.isAdmin = false;
    },
};
