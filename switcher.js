$('.intro p').click(e => {
    let text = e.target.innerHTML
    switch (text) {
        case 'Խումբ 1':
            localStorage.setItem('key', 'group1')
            break;
        case 'Խումբ 2':
            localStorage.setItem('key', 'group2')
            break;
        case 'Խումբ 3':
            localStorage.setItem('key', 'group3')
            break;
        case 'Խումբ 3':
            localStorage.setItem('key', 'group3')
            break;
        case 'Խումբ 4':
            localStorage.setItem('key', 'group4')
            break;
        case 'Խումբ 5':
            localStorage.setItem('key', 'group5')
            break;
        case 'Խումբ 6':
            localStorage.setItem('key', 'group6')
            break;
        case 'Խումբ 7':
            localStorage.setItem('key', 'group7')
            break;
        case 'Խումբ 8':
            localStorage.setItem('key', 'group8')
            break;
        case 'Խումբ 9':
            localStorage.setItem('key', 'group9')
            break;
        case 'Խումբ 10':
            localStorage.setItem('key', 'group10')
    }

})
