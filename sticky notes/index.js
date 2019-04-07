var noteIndex = 0;
var trashIconIndex = 0;
var notesArray = [];

function restoreNotesToBoard(date, time, textarea, noteid, trashIconIndex) {

    var note = document.createElement("div");
    var thumbtack = document.createElement("img");
    var trashIcon = document.createElement("span");
    var newDate = document.createElement("div");
    var newText = document.createElement("div");

    note.className = "note";
    note.id = noteid;
    thumbtack.className = "thumbtack";
    trashIcon.className = "fa-trash-o";
    trashIcon.id = trashIconIndex;
    trashIcon.addEventListener("click", function () {
        note.remove();
        removeNote(trashIconIndex);
    });

    thumbtack.src = "/assets/pic/thumbtack.png";
    newDate.className = "date";
    newText.className = "textArea";

    newDate.innerText = date + "\n" + time;
    newText.innerText = textarea;

    note.appendChild(thumbtack);
    note.appendChild(trashIcon);
    note.appendChild(newText);
    note.appendChild(newDate);

    document.body.appendChild(note);
    note.style.display = "block";
}

function restoreNotes() {
    var jsonString = localStorage.getItem("note");
    var notesArray = JSON.parse(jsonString);
    if (notesArray !== null) {
        for (var i = 0; i < notesArray.length; i++) {
            restoreNotesToBoard(notesArray[i].date, notesArray[i].time, notesArray[i].textarea, notesArray[i].noteId, notesArray[i].trashIconIndex);
        }
    }

}

function saveNote(date, time, textarea, noteIndex, trashIconIndex) {
    var note = "note" + noteIndex;
    note = {
        date: date,
        time: time,
        textarea: textarea,
        noteId: "note" + noteIndex,
        trashIconIndex: "trash" + trashIconIndex
    };

    notesArray.push(note);
    var jsonString = "jsonString" + noteIndex;
    jsonString = JSON.stringify(notesArray);
    localStorage.setItem("note", jsonString);
}

function saveBox() {
    // validation()
    if (validation() == true) {

        var dateBox = document.getElementById("dateBox");
        var timeBox = document.getElementById("timeBox");
        var textareaBox = document.getElementById("textareaBox");

        var date = dateBox.value;
        var time = timeBox.value;
        var textarea = textareaBox.value;

        var note = document.createElement("div");
        var thumbtack = document.createElement("img");
        var trashIcon = document.createElement("span");
        var newDate = document.createElement("div");
        var newText = document.createElement("div");

        note.className = "note";
        thumbtack.className = "thumbtack";
        trashIcon.className = "fa-trash-o";
        trashIcon.id = "trash" + trashIconIndex;
        thumbtack.src = "/assets/pic/thumbtack.png";
        newDate.className = "date";
        newText.className = "textArea";

        newDate.innerText = date + "\n" + time;
        newText.innerText = textarea;

        note.appendChild(thumbtack);
        note.appendChild(trashIcon);
        note.appendChild(newText);
        note.appendChild(newDate);

        document.body.appendChild(note);
        note.style.display = "block";
        noteIndex++;
        trashIconIndex++;
        saveNote(date, time, textarea, noteIndex, trashIconIndex);

    }
}

function validation() {

    var dateBox = document.getElementById("dateBox");
    var textareaBox = document.getElementById("textareaBox");
    var timeBox = document.getElementById("timeBox");

    var myDate = dateBox.value;
    var textarea = textareaBox.value;
    var theTime = timeBox.value;

    dateBox.style.border = "";
    timeBox.style.border = "";
    textareaBox.style.border = "";

    var dateChoosen = new Date(myDate);
    dateChoosen.setHours(00, 00, 00, 00);
    var todayDate = new Date();
    todayDate.setHours(00, 00, 00, 00);

    var currentTime = new Date();
    var timeObject = {
        year: currentTime.getFullYear(),
        month: currentTime.getMonth() + 1,
        day: currentTime.getDay() + 2
    };

    if (timeObject.month < 10) {
        timeObject.month = "0" + timeObject.month;
    }

    if (timeObject.day < 10) {
        timeObject.day = "0" + timeObject.day;
    }

    var timeObjectOrder = timeObject.year + "-" + timeObject.month + "-" + timeObject.day;

    var hourObject = {
        hour: currentTime.getHours(),
        minutes: currentTime.getMinutes()
    };

    if (hourObject.hour < 10) {
        hourObject.hour = "0" + hourObject.hour;
    }

    if (hourObject.minutes < 10) {
        hourObject.minutes = "0" + hourObject.minutes;
    }

    var hourObjectOrder = hourObject.hour + ":" + hourObject.minutes;

    if (myDate == "") {
        alert("date is empty!, choose date");
        dateBox.style.border = "3px solid red";
        return false;
    }

    if (dateChoosen < todayDate) {
        alert("choose future date!");
        dateBox.style.border = "3px solid red";
        return false;
    }

    if (theTime == "") {
        alert("choose time!")
        timeBox.style.border = "3px solid red";
        return false;
    }

    if (theTime < hourObjectOrder && timeObjectOrder == myDate) {
        alert("choose future time!")
        timeBox.style.border = "3px solid red";
        return false;
    }

    if (textarea == "") {
        alert("text area is empty!")
        textareaBox.style.border = "3px solid red";
        return false;

    }
    return true;
}

function formReset() {
    document.getElementById("form").reset();
}

function removeNote(trashIconIndex) {
    var str = trashIconIndex;
    var patt1 = /[0-9]/g;
    var result = str.match(patt1);
    var json = localStorage.getItem("note");
    notesArray = JSON.parse(json);
    for (var i = 0; i < notesArray.length; i++) {

        var noteNum = notesArray[i].noteId;
        var extractNoteNum = /[0-9]/g;
        var noteResult = noteNum.match(extractNoteNum);
        if (+result == +noteResult) {
            notesArray.splice(i, 1);
        }

    }
    var jsonString = JSON.stringify(notesArray);
    localStorage.setItem("note", jsonString);
}