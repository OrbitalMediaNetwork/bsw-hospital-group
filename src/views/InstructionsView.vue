<template>
  <div class="page-wrapper">
    <div>
      <h2 class="page-title page-title--large">How to Use These Training Modules</h2>
      
      <ul class="info-list">
        <li>Each training module will take you through a series of situations. You can pause at any time, and skip forwards or backwards using the arrows, or the section menu on the toolbar.</li>
        <li>There are questions in some of the modules, that you need to click to move on. The correct answer will turn green; other answers will turn red</li>
        <li>There is no test at the end, and no certificate to download</li>
        <li>You can do the modules as many times as you like. Please share them with colleagues in your organisation.</li>
      </ul>

      <NavigationButtons 
        :previous-route="{ path: '/', label: 'Previous' }"
        :next-route="{ path: '/experiences', label: 'Start Experience' }"
      />
    </div>
  </div>
  <AppFooter />
</template>

<script>
import AppFooter from "../components/AppFooter.vue";
import NavigationButtons from "../components/NavigationButtons.vue";

export default {
  name: "InstructionsView",

  components: {
    AppFooter,
    NavigationButtons,
  },
};
</script>

<style scoped>
.info-list li {
  margin-bottom: 1.5rem;
}
</style>