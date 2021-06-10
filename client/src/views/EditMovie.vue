<template>
    <div class="inner">
        <form @submit.prevent="editMovie" class="form card">
            <h2>Edit movie</h2>
            <label for="name">Name*</label>
            <input v-model="name" type="text" name="name" required />
            <label for="genre">Genre*</label>
            <input v-model="genre" type="text" name="genre" required />
            <label for="photo">Photo*</label>
            <input type="file" @change="onFileSelected" name="photo" />
            <label for="releaseDate">Release Date*</label>
            <input v-model="releaseDate" type="date" name="releaseDate" required />
            <label for="ageRestrict">Age Restrict*</label>
            <input v-model="ageRestrict" type="number" name="ageRestrict" required />

            <input type="submit" value="Submit Movie" name="add" class="button save" />
            <button @click="deleteMovie" class="button delete">
                Delete Movie
            </button>
        </form>
    </div>
</template>

<script>
import MoviesService from '@/services/MoviesService';
import FormData from 'form-data';
export default {
    name: 'EditMovie',
    data() {
        return {
            name: '',
            genre: '',
            releaseDate: '',
            ageRestrict: '',
            photo: '',
            movie: '',
            selectedFile: null,
        };
    },
    async created() {
        try {
            const response = await MoviesService.getMovie(this.$route.params.id);
            if (response.status === 200) {
                const movie = response.data;
                this.movie = movie;
                this.name = movie.name;
                this.genre = movie.genre;

                this.releaseDate = new Date(movie.releaseDate).toISOString().slice(0, 10);
                this.ageRestrict = movie.ageRestrict;
                this.photo = movie.photo;
            }
        } catch (error) {
            console.log(error.message);
        }
    },
    methods: {
        async editMovie() {
            try {
                const formData = new FormData();
                formData.append('file', this.selectedFile);
                formData.append('name', this.name);
                formData.append('genre', this.genre);
                formData.append('ageRestrict', this.ageRestrict);
                formData.append('releaseDate', this.releaseDate);
                formData.append('photo', this.photo);

                const payload = { formData, id: this.movie._id };
                const response = await MoviesService.editMovie(payload);
                if (response.status === 200) {
                    this.$router.push(`/movies/${this.movie._id}`);
                }
            } catch (error) {
                console.log(error.message);
            }
        },
        async deleteMovie() {
            try {
                const response = await MoviesService.deleteMovie(this.movie._id);
                if (response.status === 200) {
                    this.$router.push({ name: 'Home' });
                }
            } catch (error) {
                console.log(error.message);
            }
        },
        onFileSelected(event) {
            this.selectedFile = event.target.files[0];
        },
    },
};
</script>

<style></style>
