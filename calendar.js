// -- Ikatyros NY 2021 - Jere Pystynen -- //
// Calendar script v1
// - Has functionality for selecting days in the calendar.
// - Auto-selects the current day.

let months = [
    'Tammikuu',
    'Helmikuu',
    'Maaliskuu',
    'Huhtikuu',
    'Toukokuu',
    'Kesäkuu',
    'Heinäkuu',
    'Elokuu',
    'Syyskuu',
    'Lokakuu',
    'Marraskuu',
    'Joulukuu',
]

let calendar = document.getElementsByClassName("calendar")[0]
let calendarDaysParent = calendar.getElementsByClassName("days")[0]
var calendarDays = []
let monthTitle = calendar.getElementsByClassName("month-title")[0]
let dateTitle = document.getElementById("date-title")

let date = new Date()

let currentDay = date.getDate()
let currentMonth = date.getMonth() + 1
var targetMonth = currentMonth

var targetYear = date.getFullYear()

var currWeekElement
var currDayIndex = 0

var selectedDay = -1

function setPreviousMonth() {
    selectedDay = -1
    targetMonth--
    createCalendar()
}

function setNextMonth() {
    selectedDay = -1
    targetMonth++
    createCalendar()
}

function createCalendar() {
    calendarDays = []
    calendarDaysParent.innerHTML = ""

    if (targetMonth <= 0) {
        targetYear--
        targetMonth = 12
    }
    else if (targetMonth > 12) {
        targetYear++
        targetMonth = 1
    }

    monthTitle.innerHTML = `${months[targetMonth - 1]} ${targetYear}`

    let d2 = new Date(targetYear, targetMonth, 0)
    let d = d2.getDate()
    let m = d2.getMonth()
    let y = d2.getFullYear()

    // add days from previous month
    let days = new Date(d2.getFullYear(), m, 0).getDay()
    let daysInWeekPreviousMonth = daysInMonth(m, y)
    for (let i = 0; i < days; i++)
        addDay(daysInWeekPreviousMonth - days + i + 1, false)

    // add days from current month
    for (let i = 0; i < daysInMonth(m + 1, y); i++)
        addDay(i + 1, true)

    // add days from next month
    var daysInWeekOverThisMonth = 7 - d2.getDay().toString()
    for (let i = 0; i < daysInWeekOverThisMonth; i++)
        addDay(i + 1, false)

    // if target month is current month, auto-select current day
    if (targetMonth == currentMonth) {
        selectCalendarDay(currentDay)
    }
}

function addDay(day, isThisMonth) {
    if (currDayIndex == 0) {
        currWeekElement = document.createElement('div')
        currWeekElement.id = "week"
        calendarDaysParent.append(currWeekElement)
    }
    let d = document.createElement('div')
    d.id = "day"
    d.className = isThisMonth ? "inside" : "outside"
    d.innerHTML = `<h4>${day}</h4>`
    currWeekElement.appendChild(d)
    if (isThisMonth) {
        if (targetMonth == currentMonth) {
            d.onclick = function () { selectCalendarDay(day) }
        } else {
            
        }
        calendarDays.push(d)
    }
    else if (targetMonth != currentMonth) {
        d.onclick = function () { selectCalendarDay(day) }
        calendarDays.push(d)
    }
    currDayIndex++
    if (currDayIndex >= 7)
        currDayIndex = 0
}

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate()
}

function selectCalendarDay(day) {
    if (selectedDay != day) {
        selectedDay = day
        for (let i = 0; i < calendarDays.length; i++)
            if (i < currentDay - 1) calendarDays[i].className = "passed"
            else calendarDays[i].className = i == day - 1 ? "selected" : "inside"
        dateTitle.innerHTML = `${day}.${targetMonth}. TODO:`
    }
}
