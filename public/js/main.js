var isAuto;
var fadeInTime, fadeOutTime;
var generatedIds = [];
var index = 0;
var IDS_TO_SAVE_ON_CLIENT = 50;

function fastFade() {fadeInTime = 250;fadeOutTime = 350;}
function slowFade() {fadeInTime = 750;fadeOutTime = 750;}

function getNewId() {
  $('#prevId').removeAttr('disabled');
  $('#nextId').attr('disabled', 'disabled');
  var selectedOption = $('input[@name=group1]:checked').val();
  try {
    $.post('/id', 
        {methodToCall: selectedOption}, 
        function(data) {
          var idObj = JSON.parse(data);
          generatedIds.push(idObj);
          if (generatedIds.length > IDS_TO_SAVE_ON_CLIENT) generatedIds.splice(0, 1);
          index = generatedIds.length - 1 <= 0 ? 0 : generatedIds.length - 1;
          updateGenIdOnPage(idObj);
      });
  }catch (err) {alert(err);}
}

function updateGenIdOnPage(idObj) {
  $('#imgId').fadeOut(fadeInTime, function() {
      var imgToUse = 'public/img/' + ((idObj.isAvailable == 'Yes') ? 'yes.png' : 'no.png');
      $('#imgId').attr('src', imgToUse);
      $('#imgId').fadeIn(fadeOutTime);
    });
  $('#generatedId').fadeOut(fadeInTime, function() {
    var fontSize = (idObj.id.length > 13) ? '15' : '20';
    var newId = '<font size=\"' + fontSize + '\"><b>';
    newId += (idObj.isAvailable == 'No') 
      ? "<a href=\"http://twitter.com/" + idObj.id + "\" target=\"_blank\">" + idObj.id + "</a>"
      : idObj.id;
    newId += '</b></font>';
    $('#generatedId').html(newId);
    $('#generatedId').fadeIn(fadeOutTime);
    autoUpdateId();
  });
}

var timer;
function autoUpdateId(length) {
  if (!isAuto) return;
  var length = $('#generatedId').text().length;
  var interval = (length >= 50) ? 3800 : 2800;
  timer = setTimeout(getNewId, interval);
}

function gotoAutoMode() {
  index = 0;
  slowFade();
  autoUpdateId();
  $('#toggleModeId').html('Manual Mode');
  $('#prevId').css('visibility', 'hidden');
  $('#nextId').css('visibility', 'hidden');
  $('#getId').css('visibility', 'hidden');
}

function gotoManualMode() {
  fastFade();
  clearInterval(timer);
  $('#toggleModeId').html('Auto Mode');
  $('#prevId').css('visibility', 'visible');
  $('#nextId').css('visibility', 'visible');
  $('#getId').css('visibility', 'visible');
}

function toggleMode() {
  isAuto = !isAuto;
  if (isAuto) {   //  Going to Auto mode
    gotoAutoMode();
  }else {         //  Going to Manual mode
    gotoManualMode();
  }
}

$(document).ready(function() {
  isAuto = true;
  slowFade();
  autoUpdateId();
});

function prevId() {
  var val = (index == 0) ? generatedIds[index] : generatedIds[--index];
  updateGenIdOnPage(val);
  if (index == 0) {
    index = 0;
    $('#prevId').attr('disabled', 'disabled');
  }
  $('#nextId').removeAttr('disabled');
}

function nextId() {
  var val = (index == generatedIds.length - 1) ? generatedIds[index] : generatedIds[++index];
  updateGenIdOnPage(val);
  if (index == generatedIds.length - 1) {
    index = generatedIds.length - 1;
    $('#nextId').attr('disabled', 'disabled');
  }
  $('#prevId').removeAttr('disabled');
}
