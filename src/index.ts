export * from 'io-gui';
import { IoStorage as $, IoSelectorTabs, RegisterIoElement, Property, Options, Item, Path } from 'io-gui';

const OPTIONS = new Options([
  new Item('About'),
  new Item({value: 'Projects', options: new Options([
    'WebGL Jellyfish',
    'Dreams of Black',
    'Daily Routines',
    'Flux Factory',
    'Just Reflector',
    'Star Wars 1313',
    'TED Installation'
  ])}),
  new Item('Contact')
], {
  path: new Path({string: $({key: 'page', storage: 'hash', value: 'About'})}),
});

@RegisterIoElement
export class IoMainPage extends IoSelectorTabs {

  @Property(true)
  declare precache: boolean;

  @Property({value: OPTIONS})
  declare options: string;

  @Property(OPTIONS.path.bind('root'))
  declare selected: string;

  @Property('main')
  declare role: string;

  @Property('main')
  declare class: string;

  init() {
    this.elements = [
    ['io-md-view', {name: 'About', class: 'about', path :'./docs/about.md'}],
    ['io-selector-sidebar', {
      name: 'Projects',
      precache: true,
      class: 'projects',
      vertical: true,
      selected: OPTIONS.option('Projects').path.bind('leaf'),
      options: OPTIONS.option('Projects').options,
      elements: [
        ['io-md-view', {name: 'WebGL Jellyfish', path :'./docs/archive/webgl-jellyfish.md'}],
        ['io-md-view', {name: 'Dreams of Black', path :'./docs/archive/rome.md'}],
        ['io-md-view', {name: 'Daily Routines', path :'./docs/archive/daily-routines.md'}],
        ['io-md-view', {name: 'Flux Factory', path :'./docs/archive/flux-factory.md'}],
        ['io-md-view', {name: 'Just Reflector', path :'./docs/archive/just-a-reflector.md'}],
        ['io-md-view', {name: 'Star Wars 1313', path :'./docs/archive/star-wars-1313.md'}],
        ['io-md-view', {name: 'TED Installation', path :'./docs/archive/unnumbered-sparks.md'}],
      ]
    }],
    ['io-md-view', {name: 'Contact', path :'./docs/contact.md'}],
    ];
  }
}
