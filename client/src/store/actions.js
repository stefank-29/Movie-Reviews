import UserService from '@/services/UserService';
export default {
    saveUser({ commit }, user) {
        commit('saveUser', user);
    },
    async removeUser({ commit }) {
        try {
            const response = await UserService.logout();
        } catch (error) {
            console.log(error.message);
        }
        commit('logout');
    },
};
