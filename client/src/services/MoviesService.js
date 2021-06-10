import Api from '@/services/Api';

export default {
    addMovie(movie) {
        return Api().post('/movies', movie);
    },
    editMovie({ formData, id }) {
        return Api().put(`/movie/${id}`, formData, {
            'Content-Type': 'multipart/form-data',
        });
    },
    deleteMovie(id) {
        return Api().delete(`/movie/${id}`);
    },
    getMovies() {
        return Api().get('/movies');
    },
    getMovie(id) {
        return Api().get(`/movies/${id}`);
    },
    getComments(id) {
        return Api().get(`/comment/${id}`);
    },
    addComment(comment, user, id) {
        console.log(user);
        return Api().post(`/comment/${id}`, { comment, user });
    },
};
