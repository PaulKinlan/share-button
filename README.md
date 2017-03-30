# Share Button

The Share Button web component provides a simple and customizable interface for
sharing URLs on the web and is specially designed for when you don't have a 
visible URL bar in your web app (for example if it is running in full screen)

* Provides access to the URL bar so that you can view and edit it.
* Gives the ability to programitcally copy the url on to the clipboard
* Will use `navigator.share` API if it is available on the users system
* Allows access to the Android Intent sharing system if the user is on Android
* Passes control to the developer for the social networks to share to by giving
  the author the ability customizable buttons for you preferred providers


[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/owner/my-element)

<!--
```
<custom-element-demo>
  <template>
    <link rel="import" href="share-button.html">
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<share-button></share-button>
```

# Customizing the button

As the author of the page there are a number of extensions that you have control
over.

1. Providing your own visible UI to the element
2. Adding your own controls for your preferred social networks or actions
3. Styling the element so that it fits in with your site

## Control the visible UI of the element

You have the ability to control how the button appears to the user. The button
is the first thing that the users sees and it encapsulates all of the
functionality that the share-button offers.

By default, any element that is hosted inside the `<share-button>` and does not
have an assigned `slot name` will be reprojected to the visible portion of
the element.

Elements that have a slot `name` of `buttons` will be hosted inside the fully
opened UI of the element.

### Use a custom label

<!--
```
<custom-element-demo>
  <template>
    <link rel="import" href="share-button.html">
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<share-button>
  Share
</share-button>
```

### Use a custom image
<!--
```
<custom-element-demo>
  <template>
    <link rel="import" href="share-button.html">
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<share-button>
  <img 
    src="https://pbs.twimg.com/profile_images/2736788281/13811f0063041a72d7ea6ede7b89fedd_400x400.png" 
    style="width: 64px; height: 64px;">
</share-button>
```

### Use a custom label and image

<!--
```
<custom-element-demo>
  <template>
    <link rel="import" href="share-button.html">
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<share-button>
  <span>Share</span>
  <svg viewBox="0 0 512 512" class="icon"><path d="M7 266.8c22.6-5.7 53.3-13.4 107-14.8-1.4-3-2.8-6-4-9.2-21-.2-85.4 2.8-107.5 8.2H2c-.6 0-1.3-.4-1.5-1.2-.2-1 .4-1.8 1.3-2 21.8-5.4 84.8-8.4 107-8.3-5-14.8-7.2-31.7-7.2-50.6 0-33.6 10.5-46.2 24.5-64-10.6-38.3 4-64.4 4-64.4s22.5-4.7 65 25.8c23.2-9.8 84.7-10.7 113.8-2.2 18-11.8 50.6-28.5 63.8-23.8 3.6 5.7 11.3 22.5 4.7 59.3 4.5 8 27.7 25.3 27.8 74-.2 18-2 33-5.6 45.8 55.6-.4 88.2 4 110.8 8.3.8.2 1.4 1 1.3 2-.2.7-1 1.3-1.6 1.3h-.5c-22.4-4-55.2-8.7-111-8.2-1 3.3-2 6.4-3.3 9.3 19 .7 71.2 2.8 113.8 15.8 1 .3 1.4 1.2 1 2 0 .8-.7 1.2-1.4 1.2h-.5c-43-13.2-96.5-15-114.2-15.6-15.4 34-47 46.6-98.3 51.8 16.6 10.5 21.3 23.6 21.3 59 0 35.5-.5 40.2-.3 48.4 0 13.4 19.7 19.8 19 24-.7 4.4-16.4 3.7-23.7 1-20.8-7-18.7-24.4-18.7-24.4l-.6-47.4s1.4-25.5-8-25.5V420c0 16.8 11.8 22 11.8 28 0 10.8-21.6-1-28.2-7.6-10-10-9-31.7-8.7-48.8.2-16.4-.2-52.5-.2-52.5l-6.8.3s3 78.7-3.6 93c-8.3 18.4-33.5 24.8-33.5 16.4 0-5.7 6.3-4 9.8-16.5 3-10.8 2-91 2-91s-8.2 4.8-8.2 19.8l-.2 57.8c0 14.8-20.8 23-31 23-5 0-11.3 0-11.3-2.8 0-6.8 19.2-10.8 19.2-25l-.3-43.8s-9.7 1.7-23.4 1.7c-34.6 0-45.6-22.2-50.8-34.6-6.8-16-15.6-23.7-25-29.7-5.7-3.7-7-8-.4-9.4 30.7-5.7 38.5 34.8 59 41.3 14.6 4.6 33.4 2.6 42.7-3.5 1.4-12.3 10.3-23 17.7-28.6-52-5-83-23-99-52-54.4 1.2-85.3 9-108 14.6L3 271.2h-.4c-.8 0-1.5-.5-1.6-1.2-.3-1 .3-1.8 1.2-2l4.8-1.2z"></path></svg>
</share-button>
```

### Use a custom image for the copy button
<!--
```
<custom-element-demo>
  <template>
    <link rel="import" href="share-button.html">
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<share-button><img 
    src="https://pbs.twimg.com/profile_images/2736788281/13811f0063041a72d7ea6ede7b89fedd_400x400.png" 
    style="width: 25px; height: 25px;" slot='clipboard'></share-button>
```

### Use a custom image for the android button
<!--
```
<custom-element-demo>
  <template>
    <link rel="import" href="share-button.html">
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<share-button><img 
    src="https://pbs.twimg.com/profile_images/2736788281/13811f0063041a72d7ea6ede7b89fedd_400x400.png" 
    style="width: 25px; height: 25px;" slot='android'></share-button>
```

## Add a custom share button

Any element hosted in the custom element that does not have a `slot` attribute
of `buttons` will be used in the display of the share-button

Custom share buttons can be positioned inside the share button by applying 
the slot="buttons" attribute to the element.

    <share-button>
      <button slot="buttons">Twitter</button>
      <button slot="buttons">Fb</button>
      <button slot="buttons">WhatsApp</button>
      <button slot="buttons">G+</button>
    </share-button>

You are in control of the actions that the user takes on these elements.

## Control the URL to be shared

By default the current page's URL is the URL that will be populated in the
share box and will be used in all sharing operations. You can control this 
yourself by supplying your own `href` attribute.

<!--
```
<custom-element-demo>
  <template>
    <link rel="import" href="share-button.html">
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<share-button href='https://paul.kinlan.me/'>
  Share
</share-button>
```


## Styling the element

There are a number of things that you can style. You can style the button
that is visible to the user and you can also style the overlay that is shown
to the user once they have taken the action to "share"

### Style the button

The `<share-button>` exposes a number of CSS variables that give you control
over how the button is presented to the user.

Below are the defaults for the variables and you have the ability to override
them as you see fit. By default the button that the user will click attempts
to be an actual `<button>`.

```css
/* 
  --share-button-background lets you control the background of the button
  default: the 'share' icon.
*/
--share-button-background: url(https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_share_black_24px.svg) center/18px no-repeat;

/* 
  --share-button-border controls border on the button
  default: 2px outset buttonface;
*/
--share-button-border: 2px outset buttonface;

/* 
  --share-button-appearance controls the rendering of the element
  default: button;
*/
--share-button-appearance: button;

/* 
  --share-button-border-radius provides access to border-radius on the button
  default: initial
*/
--share-button-border-radius: initial;

/* 
  --share-button-color lets you control `color` of the button element.
  default: initial
*/
--share-button-color: initial;
```

<!--
```
<custom-element-demo>
  <template>
    <link rel="import" href="share-button.html">
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<style>
#styletest1 {
  --share-button-background: steelblue !important;
  --share-button-border-radius:50% 50%;
  width: 100px;
  height: 100px;
}
</style>
<share-button id="styletest1">
  Share
</share-button>
```