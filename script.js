// -----------------------------
// VERİLER
// -----------------------------
const books = {
    "Mathematics": ["MEB Yayınları", "Denizli Yayınları"],
    "English": ["Workbook", "StudentBook"],
    "Chemistry": ["Aydın Yayınları", "MEB Yayınları"],
    "Physics": ["MEB Yayınları", "Palme Yayınları"],
    "Geography": ["MEB Yayınları"],
    "Din": ["MEB Yayınları", "X Yayınları"],
    "History": ["MEB Yayınları", "Palme Yayınları"],
    "Biology": ["MEB Yayınları", "Ankara Yayıncılık"]
};

const notebooks = ["Math Notebook", "English Notebook", "Chemistry Notebook", "Physics Notebook", "Geography Notebook", "Din Notebook", "History Notebook", "Biology Notebook"];

const homeworkTasks = [
    {name:"Math Assignment", due: new Date(Date.now() + 2*24*60*60*1000)},
    {name:"English Essay", due: new Date(Date.now() + 5*24*60*60*1000)},
    {name:"Chemistry Lab", due: new Date(Date.now() + 1*24*60*60*1000)}
];

// -----------------------------
// GİRİŞ & ANA EKRAN
// -----------------------------
function login() {
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("homeScreen").style.display = "block";
}

function openLightBag() {
    document.getElementById("homeScreen").style.display = "none";
    document.getElementById("lightBagScreen").style.display = "block";
    populateToday();
    populateBackpack();
    populateSuggestions();
    populateTomorrow();
    populateHomework();
}

function goHome() {
    document.getElementById("lightBagScreen").style.display = "none";
    document.getElementById("homeScreen").style.display = "block";
}

function fakeApp() {
    alert("This app is not available yet.");
}

// -----------------------------
// SEKME SİSTEMİ
// -----------------------------
function showTab(tabName) {
    const tabs = ['today', 'backpack', 'suggestions', 'tomorrow', 'homework'];
    tabs.forEach(tab => {
        document.getElementById(tab).style.display = (tab === tabName) ? 'block' : 'none';
    });

    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    if(tabName==='today') buttons[0].classList.add('active');
    else if(tabName==='backpack') buttons[1].classList.add('active');
    else if(tabName==='suggestions') buttons[2].classList.add('active');
    else if(tabName==='tomorrow') buttons[3].classList.add('active');
    else if(tabName==='homework') buttons[4].classList.add('active');
}

// -----------------------------
// RANDOM KITAP/DERS SECİMİ
// -----------------------------
function getRandomItem(arr) {
    return arr[Math.floor(Math.random()*arr.length)];
}

// -----------------------------
// TODAY SEKMESİ
// -----------------------------
function populateToday() {
    const ul = document.getElementById("todayList");
    ul.innerHTML = "";
    for(let subject in books){
        let book = getRandomItem(books[subject]);
        let notebook = getRandomItem(notebooks.filter(n => n.startsWith(subject)));
        ul.innerHTML += `<li>${subject} – ${book} + ${notebook}</li>`;
    }
}

// -----------------------------
// BACKPACK SEKMESİ
// -----------------------------
function populateBackpack() {
    const ul = document.getElementById("backpackList");
    ul.innerHTML = "";
    let total = 0;
    for(let subject in books){
        let book = getRandomItem(books[subject]);
        let notebook = getRandomItem(notebooks.filter(n => n.startsWith(subject)));
        let bookWeight = (Math.random()*1 + 0.5).toFixed(1);
        let notebookWeight = 0.5;
        total += parseFloat(bookWeight)+notebookWeight;

        ul.innerHTML += `<li>${subject}: ${book} (${bookWeight}kg) + ${notebook} (${notebookWeight}kg) <button onclick="removeItem(this)" class="remove-btn">Remove</button></li>`;
    }
    document.getElementById("totalWeight").innerText = "Total Weight: "+total.toFixed(1)+" kg";
}

function removeItem(btn) {
    let li = btn.parentElement;
    li.remove();
    let listItems = document.querySelectorAll('#backpackList li');
    let total = 0;
    listItems.forEach(item => {
        let weights = item.innerText.match(/([\d.]+)\s?kg/g);
        if(weights){
            weights.forEach(w => total+=parseFloat(w));
        }
    });
    document.getElementById('totalWeight').innerText = "Total Weight: "+total.toFixed(1)+" kg";
}

// -----------------------------
// SUGGESTIONS SEKMESİ
// -----------------------------
function populateSuggestions() {
    const ul = document.getElementById("suggestList");
    ul.innerHTML = "";
    ul.innerHTML += "<li>Consider leaving heavy books at home</li>";
    ul.innerHTML += "<li>Use digital notes for some subjects</li>";
}

// -----------------------------
// TOMORROW SEKMESİ
// -----------------------------
function populateTomorrow() {
    const ul = document.getElementById("tomorrowList");
    ul.innerHTML = "";
    for(let subject in books){
        let book = getRandomItem(books[subject]);
        let notebook = getRandomItem(notebooks.filter(n => n.startsWith(subject)));
        ul.innerHTML += `<li>${subject} – ${book} + ${notebook}</li>`;
    }
}

// -----------------------------
// HOMEWORK SEKMESİ
// -----------------------------
function populateHomework() {
    const ul = document.getElementById("homeworkList");
    ul.innerHTML = "";
    homeworkTasks.forEach((task,i)=>{
        ul.innerHTML += `<li>${task.name} – <span id="hw${i}"></span></li>`;
    });
    updateHomeworkTimers();
}

function updateHomeworkTimers() {
    homeworkTasks.forEach((task,i)=>{
        const span = document.getElementById("hw"+i);
        let now = new Date();
        let diff = task.due - now;
        if(diff<=0){
            span.innerText = "Deadline passed";
            span.style.color = "red";
        } else {
            let days = Math.floor(diff/(1000*60*60*24));
            let hours = Math.floor((diff%(1000*60*60*24))/(1000*60*60));
            let minutes = Math.floor((diff%(1000*60*60))/(1000*60));
            span.innerText = `${days}d ${hours}h ${minutes}m left`;
            span.style.color = "black";
        }
    });
    setTimeout(updateHomeworkTimers, 60000);
}
