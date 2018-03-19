
import buildShadowRoot from './buildShadowRoot.js';
class BellNote extends HTMLElement {
    constructor() {
        super();
        const html = `
          <style>
              :host {
                font-family: sans-serif;
                text-align: center;
                --size: 1.4em;
                width: var(--size);
                display: inline-block;
                font-size: 10em;
                margin: 0.1em;
                min-height: calc(var(--size) + 0.4em);
                outline: none;
                position: relative;

                --c: #ff2f2f;
                --cs: #ff53ce;
                --d: #ff8130;
                --ds: #ffa770;
                --e: #ffe500;
                --f: #50ea50;
                --fs: #51f7a6;
                --g: #00f1d9;
                --gs: #83fff3;
                --a: #4f89ff;
                --as: #53d5ff;
                --b: #d82ad8;
              }
              :host(:focus) .text {
                outline: 1px solid blue;
              }
              :host(:hover) .remove {
                display: block;
              }
              :host([static]) .remove {
                display: none !important;
              }
              .menu.active {
                display: block;
              }
              .menu {
                display: none;
                font-size: 0.3em;
                list-style: none;
                margin: 0;
                padding: 0;
                text-align: left;
                background: white;
                box-shadow: 0 0 4px rgba(0,0,0,0.3);
                position: absolute;
                z-index: 100;
                top: 4px;
                right: 4px;
                width: 5em;
                border-radius: 0.2em;
              }
              .menu li {
                padding: 2px 8px;
              }
              .menu li:hover {
                background: #eee;
              }
              .remove {
                display: none;
                position: absolute;
                font-size: 0.1em;
                border-radius: 50%;
                height: 1em;
                width: 1em;
                background: red;
                cursor: pointer;
              }
              .word {
                font-size: 0.3em;
              }

              .note {
                --bg-color: transparent;
                background: var(--bg-color);
                border-radius: 50%;
                text-transform: uppercase;
                height: var(--size);
                width: var(--size);
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
              }
              .note sup {
                font-size: 0.6em;
                position: absolute;
                right: -0.2em;
                top: 0.2em;
              }
              :host([note="c"]) .note {
                --bg-color: var(--c);
              }
              :host([note="c#"]) .note {
                --bg-color: var(--cs);
              }
              :host([note="d"]) .note {
                --bg-color: var(--d);
              }
              :host([note="d#"]) .note {
                --bg-color: var(--ds);
              }
              :host([note="e"]) .note {
                --bg-color: var(--e);
              }
              :host([note="f"]) .note {
                --bg-color: var(--f);
              }
              :host([note="f#"]) .note {
                --bg-color: var(--fs);
              }
              :host([note="g"]) .note {
                --bg-color: var(--g);
              }
              :host([note="g#"]) .note {
                --bg-color: var(--gs);
              }
              :host([note="a"]) .note {
                --bg-color: var(--a);
              }
              :host([note="a#"]) .note {
                --bg-color: var(--as);
              }
              :host([note="b"]) .note {
                --bg-color: var(--b);
              }
              @media print {
                .note {
                  -webkit-print-color-adjust: exact;
                  color-adjust: exact;
                }
              }
          </style>
          <section class="beat">
              <span class="remove">x</span>
              <div class="note"></div>
              <div class="word">
                <slot></slot>
              </word>
              <ul class="menu">
                <li>c</li>
                <li>c#</li>
                <li>d</li>
                <li>d#</li>
                <li>e</li>
                <li>f</li>
                <li>f#</li>
                <li>g</li>
                <li>g#</li>
                <li>a</li>
                <li>a#</li>
                <li>b</li>
              </ul>
          </section>
        `;
				buildShadowRoot(html,this);

        this.elems = {
          note: this.shadowRoot.querySelector('.note'),
          remove: this.shadowRoot.querySelector('.remove'),
          menu: this.shadowRoot.querySelector('.menu')
        };

        if(!this.hasAttribute('static')){
          this.elems.remove.addEventListener('click', this.handleRemove.bind(this));
          this.elems.note.addEventListener('click', this.handleNote.bind(this));
          this.elems.menu.addEventListener('click', this.handleSelect.bind(this));
        }
    }

    static get observedAttributes() {
        return [`note`];
    }


    attributeChangedCallback(attrName, oldVal, newVal) {
        if(attrName === 'note'){
          this.elems.note.innerHTML = `${newVal[0]}${newVal.length > 1 ? `<sup>${newVal[1]}</sup>` : ``}`;
        }
    }

    get note() {
      return this.getAttribute('note')
    }
    set note(val) {
      if(val){
        this.setAttribute('note', val);
      }
      else {
        this.removeAttribute('note')
      }
    }

    get static() {
      return this.hasAttribute('static')
    }
    set static(val) {
      if(val){
        this.setAttribute('static', '');
      }
      else {
        this.removeAttribute('static')
      }
    }

    handleRemove(){
      this.remove()
    }

    handleNote(){
      this.elems.menu.classList.toggle('active')
    }

    handleSelect(e){
      this.elems.menu.classList.toggle('active')
      this.note = e.target.innerText;
    }
}

customElements.define('bell-note', BellNote);
export default BellNote;
