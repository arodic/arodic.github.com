export * from 'io-gui'
import { Storage as $, IoElement, Register, MenuOption, ioNavigator, ioMarkdown } from 'io-gui'

const MENU = new MenuOption({
  id: 'root',
  options: [
    {id: 'About'},
    new MenuOption({
      id: 'Projects',
      options: [
        {id: 'WebGL Jellyfish'},
        {id: 'Dreams of Black'},
        {id: 'Daily Routines'},
        {id: 'Flux Factory'},
        {id: 'Just Reflector'},
        {id: 'Star Wars 1313'},
        {id: 'TED Installation'},
      ]
    }),
    {id: 'Contact'},
  ],
  path: $({key: 'path', storage: 'hash', value: 'About'})
})

@Register
export class IoMainPage extends IoElement {
  static get Style() {
    return /* css */`
      :host {
        display: flex;
        flex: 1 1 auto;
      }
    `
  }
  init() {
    this.render([
      ioNavigator({
        caching: 'proactive',
        menu: 'top',
        option: MENU,
        depth: 0,
        elements: [
          ioMarkdown({id: 'About', class: 'about', src:'./docs/about.md'}),
          ioNavigator({
            id: 'Projects',
            caching: 'proactive',
            menu: 'left',
            class: 'projects',
            option: MENU.findItemById('Projects') as MenuOption,
            elements: [
              ioMarkdown({id: 'WebGL Jellyfish', class: 'webgl-jellyfish', src:'./docs/archive/webgl-jellyfish.md'}),
              ioMarkdown({id: 'Dreams of Black', class: 'dreams-of-black', src:'./docs/archive/rome.md'}),
              ioMarkdown({id: 'Daily Routines', class: 'daily-routines', src:'./docs/archive/daily-routines.md'}),
              ioMarkdown({id: 'Flux Factory', class: 'flux-factory', src:'./docs/archive/flux-factory.md'}),
              ioMarkdown({id: 'Just Reflector', class: 'just-reflector', src:'./docs/archive/just-a-reflector.md'}),
              ioMarkdown({id: 'Star Wars 1313', class: 'star-wars-1313', src:'./docs/archive/star-wars-1313.md'}),
              ioMarkdown({id: 'TED Installation', class: 'ted-installation', src:'./docs/archive/unnumbered-sparks.md'}),
            ]
          }),
          ioMarkdown({id: 'Contact', class: 'contact', src:'./docs/contact.md'}),
        ]
      })
    ])
  }
}
