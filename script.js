const inputField = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const backgroundText = document.getElementById('main');
const loader = document.getElementById('loader');
const pageSize = 12; // Number of images per page

// Default selected button
const defaultButton = document.getElementById('allButton');
defaultButton.classList.add('active');
getImages(defaultButton.textContent, 1); // Load default images on page 1

async function getImages(category, page) {
    loader.style.display = 'block';
    backgroundText.style.display = 'none';

    // You may want to use your own API key
    const API_KEY = '38873802-e8cf77bad2ca19d222d725dcd';
    const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(category)}&page=${page}&per_page=${pageSize}`;

    try {
        let result = await fetch(URL);
        let data = await result.json();

        let container = document.querySelector(".main");
        container.innerHTML = ""; // Clear previous content

        for (var i = 0; i < data.hits.length; i++) {
            container.innerHTML +=
                `
          <div class="card-container">
            <div class="card">
              <div class="img-content">
                <img src=${data.hits[i].largeImageURL} alt="Wallpaper">
              </div>
              <div class="content">
                <h3>Uploaded By: ${data.hits[i].user}</h3>
                <p>Downloads: ${data.hits[i].downloads}</p>
                <p>Views: ${data.hits[i].views}</p>
                <p>Likes: ${data.hits[i].likes}</p>
              </div>
            </div>
          </div>
        `;
        }

        // Add pagination controls
        addPaginationControls(data.totalHits, page);

    } catch (error) {
        console.error("Error fetching image data:", error);
    } finally {
        loader.style.display = 'none';
        backgroundText.style.display = 'block';
    }
}

// Function to add pagination controls
function addPaginationControls(totalHits, currentPage) {
    const totalPages = Math.ceil(totalHits / pageSize);

    let paginationContainer = document.getElementById('pagination');
    if (!paginationContainer) {
        paginationContainer = document.createElement('div');
        paginationContainer.id = 'pagination';
        document.body.appendChild(paginationContainer);
    }

    // Clear previous pagination controls
    paginationContainer.innerHTML = '';

    // Add "Previous" button
    const previousButton = document.createElement('button');
    previousButton.textContent = '<';
    previousButton.addEventListener('click', () => {
        if (currentPage > 1) {
            getImages(defaultButton.textContent, currentPage - 1);
        }
    });
    paginationContainer.appendChild(previousButton);

    // Display current page and total pages
    const pageInfo = document.createElement('div');
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    pageInfo.classList.add('page-info');
    paginationContainer.appendChild(pageInfo);

    // Add "Next" button
    const nextButton = document.createElement('button');
    nextButton.textContent = '>';
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            getImages(defaultButton.textContent, currentPage + 1);
        }
    });
    paginationContainer.appendChild(nextButton);
}
  // Button click event listener
  function handleButtonClick(button) {
    // Remove 'active' class from all buttons
    document.querySelectorAll('.list button').forEach(btn => btn.classList.remove('active'));

    // Add 'active' class to the clicked button
    button.classList.add('active');

    // Get the button name
    const buttonName = button.textContent;

    // Call the API with the button name
    getImages(buttonName , 1);
  }

  // Attach click event listeners to each button
  const buttons = document.querySelectorAll('.list button');
  buttons.forEach(button => {
    button.addEventListener('click', () => handleButtonClick(button));
  });

  // Search button click event listener
  searchButton.addEventListener('click', async function (event) {
    event.preventDefault();
    const searchText = inputField.value.trim(); // Trim removes leading and trailing spaces
    if (searchText) {
      try {
        // Call the API with the search text
        await getImages(searchText, 1);
      } catch (error) {
        console.error("Error fetching image data:", error);
      }
    }
  });

  // Input field keydown event listener
  inputField.addEventListener("keydown", async function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      const searchText = inputField.value.trim();
      if (searchText) {
        try {
          // Call the API with the search text
          await getImages(searchText, 1);
        } catch (error) {
          console.error("Error fetching image data:", error);
        }
      }
    }
  });