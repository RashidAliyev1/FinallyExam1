let cards=document.querySelector(".cards")

// let id = new URLSearchParams(window.location.search).get('id')
let id=new URLSearchParams(window.location.search).get("id")
let BASE_URL=" http://localhost:8080/offer"


async function getDetailData(){
  const res=await axios(`${BASE_URL}/${id}`)
  const data=res.data
  cards.innerHTML=`
  <div class="col col-lg-3 col-md-6 col-sm-12">
  <div class="content">
    <img src="${data.img}" alt="" />
    <h3 class="mt-3">${data.title}</h3>
    <p class="comment">
      ${data.description}
    </p>
  </div>
</div>
  `
}
getDetailData()