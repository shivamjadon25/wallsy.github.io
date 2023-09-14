$(".menu > ul > li").click(function(e){
    $(this).siblings().removeClass("active");
    $(this).toggleClass("active");
    $(this).find("ul").slideToggle();
    $(this).siblings().find("ul").slideUp();
    $(this).siblings().find("ul").find("li").removeClass("active");
})

$(".menu-btn").click(function(){
    $(".sidebar").toggleClass("active")
})


async function getText() {
    var API_KEY = '38873802-e8cf77bad2ca19d222d725dcd';
    var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent('actors');
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
                      <p class="heading">Card Hover</p>
                      <p>
                      </p>
                    </div>
                  </div>
                  </div>
    `;
  }
  }
  getText()
