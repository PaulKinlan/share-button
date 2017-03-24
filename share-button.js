/* Copyright 2017 Google Inc

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

class ShareButton extends HTMLElement {

  get shareData() {
    return {
      url: this.url.value,
      text: undefined
    };
  }
  
  get template() {
    if(this._template) return this._template;
    else {
      this._template = document.createElement('template');
      
      let styles = document.createElement('style');
      styles.innerHTML = `:host {
        display: inline-block;
        --share-button-background: url(https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_share_black_24px.svg) center/18px no-repeat;
 
        --overlay-background-color: white;
        --overlay-background-border: 1px solid #ccc;
      }
           
      .visible {
        display: block !important;
      }
      
      #share-btn {
        background: initial;
        border: none;
        min-height: 25px;
        min-width: 25px;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      
      :host-context(:empty) #share-btn {
        background: var(--share-button-background);
      }
            
      #overlay {
        background-color: var(--overlay-background-color);
        display: none;
        padding: 1em;
        top: 0;
        margin: auto;
        left: 0;
        right: 0;
        max-width: 300px;
      }
      
      #overlay.visible {
        display: inline-block !important;
        border: var(--overlay-background-border);
        position: fixed;
      }
      
      #services {
        padding-left: 0;
      }
      
      #copy {
        display: none;
      }
      
      #copy.visible {
        display: block !important;
      }
      
      #copy {
        height: 25px;
        width: 25px;
        margin: 0 0 0 0.5em;
        padding: 1em;
      }

      #copy img {
        transform: translate(-50%, -50%);
      }
      
      #android {
        display: none;
        height: 25px;
        width: 25px;
        margin: 0 0 0 0.5em;
        padding: 1em;
      }

      #android img {
        transform: translate(-50%, -50%);
      }
      
      div.buttons {
        overflow-x: auto;
        max-height: 2em;
        display: flex;
        flex-direction: row;
      }
      
      slot[name=buttons] {
        min-height: 1em;
        background-color: red;
      }

      slot[name=clipboard]::slotted(*) {
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
      }

      slot[name=android]::slotted(*) {
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
      }

      slot[name=buttons]:empty {
        display: none;
      }
                      
      #android.visible {
        display: block !important;
      }
      
      #urlbar {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      
      #url {
        width: 100%;
        padding: 0.5em 0.5em;
      }`;

      let button = document.createElement('button');
      button.id='share-btn';
      button.innerHTML='<slot></slot>';
      
      let overlay = document.createElement('div');
      overlay.id = 'overlay';
      overlay.innerHTML = `
        <div id="urlbar">
          <input type="url" id="url" />
          <button id="copy" aria-label="Copy to clipboard"><slot name="clipboard"><img src="https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_content_copy_black_24px.svg"></slot></button>
          <button id="android" aria-label="Share on Android"><slot name="android"><img src="https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_android_black_24px.svg"></slot></button>  
        </div>
        <div class="buttons">
          <slot name="buttons"></slot>
        </div>`;
      this._template.content.appendChild(styles);
      this._template.content.appendChild(button);
      this._template.content.appendChild(overlay);
      
      return this._template;
    }
  }
  
  constructor() {
    super();
    
    const root = this.attachShadow({mode:'open'});
    root.appendChild(this.template.content.cloneNode(true));
    
    // Handle click events on the main element.
    root.host.addEventListener('click', e => {
      e.preventDefault();
      this.toggleOverlay();
      return false;
    }, false);
    
    // Dismiss the overlay on any keypress.
    root.host.addEventListener('keypress', e => this.toggleOverlay());
    
    // Dismiss the overlay on any interaction on the page
    
    document.documentElement.addEventListener('click', e => {
      if(e.target != root.host){
        this.hide();
      }
    }, true);
    
    this.shareBtn = root.getElementById('share-btn');
    this.overlay = root.getElementById('overlay');
    
    this.copy = root.getElementById('copy');
    this.copy.addEventListener('click', e => {
      e.stopPropagation();
      e.preventDefault();
      e.cancelBubble = true;
      
      this.copyUrl();
 
    });
    
    this.android = root.getElementById('android');
    this.android.addEventListener('click', e => {
      const fallbackUrl = encodeURIComponent("https://twitter.com/intent/tweet");
      
      window.location = `intent:#Intent;action=android.intent.action.SEND;type=text/plain;S.android.intent.extra.TEXT=${encodeURIComponent(this.url.value)};S.android.intent.extra.SUBJECT=${document.title};S.browser_fallback_url=${fallbackUrl}?text=${encodeURIComponent(document.title)}&${encodeURIComponent(window.location)};end`;
    });     
    
    if(navigator.userAgent.indexOf('Android') > 0) {
      this.android.classList.add('visible');
    }
    
    this.url = root.getElementById('url');
    
    this.url.addEventListener('click', e => {

      e.stopPropagation();
      e.preventDefault();
      e.cancelBubble = true;
      
      return false;
    }, false);
    
    this.url.addEventListener('keypress', e => {
      e.stopPropagation();
      e.cancelBubble = true;
      
      if(e.charCode == 13) {
        window.location = e.currentTarget.value;
      }
    });
    
    this.url.value = window.location;
    
    if(document.queryCommandSupported && document.queryCommandSupported('copy')) {
        this.copy.classList.toggle('visible');
    }
  }
  
  copyUrl() {
    window.getSelection().removeAllRanges();
    
    const range = document.createRange();
    range.selectNode(this.url);
    window.getSelection().addRange(range);
    
    try {
      const result = document.execCommand('copy');
      window.getSelection().removeAllRanges();
      this.toggleOverlay();
      return result;
    }
    catch(error) {
      console.error(error);
    }
    
    return false;
  }
  
  hide() {
    this.overlay.classList.remove('visible');
  }
  
  show() {
     this.overlay.classList.add('visible');
  }
 
  toggleOverlay () {
    // User has clicked on the Share button
    this.overlay.classList.toggle('visible');
  }
  
};

customElements.define('share-button', ShareButton);