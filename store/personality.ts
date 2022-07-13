import { defineStore } from "pinia";

export interface Type {
  id: string;
  name: string;
  slug: string;
  content: string;
}

interface State {
  types: Type[];
}

const lorem = '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam arcu sem, tempor vitae sapien vitae, scelerisque pellentesque neque. Integer consectetur ligula at metus ornare, sit amet tristique augue lobortis. Cras ultrices nisi erat, vel volutpat elit posuere eu. Vestibulum at feugiat turpis, ac porta felis. Mauris arcu mauris, pellentesque in tellus sed, feugiat viverra odio. Proin venenatis porta tortor vitae tincidunt. Donec eu vehicula nisl, at rhoncus ex. Mauris lacinia eros nec tristique porttitor.</p>' +
    '<p>Ut viverra enim sed quam consectetur molestie. Etiam sit amet ornare magna, sit amet tincidunt sem. Sed hendrerit scelerisque sagittis. Nunc auctor, lorem vitae hendrerit feugiat, nunc purus sollicitudin nunc, nec lacinia quam erat sit amet eros. Suspendisse mi turpis, sollicitudin at pellentesque id, euismod eget sapien. Proin sodales ultrices velit et facilisis. Sed commodo commodo urna vel vestibulum. Praesent et dui ut velit fringilla aliquam. Curabitur et aliquet justo. Mauris leo elit, rhoncus at augue ut, dignissim rutrum mauris.</p>' +
    '<p>Cras eleifend pulvinar urna, nec fermentum lacus. Fusce sed ex consequat sem convallis malesuada non nec nisl. Vivamus efficitur, nisi et congue luctus, risus sem vestibulum nibh, quis malesuada turpis urna nec mi. Etiam quis diam feugiat, mattis justo sit amet, suscipit nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Fusce felis arcu, bibendum ac ornare sit amet, suscipit ac urna. Nullam sed bibendum erat, ut scelerisque tellus. Sed dictum scelerisque enim, eget volutpat tellus lobortis id. Nunc blandit consectetur lacus volutpat tincidunt.</p>' +
    '<p>Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam vel erat vitae velit feugiat suscipit. Morbi pellentesque congue lectus, vitae ultricies enim hendrerit tincidunt. Duis lacinia ipsum rhoncus, ultricies erat quis, cursus eros. Vivamus fringilla aliquam ante sit amet facilisis. Pellentesque nec rutrum mauris. Proin sed commodo lorem. Vestibulum id dui feugiat, rhoncus massa eu, congue velit. Sed pellentesque vehicula ex ac vehicula. Quisque quis facilisis mauris, at viverra massa. Proin sodales lorem vitae orci dictum euismod.</p>' +
    '<p>Quisque dolor tellus, scelerisque vitae ullamcorper ac, laoreet sed sem. Ut lacus lorem, tincidunt sed varius sit amet, interdum id diam. Sed tincidunt ornare tortor nec sodales. In ut turpis vitae purus scelerisque elementum. Ut tincidunt sem id turpis dapibus hendrerit. Integer nec est neque. Praesent interdum felis est, egestas varius velit vestibulum quis. Nunc pellentesque rhoncus cursus. Aenean fringilla dui vitae sapien suscipit accumsan.</p>';

export const usePersonality = defineStore('personality', {
  state: (): State => ({
    types: [
      {
        id: 'typeA',
        name: 'Type - A',
        slug: 'type-a',
        content: lorem,
      },
      {
        id: 'typeB',
        name: 'Type - B',
        slug: 'type-b',
        content: lorem,
      },
      {
        id: 'typeC',
        name: 'Type - C',
        slug: 'type-c',
        content: lorem,
      },
      {
        id: 'typeD',
        name: 'Type - D',
        slug: 'type-d',
        content: lorem,
      },
    ],
  }),
  getters: {
    getTypes: (state) => state.types,
  },
});
