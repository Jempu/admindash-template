window.onload = function () {
    // Set the category window to the default first category
    selectCategory(0)
}

let categories = document.getElementById('categories').children
for (let i = 0; i < categories.length; i++) {
    let c = categories[i]
    c.onclick = function () { selectCategory(i) }
}

let sections = document.getElementById('container').children

var setCategory = -1
function selectCategory(x) {
    if (setCategory != x) {
        setCategory = x

        for (let i = 0; i < sections.length; i++) {
            sections[i].style.display = i == x ? "block" : "none"
        }

        switch (x) {
            case 0:
                setCalendarCategory()
                break
            case 1:

                break
            case 2:

                break
            case 3:

                break
            case 4:

                break
        }
    }
}

function setCalendarCategory() {
    createCalendar()
}