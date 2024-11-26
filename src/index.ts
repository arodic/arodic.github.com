export * from 'io-gui';
import { IoStorage as $, IoElement, Register, MenuOptions } from 'io-gui';

type MenuItem = string;
type SubMenu = { value: string; options: string[] };

const PROJECTS: SubMenu = {
  value: 'Projects',
  options: [
    'WebGL Jellyfish',
    'Dreams of Black',
    'Daily Routines',
    'Flux Factory',
    'Just Reflector',
    'Star Wars 1313',
    'TED Installation'
  ]
};

const MENU_STRUCTURE: (MenuItem | SubMenu)[] = [
  'About',
  PROJECTS,
  'Contact'
];

const OPTIONS = new MenuOptions(MENU_STRUCTURE, {
  path: $({key: 'path', storage: 'hash', value: 'About'})
} as any);

@Register
export class IoMainPage extends IoElement {

  static get Style() {
    return /* css */`
      :host {
        display: flex;
        flex: 1 1 auto;
      }
    `;
  }

  init() {
    this.template([
      ['io-navigator-selector', {
        cache: true,
        precache: true,
        menu: 'top',
        options: OPTIONS,
        depth: 0,
        elements: [
          ['io-md-view', {id: 'About', class: 'about', src :'./docs/about.md'}],
          ['io-navigator-selector', {
            id: 'Projects',
            cache: true,
            precache: true,
            options: OPTIONS.getItem('Projects').options,
            class: 'projects',
            elements: [
              ['io-md-view', {id: 'WebGL Jellyfish', src:'./docs/archive/webgl-jellyfish.md', sanitize: false}],
              ['io-md-view', {id: 'Dreams of Black', src:'./docs/archive/rome.md', sanitize: false}],
              ['io-md-view', {id: 'Daily Routines', src:'./docs/archive/daily-routines.md', sanitize: false}],
              ['io-md-view', {id: 'Flux Factory', src:'./docs/archive/flux-factory.md', sanitize: false}],
              ['io-md-view', {id: 'Just Reflector', src:'./docs/archive/just-a-reflector.md', sanitize: false}],
              ['io-md-view', {id: 'Star Wars 1313', src:'./docs/archive/star-wars-1313.md', sanitize: false}],
              ['io-md-view', {id: 'TED Installation', src:'./docs/archive/unnumbered-sparks.md', sanitize: false}],
            ]
          }],
          ['io-md-view', {id: 'Contact', src:'./docs/contact.md'}],
        ]
      }],
    ]);
  }
}
