import { ModelKey } from '@typings/index';
import { useEditStore } from '@/store/index';
import useCurrentModelIndex from './useCurrentModelIndex';

export default function useDeleteModel(modelKey: ModelKey) {
  const store = useEditStore();
  const index = useCurrentModelIndex(modelKey);

  const del = () => {
    if (index != undefined) {
      store.state.splice(index.value, 1);
    }
  };

  return del;
}
