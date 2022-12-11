let cards = document.getElementsByClassName("cards")[0];
let left_btn = document.getElementsByClassName("scrollleft")[0];
let right_btn = document.getElementsByClassName("scrollright")[0];
let search = document.getElementsByClassName("search")[0];
let search_input = document.getElementById("search_input");

left_btn.addEventListener('click', function() {
  cards.scrollLeft -= 140;
})

right_btn.addEventListener('click', function() {
  cards.scrollLeft += 140;
})
// $(".scrollleft").click(function(){
//   $(".cards").scrollLeft(1200);
// })
//
// $(".scrollright").click(function(){
//   $(".cards").scrollLeft(-100);
// })

let json_url = "movie.json";
fetch(json_url).then(function(response) {
  return response.json();
}).then(function(data) {
  data.forEach(function(ele, index) {
    let {
      name,
      imdb,
      date,
      sposter,
      bposter,
      genre,
      url
    } = ele;
    let card = document.createElement("a");
    card.classList.add('card');
    card.href = url;
    card.innerHTML = `
    <img src="${sposter}" class="${name}" alt="">
    <div class="rest_card">
      <img src="${bposter}" alt="">
      <div class="cont">
        <h4>${name}</h4>
        <div class="sub">
          <p>${genre}, ${date}</p>
          <h3><span>IMDB</span><i class="fa-solid fa-star"></i> ${imdb}</h3>
        </div>
      </div>
    </div>`
    cards.appendChild(card);
  });

  $("#title").text(data[0].name);
  $("#gen").text(data[0].genre);
  $("#date").text(data[0].date);
  $("#rate").html('<span>IMDB</span><i class="fa-solid fa-star"></i>' + data[0].imdb);

  //search bar
  data.forEach((ele, i) => {
    let {
      name,
      imdb,
      date,
      sposter,
      genre,
      url
    } = ele;
    let card = document.createElement("a");
    card.classList.add('card');
    card.href = url;
    card.innerHTML = `
    <img src="${sposter}" alt="">
    <div class="cont">
      <h3>${name}</h3>
      <p>${genre}, ${date}, <span>IMDB</span><i class="fa-solid fa-star"></i> ${imdb}</p>
    </div>`
    search.appendChild(card);
  });

  search_input.addEventListener('keyup',function(){
    let filter=search_input.value.toUpperCase();
    let a=search.getElementsByTagName('a');

    for(let i=0;i<a.length;i++){
      let b=a[i].getElementsByClassName('cont')[0];
      let textValue=b.textContent || b.innerText;
      if(textValue.toUpperCase().indexOf(filter)>-1){
        a[i].style.display="flex";
        search.style.visibility="visible";
        search.style.opacity=1;
      }
      else{
        a[i].style.display="none";
      }
      if(search_input.value==0){
        search.style.visibility="hidden";
        search.style.opacity=0;
      }
    }
  })

  let video=document.getElementsByTagName('video')[0];
  let play=document.getElementById('play');
  play.addEventListener("click",function(){
    if(video.paused){
      video.play();
      play.innerHTML=`Play<i class="fa-solid fa-pause"></i>`
    }
    else{
      video.pause();
      play.innerHTML=`Watch<i class="fa-solid fa-play"></i>`
    }
  })

  let series=document.getElementById('series');
  let movies=document.getElementById('movies');
  //series
  series.addEventListener("click",function(){
    cards.innerHTML='';

    let series_array=data.filter(function(ele){
      return ele.type==="series";
    });

    series_array.forEach(function(ele, index) {
      let {
        name,
        imdb,
        date,
        sposter,
        bposter,
        genre,
        url
      } = ele;
      let card = document.createElement("a");
      card.classList.add('card');
      card.href = url;
      card.innerHTML = `
      <img src="${sposter}" class="${name}" alt="">
      <div class="rest_card">
        <img src="${bposter}" alt="">
        <div class="cont">
          <h4>${name}</h4>
          <div class="sub">
            <p>${genre}, ${date}</p>
            <h3><span>IMDB</span><i class="fa-solid fa-star"></i> ${imdb}</h3>
          </div>
        </div>
      </div>`
      cards.appendChild(card);
    });
  })
  //movies
  movies.addEventListener("click",function(){
    cards.innerHTML='';

    let movies_array=data.filter(function(ele){
      return ele.type==="movie";
    });

    movies_array.forEach(function(ele, index) {
      let {
        name,
        imdb,
        date,
        sposter,
        bposter,
        genre,
        url
      } = ele;
      let card = document.createElement("a");
      card.classList.add('card');
      card.href = url;
      card.innerHTML = `
      <img src="${sposter}" class="${name}" alt="">
      <div class="rest_card">
        <img src="${bposter}" alt="">
        <div class="cont">
          <h4>${name}</h4>
          <div class="sub">
            <p>${genre}, ${date}</p>
            <h3><span>IMDB</span><i class="fa-solid fa-star"></i> ${imdb}</h3>
          </div>
        </div>
      </div>`
      cards.appendChild(card);
    });
  })
})
