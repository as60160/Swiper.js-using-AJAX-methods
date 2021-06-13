var swiper = new Swiper('.swiper-container', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  }
});

fetch("https://randomuser.me/api/?results=5")
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    let person = data.results
    for (let i = 0; i < person.length; i++){
      let htmlTemp =
        `<div class="swiper-slide">
          <div class="pic">
            <img src="${person[i].picture.large}" alt="${person[i].name.first}">
          </div>
          <div class="info">
            <h3 class="name">
              <span>${person[i].name.first}</span>
              <span>${person[i].name.last}</span>
            </h3>
            <div class="email">${person[i].email}</div>
          </div>
        </div>`
      swiper.appendSlide(htmlTemp)
    }
  })
  .catch((err) => {
    console.log("error")
  })

