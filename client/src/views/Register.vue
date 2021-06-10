<template>
    <div class="inner">
        <ValidationObserver tag="form" v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(register)" action="/register" class="form card">
                <h2>Register</h2>
                <validation-provider rules="required" v-slot="{ errors }">
                    <label for="name">Name*</label>
                    <input v-model="name" type="text" name="name" />
                    <div class="error">{{ errors[0] }}</div>
                </validation-provider>
                <validation-provider rules="required" v-slot="{ errors }">
                    <label for="surname">Surname*</label>
                    <input v-model="surname" type="text" name="surname" />
                    <div class="error">{{ errors[0] }}</div>
                </validation-provider>
                <validation-provider rules="required|email" v-slot="{ errors }">
                    <label for="email">Email*</label>
                    <input v-model="email" type="email" name="email" />
                    <div class="error">{{ errors[0] }}</div>
                </validation-provider>
                <validation-provider rules="required" v-slot="{ errors }">
                    <label for="age">Age*</label>
                    <input v-model="age" type="number" name="age" />
                    <div class="error">{{ errors[0] }}</div>
                </validation-provider>
                <validation-provider rules="required|password" v-slot="{ errors }">
                    <label for="password">Password*</label>
                    <input v-model="password" type="password" name="password" />
                    <div class="error">{{ errors[0] }}</div>
                </validation-provider>
                <validation-provider rules="required" v-slot="{ errors }">
                    <label for="password-confirm">Confirm Password*</label>
                    <input v-model="confirm_password" type="password" name="password-confirm" />
                    <div class="error">{{ errors[0] }}</div>
                </validation-provider>

                <input type="submit" value="Register" name="register" class="button save" />
            </form>
        </ValidationObserver>
    </div>
</template>

<script>
import UserService from '@/services/UserService';
import { mapActions, mapState } from 'vuex';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, email, regex } from 'vee-validate/dist/rules';
import { Validator } from 'vee-validate';

extend('required', {
    ...required,
    message: 'This field is required',
});

extend('email', {
    ...email,
    message: 'Please insert a valid email address',
});

extend('password', {
    getMessage: () => 'One uppercase character',
    validate: (value) => value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/) !== null,
});
export default {
    name: 'Register',
    components: {
        ValidationProvider,
        ValidationObserver,
    },
    data() {
        return {
            name: '',
            surname: '',
            email: '',
            age: '',
            password: '',
            confirm_password: '',
            error: null,
        };
    },
    methods: {
        ...mapActions(['saveUser']),
        async register() {
            try {
                const response = await UserService.register({
                    name: this.name,
                    surname: this.surname,
                    email: this.email,
                    age: this.age,
                    password: this.password,
                    'password-confirm': this.confirm_password,
                });

                if (response.status === 200) {
                    this.saveUser(response.data.user);
                    this.$router.push({ name: 'Home' });
                }
            } catch (error) {
                console.log(error.message);
            }
        },
    },
};
</script>

<style></style>
