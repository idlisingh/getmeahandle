var isAuto;
var fadeInTime, fadeOutTime;
var generatedIds = [];
var index = 0;

function fastFade() {fadeInTime = 250;fadeOutTime = 350;}
function slowFade() {fadeInTime = 750;fadeOutTime = 750;}

function getNewId() {
  try{
    $('#prevId').removeAttr('disabled');
    $('#nextId').attr('disabled', 'disabled');
  }catch (err) { alert(err)}
  $.get('/id', function(data) {
      var idObj = JSON.parse(data);
      generatedIds.push(idObj);
      index = generatedIds.length - 1 <= 0 ? 0 : generatedIds.length - 1;
      updateGenIdOnPage(idObj);
  });
}
var i = 0;
function updateGenIdOnPage(idObj) {
  $('#imgId').fadeOut(fadeInTime, function() {
      var imgToUse = 'public/img/' + ((idObj.isAvailable == 'Yes') ? 'yes.png' : 'no.png');
      $('#imgId').attr('src', imgToUse);
      $('#imgId').fadeIn(fadeOutTime);
    });
  $('#generatedId').fadeOut(fadeInTime, function() {
    $('#generatedId').html(idObj.id);
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
  $('#toggleModeId').html('Auto Mode');
  $('#prevId').css('visibility', 'hidden');
  $('#nextId').css('visibility', 'hidden');
  $('#getId').css('visibility', 'hidden');
}

function gotoManualMode() {
  fastFade();
  clearInterval(timer);
  $('#toggleModeId').html('Manual Mode');
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
  generatedIds.push($('#generatedId').text());
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