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

getData()

function getData() {
  var xhr = new XMLHttpRequest()
  xhr.open("GET", "https://randomuser.me/api/?results=5", true)
  xhr.responseType = "json"
  xhr.send(null)
  // onload 方法三擇一：dealAndShow/handleData/replaceHtml
  xhr.onload = handleData
}


// === 寫法一 ===
// 只跑一次 for 完成資料的處理、畫面呈現
// 投影片用 createElement 建立節點
function dealAndShow() {
  let data = this.response.results
  for (let i = 0; i < data.length; i++){
    let slide = document.createElement("div")
    let pic = document.createElement("div")
    let img = document.createElement("img")
    let info = document.createElement("div")
    let nameWrap = document.createElement("h3")
    let firstName = document.createElement("span")
    let lastName = document.createElement("span")
    let email = document.createElement("div")

    img.src = data[i].picture.large
    firstName.textContent = data[i].name.first
    lastName.textContent = data[i].name.last
    email.textContent = data[i].email

    pic.classList = "pic"
    pic.append(img)

    nameWrap.className = "name"
    nameWrap.append(firstName)
    nameWrap.append(lastName)

    info.classList = "info"
    email.classList = "email"
    info.append(nameWrap)
    info.append(email)

    slide.classList = "swiper-slide"
    slide.append(pic)
    slide.append(info)

    swiper.appendSlide(slide)
  }
}


// === 寫法二 ===
// 要跑兩次 for ，並用變數 persons 傳遞資料
function handleData() {
  const persons = []
  let data = this.response.results
  for (let i = 0; i < data.length; i++){
    let p = {}
    p.firstName = data[i].name.first
    p.lastName = data[i].name.last
    p.email = data[i].email
    p.imgSrc = data[i].picture.large
    persons.push(p)
  }
  showSlides(persons)
  
  // console.log(data)
}

function showSlides(persons) {
  for (let i = 0; i < persons.length; i++){
    let slide = document.createElement("div")
    let pic = document.createElement("div")
    let img = document.createElement("img")
    let info = document.createElement("div")
    let nameWrap = document.createElement("h3")
    let firstName = document.createElement("span")
    let lastName = document.createElement("span")
    let email = document.createElement("div")

    img.src = persons[i].imgSrc
    firstName.textContent = persons[i].firstName
    lastName.textContent = persons[i].lastName
    email.textContent = persons[i].email

    pic.classList = "pic"
    pic.append(img)

    nameWrap.className = "name"
    nameWrap.append(firstName)
    nameWrap.append(lastName)

    info.classList = "info"
    email.classList = "email"
    info.append(nameWrap)
    info.append(email)

    slide.classList = "swiper-slide"
    slide.append(pic)
    slide.append(info)

    swiper.appendSlide(slide)

    // console.log(slide)
  }
}


// === 寫法三 ===
// 建立字串樣板，並用字串取代的方式來顯示畫面
function replaceHtml() {
  let data = this.response.results
  let htmlTemp = '<div class="swiper-slide")"><div class="pic"><img src="{{imgSrc}}" alt=""></div><div class="info"><h3 class="name"><span>{{firstName}}</span><span>{{lastName}}</span></h3><div class="email">{{email}}</div></div></div>'

  for (let i = 0; i < data.length; i++){
    let currentSlide = htmlTemp
      .replace("{{imgSrc}}", data[i].picture.large)
      .replace("{{firstName}}", data[i].name.first)
      .replace("{{lastName}}", data[i].name.last)
      .replace("{{email}}", data[i].email)
    
    swiper.appendSlide(currentSlide)
  }
}