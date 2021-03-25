// Shorthand for $( document ).ready()
$(function() {
    let userProfile = localStorage.getItem("userprofile");

    if (userProfile === null) {
        console.log("user profile null");
        userProfile =  Object.create( {} );
    }
    else {
        userProfile = JSON.parse(userProfile);
    }

    console.log(userProfile);

    $(".js-getjson").click(function(){
        console.log('requet');
        $.ajax({
            url: "http://demo9942192.mockable.io/result", 
            success: function(result){
                console.log(result);
                $("#display-json").html(
                    JSON.stringify(result, null, 4)
                    );
            }
        });
    });

    // Collect persona
    $(".js-chart-maturity .bar").click(function(event){
        event.stopImmediatePropagation();

        let maturity = $(this).attr("data");
        $(".js-chart-maturity .bar").removeClass("selected");
        $(this).addClass("selected");
        userProfile.maturity = maturity;
        

        localStorage.setItem("userprofile", 
                                JSON.stringify(userProfile));
        
        console.log(userProfile);
    });

    // Collect user info
    $(".js-next-pre").click(function(event){
        event.stopImmediatePropagation();

        let isValid = false;
        let profile = {};

        profile.name = $("#name").val();
        profile.position = $("#position").val();
        profile.department = $("#department").val();
        profile.company = $("#company").val();
        profile.industry = $("#industry").val();

        userProfile.profile = profile;

        localStorage.setItem("userprofile", 
                                JSON.stringify(userProfile));

        console.log(userProfile);

        setTimeout(function() {
            window.location.href = "https://rise-global.typeform.com/to/QshGju14";
        }, 500);
    });


    // Display User profile on REPORT
    if($('#js-report-userprofile').length){
        console.log("profile");

        $("#name").html(userProfile.profile.name);
        $("#position").html(userProfile.profile.position);
        $("#department").html(userProfile.profile.department);
        $("#company").html(userProfile.profile.company);
        $("#industry").html(userProfile.profile.industry);
    }

    // Import to report
    if($('#page-report').length){
        console.log('report!');

        var bellscore = Math.floor(Math.random() * 100);

        $(".js-your-bellscore").css("left", bellscore)

        $.ajax({
            url: "http://demo9942192.mockable.io/result",
            success: function(result){
                // $("#display-json").html(
                //     JSON.stringify(result, null, 4)
                //     );
                console.log(result);
                let gdrive = "https://drive.google.com/uc?id=";
                let matureHero = result.maturity.image_id;
                let sixFactors = result.sixfactors.image_id;
                let typeInnovation = result.typeinnovation.image_id;
                let detailScore = result.detailscore.image_id;

                $("#report-mature-hero").attr("src",`${gdrive}${matureHero}`);
                $("#report-six-factors").attr("src",`${gdrive}${sixFactors}`);
                $("#report-type-innovation").attr("src",`${gdrive}${typeInnovation}`);
                $("#report-detail-score").attr("src",`${gdrive}${detailScore}`);
            }
        });
    }
});