//#region Custom components
class EventDetail extends HTMLElement {
    event;
    loaded;
    
    connectedCallback() {
        if(!this.loaded) {
            var backButton = document.createElement('app-button');
            backButton.invisible = true;
            backButton.text = 'Back';
            backButton.click = () => history.back();
    
            var shareButton = document.createElement('app-button');
            shareButton.invisible = true;
            shareButton.text = 'Share';
    
            var header = document.createElement('page-header');
            header.leftButton = backButton;
            header.text = this.event.name;
            header.rightButton = shareButton;
    
            var followingListHeader = document.createElement('list-header');
            followingListHeader.text = `Following (${this.event.followers.length})`;
    
            var followingList = document.createElement('div');
            followingList.classList.add('followers');
            followingList.appendChild(followingListHeader);
    
            for(var i = 0; i < this.event.followers.length; i++) {
                const follower = this.event.followers[i];
    
                var listItem = document.createElement('list-item');
                listItem.leftText = follower.name;
                followingList.appendChild(listItem);
            }
    
            var locationListHeader = document.createElement('list-header');
            locationListHeader.text = `Bars (${this.event.locations.length})`;
    
            var locationList = document.createElement('div');
            locationList.classList.add('locations');
            locationList.appendChild(locationListHeader);
    
            for(var i = 0; i < this.event.locations.length; i++) {
                const location = this.event.locations[i];
    
                var listItem = document.createElement('list-item');
                listItem.leftText = location.name;
                locationList.appendChild(listItem);
            }
    
            this.appendChild(header);
            this.appendChild(followingList);
            this.appendChild(locationList);
            this.loaded = true;
        }
    }
}

customElements.define('event-detail', EventDetail);
//#endregion

const url = new URL(window.location.href);
const id = parseInt(url.searchParams.get('crawl'));

//#region data
//Pretend we got this from a remote server. It'll only be one event too
const data = [
    {
        id: 7,
        name: 'Gary\'s Cool Crawl',
        user: {
            id: 3,
            name: 'Gary Reynolds'
        },
        location: {
            name: 'Barry\'s Sports Bar and Grill',
            lat: 40.815547,
            lng: -96.708945
        },
        followers: [
            {
                id: 10,
                name: 'Bilbo Baggins'
            },
            {
                id: 11,
                name: 'Casey Bethard'
            },
            {
                id: 12,
                name: 'Donald Trump'
            },
            {
                id: 10,
                name: 'Bilbo Baggins'
            },
            {
                id: 11,
                name: 'Casey Bethard'
            },
            {
                id: 12,
                name: 'Donald Trump'
            },
            {
                id: 10,
                name: 'Bilbo Baggins'
            },
            {
                id: 11,
                name: 'Casey Bethard'
            },
            {
                id: 12,
                name: 'Donald Trump'
            },
            {
                id: 10,
                name: 'Bilbo Baggins'
            },
            {
                id: 11,
                name: 'Casey Bethard'
            },
            {
                id: 12,
                name: 'Donald Trump'
            },
        ],
        locations: [
            {
                lat: 40.815547,
                lng: -96.708945,
                name: 'Paddy\'s Pub'
            },
            {
                lat: 40.813290,
                lng: -96.700896,
                name: 'Shitty Bar'
            },
            {
                lat: 40.813815,
                lng: -96.700104,
                name: 'Nice Bar'
            },
        ]
    },
    {
        id: 8,
        name: 'UNL Sponsored Bar Crawl',
        user: {
            id: 5,
            name: 'Warren Buffet'
        },
        location: {
            name: 'Sandy\'s',
            lat: 40.813290,
            lng: -96.700896
        },
        followers: [
            {
                id: 10,
                name: 'Bilbo Baggins'
            },
            {
                id: 11,
                name: 'Casey Bethard'
            },
            {
                id: 12,
                name: 'Donald Trump'
            },
        ],
        locations: [
            {
                lat: 40.815547,
                lng: -96.708945,
                name: 'Paddy\'s Pub'
            },
            {
                lat: 40.813290,
                lng: -96.700896,
                name: 'Shitty Bar'
            },
            {
                lat: 40.813815,
                lng: -96.700104,
                name: 'Nice Bar'
            },
        ]
    },
    {
        id: 9,
        name: 'Lame Crawl',
        user: {
            id: 9,
            name: 'Regynold Smith'
        },
        location: {
            name: 'The Brass Rail',
            lat: 40.813815,
            lng: -96.700104
        },
        followers: [
            {
                id: 10,
                name: 'Bilbo Baggins'
            },
            {
                id: 11,
                name: 'Casey Bethard'
            },
            {
                id: 12,
                name: 'Donald Trump'
            },
        ],
        locations: [
            {
                lat: 40.815547,
                lng: -96.708945,
                name: 'Paddy\'s Pub'
            },
            {
                lat: 40.813290,
                lng: -96.700896,
                name: 'Shitty Bar'
            },
            {
                lat: 40.813815,
                lng: -96.700104,
                name: 'Nice Bar'
            },
        ]
    }
];
//#endregion

const event = data.find(row => row.id === id);
document.title = event.name;
var eventDetail = document.createElement('event-detail');
eventDetail.event = event;
document.body.appendChild(eventDetail);

var floatingActionButton = document.createElement('floating-action-button');
floatingActionButton.text = 'Follow';
floatingActionButton.click = () => {

};
document.body.appendChild(floatingActionButton);