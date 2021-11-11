

// write your code here
fetch('http://localhost:3000/ramens')
.then(res => res.json())
.then(ramens => {
    let dataarray = ramens;
    // console.log(ramens[0]);
    detailimg.src = ramens[0].image;
        detailname.textContent = ramens[0].name
        restaurant.textContent = ramens[0].restaurant
        rating.textContent = ramens[0].rating
        comment.textContent = ramens[0].comment
        // array.find (element === ramen.name)
        ramens.forEach(render)
        secret.addEventListener('click', secretdelete)
        function secretdelete() {
        let result = dataarray.find(name => name === document.querySelector('h2').textContent)
        let result2 = dataarray.indexOf(document.querySelector('h2').textContent)
        for(key2 in dataarray){
            if(dataarray[key2].name === document.querySelector('h2').textContent){
            document.getElementById(dataarray[key2].name).style.display = "none"
            // console.log(dataarray[key2].id)
            fetch(`http://localhost:3000/ramens/${dataarray[key2].id}`,{
    method: "DELETE",
headers: {
        'Content-Type': 'application/json'
    },
})
.then(res => res.json())
.then(data => console.log(data));

        detailimg.src = "/assets/image-placeholder.jpg"
        detailname.textContent = "input text"
        restaurant.textContent = "input text"
        rating.textContent = "input details"
        comment.textContent = "input details"
        }
        }
        }})
let ramenlist = document.getElementById('ramen-menu');
let ramendetail = document.getElementById('ramen-detail');
let detailimg = document.querySelector(".detail-image");
let detailname = document.querySelector('.name');
let restaurant = document.querySelector('.restaurant');
let rating = document.getElementById('rating-display');
let comment = document.getElementById('comment-display');
let form = document.getElementById('new-ramen');
let update = document.getElementById('edit-ramen')
form.addEventListener('submit', formsend);
update.addEventListener('submit', updater);
let secret = document.querySelector('h4');

function updater(e) {
    e.preventDefault();
    rating.textContent = update.rating.value;
    console.log()
    document.getElementById('comment-display').textContent = update[1].value   
    let name2 = document.querySelector('h2')
    let ramname = document.getElementById(name2.textContent)
    console.log(update.rating.value)

fetch(`http://localhost:3000/ramens/${ramname.classList.value}`,{
    method: "PATCH",
headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "rating": update.rating.value,
        "comment": update[1].value
    })
    })
    .then(res => res.json())
    .then(data => console.log(data));
update.reset();
}

function formsend(e) {
    e.preventDefault();
    let ramen1 = {
        name: form.name.value,
        restaurant: form.restaurant.value,
        image: form.image.value,
        rating: form.rating.value,
        comment: document.getElementById('new-comment').value
    }
    render(ramen1);
    console.log(ramen1)
    fetch("http://localhost:3000/ramens/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": form.name.value,
            'restaurant': form.restaurant.value,
            'image': form.image.value,
            'rating': form.rating.value,
            'comment': document.getElementById('new-comment').value})
      }).then(res => {
        console.log("Request complete! response:", res);
      })
    .then(form.reset());
}




function render(ramen){
    let image = document.createElement('img')
    image.src = ramen.image;
    image.id = ramen.name;
    image.classList.add(ramen.id)
    ramenlist.append(image);
    // console.log(ramen);
    image.addEventListener("click", () => {
        detailimg.src = ramen.image;
        detailname.textContent = ramen.name
        restaurant.textContent = ramen.restaurant
        rating.textContent = ramen.rating
        comment.textContent = ramen.comment
    })
}
