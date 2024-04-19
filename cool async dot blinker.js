const linesEl1=document.createElement("p")
const linesEl2=document.createElement("p")
const linesEl3=document.createElement("p")
const bodyEl=document.querySelector("body")
const dotsSpan1=document.createElement("span")
const dotsSpan2=document.createElement("span")

//Note: to create new lines U need to create new para elements and span element and add them in the array in this object


information = {
    text:["[+] Setting up resourses.Preparing for attack ","[+] Setting up proxy servers"],
    dotsNum:8,
    repeat:20, 
    delay:2000,
    para_element:[linesEl1,linesEl2],// You have to create this para DOM first
    span_element:[dotsSpan1,dotsSpan2]// same here
}



function noOfDots(number)
{
    let arr=[];
    for (let i = 0; i < number; i++) {
        arr.push(". ")
    }
    arr = arr.join("")
    return arr;
}
function clearDots(number_of_dots,element)
{
        element.innerText="" 
}

async function renderDots(number_of_dots,element)
{    
        // all the settimeout threads will run at once in 2000s
        for (let i = 0; i < number_of_dots; i++) {
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    let dots = noOfDots(i+2)
                    element.innerText=dots
                    resolve()
                }, 300);
            })
        }
         clearDots(number_of_dots,element)
}


async function renderDotsMain(number_of_times,number_of_dots,element)
{
for (let i = 0; i < number_of_times; i++) {
    await renderDots(number_of_dots,element)
}
}

function start(elementPara,text,spanEl,number_of_times,number_of_dots)
{
    elementPara.innerText=`${text} `
    bodyEl.appendChild(elementPara)
    elementPara.appendChild(spanEl)
    renderDotsMain(number_of_times,number_of_dots,spanEl) //This runs parellelly
}

//*************************************** */
async function main(delay)
{

    for (let i = 0; i < information.text.length; i++) {
       await new Promise((resolve, reject) => {
           setTimeout(() => {
               start(information.para_element[i],information.text[i],information.span_element[i],information.repeat,information.dotsNum)
               resolve()
           }, delay);
       })
   }
}
//******************************************* */



main(information.delay)
// write the delay between each msg on terminal
