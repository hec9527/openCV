import { ModelKey } from '@typings/index';
import { useEditStore } from '@/store/index';
import { computed } from 'vue';

import useCurrentModelIndex from './useCurrentModelIndex';

export default function useSortModel(modelKey: ModelKey) {
  const currentIndex = useCurrentModelIndex(modelKey);
  const store = useEditStore();
  const maxIndex = computed(() => store.state.length - 1);

  const moveDown = () => {
    const index = currentIndex.value;

    if (index >= maxIndex.value) {
      return;
    }

    const current = store.state[index];
    store.state[index] = store.state[index + 1];
    store.state[index + 1] = current;
  };

  const moveUp = () => {
    const index = currentIndex.value;
    if (index <= 1) {
      return;
    }
    const current = store.state[index];
    store.state[index] = store.state[index - 1];
    store.state[index - 1] = current;
  };

  return { moveDown, moveUp };
}
