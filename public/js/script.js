var pinsArray;

fetch("/api/emotes")
  .then(res => res.json())
  .then(data => pinsArray = data)
  

function trigger (triggerredPin){
  const result = pinsArray.filter(pin => pin.pin == triggerredPin);

     Swal.fire({
  title: '<strong>'+result[0].pin+'</strong>',
  html:'<img src="'+result[0].url+'" style="height:84px; width:auto;margin-left:auto;margin-right:auto;" /><br><strong>Brawler</strong>: '+result[0].brawler+'<br><strong>Rarity: </strong>'+result[0].rarity+'<Br><br><button data-id="'+result[0].url+'" class=" copy-text-button bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"> Copy</button> <button pin-name = "'+result[0].pin+'"data-id="'+result[0].url+'" class="download-button bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">Download</button><br><h1 id="hidden-copy"style="display:none;">Works in Discord as well✨</h1>'
  })

  document.querySelectorAll('.copy-text-button').forEach(item => {
  item.addEventListener('click', event => {
    const url = item.getAttribute("data-id")
    const span = document.getElementById("hidden-copy")
    navigator.clipboard.writeText(url)
    .then(item.innerHTML = "🎉Copied!")
    .then(span.style.display = "block")
  })

    document.querySelectorAll('.download-button').forEach(item => {
  item.addEventListener('click', event => {
    const url = item.getAttribute("data-id")
    const pinName = item.getAttribute("pin-name")
    forceDownload(url, pinName)
  })
  })
})
}

function toDataURL(url) {
    return fetch(url).then((response) => {
            return response.blob();
        }).then(blob => {
            return URL.createObjectURL(blob);
        });
}

async function forceDownload(url,filename) {
        const a = document.createElement("a");
        a.href = await toDataURL(url);
        a.download = filename+".png"
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
}



function suggest () {

  Swal.fire({
    title: "Suggest Pins",
    html: '<input id="name" placeholder="Name"/><br><input id="content" placeholder="What would you like to suggest?"/><br><br><button id="submit" class="cursor-pointer bg-purple-500 text-white p-3 rounded-md hover:bg-purple-700 ">Submit</button>',
    showConfirmButton:false
  })
  const namee = document.getElementById("name").value
  const contentt = document.getElementById("content").value

  const buttonn = document.getElementById("submit")
  buttonn.addEventListener('click',()=>{
    sendMessage(namee, contentt)
  })
}

function sendMessage(name, content){
  fetch("/sendmessage?name="+name+"&content="+content)
  // .then(Swal.fire({
  //   title:"Successfully sent!",
  //   icon: "success",
  //   text:"Contact MasterMind#6098 on Discord for more."
  // })
  // )
}



