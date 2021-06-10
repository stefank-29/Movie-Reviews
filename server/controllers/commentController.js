const mongoose = require('mongoose');
const Comment = mongoose.model('Comment');
const User = mongoose.model('User');
const Movie = mongoose.model('Movie');

exports.addComment = async (req, res) => {
    console.log(req.body);
    const user = await User.findOne({ _id: req.body.user._id });
    const movie = await Movie.findOne({ _id: req.params.id });

    const comment = new Comment({
        user: user,
        movie: movie,
        comment: req.body.comment,
    });
    await comment.save();

    res.status(200).send(comment);
};

exports.getComments = async (req, res) => {
    const movie = await Movie.findOne({ _id: req.params.id });

    const comments = await Comment.find({ movie: movie })
        .sort({ createdDate: -1 })
        .populate('user');
    res.send(comments);
};
