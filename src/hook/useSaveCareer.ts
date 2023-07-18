export default function useSaveCareer<T extends any = any>(arr: T[]) {
  const save = (data: T, index?: number) => {
    if (index === undefined) {
      arr.push(data);
    } else {
      arr[index] = data;
    }
  };

  return save;
}
