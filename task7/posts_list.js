class PostList {
    _posts = [];

    constructor(posts) {
        this._posts = posts.concat();
    }

    getPage(skip= 0, top= 10, filterConfig= undefined) {
        if(typeof skip !== 'number' || typeof top !== 'number') {
            console.log('Error');
            return;
        }

        let resultPost = this._posts;

        if(filterConfig) {
            for(let attribute in filterConfig) {
                switch (attribut) {
                    case "author":
                        resultPosts = resultPosts.filter(post => post.author === filterConfig.author);
                        break;
                    case "dateBegin":
                        resultPosts = resultPosts.filter(post => (filterConfig.dateBegin <= post.createdAt));
                        break;
                    case "dateEnd":
                        resultPosts = resultPosts.filter(post => (post.createdAt <= filterConfig.dateEnd));
                        break;
                    case "hashTags":
                        for (let tag in filterConfig.hashTags) {
                            resultPosts = resultPosts.filter(post => post.hashTags.includes(tag));
                        }
                        break;
                    default:
                        console.log("Error!");

                        return;
                }
            }
        }

        resultPost.sort(function (post1, post2) {
            if(post1.createdAt < post2.createdAt) {
                return 1;
            }
            else if(post2.createdAt < post1.createdAt) {
                return -1;
            }
            else {
                return 0;
            }
        });

        return postsToReturn.slice(skip, skip + top);
    }

    get(id) {
        if(typeof id === 'string'){
            return this._posts.find(post => post.id === id);
        }
        else {
            console.log('Error');
        }
    }

    static _validate_field(post, attribute) {
        switch (attribute) {
            case 'id':
                return typeof post.id === 'string';
            case 'description':
                return typeof post.description === 'string' && post.description.length < 200;
            case 'createdAt':
                return Object.prototype.toString.call(post.createdAt) === '[object Date]';
            case 'author':
                return typeof post.author === 'string' && post.author.length !== 0;
            case 'photoLink':
                return typeof post.photoLink === 'string';
            case 'hashTags':
                return post.hashTags && post.hashTags.every(tag => typeof tag === 'string');
            case 'likes':
                return post.likes && post.likes.every(tag => typeof tag === 'string');
            default:
                return false;
        }
    }

    static validate(post) {
        let validField = PostList._validate_field;

        return validField(post, 'id') &&
            validField(post, 'description') &&
            validField(post, 'createdAt') &&
            validField(post, 'author') &&
            validField(post, 'hashTags') &&
            validField(post, 'likes');
    }

    add(post) {
        if(PostList.validate(post)) {
            this._posts.push(post);

            return true;
        }

        return false;
    }

    function edit(id,post) {
        for (let field in post) {
            switch(field) {
                case "id":
                case "author":
                case "createdAt":
                    return false;
                case "description":
                    if (!post.description || typeof post.description !== "string" || post.description.length >= 200) {
                        return false;
                    }
                    break;
                case "hashTags":
                    if (post.hashTags) {
                        if (!Array.isArray(post.hashTags)) {
                            return false;
                        }

                        for (let tag in post.hashTags) {
                            if (typeof tag !== "string") {
                                return false;
                            }
                        }
                    }
                    break;
                case "likes":
                    if (post.likes) {
                        if (!Array.isArray(post.likes)) {
                            return false;
                        }

                        for (let like in post.likes) {
                            if (typeof like !== "string") {
                                return false;
                            }
                        }
                    }
                    break;
                case "photoLink":
                    if (post.photoLink && typeof post.photoLink !== "string") {
                        return false;
                    }
                    break;
                default:
                    return false;
            }
        }

        return true;
    }

    addAll(posts) {
        let invalidPosts = [];

        posts.forEach(post => {
            if (!this.add(post))
                invalidPosts.push(post)
        });

        return invalidPosts;
    }

    clear() {
        this._posts = [];
    }
}

let date = new Date;
let posts = new PostList([
    {
        id: "0",
        description: "post number 0",
        createdAt: new Date(date.getTime() + i * 10000),
        author: "Archik",
        photoLink: "https://www.meme-arsenal.com/memes/520e1b3eaa2efdb2fe341e58ae62a394.jpg";
        hashTags: ["DOTA", "NEWS"],
        likes: ["NS", "Dread", "v1lat"]
    },
    {
        id: "1",
        description: "post number 1",
        createdAt: new Date(date.getTime() - i * 10000),
        author: "a1Exxxx",
        photoLink: "https://mmcs.pro/wp-content/uploads/2016/05/QYWuh6PY_400x400.png",
        hashTags: ["NAVI", "CS", "VOLARANT"],
        likes: ["S1mple","Clown", "a1Exxxx"]
    },
    {
        id: "2",
        description: "post number 2",
        createdAt: new Date(date.getTime() - i * 10000),
        author: "tilixek",
        photoLink: "https://upload.wikimedia.org/wikipedia/ru/7/71/Team_Secret_logo_notext.png",
        hashTags: ["Secret", "GOGOSECRET", "DOTA"],
        likes: ["Yazid","tcirthkaeL", "Sisha"]
    },
    {
        id: "3",
        description: "post number 3",
        createdAt: new Date(date.getTime() + i * 10000),
        author: "Archik",
        photoLink: "https://www.meme-arsenal.com/memes/520e1b3eaa2efdb2fe341e58ae62a394.jpg";
        hashTags: ["DOTA", "NEWS"],
        likes: ["NS", "Dread", "v1lat"]
    },
    {
        id: "4",
        description: "post number 4",
        createdAt: new Date(date.getTime() - i * 10000),
        author: "a1Exxxx",
        photoLink: "https://mmcs.pro/wp-content/uploads/2016/05/QYWuh6PY_400x400.png",
        hashTags: ["NAVI", "CS", "VOLARANT"],
        likes: ["S1mple","Clown", "a1Exxxx"]
    },
    {
        id: "5",
        description: "post number 5",
        createdAt: new Date(date.getTime() - i * 10000),
        author: "tilixek",
        photoLink: "https://upload.wikimedia.org/wikipedia/ru/7/71/Team_Secret_logo_notext.png",
        hashTags: ["Secret", "GOGOSECRET", "DOTA"],
        likes: ["Yazid","tcirthkaeL", "Sisha"]
    },
    {
        id: "6",
        description: "post number 6",
        createdAt: new Date(date.getTime() + i * 10000),
        author: "Archik",
        photoLink: "https://www.meme-arsenal.com/memes/520e1b3eaa2efdb2fe341e58ae62a394.jpg";
        hashTags: ["DOTA", "NEWS"],
        likes: ["NS", "Dread", "v1lat"]
    },
    {
        id: "7",
        description: "post number 7",
        createdAt: new Date(date.getTime() - i * 10000),
        author: "a1Exxxx",
        photoLink: "https://mmcs.pro/wp-content/uploads/2016/05/QYWuh6PY_400x400.png",
        hashTags: ["NAVI", "CS", "VOLARANT"],
        likes: ["S1mple","Clown", "a1Exxxx"]
    },
    {
        id: "8",
        description: "post number 8",
        createdAt: new Date(date.getTime() - i * 10000),
        author: "tilixek",
        photoLink: "https://upload.wikimedia.org/wikipedia/ru/7/71/Team_Secret_logo_notext.png",
        hashTags: ["Secret", "GOGOSECRET", "DOTA"],
        likes: ["Yazid","tcirthkaeL", "Sisha"]
    },
    {
        id: "9",
        description: "post number 9",
        createdAt: new Date(date.getTime() + i * 10000),
        author: "Archik",
        photoLink: "https://www.meme-arsenal.com/memes/520e1b3eaa2efdb2fe341e58ae62a394.jpg";
        hashTags: ["DOTA", "NEWS"],
        likes: ["NS", "Dread", "v1lat"]
    },
    {
        id: "10",
        description: "post number 10",
        createdAt: new Date(date.getTime() - i * 10000),
        author: "a1Exxxx",
        photoLink: "https://mmcs.pro/wp-content/uploads/2016/05/QYWuh6PY_400x400.png",
        hashTags: ["NAVI", "CS", "VOLARANT"],
        likes: ["S1mple","Clown", "a1Exxxx"]
    },
    {
        id: "11",
        description: "post number 11",
        createdAt: new Date(date.getTime() - i * 10000),
        author: "a1Exxxx",
        photoLink: "https://mmcs.pro/wp-content/uploads/2016/05/QYWuh6PY_400x400.png",
        hashTags: ["NAVI", "CS", "VOLARANT"],
        likes: ["S1mple","Clown", "a1Exxxx"]
    },
    {
        id: "12",
        description: "post number 12",
        createdAt: new Date(date.getTime() - i * 10000),
        author: "tilixek",
        photoLink: "https://upload.wikimedia.org/wikipedia/ru/7/71/Team_Secret_logo_notext.png",
        hashTags: ["Secret", "GOGOSECRET", "DOTA"],
        likes: ["Yazid","tcirthkaeL", "Sisha"]
    },
    {
        id: "13",
        description: "post number 13",
        createdAt: new Date(date.getTime() + i * 10000),
        author: "Archik",
        photoLink: "https://www.meme-arsenal.com/memes/520e1b3eaa2efdb2fe341e58ae62a394.jpg";
        hashTags: ["DOTA", "NEWS"],
        likes: ["NS", "Dread", "v1lat"]
    },
    {
        id: "14",
        description: "post number 14",
        createdAt: new Date(date.getTime() - i * 10000),
        author: "a1Exxxx",
        photoLink: "https://mmcs.pro/wp-content/uploads/2016/05/QYWuh6PY_400x400.png",
        hashTags: ["NAVI", "CS", "VOLARANT"],
        likes: ["S1mple","Clown", "a1Exxxx"]
    },
    {
        id: "15",
        description: "post number 15",
        createdAt: new Date(date.getTime() - i * 10000),
        author: "tilixek",
        photoLink: "https://upload.wikimedia.org/wikipedia/ru/7/71/Team_Secret_logo_notext.png",
        hashTags: ["Secret", "GOGOSECRET", "DOTA"],
        likes: ["Yazid","tcirthkaeL", "Sisha"]
    },
    {
        id: "16",
        description: "post number 16",
        createdAt: new Date(date.getTime() + i * 10000),
        author: "Archik",
        photoLink: "https://www.meme-arsenal.com/memes/520e1b3eaa2efdb2fe341e58ae62a394.jpg";
        hashTags: ["DOTA", "NEWS"],
        likes: ["NS", "Dread", "v1lat"]
    },
    {
        id: "17",
        description: "post number 17",
        createdAt: new Date(date.getTime() - i * 10000),
        author: "a1Exxxx",
        photoLink: "https://mmcs.pro/wp-content/uploads/2016/05/QYWuh6PY_400x400.png",
        hashTags: ["NAVI", "CS", "VOLARANT"],
        likes: ["S1mple","Clown", "a1Exxxx"]
    },
    {
        id: "18",
        description: "post number 18",
        createdAt: new Date(date.getTime() - i * 10000),
        author: "tilixek",
        photoLink: "https://upload.wikimedia.org/wikipedia/ru/7/71/Team_Secret_logo_notext.png",
        hashTags: ["Secret", "GOGOSECRET", "DOTA"],
        likes: ["Yazid","tcirthkaeL", "Sisha"]
    },
    {
        id: "19",
        description: "post number 19",
        createdAt: new Date(date.getTime() + i * 10000),
        author: "Archik",
        photoLink: "https://www.meme-arsenal.com/memes/520e1b3eaa2efdb2fe341e58ae62a394.jpg";
        hashTags: ["DOTA", "NEWS"],
        likes: ["NS", "Dread", "v1lat"]
    },
    {
        id: "20",
        description: "post number 20",
        createdAt: new Date(date.getTime() - i * 10000),
        author: "a1Exxxx",
        photoLink: "https://mmcs.pro/wp-content/uploads/2016/05/QYWuh6PY_400x400.png",
        hashTags: ["NAVI", "CS", "VOLARANT"],
        likes: ["S1mple","Clown", "a1Exxxx"]
    },
]);

console.log("----------------------------------------------------");
console.log("top 5 posts:");
console.log(posts.getPage(0, 5));

console.log("----------------------------------------------------");
console.log("top 4 posts skipping 1 with hashTag \"HS\" :");
console.log(posts.getPage(1, 4, {hashTags: ["HS"]}));

console.log("----------------------------------------------------");
console.log("get post with id 5:");
console.log(posts.get('5'));

console.log("----------------------------------------------------");
console.log("get not existing post:");
console.log(posts.get('50'));

console.log("----------------------------------------------------");
console.log("validating valid post:");
console.log(PostList.validate({id: '123',  description: 'validating', createdAt: new Date(), author:'MEMEME', hashTags: ['testing'], likes: []}));

console.log("----------------------------------------------------");
console.log("validating invalid post:");
console.log(PostList.validate({createdAt: new Date(),  description: 'validating', photoLink: "www.url"}));

console.log("----------------------------------------------------");
console.log("add new post: ");
console.log(posts.add({id: '123',  description: 'test post', createdAt: new Date(), author:'test author', hashTags: ['testing'], likes: []}));
console.log(posts.get('123'));

console.log("----------------------------------------------------");
console.log("edit post with id = 3:");
console.log(posts.edit('3', {photoLink: "edit link"}));
console.log(posts.get('3'));

console.log("----------------------------------------------------");
console.log("trying to edit unreachable field:");
console.log(posts.edit('3', {author: "test author"}));
console.log(posts.get('3'));

console.log("----------------------------------------------------");
console.log("delete 123 post and try to get it:");
console.log(posts.remove('123'));
console.log(posts.get('123'));

console.log("----------------------------------------------------");
console.log("try to add posts array:");
let invalid = posts.addAll([
    {
        id: '111',
        description: 'Valhalla',
        createdAt: new Date(),
        author: 'Odin',
        hashTags: ['test'],
        likes: ['Ubisoft']
    },
    {
        id: '333',
        description: 'failed',
        hashTags: ['test'],
        likes: ['noone']
    }
]);
console.log("invalid posts:");
console.log(invalid);
console.log("get new added post:");
console.log(posts.get('111'));

console.log("----------------------------------------------------");
console.log("clear and get all posts:");
posts.clear();
console.log(posts.getPage());