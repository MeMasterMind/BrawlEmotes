
  // fetch("/api/emotes").then(res=>{
  //   res.json().then(data=>{
  //     return data
  //   })
  // })

var pinsArray;

fetch("/api/emotes")
  .then(res => res.json())
  .then(data => pinsArray = data)
  

function trigger (triggerredPin){
  const result = pinsArray.filter(pin => pin.pin == triggerredPin);

     Swal.fire({
  title: '<strong>'+result[0].pin+'</strong>',
  imageUrl: result[0].url,
  imageAlt: 'pin',
  html:'<strong>Brawler</strong>: '+result[0].brawler+'<br><strong>Rarity: </strong>'+result[0].rarity+'<Br><br><button data-id="'+result[0].url+'" class=" copy-text-button bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"> Copy</button> <button data-id="'+result[0].url+'" class="download-button bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">Download</button>'
  })

  document.querySelectorAll('.copy-text-button').forEach(item => {
  item.addEventListener('click', event => {
    const url = item.getAttribute("data-id")
    navigator.clipboard.writeText(url)
    .then(item.innerHTML = "🎉Copied!")
  })

    document.querySelectorAll('.download-button').forEach(item => {
  item.addEventListener('click', event => {
    const url = item.getAttribute("data-id")
    downloadResource(url, "pin")
  })
  })
})
}

function forceDownload(blob, filename) {
  var a = document.createElement('a');
  a.download = filename;
  a.href = blob;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function downloadResource(url, filename) {
  if (!filename) filename = url.split('\\').pop().split('/').pop();
  fetch(url, {
    headers: new Headers({
      'Origin': location.origin
    }),
    mode: 'cors'
  })
    .then(response => response.blob())
    .then(blob => {
      let blobUrl = window.URL.createObjectURL(blob);
      forceDownload(blobUrl, filename);
    })
    .catch(e => console.error(e));
}
