function toggleChatBox(){$("#chat-body-footer-wrapper").slideToggle()}
$(".bot-reply-clone").hide()
$(".user-query-clone").hide()
function hideBotModal(){$("#botModal").hide()}
$(document).on('click','.showBotModal',function(){$("#botModal .modal-body").find("img").attr('src',$(this).children('img').attr('src'))
$("#botModal .modal-title").html($(this).parent('p').siblings('p').html())
$("#botModal").show()})
$(document).on('click',"a[type='suggestion']",function(){userInput=$(this).attr('suggestion')
addUserQueryToChatBox(userInput)
requestServerForAnswer(userInput)})
var userId=null
var replyFromServer=false
var firstElementofUserQueryCreated=false
function addUserQueryToChatBox(userInput=false){if(!(userInput)){userInput=$("#user-query-input").val()}
let userQueryElement=$(".user-query-clone").clone(true).removeClass("user-query-clone")
if(!replyFromServer&&firstElementofUserQueryCreated){userQueryElement.find(".user-text p").clone(true).html(userInput).appendTo("#chat-body .user-query :last .user-text")}else{userQueryElement.find(".user-text p").css("margin-top","10px").html(userInput)
userQueryElement.appendTo("#chat-body").show()
replyFromServer=false
firstElementofUserQueryCreated=true}
$("#user-query-input").val('')
$("#chat-box .panel-body").scrollTop(1000000);return userInput}
function requestServerForAnswer(userInput){let url="https://khec.khwopachat.com/chatbot/"
let data={query:userInput,user:userId}
$.ajax({url:url,data:JSON.stringify(data),contentType:"application/json",method:'POST'}).done(function(response){addBotResponseToChatBox(response,userInput)
if(!userId){userId=response.user}}).fail(function(error){return false})}
function addBotResponseToChatBox(response,userQuery){let botReplyElement=$(".bot-reply-clone").clone(true).css("margin-top","20px").removeClass("bot-reply-clone")
let answer
if(response.suggestion&&response.suggestion!=userQuery.toLowerCase()){answer=`<p class='text-left text-muted'>Did you mean <strong class=text-primary><a type=suggestion suggestion="${response.suggestion}" href='javascript:void(0)'>${response.suggestion}</a></strong> ?</p><p>${response.answer}</p>`}else{if(!response.found){answer=`<p class='text-danger'>${response.answer}</p>`}else{answer=`<p>${response.answer}</p>`}}
if(response.image){answer+=`<p><a class='showBotModal' href='#'><img src=${response.image} height=60></a></p>`}
if(response.link){answer+=`<p>More details <a target=_blank href=${response.link}>here</a>.</p>`}
botReplyElement.find(".bot-text div").html(answer)
botReplyElement.appendTo("#chat-body").show()
replyFromServer=true
firstElementofUserQueryCreated=false
$("#chat-box .panel-body").animate({scrollTop:1000000},"slow")}
$("#chat-form").submit(function(event){event.preventDefault()
let userInput=addUserQueryToChatBox()
requestServerForAnswer(userInput)})