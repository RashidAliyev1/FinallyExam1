const form=document.querySelector("form")
const title=document.querySelector("#title")
const description=document.querySelector("#desc")
const submitBtn=document.querySelector(".submit")
const img=document.querySelector("#img")
let BASE_URL="http://localhost:8080/offer"
let BASE_UR2L=" http://localhost:8080/favs"

const id=new URLSearchParams(window.location.search).get("id")

if(id){
   async function fillForm(){
    const res=await axios(`${BASE_URL}/${id}`)
    const data=await res.data
    title.value=data.title
    description.value=data.description
    submitBtn.innerHTML="Edit";
   }
   fillForm()
}


form.addEventListener("submit",async function(e){
    e.preventDefault()
    let obj={
        title:title.value,
        description:description.value,
        img:`./assets/image/${img.value.split("\\")[2]}`
    }
    if(id){
        await axios.patch(`${BASE_URL}/${id}`,obj)
    }else{
        await axios.post(BASE_URL,obj)
    }
    window.location="index.html"

})