class HeaderBanner {
    constructor() {
        this.body = document.querySelector("body");
        this.header = document.createElement("header");
        this.body.appendChild(this.header);
    }

    renderPhotographersHeader(){
        this.renderImg()
        this.renderTitle();
    }

    renderPhototographerHeader(){
        this.renderImg()
    }

    renderImg() {
        const img = document.createElement("img");
        img.classList.add("logo");
        img.src = "assets/icons/logo.png";
        img.setAttribute('alt', 'Fisheye logo');
        this.header.appendChild(img);
    }
    renderTitle() {
        const h1 = document.createElement("h1");
        h1.textContent = "Nos photographes";
        this.header.appendChild(h1);
    }
}
