
let ind = (+localStorage.getItem('index'))
if (!ind) ind = 0
else ind = ind - 1

// let side = `<div class="side">
// <button>Start</button>
// <button>Save</button>`

let mistakes = []

let data = xumb1[ind]
const allCount = xumb1.length

let main = $('.main')

let p

function print(i) {
    console.log(i);
    data = xumb1[i]
    $('.side').show()
    $('.buttons').show()
    let h2 = `<h2 class='N'>№ ${i + 1}</h2><hr><h2 class="quest">${data.question}</h2>`;
    main.removeClass('all')
        .html('')
        .append(h2);

    if (data.image) {
        let img = document.createElement('img')
        img.src = data.image
        main.append(img);
    }

    let versions = data.options
    for (let v = 1; v < versions.length; v++) {
        let p = `<p class='option'>${v}. ${versions[v]}</p>`
        main.append(p);
    }

    p = $('.option')

    p.on('click', check)
}

function check() {
    let rAns = (data.options)[0]
    let userAns = /[0-9]+/
    userAns = userAns.exec($(this)[0].innerHTML);
    if (rAns != userAns) {
        $(this).addClass('wrong')
        mistakes.push(xumb1.indexOf(data) + 1)
    }
    $(p[rAns - 1]).addClass('right')
    p.off()
}

function save() {
    console.log($(this));
    // if (e.target.innerHTML == 'Save') {
    //     localStorage.setItem('index', ind + 1)
    //     console.log('dfsf');
    // }
    // else if (e.target.innerHTML == 'Start') {
    //     localStorage.removeItem('index')
    //     print(ind)
    // }

}

$('[pager]').click(
    (e) => {
        if (e.target.value == "NEXT" && ind < allCount - 1) ind++
        else if (e.target.value == "PREVIOUS" && ind > 0) ind--
        print(ind)
    }
)

print(ind)

$('.side button').click((e) => {
    console.log($(this));
    if (e.target.innerHTML == 'Save') {
        localStorage.setItem('index', ind + 1)
        console.log('dfsf');
    }
    else if (e.target.innerHTML == 'Start') {
        localStorage.removeItem('index')
        ind = 0
        print(ind)
    }
})

// All numbers of questions in section
function allQuestions() {
    $('.side').hide()
    $('.buttons').hide()
    main.html('')
        .addClass('all')
        $('.main').append(`<button class='mistakes'>See mistakes</button>`)
    for (let num = 1; num <= allCount; num++) {
        $('.main').append(`<p class='question'>${num}</p>`)
        console.log(52);
    }

    mistakes = Array.from(new Set(mistakes))
    $('.mistakes').click(()=> {
        mistakes.forEach(element => {
           $( $('p')[element-1]).addClass('wrong')
        }); 
    })

    $('p').click((e)=>{
        let num = e.target.innerHTML
        print(num - 1)
    })
    console.log(mistakes);
}

$('[icon]').click(allQuestions)
$('#all').click(allQuestions)