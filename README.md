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

## Properties

| Prop                  | Type            | Default     | Description                                                   |
|-----------------------|-----------------|-------------|---------------------------------------------------------------|
| activeStartDate       | Date            | `new Date()`| Beginning of a period that shall be displayed                 |
| defaultView           | String          | `month`     | Determines which view is being displayed initially            |
| locale                | String          | `undefined` | Locale to use for the calendar                                |
| localeFirstDayOfYear  | Number          | `0`         | Number for the first day of the week                          |
| maxDate               | Date            | `undefined` | Maximum allowed date                                          |
| maxDetail             | String          | `month`     | Most Detailed view that user can see                          |
| minDate               | Date            | `undefined` | Minimum allowed date                                          |
| minDetail             | String          | `century`   | Least detailed view that user can see                         |
| showNeighboringMonth  | Boolean         | `true`      | Visibility of days from previous and next months              |
| showWeekNumbers       | Boolean         | `false`     | Visibility of the week numbers                                |
