window.onload = function(){var clickId = 0;var ownerID = "pavanshah77@gmail.com";var arrayID = ['id1','id2','id3'];var inputFlag = 0;$('input').click(function() {switch( $(this).attr('id') ){case arrayID[0] : clickId = $(this).attr('id'); inputFlag = 1; break;case arrayID[1] : clickId = $(this).attr('id'); inputFlag = 1; break;case arrayID[2] : clickId = $(this).attr('id'); inputFlag = 1; break;}if(inputFlag = 1){inputFlag = 0;var http = new XMLHttpRequest();var params = JSON.stringify({ clickId: clickId , ownerID : ownerID});http.open("POST", 'http://localhost:6002/captureClick', true);http.setRequestHeader("Content-type", "application/json; charset=utf-8");http.setRequestHeader("Content-length", params.length);http.setRequestHeader("Connection", "close");http.send(params);}}); };