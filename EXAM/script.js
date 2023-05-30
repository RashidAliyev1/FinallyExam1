const cards=document.querySelector(".cards")
const search=document.querySelector("#search")
const sortedbtn=document.querySelector(".sortedbtn")
const load=document.querySelector(".load")
let filtered=[]
let copyData=[]
let defaultArr=[]
let num=3
let favData
let BASE_URL="http://localhost:8080/offer"
let BASE_UR2L=" http://localhost:8080/favs"


async function getAllData(){
  const res=await axios(BASE_URL)
  const data=await res.data
  copyData=data
  defaultArr = copyData.slice(0, num);
  filtered=filtered.length || search.value ? filtered:data.slice(0, num)
  cards.innerHTML=''
  filtered.forEach((el)=>{
    cards.innerHTML+=`
    <div class="col-lg-3 mx-4 col-md-6 col-sm-12">
    <div class="content" >
      <img src="${el.img}" alt="" />
      <h3>${el.title}</h3>
      <p class="comment">
       ${el.description}
      </p>
      <a href="details.html?id=${el.id}" class="viewBtn btn border-info">VIEW DETAILS</a>
      <div class="buttons">
      <a href="./addEdit.html?id=${el.id}" class="btn btn-success mt-2">Edit</a>
      <a class="btn btn-danger" onclick=deleteCard(${el.id},this)>Delete</a>
      <a  class="btn btn-primary" onclick=addFav(${el.id})>Add Fav</a>
      </div>
    </div>
  </div>
    `
  })
} 
getAllData()



async function deleteCard(id, btn) {
  await axios.delete(`${BASE_URL}/${id}`);
  const res2 = await axios(BASE_UR2L);
  const data2 = res2.data;
  let check = data2.find((item) => item.id == id);
  if (check) {
    await axios.delete(`${BASE_UR2L}/${id}`);
  }
  filtered = filtered.filter((item) => item.id != id);
  btn.closest(".col col-lg-3 col-md-6 col-sm-12").remove();
}

search.addEventListener("input",async function(e){
filtered=copyData
filtered=filtered.filter((el)=>el.title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()))
getAllData(filtered)
})





sortedbtn.addEventListener("click",function(e){
  e.preventDefault();
  if(sortedbtn.innerHTML=="Ascending"){
    sortedbtn.innerHTML="Descending"
    filtered.sort((a,b)=>a.title.localeCompare(b.title))
    getAllData()
  }else if(sortedbtn.innerHTML=="Descending"){
    sortedbtn.innerHTML="Default"
    filtered.sort((a,b)=>b.title.localeCompare(a.title))
    getAllData()
  }else{
    sortedbtn.innerHTML="Ascending";
    filtered=defaultArr
    getAllData()
  }

})



async function addFav(id) {
    const res = await axios(`${BASE_URL}/${id}`);
    const data = res.data;
  favData = copyData.find((item) => item.id == id);
  const res2 = await axios(BASE_UR2L);
  const data2 = res2.data;
  let check = data2.find((item) => item.id == id);
  if (!check) {
    await axios.post(BASE_UR2L, favData);
  } else {
    alert("Nonono!");
  }
}

load.addEventListener("click", (e) => {
  e.preventDefault();
  num = num + 3;
  filtered = copyData.slice(0, num).filter((item) => {
    return item.title
      .toLocaleLowerCase()
      .includes(search.value.toLocaleLowerCase());
  });
  console.log(defaultArr);
  defaultArr = filtered;
  getAllData();
});