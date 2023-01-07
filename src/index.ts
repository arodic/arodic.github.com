export * from 'io-gui';
import { IoStorage as $, IoNavigator, RegisterIoElement, Property, MenuOptions } from 'io-gui';

const OPTIONS = new MenuOptions([
  'About',
  {value: 'Projects', options: [
    'WebGL Jellyfish',
    'Dreams of Black',
    'Daily Routines',
    'Flux Factory',
    'Just Reflector',
    'Star Wars 1313',
    'TED Installation'
  ]},
  'Contact'
], {
  path: $({key: 'path', storage: 'hash', value: 'About'}),
} as any);

@RegisterIoElement
export class IoMainPage extends IoNavigator {

  @Property(true)
  declare cache: boolean;

  @Property(true)
  declare precache: boolean;

  @Property({value: OPTIONS})
  declare options: MenuOptions;

  @Property(OPTIONS.bind('first'))
  declare selected: string;

  @Property('main')
  declare role: string;

  @Property('main')
  declare class: string;

  init() {
    this.elements = [
    ['io-md-view', {id: 'About', class: 'about', src :'./docs/about.md'}],
    ['io-navigator', {
      id: 'Projects',
      cache: true,
      precache: true,
      menu: 'left',
      class: 'projects',
      options: OPTIONS.getItem('Projects').options,
      elements: [
        ['io-md-view', {id: 'WebGL Jellyfish', src :'./docs/archive/webgl-jellyfish.md'}],
        ['io-md-view', {id: 'Dreams of Black', src :'./docs/archive/rome.md'}],
        ['io-md-view', {id: 'Daily Routines', src :'./docs/archive/daily-routines.md'}],
        ['io-md-view', {id: 'Flux Factory', src :'./docs/archive/flux-factory.md'}],
        ['io-md-view', {id: 'Just Reflector', src :'./docs/archive/just-a-reflector.md'}],
        ['io-md-view', {id: 'Star Wars 1313', src :'./docs/archive/star-wars-1313.md'}],
        ['io-md-view', {id: 'TED Installation', src :'./docs/archive/unnumbered-sparks.md'}],
      ]
    }],
    ['io-md-view', {id: 'Contact', src :'./docs/contact.md'}],
    ];
  }
}
