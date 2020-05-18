;(function() {
    function* generatePosts(postsCount) {
        let date = new Date;

        for(let i = 0; i < postsCount; i++) {
            if (i % 3 === 0) {
                yield {
                    id: i.toString(),
                    description: "post number " + i,
                    createdAt: new Date(date.getTime() + i * 10000),
                    author: "Archik",
                    photoLink: "https://www.meme-arsenal.com/memes/520e1b3eaa2efdb2fe341e58ae62a394.jpg";
                    hashTags: ["DOTA", "NEWS"],
                    likes: ["NS", "Dread", "v1lat"]
                };
            }
            else if(i % 3 == 1){
                yield {
                    id: i.toString(),
                    description: "post number " + i,
                    createdAt: new Date(date.getTime() - i * 10000),
                    author: "tilixek",
                    photoLink: "https://upload.wikimedia.org/wikipedia/ru/7/71/Team_Secret_logo_notext.png",
                    hashTags: ["Secret", "GOGOSECRET", "DOTA"],
                    likes: ["Yazid","tcirthkaeL", "Sisha"]
                };
            }
            else{
                yield {
                    id: i.toString(),
                    description: "post number " + i,
                    createdAt: new Date(date.getTime() - i * 10000),
                    author: "a1Exxxx",
                    photoLink: "https://mmcs.pro/wp-content/uploads/2016/05/QYWuh6PY_400x400.png",
                    hashTags: ["NAVI", "CS", "VOLARANT"],
                    likes: ["S1mple","Clown", "a1Exxxx"]
                };
            }
        }
    }

    let posts = [...generatePosts(20)];

    function getPosts(skip=0, top=10, filterConfig=undefined) {
        let postsToReturn = posts.concat();

        if (filterConfig) {
            for(let attribute in filterConfig) {
                if (attribute === "hashTags") {
                    for(let i = 0; i < filterConfig.hashTags.length; i++) {
                        postsToReturn = postsToReturn.filter(post => post.hashTags.includes(filterConfig.hashTags[i]))
                    }
                }
                else {
                    postsToReturn = postsToReturn.filter(post => post[attribute] === filterConfig[attribute]);
                }
            }
        }

        postsToReturn.sort(function (post1, post2) {
            if (post1.createdAt < post2.createdAt) {
                return 1;
            }
            else if (post2.createdAt < post1.createdAt) {
                return -1;
            }
            else {
                return 0;
            }
        });

        return postsToReturn.slice(skip, skip + top);
    }

    function getPost(id) {
        return posts.find(post => post.id === id);
    }

    function validatePostAttribute(post, attribute) {
        switch (attribute) {
            case "id":
                return typeof post.id === "string";
            case "description":
                return typeof post.description === "string" && post.description.length < 200;
            case "createdAt":
                return Object.prototype.toString.call(post.createdAt) === '[object Date]';
            case "author":
                return typeof post.author === "string" && post.author.length !== 0;
            case "hashTags":
                return post.hashTags && post.hashTags.every(tag => typeof tag === "string");
            case "likes":
                return post.hashTags && post.likes.every(tag => typeof tag === "string");
            case "photoLink":
                return typeof post.photoLink === "string";
            default:
                return false;
        }
    }

    function validatePost(post) {
        return validatePostProperty(post, "id") &&
               validatePostProperty(post, "description") &&
               validatePostProperty(post, "createdAt") &&
               validatePostProperty(post, "author") &&
               validatePostProperty(post, "hashTags") &&
               validatePostProperty(post, "likes");
    }

    function addPost(post) {
        if (validatePost(post)) {
            posts.push(post);

            return true;
        }

        return false;
    }

    function checkEditPost(post) {
        for(let attribute in post) {
            if (attribute === "id" || attribute === "createdAt" || attribute === "author" || attribute === "likes") {
                return false;
            }
            else if (!validatePostProperty(post, attribute)) {
                return false;
            }
        }

        return true;
    }

    function editPost(id, post) {
        if (!checkEditPost(post)) {
            return false;
        }

        let postToEdit = getPost(id);

        for(let attribute in post) {
            postToEdit[attribute] = post[attribute];
        }

        return true;
    }   

    function removePost(id) {
        let postIndex = posts.findIndex(post => post.id === id)

        if (postIndex !== -1) {
            posts.splice(postIndex, 1);

            return true;
        }

        return false;
    }

    let postsGot = getPosts(1, 6, {"hashTags": ["GOGOSECRET"]})

    console.log("----------------------------------------------------");
    console.log("top 6 posts (1 skipped) with hashTags containing GOGOSECRET");
    postsGot.forEach(function (post) {
        console.log(post);
    })

    console.log("----------------------------------------------------");
    console.log("get second post test");
    console.log(getPost("1"));

    console.log("----------------------------------------------------");
    console.log("validate valid post");
    console.log(validatePost({id: "2", createdAt: new Date(),
                                    description: "test", author: "a1Exxx", hashTags: [], likes: []}));
    console.log("validate invalid post");
    console.log(validatePost({id: "1"}));

    console.log("----------------------------------------------------");
    console.log("Add post and then get it");
    addPost({id: "322", createdAt: new Date(),
                    description: "test", author: "archik", hashTags: [], likes: []});
    console.log(getPost("<322></322>"));

    console.log("----------------------------------------------------");
    console.log("Edit 0'th post (already exists");
    editPost("0", {photoLink: "edited link"})
    console.log(getPost("0"))

    console.log("----------------------------------------------------");
    console.log("test remove 0'th post");
    console.log(removePost("0"));
    console.log("----------------------------------------------------");
}());