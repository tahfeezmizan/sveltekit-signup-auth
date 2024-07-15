<script>
	import { onMount } from 'svelte';
	import { auth } from '../lib/firebase/firebase.config.js';
	import { authStore } from '../stores/AuthStore.js';

	onMount(() => {
		const unsebscribe = auth.onAuthStateChanged((user) => {
			console.log(user);

			authStore.update((curr) => {
				return { ...curr, isLoading: false, currentUser: user };
			});
		});
	});
</script>

<slot />
