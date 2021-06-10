<template>
    <div>
        <div class="movie__hero">
            <router-link :to="`/movies/${movie._id}`">
                <img :src="`./uploads/${movie.photo || 'movie.jpg'} `" alt="movie image" />
            </router-link>
        </div>
        <div class="movie__details">
            <div class="movie__name">
                <router-link :to="`/movies/${movie._id}`">
                    <span>{{ movie.name }}</span>
                </router-link>
            </div>
            <div class="movie__genre">
                <span>{{ movie.genre }}</span>
            </div>
            <div v-if="$store.state.isAdmin" class="edit">
                <router-link :to="`/movies/${movie._id}/edit`">
                    <img src="@/assets/images/edit.png" alt="" />
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Card',
    props: {
        movie: Object,
    },
};
</script>

<style></style>
