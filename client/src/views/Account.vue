<template>
    <div class="inner">
        <form @submit.prevent="update" class="form card">
            <h2>Edit Account</h2>
            <label for="name">Name*</label>
            <input v-model="name" type="text" name="name" required />
            <label for="surname">Surname*</label>
            <input v-model="surname" type="text" name="surname" required />
            <label for="email">Email*</label>
            <input v-model="email" type="email" name="email" required />
            <label for="age">Age*</label>
            <input v-model="age" type="age" name="age" required />

            <input type="submit" value="Edit" name="edit" class="button save" />
        </form>
    </div>
</template>

<script>
import UserService from '@/services/UserService';
import { mapActions, mapState } from 'vuex';
export default {
    name: 'Account',
    data() {
        return {
            name: '',
            surname: '',
            email: '',
            age: '',
            error: null,
        };
    },
    methods: {
        ...mapActions(['saveUser']),
        async update() {
            let response;
            try {
                response = await UserService.update({
                    id: this.user._id,
                    name: this.name,
                    surname: this.surname,
                    email: this.email,
                    age: this.age,
                });
                if (response.status === 200) {
                    this.saveUser(response.data.user);
                } else {
                }
            } catch (error) {
                console.log(error.message);
            }
        },
    },
    mounted() {
        this.name = this.user.name;
        this.surname = this.user.surname;
        this.email = this.user.email;
        this.age = this.user.age;
    },
    computed: mapState(['user']),
};
</script>

<style></style>
