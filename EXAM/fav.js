let cards = document.querySelector(".cards")
let BASE_UR2L="http://localhost:8080/favs"



// axios("http://localhost:8080/favs").then((res)=>{
//     data=res.data
//     getDataFromFav(data)
// })


async function getFavData(){
    cards.innerHTML=''
    const res=await axios(BASE_UR2L)
    const data=await res.data
    data.forEach(el => {
        cards.innerHTML+=`
        <div class="col col-lg-3 col-md-6 col-sm-12">
        <div class="content">
          <img src="${el.img}" alt="" />
          <h3 class="mt-3">${el.title}</h3>
          <p class="comment">
            ${el.description}
          </p>
          <a href="details.html?id=${el.id}" class="viewBtn">VIEW DETAILS</a>
          <button class="btn btn-danger" onclick=removeData(${el.id})>Remove</button>
        </div>
      </div>
        `
    });
}
getFavData()

async function removeData(id){
  await axios.delete(`${BASE_UR2L}/${id}`)
  getFavData()
}