$(document).ready(function() {
    const fee_factor = 3;
    const url = "https://script.google.com/macros/s/AKfycbxC09gDkyhKycuz3gPd9-h9TA1Fx90fF-xk74zm7exppGrZVDfHcmTNPfZQqzKDjXpdFA/exec";

    $("#create_room_btn").click(function() {
        createRoom();
    })

    $("#create_btn").click(function() {
        let room_id = generateRoomId();
        $("#room_id").val(room_id);
        $(".overlay").toggleClass("hidden");
        $("#create_div").toggleClass("hidden");
    })

    $("#join_btn").click(function() {
        $(".overlay").toggleClass("hidden");
        $("#join_div").toggleClass("hidden");
    })
    
    $("#design").click(function() {
        $("#submit").click();
        changeDesign();
    })

    function createRoom() {
        let room_id = $("#room_id").val();
        let name = $("#name").val();
        let round = $("#round").val();
        let price = $("#price").val();
        let allocation = $("#allocation").val();
        let otc_price = $("#otc_price").val();
        let keyword = $("#keyword").val();
        $(".overlay").toggleClass("hidden");
        $("#create_div").toggleClass("hidden");
        alert("Room has been created!");
    }



    $(".closer").click(function() {
        this.parentElement.parentElement.classList.add('hidden');
    })

    function calculateFee(all, price) {
        let total_allo = parseInt(all) * parseInt(price);
        let fee = total_allo * fee_factor / 100;
        return fee;
    }

    function joinRoom(data) {
        $("#otc_room_id")[0].innerText = data.result[0];
        let values = $('.value');
        values[0].innerText = data.result[1];
        values[1].innerText = data.result[2];
        values[2].innerText = data.result[3];
        values[3].innerText = data.result[4];
        values[4].innerText = data.result[5];
        values[5].innerText = calculateFee(data.result[4], data.result[5]);
        
        $(".overlay").toggleClass("hidden");
        $("#join_div").toggleClass("hidden");
        $("#room").toggleClass("hidden");
        alert("succesfully joined!");
    }

    function changeDesign() {
        let design = $('body')[0].classList[0];
        let index = parseInt(design.split('-')[1]);
        index = index == 3 ? 0 : ++index;
        $('body').removeClass(design);
        $('body').addClass(`gradient-${index}`);
    }

    var RoomIds = []; // !! array of existing room ids coming from google sheets

    function generateRoomId(length = 5) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        result = "Wee" + result;
        if (!RoomIds.includes(result)) { 
            return result;
        }
        generateRoomId(); 
    }

    $("#join_form")[0].addEventListener("submit", function (event) {
        event.preventDefault();
      
        // Get form data
        var form = event.target;
        var formData = new FormData(form);
      
        // Send data to App Script
        fetch(url + "?" + new URLSearchParams(formData))
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log(data);
            if(data == false) {
                alert("False");
            }
            else {
                joinRoom(data);
            }
            
          })
          .catch(function (error) {
            // Handle errors
            console.error(error);
          });
      });
      




    function write_in_google_sheets() {
        document.getElementById('rooms_form').action = url;
    }

    write_in_google_sheets();

    function saveUserInfo(user) {
        console.log(user);
    }


    function showProgress(percent = 10) {
        $(".num")[0].innerText = percent;
        let item = $(".block")[0];
        let numElement = item.querySelector('.num');
        let num = parseInt(numElement.innerText);
        let count = 0;
        let time = 2000 / num;
        let circle = item.querySelector('.circle');
        setInterval(() => {
            if(count == num){
                clearInterval();
            } 
            else {
                count += 1;
                numElement.innerText = count;
            }
        }, time)
        circle.style.strokeDashoffset = 503 - ( 503 * ( num / 100 ));
        let dots = item.querySelector('.dots');
        dots.style.transform = `rotate(${360 * (num / 100)}deg)`;
        if(num == 100){
            dots.style.opacity = 0;
        }
    }
    showProgress();

    $(".tg-btn").append(`<script async src="https://telegram.org/js/telegram-widget.js?22" data-telegram-login="weeotc_bot" data-size="medium" data-userpic="false" data-onauth="onTelegramAuth(user)"></script>`);

    // user auth with telegram
    function onTelegramAuth(user) {
        displayUserInfo(user);
        alert('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')');
    }

    function displayUserInfo(user) {
        $("#username")[0].innerText = user.first_name;
        $(".tg-btn").toggleClass('hidden');
        $(".user-info").toggleClass('hidden');
    }


});