const key = localStorage.getItem('key')
let group

let mistakes = [], rightAns = []

let ind = 0

if (key != 'random') {
    group = [...allData[key]]
    let Item = JSON.parse(localStorage.getItem(key))
    if (Item) {
        ind = Item.index - 1
        mistakes = Item.wrong
        rightAns = Item.right
    }
} else {
    let test = []
    for (const key in allData) {
        test = test.concat(allData[key])
    }
    group = getRandom(test, 20)
}

let data = group[ind]
const allCount = group.length

let main = $('.main')

function showContentBar() {
    $('.side').show()
    $('.buttons').show()
    $('#all').show()
    $('.groups').hide()
    main.removeClass('all')
        .html('')
}

function hideSide() {
    $('.side').hide()
    $('.buttons').show()
    $('#all').show()
    $('.groups').hide()
    $('.groups').hide()
    main.removeClass('all')
        .html('')
}
function print(i) {
    key != 'random' ? showContentBar() : hideSide();

    data = group[i]

    let h2 = `<h2 class='N'>№ ${i + 1}</h2><hr><h2 class="quest">${data.question}</h2>`;

    main.append(h2);

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
    ind = i
}

function check() {
    let rAns = (data.options)[0]
    let userAns = /[0-9]+/
    // debugger
    let num = group.indexOf(data) + 1
    userAns = +userAns.exec($(this)[0].innerHTML)[0];
    if (rAns != userAns) {
        $(this).addClass('wrong')
        mistakes.push(num)
        uniqueEl(mistakes)
        rightAns = rightAns.filter(e => e != num)
    } else {
        rightAns.push(num)
        uniqueEl(rightAns)
        mistakes = mistakes.filter(e => e != num)
    }
    $(p[rAns - 1]).addClass('right')

    p.off()
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
    if (e.target.innerHTML == 'Save') {
        dataItem = {
            index: ind + 1,
            wrong: mistakes,
            right: rightAns
        }
        localStorage.setItem(key, JSON.stringify(dataItem))
    }
    else if (e.target.innerHTML == 'Start') {
        group = [...allData[key]]
        $('[save]').show()
        localStorage.removeItem(key)
        mistakes = []
        rightAns = []
        ind = 0
        print(ind)
    }
    if (e.target.innerHTML == 'Shuffle') {
        $('[save]').hide()
        ind = 0
        mistakes = []
        rightAns = []
        shuffleArray(group)
        print(ind)

    }
})

function hideContentBar() {
    $('.side').hide()
    $('.buttons').hide()
    $('#all').hide()
    $('.groups').show()
    main.html('')
        .addClass('all')
        .append(`<button class='mistakes'>See mistakes</button>`)
}

function uniqueEl(array) {
    array = Array.from(new Set(array))
    return array
}

function showANswers() {
    mistakes.forEach(element => {
        $($('p')[element - 1]).addClass('wrong')
    });
    rightAns.forEach(element => {
        $($('p')[element - 1]).addClass('right')
    })
}

// All numbers of questions in section
function allQuestions() {

    hideContentBar()
    $('[icon]').attr('opened', 'q');
    for (let num = 1; num <= allCount; num++) {
        main.append(`<p class='question'>${num}</p>`)
    }

    $('.mistakes').click(showANswers)


    $('p').click((e) => {
        let num = e.target.innerHTML
        print(num - 1)
    })

}

$('[icon]').click((e) => {
    if (!$(e.target).attr('opened')) {
        allQuestions()
        $(e.target).attr('opened', 'q');
    }
    else {
        $(e.target).removeAttr('opened');
        print(ind)
    }
})
$('#all').click(() => {
    allQuestions()
    showANswers()

})

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}