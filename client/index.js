window.onload = async () => {
  try {
    const resp = await (await fetch("http://localhost:3000/")).json()
    const imgElem = document.createElement("img");
    imgElem.src = resp.data
    document.getElementById("wrapper").appendChild(imgElem)
  } catch (err){
    console.error(err)
  }
}
