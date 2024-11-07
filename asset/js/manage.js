/*
 * Copyright (c) molikai-work (2024)
 * molikai-work 的特定修改和新增部分
 * 根据 MIT 许可证发布
 */

$(document).ready(function() {
    $('#operation').change(function() {
        const operation = $(this).val();
        $('#newUrlGroup, #newSlugGroup, #newPasswordGroup, #proxyUrlTip').hide();
        if (operation === 'update-url') {
            $('#newUrlGroup').show()
        } else if (operation === 'update-slug') {
            $('#newSlugGroup').show()
        } else if (operation === 'toggle-status') {
            $('#proxyUrlTip').show()
        } else if (operation === 'update-password') {
            $('#newPasswordGroup').show()
        }
    });
    $('#apiForm').submit(async function(event) {
        event.preventDefault();
        const turnstileToken = $('[name="cf-turnstile-response"]').val();
        const submitButton = $('#submit');
        submitButton.prop('disabled', true);
        const operation = $('#operation').val();
        const slug = $('#slug').val();
        const password = $('#password').val();
        const newUrl = $('#newUrl').val();
        const newSlug = $('#newSlug').val();
        const newPassword = $('#newPassword').val();
        if (!slug) {
            $('#result').html(`<div class="errorAlert"role="alert">请填写你要管理的 Slug</div>`);
            submitButton.prop('disabled', false);
            return
        }
        const requestData = {
            operation,
            slug,
            password,
            turnstileToken
        };
        if (operation === 'update-url') {
            requestData.newUrl = newUrl
        } else if (operation === 'update-slug') {
            requestData.newSlug = newSlug
        } else if (operation === 'update-password') {
            requestData.newPassword = newPassword
        }
        try {
            const response = await $.ajax({
                url: '/manage',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(requestData),
                dataType: 'json'
            });
            $('#result').html(`<div class="alert"role="alert">${response.message}</div>`)
        } catch (error) {
            $('#result').html(`<div class="errorAlert"role="alert">${error.responseJSON.message}</div>`)
        } finally {
            submitButton.prop('disabled', false)
        }
    })
});
