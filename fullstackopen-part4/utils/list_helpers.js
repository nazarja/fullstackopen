
const dummy = (blogs) => {
    return 1;
};

const totalLikes = blogs => {
    return blogs.reduce((sum, { likes }) => sum + likes, 0);
};

const favouriteBlog = blogs => {
    return blogs.reduce((a, b) => {
        return a.likes > b.likes
            ? { title: a.title, author: a.author, likes: a.likes }
            : { title: b.title, author: b.author, likes: b.likes };
    });
};

const mostBlogs = blogs => {
    let counts = {};
    let compare = 0;
    let mostFrequent;

    blogs.forEach((blog, i) => {
        const author = blogs[i].author;
        if (counts[author] === undefined) counts[author] = 1;
        else counts[author] = counts[author] + 1;

        if (counts[author] > compare) {
            compare = counts[author];
            mostFrequent = blogs[i];
        }
    });

    return {
        author: mostFrequent.author,
        blogs: compare
    };
};

const mostLikes = blogs => {
    let likes = 0;
    const mostLiked = blogs.reduce((a, b) => a.likes > b.likes ? a : b);
    blogs.forEach(blog => blog.author === mostLiked.author ? likes += blog.likes : 0);

    return {
        author: mostLiked.author,
        likes: likes
    };
};

module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes };