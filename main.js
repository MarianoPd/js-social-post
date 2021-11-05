const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];




const container = document.getElementById('container');
run(posts, container);

//avvia l'esecuzione partendo dall'array di elementi e dal container dove generare i post
function run(posts, container){
    let postArray = [];
    container.innerHTML = '';
    for(let index in posts){
        postArray[index] = generatePost(posts[index], container);
    }

}



//prende un elemento dell'array ne genera un post e lo inserisce nel container
function generatePost(post, container){
    
    let info = returnPostInfo(post);
    info.date = monthsPassed(info.date);
    info.image = checkImage(info);
    const newPost = document.createElement('div');
    newPost.className = 'post';
    container.appendChild(newPost);
    let insideContent = `
        <div class="post__header">
            <div class="post-meta">                    
                <div class="post-meta__icon">
                    ${info.image}                    
                </div>
                <div class="post-meta__data">
                    <div class="post-meta__author">${info.name}</div>
                    <div class="post-meta__time">${info.date}</div>
                </div>                    
            </div>
        </div>
        <div class="post__text">${info.content}</div>
        <div class="post__image">
            <img src=${info.media} alt="">
        </div>
        <div class="post__footer">
            <div class="likes js-likes">
                <div class="likes__cta">
                    <a class="like-button  js-like-button" href="#" data-postid=${info.id}>
                        <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                        <span class="like-button__label">Mi Piace</span>
                    </a>
                </div>
                <div class="likes__counter">
                    Piace a <b id="like-counter-${info.id}" class="js-likes-counter">${info.likes}</b> persone
                </div>
            </div> 
        </div>
    `;
    newPost.innerHTML += insideContent;
    setLikeClick(newPost, info);


    return newPost;
} 

//setta il meccanismo di 'like' sul post che gli viene passato usando i dati dell'array usati per creare il post
function setLikeClick(postHTML, info){
    const likeBtn = postHTML.querySelector('.like-button');
    const likeCounter = document.getElementById(`like-counter-${info.id}`); 
    let likeCountValue = parseInt(likeCounter.innerHTML);
    
    likeBtn.addEventListener('click', addLike);

    function addLike(event){
        likeBtn.classList.add('like-button--liked');
        likeCounter.innerHTML = ++likeCountValue;
        this.removeEventListener('click', addLike);
    }
}

//prende un elemento dell'array e restituisce un altro arraycon i dati (non essenziale ma lo preferisco)
function returnPostInfo(post){
    let author= post["author"];
    let info = {
        id: post["id"],
        content: post["content"],
        media: post["media"],
        
        name: author["name"],
        image: author["image"],
        likes: post["likes"],
        date: post["created"],
    }

    return info;
}

//prende la data in formato USA e lo restituisce in formato IT
function dateItalian(date){
    let newDate = date.substr(8,2);
    newDate += "-" + date.substr(5,2);
    newDate += "-" + date.substr(0,4);
    return newDate;
}

//prende una data in formato USA e restituisce una stringa con i mesi passati ad oggi
function monthsPassed(date){
    const today = new Date().getMonth() +1; //conta i mesi partendo da zero infatti l'esempio sarà stato fatto a ottobre
    console.log(today);
    const month = parseInt(date.substr(5,2));
    console.log(month);
    let passedMonths = today - month ;
    console.log(passedMonths);
    return passedMonths + " mesi fa";
}


//controlla che l'immagine non si null in tal caso la modifica e restituisce l'immagine
function checkImage(info){
    let newImage = "";
    if(info.image === null){
        const initials = findInitials(info.name);
        newImage = '<div class="profile-pic-default" style="font-size:30px; font-weight:600; color:white;">' + initials +"</div>";
        
    }else{
        newImage = '<img class="profile-pic" src=' + info.image + " alt=" + info.image +">";
    }
    console.log(newImage);
    return newImage;
}


//estrae le lettere in uppercase dalla stringa name
function findInitials(name){
    let initials = '';
    for(let i in name){
        let char = name.substr(i,1);
        if((char >= 'A') && (char <= 'Z')) initials += char;
    }
    return initials;
}