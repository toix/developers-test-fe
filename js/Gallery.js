import {make_xhr} from "./ServerComm";

/**
 * initialize thumbnail gallery with clickable images and comments
 * @param {HTMLElement} gallery
 */
export function initialize(gallery) {
    let get_images = make_xhr('https://boiling-refuge-66454.herokuapp.com/images');
    get_images.then((images) => {
        // for (const [idx, image] of Object.entries(images)) {
        for (const [idx, image] of images.entries()) {
            const image_div = get_image_element(gallery, image.id, image.url);
            gallery.appendChild(image_div);
            image_div.querySelector('img').addEventListener('click', (event) => {
                show_image_dialog(event.currentTarget, image.id);
            });
        }
    // }, (error) => {
    //     console.log(error);
    });
}

/**
 * add an image to the gallery
 * @param {HTMLElement} gallery
 * @param {int} id
 * @param {string} url
 * @return {HTMLElement}
 */
export function get_image_element(gallery, id, url) {
    let image_div = document.createElement('div');
    image_div.className = 'gallery-image col-sm-6 col-md-4';
    image_div.innerHTML = `<img src="${url}" data-id="${id}" alt="image ${id}" class="img-thumbnail img-fluid m-1">`;
    return image_div;
}

/**
 * open image dialog with comments feature
 * @param {HTMLElement} image_div
 * @param {int} id
 */
export function show_image_dialog(image_div, id) {
    let get_img_and_comment = make_xhr('https://boiling-refuge-66454.herokuapp.com/images/'+ id);
    get_img_and_comment.then((image) => {
        let modal_content = '<div class="row">';
        modal_content += `<div class="col-lg-7 mb-2">
                            <img src="${image.url}" data-id="${image.id}" alt="image ${image.id}" class="img-fluid w-100">
                          </div>`;
        for (const [idx, comment] of image.comments.entries()) {
            const date = new Date(comment.date).toLocaleString();
            modal_content +=
                `<div class="col-lg-5 px-4 px-md-3">
                  <div class="text-muted">${date}</div>
                  <div class="">${comment.text}</div>
                </div>`;
        }

        modal_content += `<div class="col-lg-7 px-4 px-md-3"><div class="form-group mt-2">
                            <input id="name-${id}" title="name" placeholder="Your name" class="form-control gallery-name">
                            </div>
                            <div class="form-group">
                              <textarea id="comment-${id}" placeholder="Comment here" class="form-control gallery-comment" rows="3"></textarea>
                            </div>
                            <button type="button" class="btn btn-primary btn-block gallery-add-comment">Add Comment</button>
                          </div>`;
        modal_content += '</div>';
        const modal = show_modal(modal_content);

        modal.querySelector('.gallery-add-comment').addEventListener('click', (event) => {
            const comment = event.currentTarget.closest('.modal-content').querySelector('.gallery-comment').value;
            const data = {
                name: 'my_name',
                comment: comment,
            };
            make_xhr('https://boiling-refuge-66454.herokuapp.com/images/'+ id +'/comments', data, 'post');
        });
    });
}

/**
 * show bootstrap modal with given content
 * @param {HTMLElement} content
 * @return {HTMLElement}
 */
export function show_modal(content) {
    let dialog = document.querySelector('.templates>.gallery-modal').cloneNode(true);
    dialog.querySelector('.modal-body').innerHTML = content;
    return $(dialog).modal('show')[0];
}