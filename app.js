//#region Custom components
class ListItem extends HTMLElement {
    image;
    leftText;
    rightText;
    url;
    click;
    loaded;

    connectedCallback() {
        if(!this.loaded) {
            var container;
    
            if(!Utils.isEmpty(this.click)) {
                container = document.createElement('button');
                container.addEventListener('click', this.click);
            } else if(!Utils.isEmpty(this.url)) {
                container = document.createElement('a');
                container.href = this.url;
            } else {
                container = document.createElement('div');
            }
            container.classList.add('list-item');
    
            if(!Utils.isEmpty(this.image)) {
                var imageElement = document.createElement('img');
                imageElement.classList.add('image');
                imageElement.src = this.image;
    
                container.appendChild(imageElement);
            }
    
            if(!Utils.isAllEmpty(this.leftText, this.rightText)) {
                var textContainer = document.createElement('div');
                textContainer.classList.add('text-container');
    
                if(!Utils.isEmpty(this.leftText)) {
                    var leftTextElement = document.createElement('span');
                    leftTextElement.classList.add('leftText');
                    leftTextElement.appendChild(document.createTextNode(this.leftText));
        
                    textContainer.appendChild(leftTextElement);
                }
        
                if(!Utils.isEmpty(this.rightText)) {
                    var rightTextElement = document.createElement('span');
                    rightTextElement.classList.add('rightText', 'caption');
                    rightTextElement.appendChild(document.createTextNode(this.rightText));
        
                    textContainer.appendChild(rightTextElement)
                }
                container.appendChild(textContainer);
            }
    
            this.appendChild(container);
            this.loaded = true;
        }
    }
}

customElements.define('list-item', ListItem);

class ListHeader extends HTMLElement {
    text;
    loaded;

    connectedCallback() {
        if(!this.loaded) {
            this.appendChild(document.createTextNode(this.text));
            this.loaded = true;
        }
    }
}

customElements.define('list-header', ListHeader);

class FloatingActionButton extends HTMLElement {
    click;
    text;
    icon;
    url;
    position;
    loaded;

    connectedCallback() {
        if(!this.loaded) {
            this.position = Utils.default(this.position, () => 'bottom-right');
    
            var button;
            if(Utils.isEmpty(this.url)) {
                button = document.createElement('button');
                button.type = 'button';
            } else {
                button = document.createElement('a');
                button.href = this.url;
            }
            button.classList.add('floating-action-button');
            button.classList.add(this.position);
    
            if(!Utils.isEmpty(this.click)) {
                button.addEventListener('click', this.click);
            }
    
            if(!Utils.isEmpty(this.text)) {
                button.appendChild(document.createTextNode(this.text));
            }
    
            this.appendChild(button);
            this.loaded = true;
        }
    }
}

customElements.define('floating-action-button', FloatingActionButton);

class AppButton extends HTMLElement {
    click;
    invisible;
    link;
    text;
    icon;
    url;
    type;
    loaded;

    connectedCallback() {
        if(!this.loaded) {
            this.type = Utils.default(this.type, () => 'button');
    
            var button;
            if(Utils.isEmpty(this.url)) {
                button = document.createElement('button');
                button.type = this.type;
            } else {
                button = document.createElement('a');
                button.href = this.url;
            }
            button.classList.add('app-button');
    
            if(this.invisible) {
                button.classList.add('invisible');
            }
    
            if(this.link) {
                button.classList.add('link');
            }
    
            if(!Utils.isEmpty(this.click)) {
                button.addEventListener('click', this.click);
            }
    
            if(!Utils.isEmpty(this.text)) {
                button.appendChild(document.createTextNode(this.text));
            }
    
            this.appendChild(button);
            this.loaded = true;
        }
    }
}

customElements.define('app-button', AppButton);

class PageHeader extends HTMLElement {
    leftButton;
    rightButton;
    text;
    loaded;

    connectedCallback() {
        if(!this.loaded) {
            if(!Utils.isEmpty(this.leftButton)) {
                var leftButtonHolder = document.createElement('div');
                leftButtonHolder.classList.add('leftButton');
                leftButtonHolder.appendChild(this.leftButton);
                this.appendChild(leftButtonHolder);
            }
    
            if(!Utils.isEmpty(this.text)) {
                var textElement = document.createElement('h6');
                textElement.appendChild(document.createTextNode(this.text));
                this.appendChild(textElement);
            }
    
            if(!Utils.isEmpty(this.rightButton)) {
                var rightButtonHolder = document.createElement('div');
                rightButtonHolder.classList.add('rightButton');
                rightButtonHolder.appendChild(this.rightButton);
                this.appendChild(rightButtonHolder);
            }
            document.body.classList.add('page-header');
            this.loaded = true;
        }
    }
}

customElements.define('page-header', PageHeader)

class LeftMenu extends HTMLElement {
    items;
    menu;
    overlay;
    loaded;

    connectedCallback() {
        if(!this.loaded) {
            this.menu = document.createElement('div');
            this.menu.classList.add('left-menu');
    
            this.overlay = document.createElement('button');
            this.overlay.type = 'button';
            this.overlay.classList.add('left-menu-overlay');
            this.overlay.addEventListener('click', () => {
                this.toggleMenu();
            });
    
            for(var i = 0; i < this.items.length; i++) {
                var item = this.items[i];
    
                var listItem = document.createElement('list-item');
                listItem.leftText = item.text;
                listItem.click = item.click;
    
                this.menu.appendChild(listItem);
            }
    
            var floatingActionButton = document.createElement('floating-action-button');
            floatingActionButton.text = 'Menu';
            floatingActionButton.position = 'top-left';
            floatingActionButton.addEventListener('click', () => {
                this.toggleMenu();
            })
    
            document.body.appendChild(floatingActionButton);
            document.body.appendChild(this.overlay);
            document.body.appendChild(this.menu);
            this.loaded = true;
        }
    }

    toggleMenu() {
        if(this.menu.classList.contains('shown')) {
            this.overlay.classList.remove('shown');
            this.menu.classList.remove('shown');
        } else {
            this.overlay.classList.add('shown');
            this.menu.classList.add('shown');
        }
    }
}

customElements.define('left-menu', LeftMenu);
//#endregion

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA3Cc_S6jSWI230HhgyUSvZ1NgMlhcILCY",
    authDomain: "krawler-4a5f5.firebaseapp.com",
    databaseURL: "https://krawler-4a5f5.firebaseio.com",
    projectId: "krawler-4a5f5",
    storageBucket: "krawler-4a5f5.appspot.com",
    messagingSenderId: "961132231883",
    appId: "1:961132231883:web:c642f043971876db856f4e",
    measurementId: "G-XBBMB83JDD"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(user => {
    if(Utils.isEmpty(user)) {
        if(window.location.pathname !== '/login.html') {
            window.location.pathname = '/login.html';
        }
    }
});
//   firebase.analytics();

class Utils {
    /**
     * @returns boolean whether obj is undefined or null
     * @param {*} obj 
     */
    static isEmpty(obj) {
        return obj === undefined || obj === null;
    }

    /**
     * @returns boolean whether all of the objects are undefined or null
     * @param  {...any} obj 
     */
    static isAllEmpty(...obj) {
        for(var i = 0; i < obj.length; i++) {
            if(!this.isEmpty(obj[i])) {
                return false;
            }
        }
        return true;
    }

    /**
     * @returns {*} obj if instantiated. Otherwise value of called provider
     * @param {*} obj 
     * @param {function} provider 
     */
    static default(obj, provider) {
        if(this.isEmpty(obj)) {
            return provider();
        }

        return obj;
    }

    /**
     * Throws error if object is empty with provided message
     * @param {*} obj 
     * @param {*} provider message
     */
    static require(obj, provider) {
        if(this.isEmpty(obj)) {
            throw new Error(provider());
        }
    }

    /**
     * Encodes latitude/longitude to geohash, either to specified precision or to automatically
     * evaluated precision.
     *
     * @param   {number} lat - Latitude in degrees.
     * @param   {number} lon - Longitude in degrees.
     * @param   {number} [precision] - Number of characters in resulting geohash.
     * @returns {string} Geohash of supplied latitude/longitude.
     * @throws  Invalid geohash.
     *
     * @example
     *     const geohash = Utils.geohashEncode(52.205, 0.119, 7); // => 'u120fxw'
     */
    static geohashEncode(lat, lon, precision) {
        // infer precision?
        if (typeof precision == 'undefined') {
            // refine geohash until it matches precision of supplied lat/lon
            for (let p=1; p<=12; p++) {
                const hash = Utils.geohashEncode(lat, lon, p);
                const posn = Utils.geohashDecode(hash);
                if (posn.lat==lat && posn.lon==lon) return hash;
            }
            precision = 12; // set to maximum
        }

        lat = Number(lat);
        lon = Number(lon);
        precision = Number(precision);

        if (isNaN(lat) || isNaN(lon) || isNaN(precision)) throw new Error('Invalid geohash');

        let idx = 0; // index into base32 map
        let bit = 0; // each char holds 5 bits
        let evenBit = true;
        let geohash = '';

        let latMin =  -90, latMax =  90;
        let lonMin = -180, lonMax = 180;

        while (geohash.length < precision) {
            if (evenBit) {
                // bisect E-W longitude
                const lonMid = (lonMin + lonMax) / 2;
                if (lon >= lonMid) {
                    idx = idx*2 + 1;
                    lonMin = lonMid;
                } else {
                    idx = idx*2;
                    lonMax = lonMid;
                }
            } else {
                // bisect N-S latitude
                const latMid = (latMin + latMax) / 2;
                if (lat >= latMid) {
                    idx = idx*2 + 1;
                    latMin = latMid;
                } else {
                    idx = idx*2;
                    latMax = latMid;
                }
            }
            evenBit = !evenBit;

            if (++bit == 5) {
                // 5 bits gives us a character: append it and start over
                geohash += base32.charAt(idx);
                bit = 0;
                idx = 0;
            }
        }

        return geohash;
    }

    /**
     * Decode geohash to latitude/longitude (location is approximate centre of geohash cell,
     *     to reasonable precision).
     *
     * @param   {string} geohash - Geohash string to be converted to latitude/longitude.
     * @returns {{lat:number, lon:number}} (Center of) geohashed location.
     * @throws  Invalid geohash.
     *
     * @example
     *     const latlon = Utils.geohashDecode('u120fxw'); // => { lat: 52.205, lon: 0.1188 }
     */
    static geohashDecode(geohash) {

        const bounds = Utils.geohashBounds(geohash); // <-- the hard work
        // now just determine the centre of the cell...

        const latMin = bounds.sw.lat, lonMin = bounds.sw.lon;
        const latMax = bounds.ne.lat, lonMax = bounds.ne.lon;

        // cell centre
        let lat = (latMin + latMax)/2;
        let lon = (lonMin + lonMax)/2;

        // round to close to centre without excessive precision: ⌊2-log10(Δ°)⌋ decimal places
        lat = lat.toFixed(Math.floor(2-Math.log(latMax-latMin)/Math.LN10));
        lon = lon.toFixed(Math.floor(2-Math.log(lonMax-lonMin)/Math.LN10));

        return { lat: Number(lat), lon: Number(lon) };
    }

    /**
     * Returns SW/NE latitude/longitude bounds of specified geohash.
     *
     * @param   {string} geohash - Cell that bounds are required of.
     * @returns {{sw: {lat: number, lon: number}, ne: {lat: number, lon: number}}}
     * @throws  Invalid geohash.
     */
    static geohashBounds(geohash) {
        if (geohash.length == 0) throw new Error('Invalid geohash');

        geohash = geohash.toLowerCase();

        let evenBit = true;
        let latMin =  -90, latMax =  90;
        let lonMin = -180, lonMax = 180;

        for (let i=0; i<geohash.length; i++) {
            const chr = geohash.charAt(i);
            const idx = base32.indexOf(chr);
            if (idx == -1) throw new Error('Invalid geohash');

            for (let n=4; n>=0; n--) {
                const bitN = idx >> n & 1;
                if (evenBit) {
                    // longitude
                    const lonMid = (lonMin+lonMax) / 2;
                    if (bitN == 1) {
                        lonMin = lonMid;
                    } else {
                        lonMax = lonMid;
                    }
                } else {
                    // latitude
                    const latMid = (latMin+latMax) / 2;
                    if (bitN == 1) {
                        latMin = latMid;
                    } else {
                        latMax = latMid;
                    }
                }
                evenBit = !evenBit;
            }
        }

        const bounds = {
            sw: { lat: latMin, lon: lonMin },
            ne: { lat: latMax, lon: lonMax },
        };

        return bounds;
    }
};