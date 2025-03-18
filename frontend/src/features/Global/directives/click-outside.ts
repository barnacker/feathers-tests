import type { Directive, DirectiveBinding, ObjectDirective } from 'vue';

type ClickHandler = (event: Event) => void;
type Callback = (event: Event, el: HTMLElement) => void;
interface ClickOutsideDirective extends ObjectDirective {
  clickOutsideHandler: ClickHandler;
}

/**
 * Directive for detecting click events on elements outside the one with the directive
 * Usage:
 * ```vue
 * <q-btn id="my-button" @click="popupOpen = true>My Button</q-btn>
 * <div v-if="popupOpen" v-click-outside:my-button="popupOpen = false">
 *   This will close if you click outside.
 * </div>
 * ````
 */
export const vClickOutside = <Directive<HTMLElement, Callback>>{
  mounted: (el: HTMLElement, binding: DirectiveBinding) => {
    const directive = binding.dir as ClickOutsideDirective;
    const excludeTarget = binding.arg
      ? document.getElementById(binding.arg)
      : null;
    directive.clickOutsideHandler = (event: Event): void => {
      const target = event.target as HTMLElement;
      if (
        !(el == target || el.contains(target)) &&
        !(
          excludeTarget &&
          (target == excludeTarget || excludeTarget.contains(target))
        )
      ) {
        binding.value(event, el);
      }
    };
    document.addEventListener('click', directive.clickOutsideHandler);
  },
  beforeUnmount: (el: HTMLElement, binding: DirectiveBinding) => {
    const directive = binding.dir as ClickOutsideDirective;
    document.removeEventListener('click', directive.clickOutsideHandler);
  },
};
