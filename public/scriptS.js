var cards = ["card1.jpg", "card1.jpg", "card1.jpg", "card1.jpg", "card2.jpg", "card2.jpg", "card2.jpg", "card2.jpg", "card3.jpg", "card3.jpg", "card3.jpg", "card3.jpg", "card4.jpg", "card4.jpg", "card4.jpg", "card4.jpg", "card5.jpg", "card5.jpg", "card5.jpg", "card5.jpg", "card6.jpg", "card6.jpg", "card6.jpg", "card6.jpg", "card7.jpg", "card7.jpg", "card7.jpg", "card7.jpg", "card8.jpg", "card8.jpg", "card8.jpg", "card8.jpg", "card9.jpg", "card9.jpg", "card9.jpg", "card9.jpg", "card10.jpg", "card10.jpg", "card10.jpg", "card10.jpg", "poseidon.jpg", "poseidon.jpg", "poseidon.jpg", "Aphrodite.jpg", "Aphrodite.jpg", "Apollo.jpg", "Apollo.jpg", "Ares.jpg", "Ares.jpg", "Artemis.jpg", "Artemis.jpg", "Athena.jpg", "Athena.jpg", "Hermes.jpg", "Hermes.jpg", "ohera.jpg"];
var hand = [];

var numCards=56;
var mountO = 0;
var srcLong=""
var srcDel=[]
var delLen=0
var haveZeus=false;

giveCards(4);
fillImage();
$(document).ready(function(){
    var socket = io.connect("http://localhost:3000");
    $("img").click(function(){
        document.getElementById("mount").src = $(this).attr("src")
        //hand.splice(hand.indexOf(''))
        $(this).attr("src", "images/"+oneCard());
        srcLong=document.getElementById("mount").src
        srcDel=srcLong.split('/')
        cardValues(srcDel[(srcDel.length)-1])
        //e.preventDefault();
        socket.emit('new score', {
            number:mountO,
            card:srcDel[(srcDel.length)-1]
        });
        
    });
    socket.on('new score', function(data){
        mountO=data.number;
        document.getElementById("score").textContent= "Mount Olympus is: "+mountO
        document.getElementById("mount").src= "images/"+data.card;
    })
    socket.on('lose zeus', function(msg){
        alert(msg)
        haveZeus=false
        document.getElementById("zeus").src = "images/card1.jpg"
        //zeus is gone
    })
    socket.on('take zeus', function(wierd){
        alert(wierd)
        haveZeus=true
        document.getElementById("zeus").src = "images/zeus.png"
        //zeus is gone
    })
});


function cardValues(cardName){
    var takeZeus=false
    if(cardName=="card1.jpg"){
        mountO+=1;
    }
    else if(cardName=="card2.jpg"){
        mountO+=2
    }
    else if(cardName=="card3.jpg"){
        mountO+=3
    }
    else if(cardName=="card4.jpg"){
        mountO+=4
    }
    else if(cardName=="card5.jpg"){
        mountO+=5
    }
    else if(cardName=="card6.jpg"){
        mountO+=6
    }
    else if(cardName=="card7.jpg"){
        mountO+=7
    }
    else if(cardName=="card8.jpg"){
        mountO+=8
    }
    else if(cardName=="card9.jpg"){
        mountO+=9
    }
    else if(cardName=="card10.jpg"){
        mountO+=10
    }
    else if(cardName=="Ares.jpg"){
        mountO=50
    }
    else if(cardName=="Aphrodite.jpg"){
        var newnum=mountO%10
        if(newnum>=5){
            mountO=Math.ceil(mountO/10)*10
        }
        else{
            mountO=Math.floor(mountO/10)*10
        }
        takeZeus=true
        //mount is nearest multiple of 10
    }
    else if(cardName=="Apollo.jpg" || cardName=="Artemis.jpg"){
        takeZeus=true
    }
    else if(cardName=="Athena.jpg"){
        //skipPlayer
    }
    else if(cardName=="Hermes.jpg"){
        if(mountO>=100 || mountO==0){
            mountO=mountO
        }
        else{
            var splitNum=""+mountO
            var newChars=splitNum.split('');
            if(mountO<0){
                var firstNum=parseInt(newChars[2])*10
                var secondNum=parseInt(newChars[1])
                mountO=0-(firstNum+secondNum);
            }
            else{
                var firstNum=parseInt(newChars[1])*10
                var secondNum=parseInt(newChars[0])
                mountO=firstNum+secondNum;
            }
        }
        
        //reverse Number
    }
    else if(cardName=="ohera.jpg"){
        mountO=99
        takeZeus=true
    }
    else if(cardName=="poseidon.jpg"){
        mountO-=10
        takeZeus=true
    }
    else{
        mountO=mountO
    }
    zeusPos(takeZeus);
    
}
function zeusPos(takeZeus){
    if((takeZeus==true || mountO%10==0) && haveZeus==false){
        document.getElementById("zeus").src = "images/zeus.png"
        socket.emit('lose zeus', -1);
        haveZeus=true;
        
    }
}
function takeZeus(){
    return true;
}
function oneCard(){
    var randomNum=0;
    var newCard="";
    randomNum=getRandomInt(numCards)
    newCard=cards[randomNum];
    cards.splice(randomNum, 1)
    numCards-=1;
    return newCard
    
}
function giveCards(num){
    var randomNum=0;
    for(var i=0; i<num; i++){
        randomNum=getRandomInt(numCards);
        hand.push(cards[randomNum]);
        cards.splice(randomNum, 1);
        numCards-=1
    }
}
function fillImage(){
    //document.write(document.getElementById("img1").src)\
    var numString=""
    for(var x=0; x<hand.length; x++){
        numString=""+x
        document.getElementById("img"+numString).src = "images/"+hand[x]
    }
}
function getRandomInt(max){
    return Math.floor(Math.random() * Math.floor(max));
}