class Worker {
    constructor(id, name, rewards, active) {
        this.id = id;
        this.name = name;
        this.rewards = rewards;
        this.active = active;
    }
}

class Workers {
    constructor() {
        this.workers = [];
    }

    initWorkers() {
        this.addWorker(new Worker(1, "Paul", 0, true));
        this.addWorker(new Worker(2, "John", 0, true));
        this.addWorker(new Worker(3, "Ringo", 0, true));
    }

    addWorker(newWorker){
        this.workers.push(newWorker);
    }
}

class Block {
    constructor(nonce, index, timestamp, data, previousHash = ''){
        this.nonce = nonce;
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash(nonce);
    }

    calculateHash(nonce){
        return Sha256.hash(this.nonce + this.index + this.timestamp + JSON.stringify(this.data).toString() + this.previousHash)
    }
}

class Blockchain {
    constructor() {
        this.chain = [];
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        this.chain.push(newBlock)
    }

    displayLatest() {
        
    }

}

function displayDetails(workers, chain) {
    workers.forEach(worker => {
        let rewardsSpan = document.getElementById("rewardsSpan" + worker.id.toString());
        rewardsSpan.textContent = worker.rewards + " SDC";
    })
}

function updateWorkerStatus(message) {
    myWorkers.workers.forEach(function(worker){
        let updateField = document.getElementById("status" + worker.id.toString());
        updateField.textContent = message;
        return true;
    })
}

function doWork(data) {
    if (sdeaghCoin.chain.length < 1 ) {
        var newIndex = 1;
        var prevHash = "0";
    } else {
        var newIndex = sdeaghCoin.getLatestBlock().index + 1;
        var prevHash = sdeaghCoin.getLatestBlock().hash;
    }
    const timestamp = Date();
    const dataToAdd = data;
    let foundHash = false;
    let nonce = 0;
    while (!foundHash) {
        let perhapsGoodBlock = new Block(nonce, newIndex, timestamp, dataToAdd, prevHash);
        if (perhapsGoodBlock.hash.substring(0,4) === "00f0") {
            sdeaghCoin.addBlock(perhapsGoodBlock);
            foundHash=true;
        } else {
            nonce++;
        }
    }
}

function toggleLoaders(){
    const loaders = document.querySelectorAll(".loader");
    loaders.forEach(function(loader){
        loader.classList.toggle("hidden");
    })
}

function calculateWinner(){
    const messageFld1 = document.getElementById("status1");
    const messageFld2 = document.getElementById("status2");
    const messageFld3 = document.getElementById("status3");
    const tick1 = document.getElementById("tick1");
    const tick2 = document.getElementById("tick2");
    const tick3 = document.getElementById("tick3");
    tick1.classList.add("hidden");
    tick2.classList.add("hidden");
    tick3.classList.add("hidden");
    const randomNumber = Math.floor(Math.random() * 100);
    const reward = Math.floor((Math.random() * 6) + 1);
    if (randomNumber < 60) {
        messageFld1.textContent = "Success! Block reward is " + reward + " SDC";
        tick1.classList.toggle("hidden");
        myWorkers.workers[0].rewards += reward
    } else if (randomNumber >= 60 && randomNumber < 90) {
        messageFld3.textContent = "Yay! Found the nonce, block reward is " + reward + " SDC";
        tick3.classList.toggle("hidden");
        myWorkers.workers[2].rewards += reward
    } else {
        messageFld2.textContent = "Yay! Found the nonce, block reward is " + reward + " SDC";
        tick2.classList.toggle("hidden");
        myWorkers.workers[1].rewards += reward
    }
    displayDetails(myWorkers.workers, sdeaghCoin.chain );
}

function startTime() {
    var today = new Date();

    document.getElementById('currentDateTime').innerHTML = today.toUTCString();
    var t = setTimeout(startTime, 500);
}

/* Initialise workers and BlockChain */
var myWorkers = new Workers;
var sdeaghCoin = new Blockchain;
myWorkers.initWorkers();
displayDetails(myWorkers.workers, sdeaghCoin);
startTime();

//initialise listener
const generateBtn = document.getElementById("generateButton");
generateBtn.addEventListener("click", function(){

    const ticks = document.querySelectorAll(".tick");
    ticks.forEach(function(tick){
        tick.classList.add("hidden");
    })
    updateWorkerStatus("Working.....");
    toggleLoaders();

    setTimeout(function() {
        doWork({from: "Brian", to: "Jo", amount: 30});
        updateWorkerStatus("Waiting for next job");
        toggleLoaders();
        calculateWinner();
    }, 2000)

    

})





