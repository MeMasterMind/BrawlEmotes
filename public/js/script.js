function build () {
  fetch("/api/emotes").then(res=>{
    res.json().then(data=>{
      return data
    })
  })
}

const section = document.getElementById("section")

window.onload = () => {
  build().then(data=>{
    data.forEach
  })
}