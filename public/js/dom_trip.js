seatchecked = document.querySelectorAll("#seatchecked > div > main > input")
pricetag = document.querySelector("#pricetag")
const price = pricetag.value
console.log(price)
let i=0;
if(i==0){
    pricetag.value = 0
}

// console.log(filter1)
console.log(seatchecked)


seatchecked.forEach(check => {
    if (check.checked === true) {
        check.previousElementSibling.style.background = 'lightcoral'
    } else {
        check.previousElementSibling.style.background = 'white'

        check.previousElementSibling.addEventListener('click', (e) => {
            check.previousElementSibling.classList.toggle("color")
            if (check.previousElementSibling.classList.contains('color')) {
                check.previousElementSibling.style.background = 'royalblue'
                let max = Number(pricetag.value) + Number(price);
                console.log(max)
                pricetag.value = max
            } else {
                check.previousElementSibling.style.background = 'white'
                let min = Number(pricetag.value) - Number(price);
                console.log(min)
                pricetag.value = min
            }
        })

    }
})


// flash message block
let alert = document.querySelector(".alert");

setTimeout(() => {
    alert.style.transform = `translateX(-900px)`;
    alert.style.transition = "ease all 0.5s";
    alert.style.position = "fixed"
},5000)
{
    alert.style.transform = "translateX(0px)";
    alert.style.transition = "ease all 0.7s"
}
