import { w } from '@dojo/framework/core/vdom';
import { renderer } from './NativeDom';
import Thing from './Todo';

const r = renderer(() => w(Thing, {}));
r.mount();
