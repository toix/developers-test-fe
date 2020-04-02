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
            const image_div = add_image(gallery, image.id, image.url);
            image_div.querySelector('img').addEventListener('click', (event) => {
                show_image(event.currentTarget, image.id);
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
export function add_image(gallery, id, url) {
    let image_div = document.createElement('div');
    image_div.className = 'gallery-image m-1 float-left';
    image_div.innerHTML = `<img src="${url}" data-id="${id}" alt="image ${id}" class="img-thumbnail img-fluid">`;
    gallery.appendChild(image_div);
    return image_div;
}

/**
 * open image dialog with comments feature
 * @param {HTMLElement} image_div
 * @param {int} id
 */
export function show_image(image_div, id) {
    console.log(encodeURI('https://boiling-refuge-66454.herokuapp.com/images/'+ id));
    let get_img_and_comment = make_xhr('https://boiling-refuge-66454.herokuapp.com/images/'+ id);
    get_img_and_comment.then((images) => {
        console.log(images);
    });
}