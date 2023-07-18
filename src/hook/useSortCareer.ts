import { computed } from 'vue';

export default function useSortCareer<T extends any = any>(arr: T[]) {
  const maxIndex = computed(() => arr.length - 1);

  const moveDown = (index: number) => {
    if (index >= maxIndex.value) return;
    const current = arr[index];
    arr[index] = arr[index + 1];
    arr[index + 1] = current;
  };

  const moveUp = (index: number) => {
    if (index <= 0) return;

    const current = arr[index];
    arr[index] = arr[index - 1];
    arr[index - 1] = current;
  };

  return { moveDown, moveUp };
}
