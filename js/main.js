$(document).ready(function() {

    
    $("#create_room_btn").click(function() {
        createRoom();
    })

    $("#join_room_btn").click(function() {
        joinRoom();
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

    function joinRoom() {
        let room_id = $("#join_room_id").val();
        let keyword = $("#join_keyword").val();
        console.log(room_id, keyword);
        $(".overlay").toggleClass("hidden");
        $("#join_div").toggleClass("hidden");
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
});