# Scoop Javascript Project Template

## Tech stack used in development

-   Frontend

    -   HTML/CSS/JavaScript
    -   Bulma CSS
    -   Vue.js
    -   Video JS

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## To build a new project from this template

The video and navigation controls are already done in this template. The video URLs should be from HLS files on AWS S3.

The main file you need to edit to add the new videos, subtitles, quiz questions and decision logic is /src/stores/experiences.js.
This exports an object that contains the whole logic for the video playlist. There are different types of videos based on the desired logic:

1. 'narrative' - this plays sequentially in the playlist as a normal video would.
2. 'question' - shows a question at the end of the video, and will play a video based on the user's answer. There will be one correct answer.
3. 'quiz' - similar to 'question', but shows a quiz question with one possible correct answer, but doesn't play a video associated with each answer. Progresses to the next video once the correct answer is selected.
4. 'choices' - similar to 'question', but there is no correct selection. This allows the user to choose from multiple different videos after the video plays, and cycle between these until they want to progress to the next main video.
5. 'final' - always the last video in the playlist. This shows a list of all the main videos for a user to go back to at the end of all the videos being played.

'menuTime' controls the set time on each video the associated menu shows, in seconds.

## Subtitles

Subtitles can be added for each video as .vtt files. These should be added in a folder in the '/public' folder and referenced in the 'experiences.js' file as the 'tracks' array for each video object, e.g:

```
{
    name: "Welcome introduction",
    type: "intro",
    videoURL: "https://videoondemandservice-destination920a3c57-1dn69pzwc1bbr.s3.eu-west-2.amazonaws.com/Drylining-2D-Combined/Process/Opening+Intro/Opening+Intro(WITH+MUSIC).m3u8",
    menuTime: 40,
    id: 5,
    autoPlayNext: true,
    tracks: [
        { kind:'subtitles', src: '/subtitles/intro-en.vtt', srclang: 'en', label: 'English', },
        { kind:'subtitles', src: '/subtitles/intro-cy.vtt', srclang: 'cy', label: 'Welsh', },
    ],
},
```

## CSS

The project uses custom SCSS as well as the [bulma](https://bulma.io/) framework for some utility classes. Most of the editing required for a new project (if any) would be to just change the theme colours in '\_variables.scss'.

## Other customisations

Things like project title and images will need to be customised. Some of these are done from the 'experiences.js' file at the top of the object. Other images will need to be replaced within the Vue templates, e.g. the logos in 'App.vue'.

## Developers

If you need any help, please reach out to the developers

[Tom Dolton](mailto:tomd@orbitalmedia.com)
