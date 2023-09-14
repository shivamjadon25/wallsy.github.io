

const inputField = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const backgroundText = document.getElementById('main')

async function getImages(name) {
    var API_KEY = '38873802-e8cf77bad2ca19d222d725dcd';
    backgroundText.style.display = "none"
    var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent(`${name}`);
    let result = await fetch(URL);
    let data = await result.json();

    let container = document.querySelector(".main")
    for (var i = 0; i < data.totalHits; i++) {
    container.innerHTML += 
    `
    <div class="card-container">
                    <div class="card">
                    <div class="img-content">
                    <img src=${data.hits[i].largeImageURL}>
                    </div>
                    <div class="content">
                      <h3>
                      Uploaded By: ${data.hits[i].user}
                      </h3>
                      <p>Downloads: ${data.hits[i].downloads}</p>
                      <p>
                      Views: ${data.hits[i].views}
                      </p>
                      <p>
                      Likes: ${data.hits[i].likes}
                      </p>
                    </div>
                  </div>
                  </div>
    `;
  }
  }
  
  inputField.addEventListener("keydown", async function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        const searchText = inputField.value;
        try {
            const weatherData = await getImages(searchText);

        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }
});
searchButton.addEventListener('click', async function(event) {
      event.preventDefault();
      const searchText = inputField.value;
      try {
          const weatherData = await getImages(searchText);

      } catch (error) {
          console.error("Error fetching weather data:", error);
      }
  
})

