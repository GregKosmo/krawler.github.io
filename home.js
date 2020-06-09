//#region Custom components
class EventList extends HTMLElement {
    loaded;
    events;

    connectedCallback() {
        if(!this.loaded) {
            this.buildEvents(this.events);
            this.loaded = true;
        }
    }

    buildEvents(events) {
        for(var i = 0; i < events.length; i++) {
            const event = events[i];

            var eventSummary = document.createElement('list-item');
            eventSummary.leftText = event.name;
            eventSummary.rightText = event.location;
            eventSummary.click = async () => {
                (await getMap()).panTo(new google.maps.LatLng(event.latitude, event.longitude));
                (await getMap()).setZoom(19);
                new google.maps.event.trigger(eventMarkerMap.get(event), 'click');
            };
            this.appendChild(eventSummary);
        }
    }

    refresh(events) {
        this.clear();
        this.buildEvents(events);
    }

    clear() {
        while(this.hasChildNodes()) {
            this.removeChild(this.lastChild);
        }
    }
}

customElements.define('event-list', EventList);
//#endregion

const base32 = '0123456789bcdefghjkmnpqrstuvwxyz';
var map;

var eventList;
var eventMarkerMap = new Map();
var overlay;

/**
 * Lazy-loaded getter for the map instance
 * @returns {Promise<google.maps.Map>} map promise
 */
async function getMap() {
    return map = Utils.default(map, () => {
        return new Promise(resolve => {
            if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    resolve(new google.maps.Map(document.getElementById('map'), {
                        center: {
                            lat: position.coords.latitude, 
                            lng: position.coords.longitude
                        },
                        zoom: 15,
                        zoomControl: true,
                        mapTypeControl: false,
                        scaleControl: false,
                        streetViewControl: false,
                        rotateControl: false,
                        fullscreenControl: false
                    }));
                });
            }
        });
    });
}

async function initMap() { 
    overlay = new google.maps.InfoWindow();
    (await getMap()).addListener('idle', async () => {
        eventMarkerMap.clear();
        var data = await getLocationsByBounds((await getMap()).getBounds());

        for(var i = 0; i < data.length; i++) {
            const event = data[i];
            var marker = new google.maps.Marker({
                position: {
                    lat: event.latitude, 
                    lng: event.longitude
                }, 
                map: (await getMap())
            });

            marker.addListener('click', async () => {
                var container = document.createElement('div');
                var heading = document.createElement('h5');
                heading.appendChild(document.createTextNode(event.name))

                var view = document.createElement('app-button');
                view.text = 'View';
                view.link = `/detail/${event.id}`;

                var cancel = document.createElement('app-button');
                cancel.text = 'Cancel';
                cancel.invisible = true;
                cancel.click = () => {
                    overlay.close();
                };

                container.appendChild(heading);
                container.appendChild(view);
                container.appendChild(cancel);

                overlay.setContent(container);
                overlay.open((await getMap()), marker);
            });

            eventMarkerMap.set(event, marker);
        }

        if(Utils.isEmpty(eventList)) {
            eventList = document.createElement('event-list');
            eventList.events = data;
            document.body.appendChild(eventList);
        } else {
            eventList.refresh(data);
        }
        
        navigator.geolocation.watchPosition(position => {
            console.log(`Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}`);
        });
    });
}

async function getLocationsByBounds(bounds) {
    const lowerBounds = Utils.geohashEncode(bounds.getSouthWest().lat(), bounds.getSouthWest().lng(), 9);
    const upperBounds = Utils.geohashEncode(bounds.getNorthEast().lat(), bounds.getNorthEast().lng(), 9);

    return (await firebase.firestore().collection('locations').where('geohash', '>=', lowerBounds).where('geohash', '<=', upperBounds).get()).docs.map(doc => {
        var obj = doc.data();
        obj.id = doc.id;
        return obj;
    });
}

var floatingActionButton = document.createElement('floating-action-button');
floatingActionButton.url = '/add.html';
floatingActionButton.text = 'Add';

document.body.appendChild(floatingActionButton);

var leftMenu = document.createElement('left-menu');
leftMenu.items = [
    {
        text: 'Profile'
    },
    {
        text: 'Log Out',
        click: () => {
            firebase.auth().signOut();
        }
    }
]

document.body.appendChild(leftMenu);