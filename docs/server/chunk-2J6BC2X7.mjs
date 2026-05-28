import './polyfills.server.mjs';
import{a as A,b as we,d as ve,e as Y,f as be,g as ye,h as Ce,i as ke,j as b,l as Me,m as De,n as Te,o as M,p as Fe,q as ee,r as Be}from"./chunk-4RUCJ7V7.mjs";import{$ as x,Aa as F,Ab as ge,Ba as _,C as L,Ca as d,D as Z,Da as J,E as q,Ea as X,F as ce,Fa as g,G as B,Ga as w,H as P,Ha as C,Ia as u,Ja as _e,K as y,Ka as k,L as le,Nb as xe,O,P as I,Pa as v,Pb as Se,Q as he,Sb as Ee,Ua as R,aa as U,c as p,da as me,f as N,h as ae,i as D,ia as m,ja as pe,k as oe,l as se,m as Q,ma as f,q as H,r as c,ra as K,sa as S,ta as E,u as de,ua as ue,v as G,va as l,wa as h,x as i,xa as fe,ya as $,za as T}from"./chunk-XUZD75OF.mjs";import"./chunk-T55IDOPT.mjs";var j=["*"],Ae=["content"],Ve=[[["mat-drawer"]],[["mat-drawer-content"]],"*"],ze=["mat-drawer","mat-drawer-content","*"];function je(r,o){if(r&1){let e=$();l(0,"div",1),T("click",function(){L(e);let n=F();return Z(n._onBackdropClicked())}),h()}if(r&2){let e=F();u("mat-drawer-shown",e._isShowingBackdrop())}}function We(r,o){r&1&&(l(0,"mat-drawer-content"),d(1,2),h())}var Ne=[[["mat-sidenav"]],[["mat-sidenav-content"]],"*"],Qe=["mat-sidenav","mat-sidenav-content","*"];function He(r,o){if(r&1){let e=$();l(0,"div",1),T("click",function(){L(e);let n=F();return Z(n._onBackdropClicked())}),h()}if(r&2){let e=F();u("mat-drawer-shown",e._isShowingBackdrop())}}function Ge(r,o){r&1&&(l(0,"mat-sidenav-content"),d(1,2),h())}var Le=`.mat-drawer-container {
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
`;var Ze=new G("MAT_DRAWER_DEFAULT_AUTOSIZE",{providedIn:"root",factory:()=>!1}),re=new G("MAT_DRAWER_CONTAINER"),V=(()=>{class r extends M{_platform=i(A);_changeDetectorRef=i(R);_container=i(ne);constructor(){let e=i(I),t=i(Te),n=i(P);super(e,t,n)}ngAfterContentInit(){this._container._contentMarginChanges.subscribe(()=>{this._changeDetectorRef.markForCheck()})}_shouldBeHidden(){if(this._platform.isBrowser)return!1;let{start:e,end:t}=this._container;return e!=null&&e.mode!=="over"&&e.opened||t!=null&&t.mode!=="over"&&t.opened}static \u0275fac=function(t){return new(t||r)};static \u0275cmp=m({type:r,selectors:[["mat-drawer-content"]],hostAttrs:[1,"mat-drawer-content"],hostVars:6,hostBindings:function(t,n){t&2&&(C("margin-left",n._container._contentMargins.left,"px")("margin-right",n._container._contentMargins.right,"px"),u("mat-drawer-content-hidden",n._shouldBeHidden()))},features:[k([{provide:M,useExisting:r}]),f],ngContentSelectors:j,decls:1,vars:0,template:function(t,n){t&1&&(_(),d(0))},encapsulation:2,changeDetection:0})}return r})(),te=(()=>{class r{_elementRef=i(I);_focusTrapFactory=i(Ce);_focusMonitor=i(be);_platform=i(A);_ngZone=i(P);_renderer=i(me);_interactivityChecker=i(ye);_doc=i(ce);_container=i(re,{optional:!0});_focusTrap=null;_elementFocusedBeforeDrawerWasOpened=null;_eventCleanups;_isAttached=!1;_anchor=null;get position(){return this._position}set position(e){e=e==="end"?"end":"start",e!==this._position&&(this._isAttached&&this._updatePositionInParent(e),this._position=e,this.onPositionChanged.emit())}_position="start";get mode(){return this._mode}set mode(e){this._mode=e,this._updateFocusTrapState(),this._modeChanged.next()}_mode="over";get disableClose(){return this._disableClose}set disableClose(e){this._disableClose=b(e)}_disableClose=!1;get autoFocus(){let e=this._autoFocus;return e??(this.mode==="side"?"dialog":"first-tabbable")}set autoFocus(e){(e==="true"||e==="false"||e==null)&&(e=b(e)),this._autoFocus=e}_autoFocus;get opened(){return this._opened()}set opened(e){this.toggle(b(e))}_opened=y(!1);_openedVia=null;_animationStarted=new p;_animationEnd=new p;openedChange=new B(!0);_openedStream=this.openedChange.pipe(D(e=>e),N(()=>{}));openedStart=this._animationStarted.pipe(D(()=>this.opened),Q(void 0));_closedStream=this.openedChange.pipe(D(e=>!e),N(()=>{}));closedStart=this._animationStarted.pipe(D(()=>!this.opened),Q(void 0));_destroyed=new p;onPositionChanged=new B;_content;_modeChanged=new p;_injector=i(q);_changeDetectorRef=i(R);constructor(){this.openedChange.pipe(c(this._destroyed)).subscribe(e=>{e?(this._elementFocusedBeforeDrawerWasOpened=this._doc.activeElement,this._takeFocus()):this._isFocusWithinDrawer()&&this._restoreFocus(this._openedVia||"program")}),this._eventCleanups=this._ngZone.runOutsideAngular(()=>{let e=this._renderer,t=this._elementRef.nativeElement;return[e.listen(t,"keydown",n=>{n.keyCode===27&&!this.disableClose&&!ke(n)&&this._ngZone.run(()=>{this.close(),n.stopPropagation(),n.preventDefault()})}),e.listen(t,"transitionend",this._handleTransitionEvent),e.listen(t,"transitioncancel",this._handleTransitionEvent)]}),this._animationEnd.subscribe(()=>{this.openedChange.emit(this.opened)})}_forceFocus(e,t){this._interactivityChecker.isFocusable(e)||(e.tabIndex=-1,this._ngZone.runOutsideAngular(()=>{let n=()=>{a(),s(),e.removeAttribute("tabindex")},a=this._renderer.listen(e,"blur",n),s=this._renderer.listen(e,"mousedown",n)})),e.focus(t)}_focusByCssSelector(e,t){let n=this._elementRef.nativeElement.querySelector(e);n&&this._forceFocus(n,t)}_takeFocus(){if(!this._focusTrap)return;let e=this._elementRef.nativeElement;switch(this.autoFocus){case!1:case"dialog":return;case!0:case"first-tabbable":U(()=>{!this._focusTrap.focusInitialElement()&&typeof e.focus=="function"&&e.focus()},{injector:this._injector});break;case"first-heading":this._focusByCssSelector('h1, h2, h3, h4, h5, h6, [role="heading"]');break;default:this._focusByCssSelector(this.autoFocus);break}}_restoreFocus(e){this.autoFocus!=="dialog"&&(this._elementFocusedBeforeDrawerWasOpened?this._focusMonitor.focusVia(this._elementFocusedBeforeDrawerWasOpened,e):this._elementRef.nativeElement.blur(),this._elementFocusedBeforeDrawerWasOpened=null)}_isFocusWithinDrawer(){let e=this._doc.activeElement;return!!e&&this._elementRef.nativeElement.contains(e)}ngAfterViewInit(){this._isAttached=!0,this._position==="end"&&this._updatePositionInParent("end"),this._platform.isBrowser&&(this._focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement),this._updateFocusTrapState())}ngOnDestroy(){this._eventCleanups.forEach(e=>e()),this._focusTrap?.destroy(),this._anchor?.remove(),this._anchor=null,this._animationStarted.complete(),this._animationEnd.complete(),this._modeChanged.complete(),this._destroyed.next(),this._destroyed.complete()}open(e){return this.toggle(!0,e)}close(){return this.toggle(!1)}_closeViaBackdropClick(){return this._setOpen(!1,!0,"mouse")}toggle(e=!this.opened,t){e&&t&&(this._openedVia=t);let n=this._setOpen(e,!e&&this._isFocusWithinDrawer(),this._openedVia||"program");return e||(this._openedVia=null),n}_setOpen(e,t,n){return e===this.opened?Promise.resolve(e?"open":"close"):(this._opened.set(e),this._container?._transitionsEnabled?(this._setIsAnimating(!0),setTimeout(()=>this._animationStarted.next())):setTimeout(()=>{this._animationStarted.next(),this._animationEnd.next()}),this._elementRef.nativeElement.classList.toggle("mat-drawer-opened",e),!e&&t&&this._restoreFocus(n),this._changeDetectorRef.markForCheck(),this._updateFocusTrapState(),new Promise(a=>{this.openedChange.pipe(se(1)).subscribe(s=>a(s?"open":"close"))}))}_setIsAnimating(e){this._elementRef.nativeElement.classList.toggle("mat-drawer-animating",e)}_getWidth(){return this._elementRef.nativeElement.offsetWidth||0}_updateFocusTrapState(){this._focusTrap&&(this._focusTrap.enabled=this.opened&&!!this._container?._isShowingBackdrop())}_updatePositionInParent(e){if(!this._platform.isBrowser)return;let t=this._elementRef.nativeElement,n=t.parentNode;e==="end"?(this._anchor||(this._anchor=this._doc.createComment("mat-drawer-anchor"),n.insertBefore(this._anchor,t)),n.appendChild(t)):this._anchor&&this._anchor.parentNode.insertBefore(t,this._anchor)}_handleTransitionEvent=e=>{let t=this._elementRef.nativeElement;e.target===t&&this._ngZone.run(()=>{e.type==="transitionend"&&this._setIsAnimating(!1),this._animationEnd.next(e)})};static \u0275fac=function(t){return new(t||r)};static \u0275cmp=m({type:r,selectors:[["mat-drawer"]],viewQuery:function(t,n){if(t&1&&X(Ae,5),t&2){let a;g(a=w())&&(n._content=a.first)}},hostAttrs:[1,"mat-drawer"],hostVars:12,hostBindings:function(t,n){t&2&&(K("align",null)("tabIndex",n.mode!=="side"?"-1":null),C("visibility",!n._container&&!n.opened?"hidden":null),u("mat-drawer-end",n.position==="end")("mat-drawer-over",n.mode==="over")("mat-drawer-push",n.mode==="push")("mat-drawer-side",n.mode==="side"))},inputs:{position:"position",mode:"mode",disableClose:"disableClose",autoFocus:"autoFocus",opened:"opened"},outputs:{openedChange:"openedChange",_openedStream:"opened",openedStart:"openedStart",_closedStream:"closed",closedStart:"closedStart",onPositionChanged:"positionChanged"},exportAs:["matDrawer"],ngContentSelectors:j,decls:3,vars:0,consts:[["content",""],["cdkScrollable","",1,"mat-drawer-inner-container"]],template:function(t,n){t&1&&(_(),l(0,"div",1,0),d(2),h())},dependencies:[M],encapsulation:2,changeDetection:0})}return r})(),ne=(()=>{class r{_dir=i(Me,{optional:!0});_element=i(I);_ngZone=i(P);_changeDetectorRef=i(R);_animationDisabled=ve();_transitionsEnabled=!1;_allDrawers;_drawers=new he;_content;_userContent;get start(){return this._start}get end(){return this._end}get autosize(){return this._autosize}set autosize(e){this._autosize=b(e)}_autosize=i(Ze);get hasBackdrop(){return this._drawerHasBackdrop(this._start)||this._drawerHasBackdrop(this._end)}set hasBackdrop(e){this._backdropOverride=e==null?null:b(e)}_backdropOverride=null;backdropClick=new B;_start=null;_end=null;_left=null;_right=null;_destroyed=new p;_doCheckSubject=new p;_contentMargins={left:null,right:null};_contentMarginChanges=new p;get scrollable(){return this._userContent||this._content}_injector=i(q);constructor(){let e=i(A),t=i(Fe);this._dir?.change.pipe(c(this._destroyed)).subscribe(()=>{this._validateDrawers(),this.updateContentMargins()}),t.change().pipe(c(this._destroyed)).subscribe(()=>this.updateContentMargins()),!this._animationDisabled&&e.isBrowser&&this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{this._element.nativeElement.classList.add("mat-drawer-transition"),this._transitionsEnabled=!0},200)})}ngAfterContentInit(){this._allDrawers.changes.pipe(H(this._allDrawers),c(this._destroyed)).subscribe(e=>{this._drawers.reset(e.filter(t=>!t._container||t._container===this)),this._drawers.notifyOnChanges()}),this._drawers.changes.pipe(H(null)).subscribe(()=>{this._validateDrawers(),this._drawers.forEach(e=>{this._watchDrawerToggle(e),this._watchDrawerPosition(e),this._watchDrawerMode(e)}),(!this._drawers.length||this._isDrawerOpen(this._start)||this._isDrawerOpen(this._end))&&this.updateContentMargins(),this._changeDetectorRef.markForCheck()}),this._ngZone.runOutsideAngular(()=>{this._doCheckSubject.pipe(oe(10),c(this._destroyed)).subscribe(()=>this.updateContentMargins())})}ngOnDestroy(){this._contentMarginChanges.complete(),this._doCheckSubject.complete(),this._drawers.destroy(),this._destroyed.next(),this._destroyed.complete()}open(){this._drawers.forEach(e=>e.open())}close(){this._drawers.forEach(e=>e.close())}updateContentMargins(){let e=0,t=0;if(this._left&&this._left.opened){if(this._left.mode=="side")e+=this._left._getWidth();else if(this._left.mode=="push"){let n=this._left._getWidth();e+=n,t-=n}}if(this._right&&this._right.opened){if(this._right.mode=="side")t+=this._right._getWidth();else if(this._right.mode=="push"){let n=this._right._getWidth();t+=n,e-=n}}e=e||null,t=t||null,(e!==this._contentMargins.left||t!==this._contentMargins.right)&&(this._contentMargins={left:e,right:t},this._ngZone.run(()=>this._contentMarginChanges.next(this._contentMargins)))}ngDoCheck(){this._autosize&&this._isPushed()&&this._ngZone.runOutsideAngular(()=>this._doCheckSubject.next())}_watchDrawerToggle(e){e._animationStarted.pipe(c(this._drawers.changes)).subscribe(()=>{this.updateContentMargins(),this._changeDetectorRef.markForCheck()}),e.mode!=="side"&&e.openedChange.pipe(c(this._drawers.changes)).subscribe(()=>this._setContainerClass(e.opened))}_watchDrawerPosition(e){e.onPositionChanged.pipe(c(this._drawers.changes)).subscribe(()=>{U({read:()=>this._validateDrawers()},{injector:this._injector})})}_watchDrawerMode(e){e._modeChanged.pipe(c(ae(this._drawers.changes,this._destroyed))).subscribe(()=>{this.updateContentMargins(),this._changeDetectorRef.markForCheck()})}_setContainerClass(e){let t=this._element.nativeElement.classList,n="mat-drawer-container-has-open";e?t.add(n):t.remove(n)}_validateDrawers(){this._start=this._end=null,this._drawers.forEach(e=>{e.position=="end"?(this._end!=null,this._end=e):(this._start!=null,this._start=e)}),this._right=this._left=null,this._dir&&this._dir.value==="rtl"?(this._left=this._end,this._right=this._start):(this._left=this._start,this._right=this._end)}_isPushed(){return this._isDrawerOpen(this._start)&&this._start.mode!="over"||this._isDrawerOpen(this._end)&&this._end.mode!="over"}_onBackdropClicked(){this.backdropClick.emit(),this._closeModalDrawersViaBackdrop()}_closeModalDrawersViaBackdrop(){[this._start,this._end].filter(e=>e&&!e.disableClose&&this._drawerHasBackdrop(e)).forEach(e=>e._closeViaBackdropClick())}_isShowingBackdrop(){return this._isDrawerOpen(this._start)&&this._drawerHasBackdrop(this._start)||this._isDrawerOpen(this._end)&&this._drawerHasBackdrop(this._end)}_isDrawerOpen(e){return e!=null&&e.opened}_drawerHasBackdrop(e){return this._backdropOverride==null?!!e&&e.mode!=="side":this._backdropOverride}static \u0275fac=function(t){return new(t||r)};static \u0275cmp=m({type:r,selectors:[["mat-drawer-container"]],contentQueries:function(t,n,a){if(t&1&&J(a,V,5)(a,te,5),t&2){let s;g(s=w())&&(n._content=s.first),g(s=w())&&(n._allDrawers=s)}},viewQuery:function(t,n){if(t&1&&X(V,5),t&2){let a;g(a=w())&&(n._userContent=a.first)}},hostAttrs:[1,"mat-drawer-container"],hostVars:2,hostBindings:function(t,n){t&2&&u("mat-drawer-container-explicit-backdrop",n._backdropOverride)},inputs:{autosize:"autosize",hasBackdrop:"hasBackdrop"},outputs:{backdropClick:"backdropClick"},exportAs:["matDrawerContainer"],features:[k([{provide:re,useExisting:r}])],ngContentSelectors:ze,decls:4,vars:2,consts:[[1,"mat-drawer-backdrop",3,"mat-drawer-shown"],[1,"mat-drawer-backdrop",3,"click"]],template:function(t,n){t&1&&(_(Ve),S(0,je,1,2,"div",0),d(1),d(2,1),S(3,We,2,0,"mat-drawer-content")),t&2&&(E(n.hasBackdrop?0:-1),x(3),E(n._content?-1:3))},dependencies:[V],styles:[`.mat-drawer-container {
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
`],encapsulation:2,changeDetection:0})}return r})(),z=(()=>{class r extends V{static \u0275fac=(()=>{let e;return function(n){return(e||(e=O(r)))(n||r)}})();static \u0275cmp=m({type:r,selectors:[["mat-sidenav-content"]],hostAttrs:[1,"mat-drawer-content","mat-sidenav-content"],features:[k([{provide:M,useExisting:r}]),f],ngContentSelectors:j,decls:1,vars:0,template:function(t,n){t&1&&(_(),d(0))},encapsulation:2,changeDetection:0})}return r})(),ie=(()=>{class r extends te{get fixedInViewport(){return this._fixedInViewport}set fixedInViewport(e){this._fixedInViewport=b(e)}_fixedInViewport=!1;get fixedTopGap(){return this._fixedTopGap}set fixedTopGap(e){this._fixedTopGap=Y(e)}_fixedTopGap=0;get fixedBottomGap(){return this._fixedBottomGap}set fixedBottomGap(e){this._fixedBottomGap=Y(e)}_fixedBottomGap=0;static \u0275fac=(()=>{let e;return function(n){return(e||(e=O(r)))(n||r)}})();static \u0275cmp=m({type:r,selectors:[["mat-sidenav"]],hostAttrs:[1,"mat-drawer","mat-sidenav"],hostVars:16,hostBindings:function(t,n){t&2&&(K("tabIndex",n.mode!=="side"?"-1":null)("align",null),C("top",n.fixedInViewport?n.fixedTopGap:null,"px")("bottom",n.fixedInViewport?n.fixedBottomGap:null,"px"),u("mat-drawer-end",n.position==="end")("mat-drawer-over",n.mode==="over")("mat-drawer-push",n.mode==="push")("mat-drawer-side",n.mode==="side")("mat-sidenav-fixed",n.fixedInViewport))},inputs:{fixedInViewport:"fixedInViewport",fixedTopGap:"fixedTopGap",fixedBottomGap:"fixedBottomGap"},exportAs:["matSidenav"],features:[k([{provide:te,useExisting:r}]),f],ngContentSelectors:j,decls:3,vars:0,consts:[["content",""],["cdkScrollable","",1,"mat-drawer-inner-container"]],template:function(t,n){t&1&&(_(),l(0,"div",1,0),d(2),h())},dependencies:[M],encapsulation:2,changeDetection:0})}return r})(),Pe=(()=>{class r extends ne{_allDrawers=void 0;_content=void 0;static \u0275fac=(()=>{let e;return function(n){return(e||(e=O(r)))(n||r)}})();static \u0275cmp=m({type:r,selectors:[["mat-sidenav-container"]],contentQueries:function(t,n,a){if(t&1&&J(a,z,5)(a,ie,5),t&2){let s;g(s=w())&&(n._content=s.first),g(s=w())&&(n._allDrawers=s)}},hostAttrs:[1,"mat-drawer-container","mat-sidenav-container"],hostVars:2,hostBindings:function(t,n){t&2&&u("mat-drawer-container-explicit-backdrop",n._backdropOverride)},exportAs:["matSidenavContainer"],features:[k([{provide:re,useExisting:r},{provide:ne,useExisting:r}]),f],ngContentSelectors:Qe,decls:4,vars:2,consts:[[1,"mat-drawer-backdrop",3,"mat-drawer-shown"],[1,"mat-drawer-backdrop",3,"click"]],template:function(t,n){t&1&&(_(Ne),S(0,He,1,2,"div",0),d(1),d(2,1),S(3,Ge,2,0,"mat-sidenav-content")),t&2&&(E(n.hasBackdrop?0:-1),x(3),E(n._content?-1:3))},dependencies:[z],styles:[Le],encapsulation:2,changeDetection:0})}return r})(),Oe=(()=>{class r{static \u0275fac=function(t){return new(t||r)};static \u0275mod=pe({type:r});static \u0275inj=de({imports:[ee,De,ee]})}return r})();var W=class r extends Se{sidebarService=i(Be);media=i(we);authService=i(Ee);mobileQuery=this.media.matchMedia("(max-width: 1312px)");mobileQueryMatches=y(this.mobileQuery.matches);mode=v(()=>{let o=this.mobileQueryMatches();return!this.sidebarService.showMiniSidebar()||o?"over":"side"});showStartHeader=v(()=>!this.sidebarService.isOpened()||this.mode()==="over");showMiniSidebar=v(()=>this.showStartHeader()&&this.sidebarService.showMiniSidebar());sidebarWidth=y("236px");sidebarMiniDefaultWidth=y("74px");sidebarMiniWidth=v(()=>this.sidebarService.showMiniSidebar()?this.sidebarMiniDefaultWidth():"unset");sideNavContentWith=v(()=>this.showStartHeader()?this.sidebarService.showMiniSidebar()?"calc(100vw - var(--sidebar-mini-width))":"100vw":"calc(100vw - var(--sidebar-width))");updateAccessTokenEvent=v(()=>xe.updateAccessToken({accessToken:this.authService.accessToken()}));refreshTokenEffect=le(()=>{let o=this.sandbox.sharedStore.accessTokenInfo();if(o){let e=o.expired_datetime.getTime()-new Date().getTime();e<=1e4?this.authService.login():setTimeout(()=>{this.authService.login()},e-1e4)}});constructor(){super(),this.dispatchEventFromSignal(this.updateAccessTokenEvent)}ngOnInit(){this.mobileQuery.onchange=o=>{this.mobileQueryMatches.set(o.matches)}}onOpenedChange(o){this.sidebarService.setState(o)}static \u0275fac=function(e){return new(e||r)};static \u0275cmp=m({type:r,selectors:[["chat-layout"]],hostVars:6,hostBindings:function(e,t){e&2&&C("--sidenav-content-width",t.sideNavContentWith())("--sidebar-mini-width",t.sidebarMiniWidth())("--sidebar-width",t.sidebarWidth())},features:[f],decls:8,vars:3,consts:[["sideNav",""],[3,"openedChange","mode","fixedInViewport","opened"],[1,"layout_body"],[1,"layout_body_content"]],template:function(e,t){e&1&&(l(0,"mat-sidenav-container")(1,"mat-sidenav",1,0),T("openedChange",function(a){return t.onOpenedChange(a)}),_e(3," testfadfasf "),h(),l(4,"mat-sidenav-content")(5,"div",2)(6,"div",3),fe(7,"router-outlet"),h()()()()),e&2&&(x(),ue("mode",t.mode())("fixedInViewport",!0)("opened",t.sidebarService.isOpened()))},dependencies:[Oe,ie,Pe,z,ge],styles:[`@layer properties;[_nghost-%COMP%]{position:relative;display:block;height:100%;min-height:100%;width:100%;flex-direction:row}mat-sidenav-container[_ngcontent-%COMP%]{display:flex}mat-sidenav-container[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{background-color:var(--white-color)}mat-sidenav-container[_ngcontent-%COMP%]   mat-sidenav[_ngcontent-%COMP%]{height:100vh;width:var(--sidebar-width);border-radius:0}mat-sidenav-container[_ngcontent-%COMP%]   mat-sidenav-content[_ngcontent-%COMP%]{padding-bottom:16px;overflow:unset}mat-sidenav-container[_ngcontent-%COMP%]   mat-sidenav-content[_ngcontent-%COMP%]     .layout_body{display:flex;flex-direction:row}mat-sidenav-container[_ngcontent-%COMP%]   mat-sidenav-content[_ngcontent-%COMP%]     .layout_body ay-sidebar-mini{width:var(--sidebar-mini-width);flex-shrink:0;flex-grow:0}mat-sidenav-container[_ngcontent-%COMP%]   mat-sidenav-content[_ngcontent-%COMP%]     .layout_body .layout_body_content{width:var(--sidenav-content-width);transition-property:width;transition-timing-function:var(--tw-ease, var(--default-transition-timing-function, cubic-bezier(.4, 0, .2, 1)));transition-duration:var(--tw-duration, var(--default-transition-duration, .15s));transition-delay:.2s;--tw-duration: .4s;transition-duration:.4s}@property --tw-duration{syntax: "*"; inherits: false;}@layer properties{@supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))){*[_ngcontent-%COMP%], [_ngcontent-%COMP%]:before, [_ngcontent-%COMP%]:after, [_ngcontent-%COMP%]::backdrop{--tw-duration: initial}}}
`],changeDetection:0})};var Dt=[{path:"",component:W,providers:[],children:[]}];export{W as LayoutComponent,Dt as SHELL_ROUTES};
