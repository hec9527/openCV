import { ModelKey } from '@typings/index';
import { useEditStore } from '@/store/index';
import { computed } from 'vue';

export default function (modelKey: ModelKey) {
  const store = useEditStore();

  const index = computed(() => {
    return store.state.cvInfo.findIndex(
      (model) => model.modelType === modelKey,
    );
  });

  return index;
}
