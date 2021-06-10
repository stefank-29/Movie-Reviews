<template>
    <div class="inner">
        <form @submit.prevent="addMovie" class="form card">
            <h2>Add movie</h2>
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
        </form>
    </div>
</template>

<script>
import MoviesService from '@/services/MoviesService';
import FormData from 'form-data';
export default {
    name: 'AddMovie',
    data() {
        return {
            name: '',
            genre: '',
            releaseDate: '',
            ageRestrict: '',
            selectedFile: '',
        };
    },
    methods: {
        onFileSelected(event) {
            this.selectedFile = event.target.files[0];
        },
        async addMovie() {
            try {
                const formData = new FormData();
                formData.append('file', this.selectedFile);
                formData.append('name', this.name);
                formData.append('genre', this.genre);
                formData.append('ageRestrict', this.ageRestrict);
                formData.append('releaseDate', this.releaseDate);

                const response = await MoviesService.addMovie(formData);
                if (response.status === 200) {
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
