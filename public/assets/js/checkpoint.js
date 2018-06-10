$(document).ready(function () {
    $('body').on('click', '.editButton', function (e) {
        const id = $(this).attr('data-id');
        const typeContainer = $('#cp-type-' + id);
        const messageContainer = $('#cp-message-' + id);
        const buttonContainer = $('#cp-button-' + id);
        const type = typeContainer.text().toLowerCase();
        const message = messageContainer.text();
        const typeEdit = $(`<select class="form-control" name="checkpointTypeEdit-${id}" id="checkpointTypeEdit-${id}" val="${type}">
            <option val="message">Message</option>
            <option val="height">Height</option>
            <option val="weight">Weight</option>
            <option val="age">Age</option>
            <option val="other">Other</option>
        </select>`);
        const messageEdit = $(`<textarea class="form-control" name="checkpointValueEdit-${id}" id="checkpointValueEdit-${id}">${message}</textarea>`)
        const saveButton = $(`<button type="button" class='btn btn-success m-3 saveButton' data-id=${id}>Save</button>`)
        const deleteButton = $(`<button type="button" class='btn btn-danger deleteButton' data-id=${id}>Delete</button>`)
        typeContainer.html(typeEdit);
        messageContainer.html(messageEdit);
        buttonContainer.html(saveButton);
        buttonContainer.append(deleteButton);
    });
    $('body').on('click', '.saveButton', function (e) {
        const id = $(this).attr('data-id');
        const typeContainer = $('#cp-type-' + id);
        const messageContainer = $('#cp-message-' + id);
        const buttonContainer = $('#cp-button-' + id);
        const type = $('#checkpointTypeEdit-' + id).val();
        const message = $('#checkpointValueEdit-' + id).val();
        const editButton = $(`<button type="button" class='btn btn-info m-3 editButton' data-id=${id}>Edit</button>`)
        typeContainer.html(type);
        messageContainer.html(message);
        buttonContainer.html(editButton);
        $.ajax({
            url: '/api/checkpoint',
            type: 'PUT',
            data: {
                checkpointType: type,
                checkpointValue: message,
                id: id
            }
        })
    });
    $('body').on('click', '.deleteButton', function (e) {
        const id = $(this).attr('data-id');
        $(this).parent().parent().remove();
        $.ajax({
            url: '/api/checkpoint',
            type: 'DELETE',
            data: {
                id: id
            }
        })
    });
});