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

  
axios
  .get("https://randomuser.me/api/?results=5")
  .then((response) => {
    let data = response.data.results
    // console.log(data)
    data.forEach(p => {
      // console.log(p)
      let htmlTemp = `
      <div class="swiper-slide">
        <div class="pic">
          <img src="${p.picture.large}" alt="" />
        </div>
        <div class="info">
          <h3 class="name">
            <span>${p.name.first}</span>
            <span>${p.name.last}</span>
          </h3>
          <div class="email">${p.email}</div>
        </div>
        </div>
      `
      swiper.appendSlide(htmlTemp)
    })
  })
  .catch((err) => {
    console.log("error")
  })

