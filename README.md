# Find a bathroom

## Find a bathroom near you.

I know plenty of people who are anxious about using restrooms outside of their house, myself included. People feel more comfortable in a clean and private space. When we have to go, we don't want to be disgusted by our suroundings and we don't want to feel rushed. I beleive we should pee in peace. This is why I'm creating Skip to the Loo. When you are out and a about you can lookup bathrooms with user reviews in your area. These reviews will tell you whether a bathroom is private or public and will include pictures so you can make informed decisions when it comes to taking care of business. When you log in you will be taken to a map with your current location, you can then look for bathrooms that have been reviewed in your area, or if you wish, you can review a bathroom yourself. These reviews will include categories for privacy, cleanliness and the overall experience. You can either sign in with your facebook account, or create a new account to log in and start reviewing. APIs for this app include Google Maps, Google places and Facebook. 

Skip to the Loo is a native iOS app written in JavaScript with React-Native.

## User Stories

(https://trello.com/b/mtw1IMol/final-project)

## Wireframes

(https://wireframe.cc/waXIJ3)

## Models

Place model {
title: string
address: string
location: geoPoint
public: bool
open: string
close: string
photo: file
}
Review model {
cleanliness: number
privacy: number
overall: number
text: string
placeID: pointer
user: pointer
}

## APIs, Plugins, Libraries and Frameworks

Google places API
