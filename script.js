let accessKey ="6Rre9JxOp0cBom5Ohb4Bsx1j1mG8h5C-BMLN_FPck5U"; 
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const showMoreButton = document.getElementById("show_more_button");
const searchResults = document.querySelector(".search-results");
const form = document.querySelector("form");

let page = 1;
let query = "";
form.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    query = searchInput.value.trim();
    if(query === ""){
        alert("Please write something to search the image");
        return;
    }
    searchInput.value = "";
    searchResults.innerHTML = "";
    fetchData();
});
 
async function fetchData(){
   const response = await fetch(`https://api.unsplash.com/search/collections?page=${page}&query=${query}&client_id=${accessKey}`);
   const data = await response.json();
   const results = data.results;

   if (results.length === 0) {
       searchResults.innerHTML = `<h1>No Images Found</h1>`;
       searchInput.value = "";
       showMoreButton.style.display = "none"; // 🟢 Button ko hide karega
       return;
   }

   display(results);
}

function display(results) {
    const fragment = document.createDocumentFragment();
    results.forEach(obj => {
      console.log(obj);
        let div = document.createElement("div");
        div.classList.add("card");

        let p = document.createElement("p");
        let a = document.createElement("a");
        a.href = obj.links.html;
        a.target = "_blank";  // 🟢 Opens link in new tab
        p.innerText = obj.cover_photo.alt_description;

        a.append(p);
        const img = document.createElement('img');
        img.src = obj.cover_photo.urls.small;

        div.append(img, a);
        fragment.append(div);
    });

    searchResults.append(fragment);
    showMoreButton.style.display = "block";
}

showMoreButton.addEventListener("click", () => {
    page++;
    fetchData();
});
