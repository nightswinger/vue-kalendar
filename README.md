# Vue-Kalendar

Vue implementation of [react-calendar](https://github.com/wojtekmaj/react-calendar)

![image](https://user-images.githubusercontent.com/43260704/155877284-3c046e4f-65e3-4f86-80f7-8083f77ab6a4.png)

## Demo

Try online demo [here](https://stackblitz.com/edit/vue-mjmwn4)

## Install

```bash
# npm
npm install v-kalendar

#yarn
yarn add v-kalendar
```

## Usage

```js
import VKalendar from 'v-kalendar'

app.use(VKalendar)
```

```html
<template>
  <Calendar v-model="date" />
</template>
```
