

let bar = document.querySelector(".bar")

let block = document.querySelector("#block")
// console.log(bar)
// console.log(block)


bar.addEventListener("click", e=>{
    e.preventDefault()
    block.style.display="block"
console.log(block)
 })

//  bar.onclick = function(){
//     console.log("hello")
//  };
block.addEventListener("mouseout",e=>{
    // e.preventDefault()
    console.log("hello")
    block.style.display="none"
})

