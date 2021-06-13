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

$.ajax({
  url: "https://randomuser.me/api/?results=5",
  dataType: "json",
  success: function (res) {
    const data = res.results
    const person = []
    for (let i = 0; i < data.length; i++){
      // console.log(data[i])
      let p = {}
      p.pic = data[i].picture.large
      p.firstName = data[i].name.first
      p.lastName = data[i].name.last
      p.city = data[i].location.city
      p.email = data[i].email
      person.push(p)
      // console.log(person)
    }
    createSlides(person)
  }
})

function createSlides(p) {
  for (let i = 0; i < p.length; i++){
    let $img = $("<img src=" + p[i].pic + " alt='" + p[i].firstName + "'>")
    let $avatar = $("<div class='pic'></div>")
      .append($img)
    let $name = $("<h3 class='name'></h3>")
      .append("<span>" + p[i].firstName + "</span>")
      .append("<span>" + p[i].lastName + "</span>")
    let $email = $("<div class='email'>" + p[i].email + "</div>")
    let $info = $("<div class = 'info'></div>")
      .append($name, $email)
    let $slide = $("<div class='swiper-slide'></div>")
      .append($avatar, $info)
    
    swiper.appendSlide($slide)
  }
}