<script setup lang="ts">
const { t } = useI18n()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-border py-8">
    <div class="container mx-auto px-4 text-center text-sm text-muted-foreground">
      {{ t('footer.copyright', { year }) }}
    </div>
  </footer>
</template>
