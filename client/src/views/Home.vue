<template>
    <div class="inner">
        <h1 class="title">Movies</h1>
        <div class="movies">
            <MovieCard v-for="movie in movies" :key="movie._id" :movie="movie" class="movie" />
        </div>
    </div>
</template>

<script>
import MoviesService from '@/services/MoviesService';
import MovieCard from '@/components/MovieCard';
export default {
    name: 'Home',
    components: {
        MovieCard,
    },
    data() {
        return {
            movies: [],
        };
    },
    methods: {},
    async created() {
        const response = await MoviesService.getMovies();
        console.log(response.data);
        this.movies = response.data;
    },
};
</script>
