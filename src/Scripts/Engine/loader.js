export default class Loader {
    images = {};

    async init() {
            await this.loadImage("grid", "../Assets/grid.png");
            await this.loadImage("tiles", "../Assets/seasons_tiles.png");
            await this.loadImage("current", "../Assets/current_tile.png");
            await this.loadImage("edited", "../Assets/edited_tile.png"); 
    }

    loadImage(key, src) {
        var img = new Image();

        var d = new Promise(function (resolve, reject) {
            img.onload = function () {
                this.images[key] = img;
                resolve(img);
            }.bind(this);

            img.onerror = function () {
                reject('Could not load image: ' + src);
            };
        }.bind(this));
        img.src = src;
        return d;
    };

     getImage(key) {
        return (key in this.images) ? this.images[key] : null;
    };
}