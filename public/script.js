



//GET CURRENT URL
function throwUrl(){
    let currentUrl = window.location.href;
    if( currentUrl.indexOf('?') == -1 ){
        return currentUrl.replace('http://localhost:3020/blogs/', '')
    }
    let qsLoc   = currentUrl.indexOf('?');
    let url     = currentUrl.slice( 0, qsLoc ).replace('http://localhost:3020/blogs/', '')
    return url;
}
//CREATE COMMENT BOX
function fetchComments(){
    $.get(`/blogs/api/${throwUrl()}/comment`,
    comment => {
           comment.comments.map(data => {
            $('.comment_section').append(
            `<article class="_comment d-flex my-2 px-3 py-2">
                <img class="user-thumb align-self-center" src="${data.thumb || 'https://images.unsplash.com/photo-1536697246787-1f7ae568d89a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60'}" alt="">
                <div class="mx-3">
                    <span class="name hi">${data.user.username}</span><span class="_name">&nbsp;<strong>&middot;</strong>&nbsp; ${data.date}</span>
                    <p class="mb-1">${data.body}</p>
                    <small class='d-block text-white py-1'>
                        <a class="text-secondary" href="">Reply</a>
                        &nbsp;|&nbsp;
                        <a class="text-secondary" href="">Edit</a>
                        &nbsp;|&nbsp;
                        <a class="delComment text-secondary" href="/blogs/api/${throwUrl()}/comment/${data._id}">Delete</a>
                    </small>
                </div>
            </article>`)
        })
    });
}
    function deleteCommentRow(e){
        e.preventDefault();
        $.ajax({
            method : 'DELETE',
            url    : $('.delComment').attr('href')
        })
        .done(() => $(this).parent().parent().parent().remove())
    }
$(document).ready(function(){
//FETCH COMMENT UPON LOADING
fetchComments()
$('#commentForm').submit(function(event){
    event.preventDefault();
$.post(
    `/blogs/api/${ throwUrl() }/comment`,
    { text: $("#bodyText").val() },
    // TODO AFTER THE REQUEST WAS SENT
    () => {
        $("#bodyText").val('');
        fetchComments()
        return
    }
)})
$('#deleteBlog').click(function(e){
     e.preventDefault();
     $.ajax({
         method : 'DELETE',
         url    : $(this).prop('href')
     }).done(() => {
        window.location.href="http://localhost:3020/"
        })
});

$('.comment_section').on('click', '.delComment', deleteCommentRow);

//END OF JQUERY FUNCTION
});