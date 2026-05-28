export default `<!DOCTYPE html><html lang="en" data-beasties-container><head>
    <meta charset="utf-8">
    <title>ng-chat</title>
    <base href="/">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
  <style>@layer properties;@layer theme,base,components,utilities;@layer theme{:root{--font-sans: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";--font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--ease-in-out: cubic-bezier(.4, 0, .2, 1);--default-transition-duration: .15s;--default-transition-timing-function: cubic-bezier(.4, 0, .2, 1);--default-font-family: var(--font-sans);--default-mono-font-family: var(--font-mono)}}@layer base{*,:after,:before{box-sizing:border-box;margin:0;padding:0;border:0 solid}html{line-height:1.5;-webkit-text-size-adjust:100%;tab-size:4;font-family:var(--default-font-family, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--default-font-feature-settings, normal);font-variation-settings:var(--default-font-variation-settings, normal);-webkit-tap-highlight-color:transparent}}@layer utilities{}@property --tw-rotate-x{syntax: "*"; inherits: false;}@property --tw-rotate-y{syntax: "*"; inherits: false;}@property --tw-rotate-z{syntax: "*"; inherits: false;}@property --tw-skew-x{syntax: "*"; inherits: false;}@property --tw-skew-y{syntax: "*"; inherits: false;}@property --tw-border-style{syntax: "*"; inherits: false; initial-value: solid;}@property --tw-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-shadow-color{syntax: "*"; inherits: false;}@property --tw-shadow-alpha{syntax: "<percentage>"; inherits: false; initial-value: 100%;}@property --tw-inset-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-inset-shadow-color{syntax: "*"; inherits: false;}@property --tw-inset-shadow-alpha{syntax: "<percentage>"; inherits: false; initial-value: 100%;}@property --tw-ring-color{syntax: "*"; inherits: false;}@property --tw-ring-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-inset-ring-color{syntax: "*"; inherits: false;}@property --tw-inset-ring-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-ring-inset{syntax: "*"; inherits: false;}@property --tw-ring-offset-width{syntax: "<length>"; inherits: false; initial-value: 0px;}@property --tw-ring-offset-color{syntax: "*"; inherits: false; initial-value: #fff;}@property --tw-ring-offset-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-blur{syntax: "*"; inherits: false;}@property --tw-brightness{syntax: "*"; inherits: false;}@property --tw-contrast{syntax: "*"; inherits: false;}@property --tw-grayscale{syntax: "*"; inherits: false;}@property --tw-hue-rotate{syntax: "*"; inherits: false;}@property --tw-invert{syntax: "*"; inherits: false;}@property --tw-opacity{syntax: "*"; inherits: false;}@property --tw-saturate{syntax: "*"; inherits: false;}@property --tw-sepia{syntax: "*"; inherits: false;}@property --tw-drop-shadow{syntax: "*"; inherits: false;}@property --tw-drop-shadow-color{syntax: "*"; inherits: false;}@property --tw-drop-shadow-alpha{syntax: "<percentage>"; inherits: false; initial-value: 100%;}@property --tw-drop-shadow-size{syntax: "*"; inherits: false;}@property --tw-ease{syntax: "*"; inherits: false;}@layer properties{@supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))){*,:before,:after{--tw-rotate-x: initial;--tw-rotate-y: initial;--tw-rotate-z: initial;--tw-skew-x: initial;--tw-skew-y: initial;--tw-border-style: solid;--tw-shadow: 0 0 #0000;--tw-shadow-color: initial;--tw-shadow-alpha: 100%;--tw-inset-shadow: 0 0 #0000;--tw-inset-shadow-color: initial;--tw-inset-shadow-alpha: 100%;--tw-ring-color: initial;--tw-ring-shadow: 0 0 #0000;--tw-inset-ring-color: initial;--tw-inset-ring-shadow: 0 0 #0000;--tw-ring-inset: initial;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-offset-shadow: 0 0 #0000;--tw-blur: initial;--tw-brightness: initial;--tw-contrast: initial;--tw-grayscale: initial;--tw-hue-rotate: initial;--tw-invert: initial;--tw-opacity: initial;--tw-saturate: initial;--tw-sepia: initial;--tw-drop-shadow: initial;--tw-drop-shadow-color: initial;--tw-drop-shadow-alpha: 100%;--tw-drop-shadow-size: initial;--tw-ease: initial}}}
</style><link rel="stylesheet" href="styles-DFOEYH5U.css" media="print" onload="this.media='all'"><noscript><link rel="stylesheet" href="styles-DFOEYH5U.css"></noscript><style ng-app-id="ng">@layer properties;[_nghost-ng-c2740438498]{position:relative;display:block;height:100%;min-height:100%;width:100%;flex-direction:row}mat-sidenav-container[_ngcontent-ng-c2740438498]{display:flex}mat-sidenav-container[_ngcontent-ng-c2740438498] > *[_ngcontent-ng-c2740438498]{background-color:var(--white-color)}mat-sidenav-container[_ngcontent-ng-c2740438498]   mat-sidenav[_ngcontent-ng-c2740438498]{height:100vh;width:var(--sidebar-width);border-radius:0}mat-sidenav-container[_ngcontent-ng-c2740438498]   mat-sidenav-content[_ngcontent-ng-c2740438498]{padding-bottom:16px;overflow:unset}mat-sidenav-container[_ngcontent-ng-c2740438498]   mat-sidenav-content[_ngcontent-ng-c2740438498]     .layout_body{display:flex;flex-direction:row}mat-sidenav-container[_ngcontent-ng-c2740438498]   mat-sidenav-content[_ngcontent-ng-c2740438498]     .layout_body ay-sidebar-mini{width:var(--sidebar-mini-width);flex-shrink:0;flex-grow:0}mat-sidenav-container[_ngcontent-ng-c2740438498]   mat-sidenav-content[_ngcontent-ng-c2740438498]     .layout_body .layout_body_content{width:var(--sidenav-content-width);transition-property:width;transition-timing-function:var(--tw-ease, var(--default-transition-timing-function, cubic-bezier(.4, 0, .2, 1)));transition-duration:var(--tw-duration, var(--default-transition-duration, .15s));transition-delay:.2s;--tw-duration: .4s;transition-duration:.4s}@property --tw-duration{syntax: "*"; inherits: false;}@layer properties{@supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))){*[_ngcontent-ng-c2740438498], [_ngcontent-ng-c2740438498]:before, [_ngcontent-ng-c2740438498]:after, [_ngcontent-ng-c2740438498]::backdrop{--tw-duration: initial}}}
</style><style ng-app-id="ng">.mat-drawer-container {
  position: relative;
  z-index: 1;
  color: var(--mat-sidenav-content-text-color, var(--mat-sys-on-background));
  background-color: var(--mat-sidenav-content-background-color, var(--mat-sys-background));
  box-sizing: border-box;
  display: block;
  overflow: hidden;
}
.mat-drawer-container[fullscreen] {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
}
.mat-drawer-container[fullscreen].mat-drawer-container-has-open {
  overflow: hidden;
}
.mat-drawer-container.mat-drawer-container-explicit-backdrop .mat-drawer-side {
  z-index: 3;
}
.mat-drawer-container.ng-animate-disabled .mat-drawer-backdrop,
.mat-drawer-container.ng-animate-disabled .mat-drawer-content, .ng-animate-disabled .mat-drawer-container .mat-drawer-backdrop,
.ng-animate-disabled .mat-drawer-container .mat-drawer-content {
  transition: none;
}

.mat-drawer-backdrop {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  display: block;
  z-index: 3;
  visibility: hidden;
}
.mat-drawer-backdrop.mat-drawer-shown {
  visibility: visible;
  background-color: var(--mat-sidenav-scrim-color, color-mix(in srgb, var(--mat-sys-neutral-variant20) 40%, transparent));
}
.mat-drawer-transition .mat-drawer-backdrop {
  transition-duration: 400ms;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-property: background-color, visibility;
}
@media (forced-colors: active) {
  .mat-drawer-backdrop {
    opacity: 0.5;
  }
}

.mat-drawer-content {
  position: relative;
  z-index: 1;
  display: block;
  height: 100%;
  overflow: auto;
}
.mat-drawer-content.mat-drawer-content-hidden {
  opacity: 0;
}
.mat-drawer-transition .mat-drawer-content {
  transition-duration: 400ms;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-property: transform, margin-left, margin-right;
}

.mat-drawer {
  position: relative;
  z-index: 4;
  color: var(--mat-sidenav-container-text-color, var(--mat-sys-on-surface-variant));
  box-shadow: var(--mat-sidenav-container-elevation-shadow, none);
  background-color: var(--mat-sidenav-container-background-color, var(--mat-sys-surface));
  border-top-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-bottom-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  width: var(--mat-sidenav-container-width, 360px);
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 3;
  outline: 0;
  box-sizing: border-box;
  overflow-y: auto;
  transform: translate3d(-100%, 0, 0);
}
@media (forced-colors: active) {
  .mat-drawer, [dir=rtl] .mat-drawer.mat-drawer-end {
    border-right: solid 1px currentColor;
  }
}
@media (forced-colors: active) {
  [dir=rtl] .mat-drawer, .mat-drawer.mat-drawer-end {
    border-left: solid 1px currentColor;
    border-right: none;
  }
}
.mat-drawer.mat-drawer-side {
  z-index: 2;
}
.mat-drawer.mat-drawer-end {
  right: 0;
  transform: translate3d(100%, 0, 0);
  border-top-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-bottom-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
[dir=rtl] .mat-drawer {
  border-top-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-bottom-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  transform: translate3d(100%, 0, 0);
}
[dir=rtl] .mat-drawer.mat-drawer-end {
  border-top-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-bottom-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  left: 0;
  right: auto;
  transform: translate3d(-100%, 0, 0);
}
.mat-drawer-transition .mat-drawer {
  transition: transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1);
}
.mat-drawer:not(.mat-drawer-opened):not(.mat-drawer-animating) {
  visibility: hidden;
  box-shadow: none;
}
.mat-drawer:not(.mat-drawer-opened):not(.mat-drawer-animating) .mat-drawer-inner-container {
  display: none;
}
.mat-drawer.mat-drawer-opened.mat-drawer-opened {
  transform: none;
}

.mat-drawer-side {
  box-shadow: none;
  border-right-color: var(--mat-sidenav-container-divider-color, transparent);
  border-right-width: 1px;
  border-right-style: solid;
}
.mat-drawer-side.mat-drawer-end {
  border-left-color: var(--mat-sidenav-container-divider-color, transparent);
  border-left-width: 1px;
  border-left-style: solid;
  border-right: none;
}
[dir=rtl] .mat-drawer-side {
  border-left-color: var(--mat-sidenav-container-divider-color, transparent);
  border-left-width: 1px;
  border-left-style: solid;
  border-right: none;
}
[dir=rtl] .mat-drawer-side.mat-drawer-end {
  border-right-color: var(--mat-sidenav-container-divider-color, transparent);
  border-right-width: 1px;
  border-right-style: solid;
  border-left: none;
}

.mat-drawer-inner-container {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.mat-sidenav-fixed {
  position: fixed;
}
</style><style ng-app-id="ng">.cdk-visually-hidden {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  white-space: nowrap;
  outline: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  left: 0;
}
[dir=rtl] .cdk-visually-hidden {
  left: auto;
  right: 0;
}
</style></head>
  <body><!--nghm-->
    <chat-root ng-version="21.2.9" ngh="3" ng-server-context="ssg"><router-outlet></router-outlet><chat-layout _nghost-ng-c2740438498 style="--sidenav-content-width: calc(100vw - var(--sidebar-mini-width)); --sidebar-mini-width: 74px; --sidebar-width: 236px;" ngh="2"><mat-sidenav-container _ngcontent-ng-c2740438498 class="mat-drawer-container mat-sidenav-container" ngh="0"><!----><mat-sidenav _ngcontent-ng-c2740438498 class="mat-drawer mat-sidenav mat-drawer-side mat-sidenav-fixed" style="top: 0px; bottom: 0px;" ngh="1"><div cdkscrollable class="mat-drawer-inner-container"> testfadfasf </div></mat-sidenav><mat-sidenav-content _ngcontent-ng-c2740438498 class="mat-drawer-content mat-sidenav-content" ngh="1"><div _ngcontent-ng-c2740438498 class="layout_body"><div _ngcontent-ng-c2740438498 class="layout_body_content"><router-outlet _ngcontent-ng-c2740438498></router-outlet><!----></div></div></mat-sidenav-content><!----></mat-sidenav-container></chat-layout><!----></chat-root>
  <link rel="modulepreload" href="chunk-TDWO7VIG.js"><link rel="modulepreload" href="chunk-WZTLSYFA.js"><script src="main-4WTUCLKI.js" type="module"></script>

<script id="ng-state" type="application/json">{"__nghData__":[{"t":{"0":"t0","3":"t1"},"c":{"0":[],"3":[]},"n":{"3":"hfn3"}},{},{"n":{"1":"0fn","3":"1f2","4":"0fn2","5":"4f"},"c":{"7":[]}},{"c":{"0":[{"i":"c2740438498","r":1}]}}]}</script></body></html>`;