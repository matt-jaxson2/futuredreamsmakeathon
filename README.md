# Futuredreams - MAKEATHON

## Description

A specialized web interface designed for user engagement, enabling individuals to showcase their creative skills.

The platform includes a collection of images and text, capturing the inherent qualities and craftsmanship of their intricately knitted rose creations.

## MVP - MDV

### Holding Page:  
Static image of the mosaic.

### MVP:  
Static display of the mosaic with hard coded json array on page. With blank holding images to promote interaction.

### MMP:  
Dynamic feed of images with url controlled inclusion of a single defined image i.e. I want to see the image I uploaded in the mosaic. The mosaic is loaded with my image in a highlighted state alongside x random images. 

### MDV:  
Search for images via email {email should not be exposed on page}

Paging of mosaic based on date i.e 50 images displayed,paging will take you to the next 50 oldest.

## Technologies

- Vite
- HTML
- JavaScript
- CSS

## Requirements

- Node (latest)
- Yarn

## Installation

1. Clone repo:
    1. ssh: `git clone git@github.com:matt-jaxson2/futuredreamsmakeathon.git`
    1. https: `git clone https://github.com/matt-jaxson2/futuredreamsmakeathon.git`
1. Run `yarn install` in root of repo.

## Development

### Commands
From root of repo:  
`yarn dev` - Starts local 'DEV' server and watches for changes.  
`yarn build` - Compiles code from `src` folder into `_build`. This is the code that will be deployed.  
`yarn preview` - Compiles code then starts local 'PROD' server.  

### Temporary local NodeJS server for development
From root of repo:  
`node src/__MOCK__/server.js` - Starts a local server returning static JSON results.  

