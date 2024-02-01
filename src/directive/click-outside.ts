import { ObjectDirective } from 'vue';

const clickOutside: ObjectDirective = {
  created(el, binding) {
    el.clickOutside = function (event: MouseEvent) {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event);
      }
    };

    document.addEventListener('click', el.clickOutside, { capture: true });
  },

  unmounted(el) {
    document.removeEventListener('click', el.clickOutside);
  },
};

export default clickOutside;
