---
lastUpdate: 16/01/2025
---

# Features grid

A component to showcase features with interactive demos in a responsive grid layout. Each feature includes a title, a brief description, and an interactive demo.


<img class="rounded-lg my-5" src="../bento-grid.png" alt="Features grid" />

## Usage

```svelte ln
<script>
    import FeaturesGrid from '$lib/components/layout/featuresGrid.svelte';
</script>

<FeaturesGrid />
```


Inside the features grid component, you can define features like this:
```ts
import LoginFeature from '../ui/bento-grid/features/loginFeature.svelte';

let features = [
    {
        icon: 'mdi:account', // Iconify icon
	color: '#7157FF', // Icon color
	name: 'Authentication',
	description: 'Google login, 2FA, Rate limiting, Password checking',
	background: LoginFeature, // The Svelte component that represents the feature you want to showcase.
	class: 'col-span-3 lg:col-span-1' // Additionnal styling
    }
]
```