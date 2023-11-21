import { onMounted, onUnmounted, ref } from 'vue';

function useScrollToTop() {
  const isScrolledToTop = ref(true);

  const handleScroll = () => {
    isScrolledToTop.value = window.scrollY === 0;
  };

  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });

  return isScrolledToTop;
}

export default useScrollToTop;
