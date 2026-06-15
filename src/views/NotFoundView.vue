<template>
  <div class="page-wrapper">
    <div>
      <h1 class="page-title page-title--medium">404 - Page Not Found</h1>
      <p class="not-found-subtitle">The page you're looking for doesn't exist</p>

      <div class="has-text-centered">
        <router-link class="btn btn-primary" to="/">
          Return to Menu
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFoundView',
};
</script>

<style scoped>
.not-found-subtitle {
  font-size: 1.125rem;
  color: #64748b;
  text-align: center;
  margin-bottom: 2rem;
}

.btn {
  padding: 0.875rem 1.75rem;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 14px;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;
  border: 0;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
}
</style>