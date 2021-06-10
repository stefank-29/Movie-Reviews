<template>
    <div v-if="movie" class="inner">
        <div class="single">
            <div v-show="movie.photo" class="single__image">
                <img :src="`/uploads/${movie.photo} `" alt="movie photo" />
            </div>
            <div class="single__details">
                <div class="single__name">
                    <h1>{{ movie.name }}</h1>
                </div>
                <div class="info">
                    <p>Genres: {{ movie.genre }}</p>
                    <p>
                        Release date: {{ new Date(movie.releaseDate) | dateFormat('DD MMMM YYYY') }}
                    </p>
                    <p>Age restrict: {{ movie.ageRestrict }}</p>
                </div>

                <div v-if="$store.state.isAdmin" class="edit">
                    <router-link :to="`/movies/${movie._id}/edit`">
                        <img src="@/assets/images/edit.png" alt="" />
                    </router-link>
                </div>
            </div>
        </div>
        <form
            v-if="$store.state.isLoggedIn"
            class="reviewer"
            @submit.prevent="sendComment"
            method="POST"
        >
            <textarea v-model="commentText" name="" id="" cols="30" rows="10"></textarea>
            <div class="reviewer__meta">
                <input type="submit" value="Post Comment" class="button save" />
            </div>
        </form>
        <div class="reviews">
            <div v-for="comment in comments" :key="comment._id" class="review">
                <div class="review__header">
                    <div v-if="comment.user" class="review__author">
                        <p>{{ comment.user.name }}</p>
                        <p class="review__time">
                            {{ new Date(comment.createdDate) | dateFormat('DD MMM YYYY, HH:mm') }}
                        </p>
                    </div>
                </div>
                <div class="review__body">
                    <p>{{ comment.comment }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MoviesService from '@/services/MoviesService';
import { mapActions } from 'vuex';

export default {
    name: 'Movie',
    data() {
        return {
            movie: null,
            comments: [],
            commentText: '',
        };
    },
    methods: {
        async sendComment() {
            try {
                const response = await MoviesService.addComment(
                    this.commentText,
                    this.$store.state.user,
                    this.$route.params.id
                );
                if (response.status === 200) {
                    this.commentText = '';
                    this.comments.unshift(response.data);
                }
            } catch (error) {
                console.log(error.message);
            }
        },
    },
    async mounted() {
        try {
            const response = await MoviesService.getMovie(this.$route.params.id);
            const response2 = await MoviesService.getComments(this.$route.params.id);
            if (response.status === 200) {
                this.movie = response.data;
            }
            if (response2.status === 200) {
                this.comments = response2.data;
            }
        } catch (error) {
            console.log(error.message);
        }
    },
};
</script>

<style></style>
