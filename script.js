//Some useful functions//
//=================================================//
document.addEventListener("contextmenu", (e) => { e.preventDefault(); });

document.addEventListener("keydown", (e) => {
  // USE THIS TO DISABLE CONTROL AND ALL FUNCTION KEYS
  // if (e.ctrlKey || (e.keyCode>=112 && e.keyCode<=123)) {
  // THIS WILL ONLY DISABLE CONTROL AND F12
  if (e.ctrlKey || e.keyCode==123) {
    e.stopPropagation();
    e.preventDefault();
  }
});
function delegate(parent, child, when, what){
    function eventHandlerFunction(event){
        let eventTarget  = event.target
        let eventHandler = this
        let closestChild = eventTarget.closest(child)

        if(eventHandler.contains(closestChild)){
            what(event, closestChild)
        }
    }

    parent.addEventListener(when, eventHandlerFunction)
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function listEq(l1,l2)
{
    if(l1 === l2)
    {
        return true
    }
    if (l1.length != l2.length)
    {
        return false
    }
    if(l1 == null || l2 == null)
    {
        return false
    }
    for (let i=0; i<l1.length;i++) 
    {
        if (l1[i] != l2[i])
        { 
            return false
        }
    }
    return true
}
function permaSave(name, value){
    window.localStorage.setItem(name, JSON.stringify(value))
}
function permaLoad(name){
    return JSON.parse(window.localStorage.getItem(name))
}
//=================================================//

const bulb = '💡'
let alreadyLit = []

let startButton = document.querySelector("#start-button")
let loadButton = document.querySelector("#load-button")
let customButton = document.querySelector("#custom-button")
let resultButton = document.querySelector("#resultButton")
let restartButton = document.querySelector("#restartButton")
let saveButton = document.querySelector('#saveButton')
let backButton = document.querySelector('#backButton')
let startCButton = document.querySelector('#startCustom-button')

let sizeX
let sizeY
let blackCells
let blackCellsWithIndex

let mainPage = document.querySelector(".main-page")
let gamePage = document.querySelector(".game-page")
let customPage = document.querySelector(".custom-box")
function selectBoard(boardValue, nameValue)
{
    switch(boardValue)
    {
        case "Easy-7x7":   
                      sizeX = 7; 
                      sizeY = 7; 
                      blackCells = ['03', '11', '15', '30', '33', '36', '51', '55', '63']
                      blackCellsWithIndex = {'11' : 0, '03' : 1, '15' : 2, '55' : 2, '63' : 3}
                      break

        case "Moderate-7x7":  
                      sizeX = 7; 
                      sizeY = 7; 
                      blackCells = ['02', '04', '20', '22', '24', '26', '33', '40', '42', '44', '46', '62', '64']
                      blackCellsWithIndex = {'13' : 0, '24' : 3, '33' : 1, '40' : 2, '64' : 2}
                      break

        case "Pro-10x10": 
                      sizeX = 10; 
                      sizeY = 10; 
                      blackCells = ['01', '15', '17', '19', '21', '22', '27', '34', '41', '44', '45', '46', '53', 
                                    '54', '55', '58', '65', '72', '77', '78', '80', '82', '84', '98']
                      blackCellsWithIndex = {'15' : 3, '17' : 2, '21' : 0, '41' : 1, '45' : 1, '58' : 3, '72' : 1, '77' : 0, '80' : 3,  '84' : 0, '98' : 0}
                      break

    }
    let name = document.querySelector("#nameD")
    name.innerHTML = `Player Name: ${nameValue}`
    let lname = document.querySelector("#mapName")
    lname.innerHTML = "Level: " + boardValue
    const table = document.querySelector('table') 
    for(let i = 0; i < sizeX; i++)
    {
        let newTr = document.createElement('tr')
        for (let j = 0; j < sizeY; j++)
        {
            let newTd = document.createElement('td')
            newTd.dataset.index = `${i}${j}`
            if (blackCells.includes(`${i}${j}`))
            {
                newTd.classList.add("bg-black")
                if (Object.hasOwn(blackCellsWithIndex,`${i}${j}`))
                {
                    newTd.innerText = blackCellsWithIndex[`${i}${j}`]
                }
            }
            else 
            {
                newTd.classList.add("bg-white")
            }
            newTr.appendChild(newTd)
        }
        table.appendChild(newTr)
    }
}

//TIMER Functions//
//=================================================//
let hour = 0;
let minute = 0;
let second = 0;
let millisecond = 0;
let cron;
function start() 
{
    pause();
    cron = setInterval(() => { timer(); }, 10);
}
function pause() 
{
  clearInterval(cron);
}
function reset() 
{
  hour = 0;
  minute = 0;
  second = 0;
  millisecond = 0;
  document.getElementById('hour').innerText = '00';
  document.getElementById('minute').innerText = '00';
  document.getElementById('second').innerText = '00';
  document.getElementById('millisecond').innerText = '000';
}
function timer() 
{
  if ((millisecond += 10) == 1000) 
  {
    millisecond = 0;
    second++;
  }
  if (second == 60) 
  {
    second = 0;
    minute++;
  }
  if (minute == 60) 
  {
    minute = 0;
    hour++;
  }
  document.getElementById('hour').innerText = returnData(hour);
  document.getElementById('minute').innerText = returnData(minute);
  document.getElementById('second').innerText = returnData(second);
  document.getElementById('millisecond').innerText = returnData(millisecond);
}
function returnData(input) 
{
  return input >= 10 ? input : `0${input}`
}
//=================================================//


function startClick()
{
    resultButton.innerText = ''
    let name = document.querySelector("#name")
    let board = document.querySelector("#boards")
    nameValue = name.value 
    boardValue = board.value
    selectBoard(boardValue, nameValue)
    mainPage.style.display = "none"
    gamePage.style.display = "block"
    start();
}
startButton.addEventListener("click",startClick)

function customClick()
{
    tableH=document.querySelector('table') 
    tableH.innerHTML=''
    customPage.style.display="block"
    resultButton.innerText = ''
    
    mainPage.style.display = "none"
    
}
customButton.addEventListener("click",customClick)

startCButton.addEventListener("click",()=>{
    let Cname = document.querySelector("#Cname")
    var CnameValue = Cname.value 
    let size = document.querySelector("#size")
    var sizeValue = size.value
    let blackIndex = document.querySelector("#blackIndex")
    var blackIndexValue = blackIndex.value
    let blackInner = document.querySelector("#blackInner")
    var blackInnerValue = blackInner.value 
    blackIndexValue = String(blackIndexValue).split(',')
    blackInnerValue = String(blackInnerValue).split(',')
    if(blackIndexValue.length == 1 && blackIndexValue[0] =="")
    {
        blackCells=[]
    }
    else
    {
        blackCells = blackIndexValue
    }
    sizeX = sizeValue
    sizeY = sizeValue
    newArr = []
    for(e of blackInnerValue)
    {
        x = e.split("-")
        newArr.push([String(x[0]),parseInt(x[1])])

    }
    blackCellsWithIndex = Object.fromEntries(newArr)

    selectBoard("Custom",CnameValue)

    gamePage.style.display = "block"
    customPage.style.display="none"
    start();

}) 

function auxFunc(indexOfCells, auxCells, boolValue)
{
    let tempIndex = indexOfCells
    let tempLit = alreadyLit
    tempLit = tempLit.filter(item => !listEq(item,indexOfCells))
    if (tempLit.length != 0)
    {
        for(const item of tempLit)
        {
            for (const e of item){
                if (tempIndex.includes(e)){
                        tempIndex = tempIndex.filter(x => x != e)
                    }
                }
        }
    }
    if (boolValue)
    {
        indexOfCells = tempIndex
        alreadyLit.push(Array.from(auxCells.map(x => x.dataset.index)))
    }
    else
    {
        alreadyLit = alreadyLit.filter(item => ! (listEq(item, indexOfCells)) )
        indexOfCells = tempIndex
    }
    return indexOfCells
}

function lightUp(element)
{
    index = element.dataset.index
    element.innerText = element.innerText === bulb ? element.innerText = "" : element.innerText = bulb
    let cellsToIlluminate = Array.from(document.querySelectorAll('td')).filter(x => (x.dataset.index[0] == index[0] || x.dataset.index[1] == index[1]))
    let blackCells = cellsToIlluminate.filter(x => x.classList.contains("bg-black"))
    for (const blackCell of blackCells)
    {
        if (blackCell.dataset.index[0] == index[0])
        {
            let j = parseInt(blackCell.dataset.index[1])
            if (blackCell.dataset.index[1] < index[1])
            {
                while (j >= 0 )
                {
                    cellsToIlluminate = cellsToIlluminate.filter(x => x.dataset.index != `${index[0]}${j}`)
                    j--
                }
            }
            else if (blackCell.classList[0][1] > index[1])
            {
                while (j < sizeX )
                {
                    cellsToIlluminate = cellsToIlluminate.filter(x => x.dataset.index != `${index[0]}${j}`)
                    j++
                }
            }
        }
        else if (blackCell.dataset.index[1] == index[1])
        {
            let i = parseInt(blackCell.dataset.index[0])
            if (blackCell.dataset.index[0] < index[0])
            {
                while (i >= 0)
                {
                    cellsToIlluminate = cellsToIlluminate.filter(x => x.dataset.index != `${i}${index[1]}`)
                    i--
                }
            }
            else if (blackCell.dataset.index[0] > index[0])
            {
                while (i < sizeY )
                {
                    cellsToIlluminate = cellsToIlluminate.filter(x => x.dataset.index != `${i}${index[1]}`)
                    i++
                }
            }
            
        }
    }
    if (cellsToIlluminate.filter(x => x.innerText == bulb && x != element ).length == 0)
    {
        let indexOfCells = Array.from(cellsToIlluminate.map(x => x.dataset.index))
        if(alreadyLit.filter(item => listEq(item, indexOfCells)).length == 0)
        {
            indexOfCells = auxFunc(indexOfCells,cellsToIlluminate,true)
        }
        else if(alreadyLit.filter(item => listEq(item, indexOfCells)).length != 0)
        {
            indexOfCells = auxFunc(indexOfCells,cellsToIlluminate,false)
        }
        tempCellsToIlluminate = []
        cellsToIlluminate.map(x => {for(const i of indexOfCells){if (x.dataset.index == i){tempCellsToIlluminate.push(x)}}})
        cellsToIlluminate = tempCellsToIlluminate
        cellsToIlluminate.map(cell => cell.classList.toggle("bg-yellow"))
    }
    else 
    {
        warningRed(element)
    }
}

function neighbour(e)
{
    let a = Array.from(document.querySelectorAll('td'))
    a = a.filter(x => (x.dataset.index[0] == e[0] && (x.dataset.index[1] == parseInt(e[1]) - 1 
                        || x.dataset.index[1] == parseInt(e[1]) + 1)) 
                        || x.dataset.index[1] == e[1] && (x.dataset.index[0] == parseInt(e[0]) - 1 
                        || x.dataset.index[0] == parseInt(e[0]) + 1))
    return a
}

function warningRed(cell)
{
    setTimeout(() => {
        cell.classList.remove("bg-red")
        cell.innerText = ""
     }, 500)
        cell.classList.add("bg-red")
        cell.innerText = bulb
}

function greenIndex(clicked)
{
    let blackWalls = neighbour(clicked.dataset.index,true).filter(x => x.classList.contains("bg-black"))
    for(let blackWall of blackWalls)
    {
        if (blackWall.innerText != "") 
        {
            let aroundBlack = neighbour(blackWall.dataset.index).filter(x => x.innerText == bulb)
                if (aroundBlack.length == blackWall.innerText)
                {
                    blackWall.style.color = "green";
                } 
                else if (aroundBlack.length < blackWall.innerText)
                {
                    blackWall.style.color = "white"
                }
        }
    }
}

function canPlace(e)
{
    let selected = neighbour(e.dataset.index, true)
    let blackCells = selected.filter(x => x.classList.contains("bg-black"))
    for(let blackCell of blackCells)
    {
        if (blackCell.innerText == '0') 
        {
            warningRed(e)
            return false
        }
        if (blackCell.innerText != "") 
        {
            let neighbouringBulb = neighbour(blackCell.dataset.index).filter(x => x.innerText == bulb)
            if (e.innerText != bulb) 
            {
                if (neighbouringBulb.length == blackCell.innerText)
                {
                    warningRed(e)
                    return false
                }
            }
        }
    }
    return true
}

function allGreen()
{
    let blackGreenZero = Array.from(document.querySelectorAll('td')).filter((cell => cell.classList.contains("bg-black") && cell.innerText == '0'))
    for(let e of blackGreenZero)
    {
        e.style.color = 'green'
    }
    let blackC = Array.from(document.querySelectorAll('td')).filter((cell => cell.classList.contains("bg-black") && cell.innerText != '' && cell.innerText != '0'))
    for(let e of blackC)
    {
        if(e.style.color != "green")
        {
            return false
        }
    }
    return true
}

function onClickTd(event,element)
{
    if (!element.classList.contains("bg-black") && canPlace(element))
    {   
        lightUp(element)  
            setTimeout(()=>{greenIndex(element)},500)

        sleep(500).then(() => {
            let lightedCells = Array.from(document.querySelectorAll('td')).filter(cell => cell.classList.contains("bg-yellow"))
            if (lightedCells.length === ((sizeX * sizeY) - blackCells.length) && allGreen())
            {
                // console.log("hahahahahahahaha")
                // console.log(blackCells)
                // console.log(lightedCells.length === ((sizeX * sizeY) - blackCells.length))
                resultButton.innerText = "WIN!"
                pause();
            }
            else
            {
                resultButton.innerText = ""
                start();
            }
        });
    }
}
delegate(document.querySelector('table'), 'td', 'click', onClickTd)


function doRestart(element)
{
    resultButton.innerText = ""
    alreadyLit = []
    let alltd = Array.from(document.querySelectorAll('td'))
    alltd.forEach(x => {x.style.color = "white";if (x.classList.contains("bg-yellow")){x.classList.remove("bg-yellow");if (x.innerText == bulb){x.innerText = ""}}})
    reset();
    start();
}
restartButton.addEventListener('click',doRestart);

function doSave()
{
    let tableData = []
    let arrayofTd = Array.from(document.querySelectorAll('td'))
    for(e of arrayofTd)
    {
        i = e.dataset.index
        innerMaterial = e.innerText
        let color = e.classList;
        styleColor = e.style.color
        tableData.push({
            index : i,
            text : innerMaterial,
            bgcolor : color,
            sColor : styleColor
        })
    }
    permaSave('tableData', tableData)
    let name = document.querySelector("#nameD")
    let lname = document.querySelector("#mapName")
    haha1 = String(name.innerHTML).split(":")
    haha2 = String(lname.innerHTML).split(":")
    
    nameValue = haha1[1]
    boardValue =haha2[1]
    permaSave('nameSaved',nameValue)
    permaSave('level',boardValue)
    permaSave('already',alreadyLit)
    permaSave('status',resultButton.innerText)
    let time =[hour,minute,second,millisecond]
    permaSave('time',time)
    alreadyLit = []
    tableH=document.querySelector('table') 
    tableH.innerHTML=''
    mainPage.style.display = "block"
    gamePage.style.display = "none"
    customPage.style.display="none"
    pause();
    reset();
}
saveButton.addEventListener('click',doSave)

function doLoad()
{
    mainPage.style.display = "none"
    gamePage.style.display = "block"
    customPage.style.display="none"
    
    bV = permaLoad('level')
    nV = permaLoad('nameSaved')
    selectBoard(bV,nV)

    alreadyLit = permaLoad('already')
    const data = permaLoad('tableData')
    let table =  document.querySelector('table')
    table.innerHTML = ''
    let counter = 0
    let limit =parseInt(Math.sqrt(data.length))
    for (let i = 0; i < limit; i++)
    {
        let tr = document.createElement('tr')
        for (let j = 0; j < limit; j++)
        {
            let td = document.createElement('td')
            let index = data[counter]['index']
            let text = data[counter]['text']
            let textColor = data[counter]['sColor']
            td.dataset.index = index
            for(let x =0;x<Object.keys(data[counter]['bgcolor']).length;x++)
            {
                td.classList.add(String(data[counter]['bgcolor'][x]))
            }
            td.style.color = String(textColor)
            td.innerText=text
            tr.appendChild(td)
            counter++
        }
        table.appendChild(tr)
    }
    let time = Array.from(permaLoad('time')).map(e=> parseInt(e))
    hour=time[0]
    minute=time[1]
    second=time[2]
    millisecond=time[3]
    resultButton.innerText = permaLoad('status')
    timer();
    if(resultButton.innerText != "WIN!")
    {
        start();
    }
}
loadButton.addEventListener('click',doLoad)

backButton.addEventListener('click',() =>{
    tableH=document.querySelector('table') 
    tableH.innerHTML=''
    alreadyLit = []
    pause();
    reset();
    mainPage.style.display = "block"
    gamePage.style.display = "none"
    customPage.style.display="none"

})
