import Vue from 'vue';

Vue.directive('blur', {
  inserted: (el, binding) => {
    el.style.filter = !binding.value ? 'blur(3px)' : 'none'
        el.style.cursor = !binding.value ? 'not-allowed' : 'inherit'
        el.querySelectorAll('button').forEach(a => {
          if (!binding.value) {
            a.setAttribute('disabled', true)
          } else {
            a.removeAttribute('disabled')
          }
        })
  }
})
