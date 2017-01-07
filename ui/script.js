  $(document).ready(function() {
    $('select').material_select();

    //defining all the variables
    var deployment_preloader = $("#deployment_preloader");
    var deployment_done_icon = $("#deployment_done");
    var active_preloader = $("#active_preloader");
    var active_done_icon = $("#active_done");
    var compile_count_preloader = $("#compile_count_preloader");
    var compile_count = $("#compile_count");

    var code_api_key_input = $("#code_api_key");
    var code_language_select = $("#code_language");
    var code_code_area = $("#code_code");
    var code_input_area = $("#code_input");
    var executeButton = $("#execute_button");
    var code_indeterminate = $("#code_indeterminate");
    var code_output = $("#code_output");

    var sandbox_url = $("#sandbox_url");
    var sandox_json = $("#sandox_json");
    var flyButton = $("#fly_button");
    var sandbox_indeterminate = $("#sandbox_indeterminate");
    var sandbox_output = $("#sandbox_output");

    //Initial Setup
    //Hide all value, showing only preloader
    deployment_done_icon.hide();
    active_done_icon.hide();
    compile_count.hide();
    code_output.hide();
    code_indeterminate.hide();
    sandbox_output.hide();
    sandbox_indeterminate.hide();

    //Send AJAX req to get deploment check
    $.ajax({
      url: "http://localhost:2200/api/v1/deployment",
      dataType: "json",
      method: 'POST',
      beforeSend: function() {
        deployment_done_icon.hide();
        deployment_preloader.show();
      },
      success: function(jsonData) {
        if(jsonData['statusCode'] == '200') {
          deployment_done_icon.show();
          deployment_preloader.hide();
        }else {
          //TODO: Implement Error
        }
      },
      error: function(errorMessage) {
        console.log(errorMessage);
        window.alert("Something wrong with deploment");
      }
    });

    //Send AJAX req to get Active Status check
    $.ajax({
      url: "http://localhost:2200/api/v1/active",
      dataType: "json",
      method: 'POST',
      beforeSend: function() {
        active_done_icon.hide();
        active_preloader.show();
      },
      success: function(jsonData) {
        if(jsonData['statusCode'] == '200') {
          active_done_icon.show();
          active_preloader.hide();
        }else {
          //TODO: Implement Error
        }
      },
      error: function(errorMessage) {
        console.log(errorMessage);
        window.alert("Something wrong with active check");
      }
    });

    //Send AJAX req to get Code Compile Status
    $.ajax({
      url: "http://localhost:2200/api/v1/count",
      dataType: "json",
      method: 'POST',
      beforeSend: function() {
        compile_count.hide();
        compile_count_preloader.show();
      },
      success: function(jsonData) {
        if(jsonData['statusCode'] == '200') {
          compile_count.show();
          compile_count.text(jsonData['total']);
          compile_count_preloader.hide();
        }else {
          //TODO: Implement Error
        }
      },
      error: function(errorMessage) {
        console.log(errorMessage);
        window.alert("Something wrong with counter");
      }
    });


    executeButton.click(function() {
        var api_key = code_api_key_input.val();
        var code = code_code_area.val();
        var input = code_input_area.val();
        var selected = code_language_select.val();

        if(!selected) {
          window.alert("Please select a Language");
          return
        }

        $.ajax({
          method: 'POST',
          url: 'http://localhost:2200/api/v1/code',
          dataType: "json",
          data: {
            'api-key': api_key,
            'code': code,
            'input': input,
            'language': selected
          },
          beforeSend: function(){
            code_output.hide();
            code_indeterminate.show();
          },
          success: function(jsonData) {
            code_indeterminate.hide();
            code_output.show();
            if(jsonData['statusCode'] == '200') {
              code_output.html("<pre>" + (jsonData['output']) + "<pre>");
            }else{
              code_output.html("<p class=\"red-text text-darken-3\">" + (jsonData['errorMsg']).replace(/\n/g, "<br />") + "</p>")
            }
          },
          error: function(errorMessage) {
            console.log(errorMessage);
            window.alert("Something Went Wrong while compile code");
          }
        });
    });

    flyButton.click(function() {
        var uri = sandbox_url.val();
        var jsonData = sandox_json.val();

        try {
          jsonData = JSON.parse(jsonData);
        }catch(e) {
          window.alert("Enter Valid JSON Data");
          console.log(e);
        }

        $.ajax({
          method: 'POST',
          url: uri,
          dataType: "json",
          data: jsonData,
          beforeSend: function(){
            sandbox_output.hide();
            sandbox_indeterminate.show();
          },
          success: function(jsonData) {
            sandbox_indeterminate.hide();
            sandbox_output.show();
            if(jsonData['statusCode'] == '200') {
              sandbox_output.html("<pre>" + (jsonData['output']) + "<pre>");
            }else{
              sandbox_output.html("<p class=\"red-text text-darken-3\">" + (jsonData['errorMsg']).replace(/\n/g, "<br />") + "</p>")
            }
          },
          error: function(errorMessage) {
            console.log(errorMessage);
            window.alert("Something Went Wrong in Sandbox");
          }

        });
                
        
    });

  });