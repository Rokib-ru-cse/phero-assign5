var firstClassPlus = document.querySelector('.first-class-plus')
var firstClassMinus = document.querySelector('.first-class-minus')
var economyClassPlus = document.querySelector('.economy-class-plus')
var economyClassMinus = document.querySelector('.economy-class-minus')
var firstClassInputBox = document.querySelector(".first-class-input-box")
var economyClassInputBox = document.querySelector(".economy-class-input-box")
var subtotal = document.querySelector(".subtotal")
var vat = document.querySelector(".vat")
var total = document.querySelector(".total")
var bookBtn = document.getElementById("book-btn")

var showBook = document.querySelector(".show-book")
var showBookFirstClassTicket = document.querySelector(".show-book-first-class-ticket")
var showBookEconomyClassTicket = document.querySelector(".show-book-economy-class-ticket")
var showBookFirstClassPrice = document.querySelector(".show-book-first-class-price")
var showBookEconomyClassPrice = document.querySelector(".show-book-economy-class-price")
var showBookTotal = document.querySelector(".show-book-total")

var firstClassTicketCounter = 0;
var economyClassTicketCounter = 0;

firstClassPlus.addEventListener("click", function () {
    firstClassInputBox.value = ++firstClassTicketCounter
    setSubtotalVatTotal()
    setShowBook()
})
firstClassMinus.addEventListener("click", function () {
    if (firstClassTicketCounter > 0) {
        firstClassInputBox.value = --firstClassTicketCounter
        setSubtotalVatTotal()
        setShowBook()
    }
    else {
        alert("ticket amount can not be negative")
    }
})
economyClassPlus.addEventListener("click", function () {
    economyClassInputBox.value = ++economyClassTicketCounter
    setSubtotalVatTotal()
    setShowBook()
})
economyClassMinus.addEventListener("click", function () {
    if (economyClassTicketCounter > 0) {
        economyClassInputBox.value = --economyClassTicketCounter
        setSubtotalVatTotal()
        setShowBook()
    }
    else {
        alert("ticket amount can not be negative")
    }
})
function setSubtotalVatTotal() {
    subtotal.innerHTML = firstClassTicketCounter * 150 + economyClassTicketCounter * 100
    vat.innerHTML = (firstClassTicketCounter * 150 + economyClassTicketCounter * 100) * 0.1
    total.innerHTML = (firstClassTicketCounter * 150 + economyClassTicketCounter * 100) + ((firstClassTicketCounter * 150 + economyClassTicketCounter * 100) * 0.1)
}
bookBtn.addEventListener("click", function () {
    setShowBook()
    showBook.style.display = 'block';
})
function setShowBook() {
    showBookFirstClassTicket.innerHTML = firstClassTicketCounter
    showBookEconomyClassTicket.innerHTML = economyClassTicketCounter
    showBookFirstClassPrice.innerHTML = firstClassTicketCounter * 150
    showBookEconomyClassPrice.innerHTML = economyClassTicketCounter * 100
    showBookTotal.innerHTML = (firstClassTicketCounter * 150 + economyClassTicketCounter * 100) + ((firstClassTicketCounter * 150 + economyClassTicketCounter * 100) * 0.1)
}

firstClassInputBox.addEventListener("change", function (e) {
    if (e.target.value > 0) {
        firstClassTicketCounter = e.target.value
        setSubtotalVatTotal()
        setShowBook()
    } else {
        alert("ticket amount can not be negative")
    }
})
economyClassInputBox.addEventListener("change", function (e) {
    if (e.target.value > 0) {
        economyClassTicketCounter = e.target.value
        setSubtotalVatTotal()
        setShowBook()
    } else {
        alert("ticket amount can not be negative")
    }
})