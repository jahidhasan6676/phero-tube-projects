function getTimeString(time) {
    // get our and rest hour
    const hour = parseInt(time / 3600);
    let remainingSeconds = time % 3600;
    const minute = parseInt(remainingSeconds / 60);
    remainingSeconds = remainingSeconds % 60;
    return `${hour} hour ${minute} minute ${remainingSeconds} second ago`;
}

const removeActiveClass = () => {
    const buttons = document.getElementsByClassName('category-btn');

    for (let btn of buttons) {
        btn.classList.remove('active');
    }
}
// create loadCatagories------>
const loadCatagories = () => {
    // fetch
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then((res) => res.json())
        .then((data) => displayCatagories(data.categories))
        .catch((error) => console.log(error))
}

const loadVideos = (searchText='') => {

    // fetch
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then((res) => res.json())
        .then((data) => displayVideos(data.videos))
        .catch((error) => console.log(error))
}

const loadCatagoriesVideos = (id) => {
    // alert(id);

    // fetch
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then((res) => res.json())
        .then((data) => {
            // sobaike active class remove korao
            removeActiveClass();
            // id er class k active korao

            const activeBtn = document.getElementById(`btn-${id}`);
            activeBtn.classList.add('active')
            displayVideos(data.category)
        })
        .catch((error) => console.log(error))
}

const loadDetails = async (videoId) =>{
    console.log(videoId)
    const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res = await fetch(uri);
    const data = await res.json();
    displayObject(data.video)
}
const displayObject = (video) =>{
    console.log(video)
    const detailContainer = document.getElementById('modal-content');
    detailContainer.innerHTML = `
    <img src="${video.thumbnail}">
    <p>${video.description}</p>
    `

    // way-1
    // document.getElementById('showModalData').click();
    // way-2
    document.getElementById('customModal').showModal();


}
// const cardDemo = 
//     {
//         "category_id": "1001",
//         "video_id": "aaaa",
//         "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//         "title": "Shape of You",
//         "authors": [
//           {
//             "profile_picture": "https://i.ibb.co/     D9wWRM6/olivia.jpg",
//             "profile_name": "Olivia Mitchell",
//             "verified": ""
//           }
//         ],
//         "others": {
//           "views": "100K",
//           "posted_date": "16278"
//         },
//         "description": "Dive into the rhythm of 'Shape of You,"
//       };


const displayVideos = (videos) => {
    const videosCollection = document.getElementById('videos');
    videosCollection.innerHTML = '';

    if (videos.length === 0) {
        videosCollection.innerHTML = `
        <div class="h-[400px] flex flex-col gap-5 justify-center items-center">
        <img class="h-[100px] w-[100px]" src="./assets/Icon.png">
        <h1 class="text-xl font-bold text-center">Oops! sorry, there is no <br> content here </h1>
        </div>
        `;
        videosCollection.classList.remove('grid')
        return;
    } else {
        videosCollection.classList.add('grid')
    }

    videos.forEach((videos) => {
        // create card
        const card = document.createElement('div');
        card.classList = "card card-compact";
        card.innerHTML = `
        <figure class="relative">
    <img class="object-cover h-[200px] w-full"
      src=${videos.thumbnail}
      alt="Shoes" />
      ${videos.others.posted_date?.length === 0 ? '' : `<span class="absolute bottom-2 right-2 bg-black text-white rounded p-1 text-xs"> ${getTimeString(videos.others.posted_date)} </span>`
            }
      
  </figure>
  <div class="px-0 py-2 flex gap-2">
    <div class="w-[30px] h-[30px] ">
    <img class="w-full h-full rounded-full object-cover" src="${videos.authors[0].profile_picture}">
    </div>

    <div>
        <h2 class="text-xl font-bold">${videos.title} </h2>
        <div class="flex items-center gap-1">
        <p class="text-xs font-medium text-gray-500">${videos.authors[0].profile_name} </p>
       ${videos.authors[0].verified === true ? `<p> <img class="w-[17px] h-[17px]" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"></p>` : ''}
        
    </div>
    <p> <button onclick="loadDetails('${videos.video_id}')" class="btn btn-sm btn-error"> Details</button> </p>
    </div>
  </div>
        `;

        videosCollection.append(card);

    })
}

// {
//     "category_id": "1001",
//     "category": "Music"
//   },

// create displayCatagories----->
const displayCatagories = (categories) => {
    const buttonCategories = document.getElementById('categories');
    categories.forEach(item => {
        // console.log(item)
        // create button

        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
        <button id="btn-${item.category_id}" onclick="loadCatagoriesVideos(${item.category_id})" class="btn category-btn">
        ${item.category}
        </button>
        `;
        buttonCategories.append(buttonContainer);

    });
}

document.getElementById('search-input').addEventListener('keyup', (event) => {
    loadVideos(event.target.value)
})


loadCatagories();
loadVideos();