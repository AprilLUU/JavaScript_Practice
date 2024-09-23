type fn = () => void | null;
type objKey = string | symbol

let activeReactiveFn: fn = null;

class Depend {
  depend: Set<fn>;

  constructor() {
    this.depend = new Set();
  }

  addDepend(fn) {
    this.depend.add(fn);
  }

  dependFn() {
    if (activeReactiveFn) {
      this.depend.add(activeReactiveFn);
    }
  }

  notify() {
    this.depend.forEach((fn) => fn());
  }
}

const weakMap: WeakMap<object, Map<string, Depend>> = new WeakMap();
function getDepend(target: object, key: objKey) {
  let map: Map<objKey, Depend> = weakMap.get(target);
  if (!map) {
    map = new Map();
    weakMap.set(target, map);
  }

  let depend: Depend = map.get(key);
  if (!depend) {
    depend = new Depend();
    map.set(key, depend);
  }

  return depend;
}

function reactive(obj: object) {
  return new Proxy(obj, {
    get(target, key, recevier) {
      const depend = getDepend(target, key);
      depend.dependFn();
      return Reflect.get(target, key, recevier);
    },
    set(target, key, newValue, recevier) {
      Reflect.set(target, key, newValue, recevier);
      const depend = getDepend(target, key);
      depend.notify();
      return true;
    },
  });
}

function watchEffect(fn: fn) {
  activeReactiveFn = fn;
  fn();
  activeReactiveFn = null;
}

function watch(
  target: object,
  key: objKey,
  fn: fn,
  options = { immediate: false }
) {
  activeReactiveFn = fn;
  let value = target[key];
  if (options.immediate) {
    fn();
  }
  value = null;
  activeReactiveFn = null;
}
